"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/components/site/AuthProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authErrorMessage } from "@/lib/auth-errors";

export function AdminLoginForm() {
  const { t, locale } = useI18n();
  const { configured, signIn, signInWithGoogle } = useAuth();
  const caseClass = locale === "si" ? "" : "uppercase";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError("");
    if (!configured) {
      setError(t.auth.errorNotConfigured);
      return;
    }
    setSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success(t.auth.welcomeToast);
    } catch (err) {
      setError(authErrorMessage(err, t.auth));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="card-press p-6 md:p-8">
        <p className="text-primary kicker">{t.admin.kicker}</p>
        <h2 className="mt-2 text-2xl">{t.admin.signInHeading}</h2>
        <p className="mt-2 font-serif text-sm text-muted-foreground">{t.admin.signInBody}</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-email">{t.auth.email}</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.emailPlaceholder}
              className="rounded-sm"
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">{t.auth.password}</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.enterPassword}
              className="rounded-sm"
              disabled={submitting}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            type="submit"
            className={`w-full rounded-sm font-semibold ${caseClass}`}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : t.auth.logIn}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {t.auth.or}
          <span className="h-px flex-1 bg-border" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full rounded-sm"
          disabled={submitting}
          onClick={() => void handleGoogle()}
        >
          {t.auth.google}
        </Button>
      </div>
    </div>
  );
}
