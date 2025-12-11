import type { Metadata } from "next";
import type React from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const JsonLd = ({ children }: { children: Record<string, unknown> }) => (
  <script type="application/ld+json" suppressHydrationWarning>
    {JSON.stringify(children)}
  </script>
);

export const metadata: Metadata = {
  title: {
    default: "US Exam Countdown Calendar - SAT ACT GRE TOEFL GMAT Tracker",
    template: "%s | US Exam Countdown Calendar",
  },
  description:
    "Never miss US exam deadlines again! Track SAT, ACT, GRE, TOEFL, GMAT official test dates with live countdowns. Real-time updates from College Board, ETS, and official sources. Perfect for US exam takers and international students planning standardized tests. Free countdown calendar reduces missed registration risk.",
  metadataBase: new URL("https://exam-timekeeper.top"),
  alternates: {
    canonical: "https://exam-timekeeper.top",
  },
  keywords: [
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
    "official exam countdown",
    "exam deadline tracker",

    // Competitive Keywords
    "college board SAT countdown",
    "ACT official exam dates",
    "ETS GRE TOEFL countdown",
    "GMAC GMAT exam tracker",
    "official exam information",
    "accurate exam dates",
    "live exam countdown",
    "multi-exam countdown",
    "exam schedule tracker",
    "test preparation calendar",
  ],
  authors: [
    { name: "Exam TimeKeeper Team", url: "https://exam-timekeeper.top" },
  ],
  creator: "Exam TimeKeeper",
  publisher: "Exam TimeKeeper",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "US Exam Countdown Calendar - SAT ACT GRE TOEFL GMAT Tracker",
    description:
      "Never miss US exam deadlines again! Track SAT, ACT, GRE, TOEFL, GMAT official test dates with live countdowns. Real-time updates from College Board, ETS, and official sources.",
    siteName: "Exam TimeKeeper",
    url: "https://exam-timekeeper.top",
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
    title: "US Exam Countdown Calendar - SAT ACT GRE TOEFL GMAT Tracker",
    description:
      "Never miss US exam deadlines again! Track SAT, ACT, GRE, TOEFL, GMAT official test dates with live countdowns. Perfect for US exam takers.",
    images: ["/images/og-banner.jpeg"],
    creator: "@examtimekeeper",
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
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  generator: "Exam TimeKeeper v2.0",
  applicationName: "Exam TimeKeeper",
  category: "education",
  referrer: "origin-when-cross-origin",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "/apple-icon-180x180.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icon-192x192.png",
      },
    ],
  },
};

// Schema.org structured data for English version
const getSchemaData = () => {
  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Exam TimeKeeper",
      alternateName: "US Exam Countdown Calendar",
      url: "https://exam-timekeeper.top",
      description:
        "US exam countdown calendar for SAT, ACT, GRE, TOEFL, GMAT. Track official test dates with real-time countdowns and accurate exam schedules. Perfect for US exam takers and international students.",
      inLanguage: ["en-US", "zh-CN"],
      isAccessibleForFree: true,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://exam-timekeeper.top/search?q={search_term_string}",
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
        name: "US Standardized Exam Countdown",
        description:
          "Comprehensive countdown platform for standardized tests including SAT, ACT, GRE, TOEFL, GMAT",
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
      alternateName: "US Exam Countdown Calendar",
      url: "https://exam-timekeeper.top",
      logo: {
        "@type": "ImageObject",
        url: "https://exam-timekeeper.top/icon-192x192.png",
      },
      description:
        "Leading platform for standardized exam time management and study planning. Specializing in US exam countdowns for SAT, ACT, GRE, TOEFL, GMAT.",
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
      slogan: "Your Ultimate US Exam Countdown Companion",
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate is the exam date data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our exam dates are sourced directly from official sources including College Board, ACT.org, ETS, and GMAC to ensure 100% accuracy. We sync immediately when official exam schedules are updated.",
          },
        },
        {
          "@type": "Question",
          name: "Is Exam TimeKeeper completely free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Exam TimeKeeper is completely free with no hidden fees. We are committed to providing the best exam planning tools for students worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "Which standardized exams are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We support major standardized exams including SAT, ACT, GRE, TOEFL, GMAT and continuously add new exam types.",
          },
        },
        {
          "@type": "Question",
          name: "How often is the data updated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Exam data auto-refreshes every 30 minutes to ensure you get the latest exam information. You can also manually refresh the page to get updated data.",
          },
        },
      ],
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Schema.org structured data */}
          <JsonLd>{getSchemaData().website}</JsonLd>
          <JsonLd>{getSchemaData().organization}</JsonLd>
          <JsonLd>{getSchemaData().faq}</JsonLd>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
