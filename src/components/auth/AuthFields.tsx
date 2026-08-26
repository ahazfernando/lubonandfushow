"use client";

import { GoogleIcon } from "./GoogleIcon";
import { useI18n } from "@/components/site/LanguageProvider";
import { cn } from "@/lib/utils";

const socialBtn =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-transparent text-sm font-medium text-white transition-colors hover:bg-white/6 disabled:opacity-50";

export function SocialAuthButtons({
  disabled,
  onGoogle,
}: {
  disabled?: boolean;
  onGoogle: () => void;
}) {
  const { t } = useI18n();

  return (
    <button type="button" className={socialBtn} disabled={disabled} onClick={onGoogle}>
      <GoogleIcon className="size-4" />
      {t.auth.google}
    </button>
  );
}

export function AuthOrDivider() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-4 text-xs text-white/40">
      <span className="h-px flex-1 bg-white/12" />
      {t.auth.or}
      <span className="h-px flex-1 bg-white/12" />
    </div>
  );
}

export function authFieldClassName(className?: string) {
  return cn(
    "h-12 w-full rounded-xl border-0 bg-[#1c1c1c] px-4 text-sm text-white outline-none ring-1 ring-white/8 placeholder:text-white/30 focus:ring-2 focus:ring-white/25 disabled:opacity-50",
    className,
  );
}

export function AuthLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-white">
      {children}
    </label>
  );
}
