import { FirebaseError } from "firebase/app";

import type { Messages } from "@/lib/i18n";

export function authErrorMessage(error: unknown, t: Messages["auth"]): string {
  const code = error instanceof FirebaseError ? error.code : "";

  switch (code) {
    case "auth/email-already-in-use":
      return t.errorEmailInUse;
    case "auth/invalid-email":
      return t.errorInvalidEmail;
    case "auth/weak-password":
      return t.errorWeakPassword;
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return t.errorInvalidCredential;
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return t.errorPopupClosed;
    case "auth/popup-blocked":
      return t.errorPopupBlocked;
    case "auth/operation-not-allowed":
      return t.errorNotAllowed;
    case "auth/too-many-requests":
      return t.errorTooMany;
    case "auth/account-exists-with-different-credential":
      return t.errorAccountExists;
    case "auth/network-request-failed":
      return t.errorNetwork;
    default:
      return t.errorGeneric;
  }
}

export function safeNextPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
