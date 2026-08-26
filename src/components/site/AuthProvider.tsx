"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";

type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function upsertUserProfile(
  user: User,
  extra?: { firstName?: string; lastName?: string },
) {
  try {
    const nameParts = (user.displayName ?? "").trim().split(/\s+/).filter(Boolean);
    await setDoc(
      doc(getFirebaseDb(), "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstName: extra?.firstName ?? nameParts[0] ?? "",
        lastName: extra?.lastName ?? nameParts.slice(1).join(" "),
        updatedAt: serverTimestamp(),
        createdAt: user.metadata.creationTime ?? new Date().toISOString(),
      },
      { merge: true },
    );
  } catch {
    // Auth should still succeed if Firestore rules or the database are not ready.
  }
}

async function oauthSignIn(provider: GoogleAuthProvider) {
  const auth = getFirebaseAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    await upsertUserProfile(result.user);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "auth/popup-blocked") {
      await signInWithRedirect(auth, provider);
      return;
    }
    throw error;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(configured);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const unsub = onAuthStateChanged(auth, (next) => {
        setUser(next);
        setLoading(false);
      });

      getRedirectResult(auth)
        .then(async (result) => {
          if (result?.user) await upsertUserProfile(result.user);
        })
        .catch(() => undefined);

      return unsub;
    } catch {
      setLoading(false);
    }
  }, [configured]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    await upsertUserProfile(result.user);
  }, []);

  const signUp = useCallback(async ({ firstName, lastName, email, password }: SignUpInput) => {
    const auth = getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = `${firstName} ${lastName}`.trim();
    await updateProfile(result.user, { displayName });
    await upsertUserProfile(result.user, { firstName, lastName });
    try {
      await sendEmailVerification(result.user);
    } catch {
      // Account is still created if verification email cannot be sent.
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await oauthSignIn(provider);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(getFirebaseAuth(), email);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(getFirebaseAuth());
  }, []);

  const isAdmin = useMemo(() => {
    const email = user?.email?.trim().toLowerCase();
    if (!email) return false;
    const allowlist = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    if (allowlist.length === 0) return true;
    return allowlist.includes(email);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      isAdmin,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      signOut,
    }),
    [
      user,
      loading,
      configured,
      isAdmin,
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
