import type { Metadata } from "next";

import CountdownClient from "@/components/countdown-client";

export const metadata: Metadata = {
  title: "Personalized Countdown - Exam TimeKeeper",
  description:
    "Create custom countdowns for birthdays, exams, or any special date. Track time with personalized events, export to calendar, and set browser notifications.",
  keywords:
    "countdown timer, personalized countdown, exam countdown, birthday countdown, event countdown, time tracking, calendar export, browser notifications",
  authors: [{ name: "Exam TimeKeeper" }],
  creator: "Exam TimeKeeper",
  publisher: "Exam TimeKeeper",
  openGraph: {
    title: "Personalized Countdown - Exam TimeKeeper",
    description:
      "Create custom countdowns for birthdays, exams, or any special date. Track time with personalized events, export to calendar, and set browser notifications.",
    type: "website",
    locale: "en_US",
    siteName: "Exam TimeKeeper",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personalized Countdown - Exam TimeKeeper",
    description:
      "Create custom countdowns for birthdays, exams, or any special date. Track time with personalized events, export to calendar, and set browser notifications.",
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
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "/countdown",
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

export default function PersonalizedCountdownPage() {
  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CountdownClient language="en" />
    </>
  );
}
