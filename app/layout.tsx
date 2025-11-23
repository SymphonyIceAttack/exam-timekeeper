import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const JsonLd = ({ children }: { children: Record<string, unknown> }) => (
  <script type="application/ld+json" suppressHydrationWarning>
    {JSON.stringify(children)}
  </script>
);

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exam TimeKeeper - US Exam Countdown Calendar",
  description:
    "Track important US exam dates with live countdown timers for SAT, ACT, GRE, TOEFL, GMAT and more. Real-time data from official sources.",
  metadataBase: new URL("https://exam-timekeeper.top"),
  keywords: [
    "exam countdown",
    "SAT dates",
    "ACT schedule",
    "GRE calendar",
    "TOEFL dates",
    "GMAT schedule",
    "exam timer",
    "test countdown",
  ],
  authors: [{ name: "Exam TimeKeeper" }],
  creator: "Exam TimeKeeper",
  publisher: "Exam TimeKeeper",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Exam TimeKeeper - US Exam Countdown Calendar",
    description:
      "Track important US exam dates with live countdown timers for SAT, ACT, GRE, TOEFL, GMAT and more.",
    siteName: "Exam TimeKeeper",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam TimeKeeper - US Exam Countdown Calendar",
    description:
      "Track important US exam dates with live countdown timers for SAT, ACT, GRE, TOEFL, GMAT and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "Exam TimeKeeper",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Exam TimeKeeper",
  description:
    "Track important US exam dates with live countdown timers for SAT, ACT, GRE, TOEFL, GMAT and more. Real-time data from official sources.",
  url: "https://exam-timekeeper.top",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://exam-timekeeper.top/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Exam TimeKeeper",
    url: "https://exam-timekeeper.top",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exam TimeKeeper",
  url: "https://exam-timekeeper.top",
  description:
    "Educational platform providing countdown timers and date tracking for US standardized exams.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@exam-timekeeper.top",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <JsonLd>{websiteSchema}</JsonLd>
          <JsonLd>{organizationSchema}</JsonLd>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
