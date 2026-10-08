"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase";

export type CustomerProfile = {
  uid: string;
  email: string;
  name: string;
  phone?: string;
};

function authMessage(error: unknown): string {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code.includes("email-already-in-use")) return "An account already exists with this email.";
  if (code.includes("invalid-credential") || code.includes("wrong-password")) return "Invalid email or password.";
  if (code.includes("invalid-email")) return "Enter a valid email address.";
  if (code.includes("weak-password")) return "Choose a password with at least 6 characters.";
  if (code.includes("user-not-found")) return "No account was found with this email.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait and try again.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and try again.";
  return "Something went wrong. Please try again.";
}

async function getProfile(firebaseUser: User): Promise<CustomerProfile> {
  const fallback = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: firebaseUser.displayName || "",
  };
  if (!db) return fallback;
  const snapshot = await getDoc(doc(db, "users", firebaseUser.uid));
  return snapshot.exists() ? { ...fallback, ...(snapshot.data() as Partial<CustomerProfile>) } : fallback;
}

export function useCustomerAuth() {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !firebaseConfigured) {
      setError("Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to sign in.");
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
        setUser(await getProfile(firebaseUser));
      } catch {
        setError("We could not load your account details.");
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth || !firebaseConfigured) return { success: false, error: "Firebase is not configured yet." };
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true };
    } catch (authError) {
      const message = authMessage(authError);
      setError(message);
      return { success: false, error: message };
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!auth || !firebaseConfigured) return { success: false, error: "Firebase is not configured yet." };
    try {
      setError(null);
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });
      if (db) {
        await setDoc(doc(db, "users", credential.user.uid), {
          uid: credential.user.uid,
          email: credential.user.email || email.trim(),
          name: name.trim(),
          createdAt: new Date().toISOString(),
        });
      }
      setUser({ uid: credential.user.uid, email: credential.user.email || email.trim(), name: name.trim() });
      return { success: true };
    } catch (authError) {
      const message = authMessage(authError);
      setError(message);
      return { success: false, error: message };
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth || !firebaseConfigured) return { success: false, error: "Firebase is not configured yet." };
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (authError) {
      const message = authMessage(authError);
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    if (auth) await signOut(auth);
    setUser(null);
  };

  return { user, isLoading, isAuthenticated: Boolean(user), error, signIn, signUp, resetPassword, logout };
}
