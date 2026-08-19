"use client";

import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";

export default function ArticleNotFound() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <p className="mx-auto max-w-3xl px-4 py-24 text-center">{t.errors.storyNotFound}</p>
    </SiteLayout>
  );
}
