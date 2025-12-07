import { BookOpen, Clock, Target, Users } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import { supportedLocales } from "@/lib/constants";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";

// Generate static params for all non-default languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as LanguageType;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb
          items={[{ label: t("breadcrumb.about", lang) }]}
          className="mb-6"
          showLanguageSwitch
        />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("about.subtitle", lang)}
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {t("about.mission.title", lang)}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("about.mission.content", lang)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {t("about.whatwedo.title", lang)}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("about.whatwedo.content", lang)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {t("about.whoweserve.title", lang)}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("about.whoweserve.content", lang)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {t("about.whychoose.title", lang)}
                </h2>
                <ul className="text-foreground space-y-2 leading-relaxed">
                  <li>
                    •{" "}
                    <strong>
                      {t("about.whychoose.always_accurate.title", lang)}:
                    </strong>{" "}
                    {t("about.whychoose.always_accurate.content", lang)}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("about.whychoose.realtime.title", lang)}:
                    </strong>{" "}
                    {t("about.whychoose.realtime.content", lang)}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("about.whychoose.userfriendly.title", lang)}:
                    </strong>{" "}
                    {t("about.whychoose.userfriendly.content", lang)}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("about.whychoose.comprehensive.title", lang)}:
                    </strong>{" "}
                    {t("about.whychoose.comprehensive.content", lang)}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("about.whychoose.customizable.title", lang)}:
                    </strong>{" "}
                    {t("about.whychoose.customizable.content", lang)}
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-card border-border p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t("about.ourstory.title", lang)}
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>{t("about.ourstory.content1", lang)}</p>
            <p>{t("about.ourstory.content2", lang)}</p>
            <p>{t("about.ourstory.content3", lang)}</p>
          </div>
        </Card>

        <Card className="bg-primary/5 border-primary/20 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("about.joincommunity.title", lang)}
          </h2>
          <p className="text-lg text-foreground mb-6">
            {t("about.joincommunity.content", lang)}
          </p>
          <p className="text-muted-foreground">
            {t("about.joincommunity.feedback", lang)}{" "}
            <span className="font-medium text-foreground">
              contact@exam-timekeeper.top
            </span>
          </p>
        </Card>

        <Card className="bg-card border-border p-8 text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">
            {t("about.opensource.title", lang)}
          </h2>
          <p className="text-lg text-foreground mb-6">
            {t("about.opensource.content", lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/SymphonyIceAttack/exam-timekeeper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("about.opensource.viewsource", lang)}
            </a>
            <a
              href="https://github.com/SymphonyIceAttack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("about.opensource.developerprofile", lang)}
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
