"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase";
import type { AdminUser } from "./adminTypes";

type AdminProfile = {
  name?: string;
  role?: AdminUser["role"];
};

function getAdminError(error: unknown): string {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code.includes("invalid-credential") || code.includes("wrong-password")) return "Invalid email or password.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait and try again.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and try again.";
  return "Unable to complete the admin sign-in request.";
}

async function loadAdminUser(firebaseUser: User): Promise<AdminUser | null> {
  if (!db) return null;
  const profileSnapshot = await getDoc(doc(db, "admins", firebaseUser.uid));
  if (!profileSnapshot.exists()) return null;

  const profile = profileSnapshot.data() as AdminProfile;
  if (!profile.role || !["super_admin", "manager", "artisan"].includes(profile.role)) return null;

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: profile.name || firebaseUser.displayName || firebaseUser.email || "Admin",
    role: profile.role,
    lastLogin: new Date().toISOString(),
  };
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !db || !firebaseConfigured) {
      setAuthError("Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values before signing in.");
      setIsLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const adminUser = await loadAdminUser(firebaseUser);
        if (!adminUser) {
          setAuthError("This account is not authorized to access the admin dashboard.");
          if (auth) await signOut(auth);
          setUser(null);
        } else {
          setAuthError(null);
          setUser(adminUser);
        }
      } catch {
        setAuthError("Unable to verify admin permissions. Please try again.");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!auth || !firebaseConfigured) {
      const message = "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values before signing in.";
      setAuthError(message);
      return { success: false, error: message };
    }

    try {
      setAuthError(null);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true };
    } catch (error) {
      const message = getAdminError(error);
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    if (auth) await signOut(auth);
    setUser(null);
  };

  const changePassword = async (currentPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (newPass.length < 8) return { success: false, error: "New password must be at least 8 characters long." };
    if (!auth || !auth.currentUser || !auth.currentUser.email) return { success: false, error: "Your admin session has expired. Please sign in again." };

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPass);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPass);
      return { success: true };
    } catch (error) {
      return { success: false, error: getAdminError(error) };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    authError,
    login,
    logout,
    changePassword,
  };
}
