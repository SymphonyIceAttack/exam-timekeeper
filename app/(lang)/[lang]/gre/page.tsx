import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as LanguageType;

  return {
    title: t("gre.page.title", language),
    description: t("gre.page.description", language),
  };
}

export default async function GrePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ExamDashboard lang={lang as LanguageType} filterType="GRE" />;
}
