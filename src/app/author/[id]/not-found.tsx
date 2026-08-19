"use client";

import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";

export default function AuthorNotFound() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <p className="px-4 py-24 text-center">{t.author.notFound}</p>
    </SiteLayout>
  );
}
