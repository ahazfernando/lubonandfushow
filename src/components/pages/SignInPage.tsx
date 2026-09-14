"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthOrDivider, AuthLabel, SocialAuthButtons, authFieldClassName } from "@/components/auth/AuthFields";
import { AuthShell } from "@/components/auth/AuthShell";
import { useAuth } from "@/components/site/AuthProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { authErrorMessage, safeNextPath } from "@/lib/auth-errors";

type SignInVariant = "customer" | "staff";

export function SignInPage({ variant = "customer" }: { variant?: SignInVariant }) {
  const { t } = useI18n();
  const { user, loading: authLoading, configured, isStaff, signIn, signInWithGoogle, resetPassword } =
    useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"), { audience: variant });
  const isStaffLogin = variant === "staff";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !user) return;
    if (isStaffLogin) {
      router.replace(isStaff ? next : "/dashboard");
      return;
    }
    router.replace(next);
  }, [authLoading, user, router, next, isStaffLogin, isStaff]);

  const busy = submitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError(t.auth.errorMissingFields);
      return;
    }
    if (!configured) {
      setError(t.auth.errorNotConfigured);
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      toast.success(t.auth.welcomeToast);
      router.replace(next);
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOauth(fn: () => Promise<void>) {
    setError("");
    if (!configured) {
      setError(t.auth.errorNotConfigured);
      return;
    }
    setSubmitting(true);
    try {
      await fn();
      toast.success(t.auth.welcomeToast);
      router.replace(next);
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset() {
    setError("");
    if (!email.trim()) {
      setError(t.auth.errorResetNeedsEmail);
      return;
    }
    if (!configured) {
      setError(t.auth.errorNotConfigured);
      return;
    }
    try {
      await resetPassword(email.trim());
      toast.success(t.auth.resetSent);
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    }
  }

  const title = isStaffLogin ? t.auth.staffWelcome : t.auth.welcomeBack;
  const body = isStaffLogin ? t.auth.staffWelcomeBody : t.auth.welcomeBackBody;
  const heading = isStaffLogin ? t.auth.staffSignInTitle : t.auth.signInTitle;
  const subtitle = isStaffLogin ? t.auth.staffSignInSubtitle : t.auth.signInSubtitle;

  return (
    <AuthShell title={title} body={body}>
      <h2 className="font-sans text-3xl font-semibold tracking-tight text-white">{heading}</h2>
      <p className="mt-2 text-sm text-white/45">{subtitle}</p>

      <div className="mt-8 space-y-6">
        <SocialAuthButtons
          disabled={busy}
          onGoogle={() => void handleOauth(signInWithGoogle)}
        />
        <AuthOrDivider />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <AuthLabel htmlFor="email">{t.auth.email}</AuthLabel>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.emailPlaceholder}
              className={authFieldClassName()}
              disabled={busy}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-white">
                {t.auth.password}
              </label>
              <button
                type="button"
                className="text-xs text-white/45 transition-colors hover:text-white"
                onClick={() => void handleReset()}
              >
                {t.auth.forgot}
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.enterPassword}
                className={authFieldClassName("pr-11")}
                disabled={busy}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 grid w-11 place-items-center text-white/40 hover:text-white/80"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-bold tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : t.auth.logIn}
          </button>
        </form>

        {isStaffLogin ? (
          <p className="text-center text-sm text-white/45">
            {t.auth.customerInstead}{" "}
            <Link href="/login" className="font-semibold text-white">
              {t.auth.customerSignIn}
            </Link>
          </p>
        ) : (
          <>
            <p className="text-center text-sm text-white/45">
              {t.auth.noAccount}{" "}
              <Link
                href={`/register?next=${encodeURIComponent(next)}`}
                className="font-semibold text-white"
              >
                {t.auth.signUp}
              </Link>
            </p>
            <p className="text-center text-sm text-white/45">
              {t.auth.staffInstead}{" "}
              <Link href="/login/staff" className="font-semibold text-white">
                {t.auth.staffSignIn}
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthShell>
  );
}
