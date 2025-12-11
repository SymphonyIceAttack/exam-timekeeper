import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ThemeProvider } from "@/components/theme-provider";
import { supportedLocales } from "@/lib/constants";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";
import "../../globals.css";

const JsonLd = ({ children }: { children: Record<string, unknown> }) => (
  <script type="application/ld+json" suppressHydrationWarning>
    {JSON.stringify(children)}
  </script>
);

// Enhanced Schema.org structured data for multi-language support
// Enhanced Schema.org structured data for all supported languages
const getSchemaData = (lang: string) => {
  // Language content mapping
  const content = {
    en: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "US Exam Countdown Calendar",
        description:
          "US exam countdown calendar for SAT, ACT, GRE, TOEFL, GMAT. Track official test dates with real-time countdowns and accurate exam schedules. Perfect for US exam takers and international students.",
        about: "US Standardized Exam Countdown",
        aboutDescription:
          "Comprehensive countdown platform for standardized tests including SAT, ACT, GRE, TOEFL, GMAT",
      },
      organization: {
        description:
          "Leading platform for standardized exam time management and study planning. Specializing in US exam countdowns for SAT, ACT, GRE, TOEFL, GMAT.",
        slogan: "Your Ultimate US Exam Countdown Companion",
      },
      faq: [
        {
          question: "How accurate is the exam date data?",
          answer:
            "Our exam dates are sourced directly from official sources including College Board, ACT.org, ETS, and GMAC to ensure 100% accuracy. We sync immediately when official exam schedules are updated.",
        },
        {
          question: "Is Exam TimeKeeper completely free?",
          answer:
            "Exam TimeKeeper is completely free with no hidden fees. We are committed to providing the best exam planning tools for students worldwide.",
        },
        {
          question: "Which standardized exams are supported?",
          answer:
            "We support major standardized exams including SAT, ACT, GRE, TOEFL, GMAT and continuously add new exam types.",
        },
        {
          question: "How often is the data updated?",
          answer:
            "Exam data auto-refreshes every 30 minutes to ensure you get the latest exam information. You can also manually refresh the page to get updated data.",
        },
      ],
    },
    zh: {
      website: {
        name: "考试时间管家",
        alternateName: "美国考试倒计时日历",
        description:
          "美国考试倒计时日历，追踪SAT、ACT、GRE、TOEFL、GMAT等考试的官方时间表和实时倒计时功能",
        about: "标准化考试倒计时",
        aboutDescription: "提供各类标准化考试的准确时间表和倒计时功能",
      },
      organization: {
        description: "专注于标准化考试时间管理和备考规划的在线教育平台",
        slogan: "您的终极美国考试倒计时伴侣",
      },
      faq: [
        {
          question: "考试日期的准确性如何保证？",
          answer:
            "我们的考试日期直接来源于College Board、ACT.org、ETS、GMAC等官方网站，确保100%准确。如果官方调整考试安排，我们会立即同步更新。",
        },
        {
          question: "Exam TimeKeeper是否免费使用？",
          answer:
            "Exam TimeKeeper完全免费使用，无隐藏费用。我们致力于为全球学生提供最好的考试规划工具。",
        },
        {
          question: "支持哪些标准化考试？",
          answer:
            "我们支持SAT、ACT、GRE、TOEFL、GMAT等主要标准化考试，并持续添加新的考试类型。",
        },
        {
          question: "数据更新频率是多久？",
          answer:
            "考试数据每30分钟自动刷新一次，确保您获取到最新的考试信息。您也可以手动刷新页面获取最新数据。",
        },
      ],
    },
    fr: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "Calendrier de Compte à Rebours d'Examens US",
        description:
          "Calendrier de compte à rebours d'examens US pour SAT, ACT, GRE, TOEFL, GMAT. Suivez les dates officielles des tests avec des compteurs en temps réel et des horaires précis. Parfait pour les candidats aux examens US et les étudiants internationaux.",
        about: "Compte à Rebours d'Examens Standardisés US",
        aboutDescription:
          "Plateforme complète de compte à rebours pour les tests standardisés incluant SAT, ACT, GRE, TOEFL, GMAT",
      },
      organization: {
        description:
          "Plateforme leader pour la gestion du temps d'examen standardisé et la planification d'étude. Spécialisée dans les comptes à rebours d'examens US pour SAT, ACT, GRE, TOEFL, GMAT.",
        slogan: "Votre Compagnon Ultime de Compte à Rebours d'Examens US",
      },
      faq: [
        {
          question: "Quelle est la précision des données de dates d'examen ?",
          answer:
            "Nos dates d'examen sont directement sourcées des sources officielles incluant College Board, ACT.org, ETS et GMAC pour garantir 100% de précision. Nous synchronisons immédiatement quand les horaires officiels sont mis à jour.",
        },
        {
          question: "Exam TimeKeeper est-il complètement gratuit ?",
          answer:
            "Exam TimeKeeper est complètement gratuit sans frais cachés. Nous nous engageons à fournir les meilleurs outils de planification d'examen aux étudiants du monde entier.",
        },
        {
          question: "Quels examens standardisés sont supportés ?",
          answer:
            "Nous supportons les principaux examens standardisés incluant SAT, ACT, GRE, TOEFL, GMAT et ajoutons continuellement de nouveaux types d'examens.",
        },
        {
          question: "À quelle fréquence les données sont-elles mises à jour ?",
          answer:
            "Les données d'examen se rafraîchissent automatiquement toutes les 30 minutes pour vous assurer d'obtenir les dernières informations d'examen. Vous pouvez également rafraîchir manuellement la page pour obtenir des données mises à jour.",
        },
      ],
    },
    es: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "Calendario de Cuenta Regresiva de Exámenes US",
        description:
          "Calendario de cuenta regresiva de exámenes US para SAT, ACT, GRE, TOEFL, GMAT. Rastrea fechas oficiales de exámenes con cronómetros en tiempo real y horarios precisos. Perfecto para estudiantes de exámenes US e internacionales.",
        about: "Cuenta Regresiva de Exámenes Estandarizados US",
        aboutDescription:
          "Plataforma integral de cuenta regresiva para exámenes estandarizados incluyendo SAT, ACT, GRE, TOEFL, GMAT",
      },
      organization: {
        description:
          "Plataforma líder para la gestión de tiempo de exámenes estandarizados y planificación de estudio. Especializada en cuentas regresivas de exámenes US para SAT, ACT, GRE, TOEFL, GMAT.",
        slogan: "Tu Compañero Definitivo de Cuenta Regresiva de Exámenes US",
      },
      faq: [
        {
          question: "¿Qué tan precisas son las datos de fechas de examen?",
          answer:
            "Nuestras fechas de examen se obtienen directamente de fuentes oficiales incluyendo College Board, ACT.org, ETS y GMAC para asegurar 100% de precisión. Sincronizamos inmediatamente cuando se actualizan los horarios oficiales.",
        },
        {
          question: "¿Exam TimeKeeper es completamente gratis?",
          answer:
            "Exam TimeKeeper es completamente gratis sin tarifas ocultas. Estamos comprometidos a proporcionar las mejores herramientas de planificación de examen para estudiantes mundialmente.",
        },
        {
          question: "¿Qué exámenes estandarizados son compatibles?",
          answer:
            "Compatibilizamos los principales exámenes estandarizados incluyendo SAT, ACT, GRE, TOEFL, GMAT y continuamente agregamos nuevos tipos de examen.",
        },
        {
          question: "¿Con qué frecuencia se actualizan los datos?",
          answer:
            "Los datos de examen se actualizan automáticamente cada 30 minutos para asegurar que obtienes la información más reciente de examen. También puedes actualizar manualmente la página para obtener datos actualizados.",
        },
      ],
    },
    ru: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "Календарь Обратного Отсчёта Экзаменов US",
        description:
          "Календарь обратного отсчёта экзаменов US для SAT, ACT, GRE, TOEFL, GMAT. Отслеживайте официальные даты экзаменов с обратным отсчётом в реальном времени и точным расписанием. Идеально для сдающих экзамены US и международных студентов.",
        about: "Обратный Отсчёт Стандартизированных Экзаменов US",
        aboutDescription:
          "Всеобъемлющая платформа обратного отсчёта для стандартизированных экзаменов, включая SAT, ACT, GRE, TOEFL, GMAT",
      },
      organization: {
        description:
          "Ведущая платформа для управления временем стандартизированных экзаменов и планирования обучения. Специализируется на обратном отсчёте экзаменов US для SAT, ACT, GRE, TOEFL, GMAT.",
        slogan: "Ваш Превосходный Компаньон по Обратному Отсчёту Экзаменов US",
      },
      faq: [
        {
          question: "Насколько точны данные дат экзаменов?",
          answer:
            "Наши даты экзаменов поступают непосредственно из официальных источников, включая College Board, ACT.org, ETS и GMAC, для обеспечения 100% точности. Мы синхронизируемся немедленно при обновлении официального расписания экзаменов.",
        },
        {
          question: "Exam TimeKeeper полностью бесплатный?",
          answer:
            "Exam TimeKeeper полностью бесплатный без скрытых сборов. Мы стремимся предоставлять лучшие инструменты планирования экзаменов для студентов по всему миру.",
        },
        {
          question: "Какие стандартизированные экзамены поддерживаются?",
          answer:
            "Мы поддерживаем основные стандартизированные экзамены, включая SAT, ACT, GRE, TOEFL, GMAT, и постоянно добавляем новые типы экзаменов.",
        },
        {
          question: "Как часто обновляются данные?",
          answer:
            "Данные экзаменов автоматически обновляются каждые 30 минут, чтобы убедиться, что вы получаете самую последнюю информацию об экзаменах. Вы также можете вручную обновить страницу для получения обновлённых данных.",
        },
      ],
    },
    de: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "US Prüfungs-Countdown-Kalender",
        description:
          "US Prüfungs-Countdown-Kalender für SAT, ACT, GRE, TOEFL, GMAT. Verfolgen Sie offizielle Prüfungstermine mit Echtzeit-Countdowns und genauen Zeitplänen. Perfekt für US-Prüfungsteilnehmer und internationale Studenten.",
        about: "US Standardisierte Prüfungs-Countdown",
        aboutDescription:
          "Umfassende Countdown-Plattform für standardisierte Tests einschließlich SAT, ACT, GRE, TOEFL, GMAT",
      },
      organization: {
        description:
          "Führende Plattform für die Verwaltung von standardisierten Prüfungszeiten und Studienplanung. Spezialisiert auf US-Prüfungs-Countdowns für SAT, ACT, GRE, TOEFL, GMAT.",
        slogan: "Ihr Ultimativer US Prüfungs-Countdown-Begleiter",
      },
      faq: [
        {
          question: "Wie genau sind die Prüfungsdatumdaten?",
          answer:
            "Unsere Prüfungsdaten stammen direkt von offiziellen Quellen einschließlich College Board, ACT.org, ETS und GMAC, um 100% Genauigkeit zu gewährleisten. Wir synchronisieren sofort, wenn offizielle Prüfungspläne aktualisiert werden.",
        },
        {
          question: "Ist Exam TimeKeeper vollständig kostenlos?",
          answer:
            "Exam TimeKeeper ist vollständig kostenlos ohne versteckte Gebühren. Wir verpflichten uns, die besten Prüfungsplanungstools für Studenten weltweit bereitzustellen.",
        },
        {
          question: "Welche standardisierten Prüfungen werden unterstützt?",
          answer:
            "Wir unterstützen wichtige standardisierte Prüfungen einschließlich SAT, ACT, GRE, TOEFL, GMAT und fügen kontinuierlich neue Prüfungstypen hinzu.",
        },
        {
          question: "Wie oft werden die Daten aktualisiert?",
          answer:
            "Prüfungsdaten werden automatisch alle 30 Minuten aktualisiert, um sicherzustellen, dass Sie die neuesten Prüfungsinformationen erhalten. Sie können die Seite auch manuell aktualisieren, um aktualisierte Daten zu erhalten.",
        },
      ],
    },
    ja: {
      website: {
        name: "Exam TimeKeeper",
        alternateName: "米国試験カウントダウンカレンダー",
        description:
          "SAT、ACT、GRE、TOEFL、GMATのための米国試験カウントダウンカレンダー。公式試験日をリアルタイムカウントダウンと正確なスケジュールで追跡。米国の試験受験者和国際的な学生に最適。",
        about: "米国標準化試験カウントダウン",
        aboutDescription:
          "SAT、ACT、GRE、TOEFL、GMATを含む標準化試験のための包括的なカウントダウンプラットフォーム",
      },
      organization: {
        description:
          "標準化試験の時間管理と学習計画の専門プラットフォーム。SAT、ACT、GRE、TOEFL、GMATの米国試験カウントダウンに特化。",
        slogan: "あなたの究極の米国試験カウントダウンコンパニオン",
      },
      faq: [
        {
          question: "試験日程データの精度はどの程度ですか？",
          answer:
            "試験日程は、100%の精度を保証するために、College Board、ACT.org、ETS、GMACなどの公式ソースから直接取得しています。公式試験スケジュールが更新されると、直ちに同期します。",
        },
        {
          question: "Exam TimeKeeperは完全に無料ですか？",
          answer:
            "Exam TimeKeeperは完全に無料で、隠れた料金はありません。世界中の学生に最高の試験計画ツールを提供することをお約束します。",
        },
        {
          question: "どの標準化試験がサポートされていますか？",
          answer:
            "SAT、ACT、GRE、TOEFL、GMATを含む主要な標準化試験をサポートしており、新しい試験タイプを継続的に追加しています。",
        },
        {
          question: "データの更新頻度はどのくらいですか？",
          answer:
            "試験データは30分ごとに自動的に更新され、最新の試験情報を取得できるようにしています。ページを手動で更新して最新データを取得することもできます。",
        },
      ],
    },
  };

  const langContent = content[lang as keyof typeof content] || content.en;

  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: langContent.website.name,
      alternateName: langContent.website.alternateName,
      url: `https://exam-timekeeper.top/${lang}`,
      description: langContent.website.description,
      inLanguage: [lang, "en-US", "zh-CN"],
      isAccessibleForFree: true,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://exam-timekeeper.top/${lang}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Organization",
        name: "Exam TimeKeeper",
        url: "https://exam-timekeeper.top",
        logo: {
          "@type": "ImageObject",
          url: "https://exam-timekeeper.top/icon-192x192.png",
        },
      },
      about: {
        "@type": "Thing",
        name: langContent.website.about,
        description: langContent.website.aboutDescription,
      },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Exam TimeKeeper",
      alternateName: langContent.website.alternateName,
      url: "https://exam-timekeeper.top",
      logo: {
        "@type": "ImageObject",
        url: "https://exam-timekeeper.top/icon-192x192.png",
      },
      description: langContent.organization.description,
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@exam-timekeeper.top",
        availableLanguage: [
          "English",
          "Chinese",
          "Spanish",
          "French",
          "German",
          "Japanese",
          "Russian",
        ],
        areaServed: "Worldwide",
      },
      sameAs: ["https://github.com/SymphonyIceAttack/exam-timekeeper"],
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "10",
      },
      slogan: langContent.organization.slogan,
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: langContent.faq.map((faqItem) => ({
        "@type": "Question",
        name: faqItem.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqItem.answer,
        },
      })),
    },
  };
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as LanguageType;

  // Validate that the incoming `lang` parameter is valid
  if (!supportedLocales.includes(language)) {
    redirect("/");
  }

  // Enhanced keywords based on language
  const keywords =
    language === "en"
      ? [
          // Primary English Keywords
          "US exam countdown calendar",
          "SAT ACT GRE exam countdown",
          "standardized test countdown tracker",
          "US exam dates 2025",
          "SAT test dates countdown",
          "ACT exam calendar",
          "GRE TOEFL GMAT countdown",
          "official exam countdown",
          "US test registration deadlines",
          "international student exam tracker",

          // Long-tail Keywords
          "SAT ACT GRE TOEFL GMAT countdown calendar",
          "US standardized exam countdown tracker",
          "official test date countdown",
          "exam registration deadline tracker",
          "live exam countdown timer",
          "real-time exam calendar",
          "US exam taker countdown",
          "international student test dates",
          "official college board exam calendar",
          "ETS exam countdown tracker",

          // Feature Keywords
          "exam countdown timer",
          "live countdown tracker",
          "real-time exam dates",
          "official exam calendar",
          "test date reminder",
          "exam planning tool",
          "standardized test tracker",
          "US exam management",
          "exam deadline tracker",

          // General
          "exam, countdown, timer, SAT, ACT, GRE, TOEFL, GMAT, standardized tests, test dates",
        ]
      : [
          // Chinese Keywords
          "SAT考试时间",
          "ACT考试日期",
          "GRE考试安排",
          "TOEFL考试时间",
          "GMAT考试日期",
          "美国考试倒计时",
          "标准化考试倒计时",
          "官方考试时间",
          "考试日期提醒",
          "考试倒计时工具",
        ];

  return {
    metadataBase: new URL("https://exam-timekeeper.top"),
    title: {
      default: t("app.title", language),
      template: `${t("app.title", language)} – %s`,
    },
    description: t("app.hero.subtitle", language),
    keywords: keywords,
    authors: [
      { name: "Exam TimeKeeper Team", url: "https://exam-timekeeper.top" },
    ],
    creator: "Exam TimeKeeper",
    publisher: "Exam TimeKeeper",
    openGraph: {
      type: "website",
      locale: language === "en" ? "en_US" : "zh_CN",
      title: t("app.title", language),
      description: t("app.hero.subtitle", language),
      siteName: "Exam TimeKeeper",
      url: `https://exam-timekeeper.top/${lang}`,
      images: [
        {
          url: "/images/og-banner.jpeg",
          width: 1200,
          height: 630,
          alt: "US Exam Countdown Calendar - SAT ACT GRE TOEFL GMAT real-time tracker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("app.title", language),
      description: t("app.hero.subtitle", language),
      images: ["/images/og-banner.jpeg"],
      creator: "@examtimekeeper",
    },
    alternates: {
      canonical: `https://exam-timekeeper.top/${lang}`,
      languages: {
        en: "/",
        ...supportedLocales.reduce(
          (acc, locale) => {
            acc[locale] = `/${locale}`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "education",
    referrer: "origin-when-cross-origin",
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // Validate that the incoming `lang` parameter is valid
  if (!supportedLocales.includes(lang as LanguageType)) {
    redirect("/");
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Multi-language Schema.org structured data */}
          <JsonLd>{getSchemaData(lang).website}</JsonLd>
          <JsonLd>{getSchemaData(lang).organization}</JsonLd>
          <JsonLd>{getSchemaData(lang).faq}</JsonLd>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
