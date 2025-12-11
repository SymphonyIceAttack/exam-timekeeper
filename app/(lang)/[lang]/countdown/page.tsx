import type { Metadata } from "next";

import CountdownClient from "@/components/countdown-client";

interface Props {
  params: { lang: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  // Define metadata for different languages
  const metadataMap: Record<string, { title: string; description: string }> = {
    en: {
      title: "Personalized Countdown - Exam TimeKeeper",
      description:
        "Create custom countdowns for birthdays, exams, or any special date. Track time with personalized events, export to calendar, and set browser notifications.",
    },
    zh: {
      title: "个性化倒计时 - 考试时间管理器",
      description:
        "为生日、考试或任何特殊日期创建自定义倒计时。通过个性化事件跟踪时间，导出到日历，并设置浏览器通知。",
    },
    fr: {
      title: "Compte à Rebours Personnalisé - Exam TimeKeeper",
      description:
        "Créez des compteurs à rebours personnalisés pour les anniversaires, les examens ou toute date spéciale. Suivez le temps avec des événements personnalisés, exportez vers le calendrier et définissez des notifications de navigateur.",
    },
    es: {
      title: "Cuenta Regresiva Personalizada - Exam TimeKeeper",
      description:
        "Crea cuentas regresivas personalizadas para cumpleaños, exámenes o cualquier fecha especial. Rastrea el tiempo con eventos personalizados, exporta al calendario y configura notificaciones del navegador.",
    },
    ru: {
      title: "Персонализированный Таймер Обратного Отсчета - Exam TimeKeeper",
      description:
        "Создавайте персонализированные таймеры обратного отсчета для дней рождения, экзаменов или любых особых дат. Отслеживайте время с персонализированными событиями, экспортируйте в календарь и настраивайте уведомления браузера.",
    },
    de: {
      title: "Personalisierter Countdown - Exam TimeKeeper",
      description:
        "Erstellen Sie benutzerdefinierte Countdowns für Geburtstage, Prüfungen oder beliebige besondere Daten. Verfolgen Sie die Zeit mit personalisierten Ereignissen, exportieren Sie in den Kalender und legen Sie Browser-Benachrichtigungen fest.",
    },
    ja: {
      title: "パーソナライズドカウントダウン - Exam TimeKeeper",
      description:
        "誕生日、考试、または特別な日付用にカスタムカウントダウンを作成します。パーソナライズドイベントで時間を追跡し、カレンダーにエクスポートし、ブラウザ通知を設定します。",
    },
  };

  const locale = metadataMap[lang] || metadataMap.en;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://examtimekeeper.com";

  return {
    title: locale.title,
    description: locale.description,
    keywords:
      lang === "zh"
        ? "倒计时器,个性化倒计时,考试倒计时,生日倒计时,事件倒计时,时间跟踪,日历导出,浏览器通知"
        : lang === "fr"
          ? "minuteur, compte à rebours personnalisé, compte à rebours d'examen, compte à rebours d'anniversaire, suivi du temps, export de calendrier, notification de navigateur"
          : lang === "es"
            ? "temporizador, cuenta regresiva personalizada, cuenta regresiva de examen, cuenta regresiva de cumpleaños, seguimiento de tiempo, exportación de calendario, notificación de navegador"
            : lang === "ru"
              ? "таймер, персонализированный обратный отсчет, обратный отсчет экзамена, обратный отсчет дня рождения, отслеживание времени, экспорт календаря, уведомление браузера"
              : lang === "de"
                ? "Timer, personalisierter Countdown, Prüfungs-Countdown, Geburtstag-Countdown, Zeiterfassung, Kalender-Export, Browser-Benachrichtigung"
                : lang === "ja"
                  ? "タイマー,パーソナライズドカウントダウン,試験カウントダウン,誕生日カウントダウン,時間追跡,カレンダーエクスポート,ブラウザ通知"
                  : "countdown timer, personalized countdown, exam countdown, birthday countdown, event countdown, time tracking, calendar export, browser notifications",
    authors: [{ name: "Exam TimeKeeper" }],
    creator: "Exam TimeKeeper",
    publisher: "Exam TimeKeeper",
    openGraph: {
      title: locale.title,
      description: locale.description,
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      siteName: "Exam TimeKeeper",
      url: `${baseUrl}/${lang}/countdown`,
    },
    twitter: {
      card: "summary_large_image",
      title: locale.title,
      description: locale.description,
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
    alternates: {
      canonical: `/${lang}/countdown`,
      languages: {
        "en-US": "/countdown",
        "zh-CN": "/zh/countdown",
        "fr-FR": "/fr/countdown",
        "es-ES": "/es/countdown",
        "ru-RU": "/ru/countdown",
        "de-DE": "/de/countdown",
        "ja-JP": "/ja/countdown",
      },
    },
  };
}

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I create a personalized countdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the 'Add Event' button, enter your event title, select the date and time, and click 'Add Event'. Your countdown will start immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export my countdown events to calendar apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Click the download button next to any event to export it as an iCal (.ics) file that can be imported into Google Calendar, Apple Calendar, or other calendar applications.",
      },
    },
    {
      "@type": "Question",
      name: "How do browser notifications work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the bell icon next to an event to set up browser notifications. You'll receive a reminder one day before your event. Make sure to allow notifications in your browser settings.",
      },
    },
    {
      "@type": "Question",
      name: "Where are my countdown events stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your events are stored locally in your browser using localStorage. They will persist until you clear your browser data or switch devices.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my countdown with others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Click the share button next to any event to copy a link that others can use to view your countdown.",
      },
    },
  ],
};

export default async function PersonalizedCountdownPage({ params }: Props) {
  const { lang } = await params;

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CountdownClient language={lang} />
    </>
  );
}
