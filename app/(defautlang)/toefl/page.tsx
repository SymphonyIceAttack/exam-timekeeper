import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

// V2.0 SEO优化元数据
export const metadata: Metadata = {
  title: "TOEFL考试时间表2025 | TOEFL倒计时 | 英语能力测试",
  description:
    "获取最新的TOEFL考试时间表和倒计时。包含2025年TOEFL考试日期、注册截止时间、备考规划建议。来自ETS官方数据的准确信息。",
  keywords: [
    "TOEFL考试时间",
    "TOEFL考试日期",
    "TOEFL倒计时",
    "TOEFL 2025考试安排",
    "ETS TOEFL",
    "TOEFL考试时间表",
    "TOEFL报名截止时间",
    "TOEFL备考计划",
    "英语能力测试",
    "TOEFL考试倒计时工具",
  ],
  alternates: {
    canonical: "https://exam-timekeeper.top/toefl",
  },
  openGraph: {
    title: "TOEFL考试时间表2025 | TOEFL倒计时 | 英语能力测试",
    description:
      "获取最新的TOEFL考试时间表和倒计时。包含2025年TOEFL考试日期、注册截止时间、备考规划建议。来自ETS官方数据。",
    url: "https://exam-timekeeper.top/toefl",
    type: "article",
    publishedTime: "2024-01-01T00:00:00Z",
    authors: ["Exam TimeKeeper"],
    section: "英语考试",
    tags: ["TOEFL", "英语考试", "倒计时", "考试时间表", "备考"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOEFL考试时间表2025 | TOEFL倒计时 | 英语能力测试",
    description:
      "获取最新的TOEFL考试时间表和倒计时。包含2025年TOEFL考试日期、注册截止时间、备考规划建议。",
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

export default function ToeflPage() {
  return <ExamDashboard lang="en" filterType="TOEFL" />;
}
