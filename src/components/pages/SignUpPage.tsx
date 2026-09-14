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

export function SignUpPage() {
  const { t } = useI18n();
  const { user, loading: authLoading, configured, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"), { audience: "customer" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) router.replace(next);
  }, [authLoading, user, router, next]);

  const busy = submitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      setError(t.auth.errorMissingFields);
      return;
    }
    if (password.length < 8) {
      setError(t.auth.errorWeakPassword);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.auth.errorPasswordMismatch);
      return;
    }
    if (!configured) {
      setError(t.auth.errorNotConfigured);
      return;
    }

    setSubmitting(true);
    try {
      await signUp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });
      toast.success(t.auth.accountCreated);
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
      toast.success(t.auth.accountCreated);
      router.replace(next);
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell title={t.auth.getStarted} body={t.auth.getStartedBody}>
      <h2 className="font-sans text-3xl font-semibold tracking-tight text-white">
        {t.auth.signUpTitle}
      </h2>
      <p className="mt-2 text-sm text-white/45">{t.auth.signUpSubtitle}</p>

      <div className="mt-8 space-y-6">
        <SocialAuthButtons
          disabled={busy}
          onGoogle={() => void handleOauth(signInWithGoogle)}
        />
        <AuthOrDivider />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <AuthLabel htmlFor="firstName">{t.auth.firstName}</AuthLabel>
              <input
                id="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t.auth.firstNamePlaceholder}
                className={authFieldClassName()}
                disabled={busy}
              />
            </div>
            <div>
              <AuthLabel htmlFor="lastName">{t.auth.lastName}</AuthLabel>
              <input
                id="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t.auth.lastNamePlaceholder}
                className={authFieldClassName()}
                disabled={busy}
              />
            </div>
          </div>

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
            <AuthLabel htmlFor="password">{t.auth.password}</AuthLabel>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
            <p className="mt-2 text-xs text-white/40">{t.auth.passwordHint}</p>
          </div>

          <div>
            <AuthLabel htmlFor="confirmPassword">{t.auth.confirmPassword}</AuthLabel>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.auth.confirmPasswordPlaceholder}
                className={authFieldClassName("pr-11")}
                disabled={busy}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 grid w-11 place-items-center text-white/40 hover:text-white/80"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? t.auth.hidePassword : t.auth.showPassword}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-bold tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : t.auth.signUp}
          </button>
        </form>

        <p className="text-center text-sm text-white/45">
          {t.auth.alreadyHaveAccount}{" "}
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-white">
            {t.auth.logIn}
          </Link>
        </p>
        <p className="text-center text-sm text-white/45">
          {t.auth.staffInstead}{" "}
          <Link href="/login/staff" className="font-semibold text-white">
            {t.auth.staffSignIn}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
