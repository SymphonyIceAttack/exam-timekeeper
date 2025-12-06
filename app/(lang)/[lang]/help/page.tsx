import { BookOpen, Clock, HelpCircle, RefreshCw, Settings } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supportedLocales } from "@/lib/constants";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { HelpClient } from "./help-client";

// Generate static params for all non-default languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export const metadata: Metadata = {
  title: "Help & FAQ | Exam TimeKeeper",
  description:
    "Get help and answers to frequently asked questions about using Exam TimeKeeper.",
};

export default async function HelpPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang as LanguageType;
  const getPath = (path: string) => (lang === "en" ? path : `/${lang}${path}`);

  const faqSections = [
    {
      id: "general",
      title: t("help.general.title", lang),
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          q: t("faq.whatIsExamTimeKeeper", lang),
          a: t("faq.whatIsExamTimeKeeper.answer", lang),
        },
        {
          q: t("faq.howOftenDataUpdated", lang),
          a: t("faq.howOftenDataUpdated.answer", lang),
        },
        {
          q: t("faq.isFreeToUse", lang),
          a: t("faq.isFreeToUse.answer", lang),
        },
        {
          q: t("faq.whichExamsCovered", lang),
          a: t("faq.whichExamsCovered.answer", lang),
        },
        {
          q: t("faq.howAccurate", lang),
          a: t("faq.howAccurate.answer", lang),
        },
      ],
    },
    {
      id: "using",
      title: t("help.using.title", lang),
      icon: <Settings className="w-5 h-5" />,
      questions: [
        {
          q: t("faq.changeCountdown", lang),
          a: t("faq.changeCountdown.answer", lang),
        },
        {
          q: t("faq.addCustomExams", lang),
          a: t("faq.addCustomExams.answer", lang),
        },
        {
          q: t("faq.favoritesWork", lang),
          a: t("faq.favoritesWork.answer", lang),
        },
        {
          q: t("faq.clockOnlyView", lang),
          a: t("faq.clockOnlyView.answer", lang),
        },
        {
          q: t("faq.mobileCompatible", lang),
          a: t("faq.mobileCompatible.answer", lang),
        },
      ],
    },
    {
      id: "technical",
      title: t("help.technical.title", lang),
      icon: <RefreshCw className="w-5 h-5" />,
      questions: [
        {
          q: t("faq.seeingExpiredExams", lang),
          a: t("faq.seeingExpiredExams.answer", lang),
        },
        {
          q: t("faq.pageNotLoading", lang),
          a: t("faq.pageNotLoading.answer", lang),
        },
        {
          q: t("faq.storePersonalInfo", lang),
          a: t("faq.storePersonalInfo.answer", lang),
        },
        {
          q: t("faq.downloadExport", lang),
          a: t("faq.downloadExport.answer", lang),
        },
        {
          q: t("faq.workOffline", lang),
          a: t("faq.workOffline.answer", lang),
        },
      ],
    },
    {
      id: "exams",
      title: t("help.exams.title", lang),
      icon: <BookOpen className="w-5 h-5" />,
      questions: [
        {
          q: t("faq.satDataSource", lang),
          a: t("faq.satDataSource.answer", lang),
        },
        {
          q: t("faq.actDatesAccurate", lang),
          a: t("faq.actDatesAccurate.answer", lang),
        },
        {
          q: t("faq.greToeflDates", lang),
          a: t("faq.greToeflDates.answer", lang),
        },
        {
          q: t("faq.gmatDatesPosted", lang),
          a: t("faq.gmatDatesPosted.answer", lang),
        },
        {
          q: t("faq.requestAdditionalExams", lang),
          a: t("faq.requestAdditionalExams.answer", lang),
        },
      ],
    },
    {
      id: "troubleshooting",
      title: t("help.troubleshooting.title", lang),
      icon: <Clock className="w-5 h-5" />,
      questions: [
        {
          q: t("faq.countdownNotUpdating", lang),
          a: t("faq.countdownNotUpdating.answer", lang),
        },
        {
          q: t("faq.errorMessageFix", lang),
          a: t("faq.errorMessageFix.answer", lang),
        },
        {
          q: t("faq.examNotShowing", lang),
          a: t("faq.examNotShowing.answer", lang),
        },
        {
          q: t("faq.shareWithOthers", lang),
          a: t("faq.shareWithOthers.answer", lang),
        },
        {
          q: t("faq.reportBugSuggestFeature", lang),
          a: t("faq.reportBugSuggestFeature.answer", lang),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb
          items={[{ label: t("breadcrumb.help", lang) }]}
          className="mb-6"
          showLanguageSwitch
        />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("help.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("help.subtitle", lang)}
          </p>
        </div>

        <HelpClient faqSections={faqSections} />

        <Card className="bg-primary/5 border-primary/20 p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("help.stillNeedHelp.title", lang)}
          </h2>
          <p className="text-foreground mb-6">
            {t("help.stillNeedHelp.content", lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={getPath("/contact")}>
              <Button size="lg" className="gap-2">
                <HelpCircle className="w-5 h-5" />
                {t("help.contactUs", lang)}
              </Button>
            </Link>
            <a href="mailto:contact@exam-timekeeper.top">
              <Button variant="outline" size="lg">
                {t("help.emailSupport", lang)}
              </Button>
            </a>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("help.quickLinks.title", lang)}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={getPath("/about")}>
              <Button variant="ghost">
                {t("help.quickLinks.aboutUs", lang)}
              </Button>
            </Link>
            <Link href={getPath("/posts")}>
              <Button variant="ghost">{t("help.quickLinks.blog", lang)}</Button>
            </Link>
            <Link href={getPath("/privacy")}>
              <Button variant="ghost">
                {t("help.quickLinks.privacyPolicy", lang)}
              </Button>
            </Link>
            <Link href={getPath("/terms")}>
              <Button variant="ghost">
                {t("help.quickLinks.termsOfService", lang)}
              </Button>
            </Link>
            <Link href={getPath("/cookies")}>
              <Button variant="ghost">
                {t("help.quickLinks.cookiePolicy", lang)}
              </Button>
            </Link>
            <Link href={getPath("/contact")}>
              <Button variant="ghost">
                {t("help.quickLinks.contact", lang)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
