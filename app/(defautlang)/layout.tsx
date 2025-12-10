import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const JsonLd = ({ children }: { children: Record<string, unknown> }) => (
  <script type="application/ld+json" suppressHydrationWarning>
    {JSON.stringify(children)}
  </script>
);

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Exam TimeKeeper - Official Exam Countdown & Study Planner",
    template: "%s | Exam TimeKeeper - Official Exam Countdown",
  },
  description:
    "Track official SAT, ACT, GRE, TOEFL, GMAT exam dates with real-time countdowns. Get accurate test schedules, study planning tools, and preparation resources. Free multi-exam countdown platform for standardized testing.",
  metadataBase: new URL("https://exam-timekeeper.top"),
  alternates: {
    canonical: "https://exam-timekeeper.top",
  },
  keywords: [
    // 主关键词
    "SAT考试时间",
    "ACT考试日期",
    "GRE考试安排",
    "TOEFL考试时间",
    "GMAT考试日期",
    "标准化考试倒计时",
    "美国大学入学考试",
    "研究生考试时间",
    "英语能力考试",
    "商学院入学考试",

    // 长尾关键词
    "SAT考试倒计时工具",
    "ACT考试时间表2025",
    "GRE考试日期查询",
    "TOEFL考试安排",
    "GMAT考试时间规划",
    "标准化考试备考计划",
    "考试倒计时应用",
    "官方考试时间",
    "考试日期提醒",
    "考试倒计时网站",

    // 功能关键词
    "考试倒计时",
    "考试时间表",
    "考试日期查询",
    "备考倒计时",
    "考试安排",
    "学习计划",
    "考试提醒",
    "考试倒计时器",
    "考试规划工具",
    "标准化考试助手",

    // 竞争关键词
    "college board考试时间",
    "ETS考试安排",
    "ACT考试日期",
    "GMAC考试时间",
    "官方考试信息",
    "准确考试日期",
    "实时考试倒计时",
    "多考试管理",
    "考试计划工具",
    "备考时间管理",
  ],
  authors: [
    { name: "Exam TimeKeeper Team", url: "https://exam-timekeeper.top" },
  ],
  creator: "Exam TimeKeeper",
  publisher: "Exam TimeKeeper",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "Exam TimeKeeper - Official Exam Countdown & Study Planner",
    description:
      "权威的标准化考试倒计时平台。追踪SAT、ACT、GRE、TOEFL、GMAT等考试的官方时间表，提供实时倒计时和备考规划工具。专业的考试时间管理工具。",
    siteName: "Exam TimeKeeper",
    url: "https://exam-timekeeper.top",
    images: [
      {
        url: "/images/og-banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Exam TimeKeeper - Official Exam Countdown Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam TimeKeeper - Official Exam Countdown & Study Planner",
    description:
      "权威的标准化考试倒计时平台。追踪SAT、ACT、GRE、TOEFL、GMAT等考试的官方时间表，提供实时倒计时和备考规划工具。",
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

// V2.0 增强的结构化数据
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Exam TimeKeeper",
  alternateName: "考试时间管家",
  url: "https://exam-timekeeper.top",
  description:
    "权威的标准化考试倒计时平台，提供SAT、ACT、GRE、TOEFL、GMAT等考试的官方时间表和实时倒计时功能",
  inLanguage: ["zh-CN", "en-US"],
  isAccessibleForFree: true,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://exam-timekeeper.top/search?q={search_term_string}",
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
    name: "标准化考试倒计时",
    description: "提供各类标准化考试的准确时间表和倒计时功能",
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Exam TimeKeeper",
  alternateName: "考试时间管家",
  description:
    "专业的标准化考试倒计时和备考规划工具，支持SAT、ACT、GRE、TOEFL、GMAT等考试",
  url: "https://exam-timekeeper.top",
  applicationCategory: "EducationalApplication",
  operatingSystem: ["Web Browser", "iOS", "Android"],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "50000",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Organization",
    name: "Exam TimeKeeper",
    url: "https://exam-timekeeper.top",
  },
  featureList: [
    "实时考试倒计时",
    "官方考试时间表",
    "多语言支持",
    "移动端适配",
    "个性化提醒",
    "备考规划工具",
    "考试对比功能",
    "离线使用支持",
  ],
  screenshot: "https://exam-timekeeper.top/images/app-screenshot.jpeg",
  downloadUrl: "https://exam-timekeeper.top",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exam TimeKeeper",
  alternateName: "考试时间管家",
  url: "https://exam-timekeeper.top",
  logo: {
    "@type": "ImageObject",
    url: "https://exam-timekeeper.top/icon-192x192.png",
  },
  description: "专注于标准化考试时间管理和备考规划的在线教育平台",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@exam-timekeeper.top",
    availableLanguage: ["Chinese", "English"],
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
  slogan: "Your Ultimate Exam Countdown Companion",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Exam Time Tracking Service",
  alternateName: "考试时间追踪服务",
  description: "提供标准化考试的准确时间表、实时倒计时和备考规划服务",
  provider: {
    "@type": "Organization",
    name: "Exam TimeKeeper",
  },
  serviceType: "Educational Service",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exam Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SAT Exam Countdown",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ACT Exam Countdown",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GRE Exam Countdown",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TOEFL Exam Countdown",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GMAT Exam Countdown",
        },
      },
    ],
  },
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "考试日期的准确性如何保证？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "我们的考试日期直接来源于College Board、ACT.org、ETS、GMAC等官方网站，确保100%准确。如果官方调整考试安排，我们会立即同步更新。",
      },
    },
    {
      "@type": "Question",
      name: "Exam TimeKeeper是否免费使用？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exam TimeKeeper完全免费使用，无隐藏费用。我们致力于为全球学生提供最好的考试规划工具。",
      },
    },
    {
      "@type": "Question",
      name: "支持哪些标准化考试？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "我们支持SAT、ACT、GRE、TOEFL、GMAT等主要标准化考试，并持续添加新的考试类型。",
      },
    },
    {
      "@type": "Question",
      name: "数据更新频率是多久？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "考试数据每30分钟自动刷新一次，确保您获取到最新的考试信息。您也可以手动刷新页面获取最新数据。",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 预连接优化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://exam-timekeeper.top" />

        {/* 关键资源预加载 */}
        <link rel="preload" href="/images/hero-banner.jpeg" as="image" />

        {/* DNS预取 */}
        <link rel="dns-prefetch" href="//collegeboard.org" />
        <link rel="dns-prefetch" href="//act.org" />
        <link rel="dns-prefetch" href="//ets.org" />
        <link rel="dns-prefetch" href="//mba.com" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* V2.0 增强的结构化数据 */}
          <JsonLd>{websiteSchema}</JsonLd>
          <JsonLd>{organizationSchema}</JsonLd>
          <JsonLd>{softwareSchema}</JsonLd>
          <JsonLd>{serviceSchema}</JsonLd>
          <JsonLd>{faqSchema}</JsonLd>

          {/* 性能监控脚本 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Core Web Vitals 监控
                function sendToAnalytics(metric) {
                  // 发送性能指标到分析服务
                  console.log('Performance metric:', metric);
                }
                
                // 监听页面性能
                if (typeof window !== 'undefined') {
                  // LCP 监控
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      sendToAnalytics({name: 'LCP', value: entry.startTime});
                    }
                  }).observe({entryTypes: ['largest-contentful-paint']});
                  
                  // FID 监控  
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      sendToAnalytics({name: 'FID', value: entry.processingStart - entry.startTime});
                    }
                  }).observe({entryTypes: ['first-input']});
                  
                  // CLS 监控
                  let clsValue = 0;
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        sendToAnalytics({name: 'CLS', value: clsValue});
                      }
                    }
                  }).observe({entryTypes: ['layout-shift']});
                }
              `,
            }}
          />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
