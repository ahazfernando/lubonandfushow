"use client";

import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";

export default function ProductNotFound() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <p className="mx-auto max-w-3xl px-4 py-24 text-center">{t.errors.productNotFound}</p>
    </SiteLayout>
  );
}
