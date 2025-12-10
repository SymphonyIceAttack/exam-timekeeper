import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

// V2.0 SEO优化元数据
export const metadata: Metadata = {
  title: "GMAT考试时间表2025 | GMAT倒计时 | 商学院入学考试",
  description:
    "获取最新的GMAT考试时间表和倒计时。包含2025年GMAT考试日期、注册截止时间、备考规划建议。来自GMAC官方数据的准确信息。",
  keywords: [
    "GMAT考试时间",
    "GMAT考试日期",
    "GMAT倒计时",
    "GMAT 2025考试安排",
    "GMAC GMAT",
    "GMAT考试时间表",
    "GMAT报名截止时间",
    "GMAT备考计划",
    "商学院入学考试",
    "GMAT考试倒计时工具",
  ],
  alternates: {
    canonical: "https://exam-timekeeper.top/gmat",
  },
  openGraph: {
    title: "GMAT考试时间表2025 | GMAT倒计时 | 商学院入学考试",
    description:
      "获取最新的GMAT考试时间表和倒计时。包含2025年GMAT考试日期、注册截止时间、备考规划建议。来自GMAC官方数据。",
    url: "https://exam-timekeeper.top/gmat",
    type: "article",
    publishedTime: "2024-01-01T00:00:00Z",
    authors: ["Exam TimeKeeper"],
    section: "商学院考试",
    tags: ["GMAT", "商学院考试", "倒计时", "考试时间表", "备考"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMAT考试时间表2025 | GMAT倒计时 | 商学院入学考试",
    description:
      "获取最新的GMAT考试时间表和倒计时。包含2025年GMAT考试日期、注册截止时间、备考规划建议。",
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
};

export default function GmatPage() {
  return <ExamDashboard lang="en" filterType="GMAT" />;
}
