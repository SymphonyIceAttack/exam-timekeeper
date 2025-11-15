import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
