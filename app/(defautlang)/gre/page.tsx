import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

// V2.0 SEO优化元数据
export const metadata: Metadata = {
  title: "GRE考试时间表2025 | GRE倒计时 | 研究生入学考试",
  description:
    "获取最新的GRE考试时间表和倒计时。包含2025年GRE考试日期、注册截止时间、备考规划建议。来自ETS官方数据的准确信息。",
  keywords: [
    "GRE考试时间",
    "GRE考试日期",
    "GRE倒计时",
    "GRE 2025考试安排",
    "ETS GRE",
    "GRE考试时间表",
    "GRE报名截止时间",
    "GRE备考计划",
    "研究生入学考试",
    "GRE考试倒计时工具",
  ],
  alternates: {
    canonical: "https://exam-timekeeper.top/gre",
  },
  openGraph: {
    title: "GRE考试时间表2025 | GRE倒计时 | 研究生入学考试",
    description:
      "获取最新的GRE考试时间表和倒计时。包含2025年GRE考试日期、注册截止时间、备考规划建议。来自ETS官方数据。",
    url: "https://exam-timekeeper.top/gre",
    type: "article",
    publishedTime: "2024-01-01T00:00:00Z",
    authors: ["Exam TimeKeeper"],
    section: "研究生考试",
    tags: ["GRE", "研究生考试", "倒计时", "考试时间表", "备考"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRE考试时间表2025 | GRE倒计时 | 研究生入学考试",
    description:
      "获取最新的GRE考试时间表和倒计时。包含2025年GRE考试日期、注册截止时间、备考规划建议。",
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

export default function GrePage() {
  return <ExamDashboard lang="en" filterType="GRE" />;
}
