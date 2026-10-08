import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const firebaseAdminConfigured = Boolean(clientEmail && privateKey);

const app = firebaseAdminConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail,
          privateKey,
        }),
      })
  : null;

export const adminAuth = app ? getAuth(app) : null;
export const adminDb = app ? getFirestore(app) : null;