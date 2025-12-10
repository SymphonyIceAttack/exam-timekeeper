import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

// V2.0 SEO优化元数据
export const metadata: Metadata = {
  title: "ACT考试时间表2025 | ACT倒计时 | 官方考试日期",
  description:
    "获取最新的ACT考试时间表和倒计时。包含2025年ACT考试日期、注册截止时间、备考规划建议。来自ACT.org官方数据的准确信息。",
  keywords: [
    "ACT考试时间",
    "ACT考试日期",
    "ACT倒计时",
    "ACT 2025考试安排",
    "ACT.org",
    "ACT考试时间表",
    "ACT报名截止时间",
    "ACT备考计划",
    "美国大学入学考试",
    "ACT考试倒计时工具",
  ],
  alternates: {
    canonical: "https://exam-timekeeper.top/act",
  },
  openGraph: {
    title: "ACT考试时间表2025 | ACT倒计时 | 官方考试日期",
    description:
      "获取最新的ACT考试时间表和倒计时。包含2025年ACT考试日期、注册截止时间、备考规划建议。来自ACT.org官方数据。",
    url: "https://exam-timekeeper.top/act",
    type: "article",
    publishedTime: "2024-01-01T00:00:00Z",
    authors: ["Exam TimeKeeper"],
    section: "标准化考试",
    tags: ["ACT", "标准化考试", "倒计时", "考试时间表", "备考"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACT考试时间表2025 | ACT倒计时 | 官方考试日期",
    description:
      "获取最新的ACT考试时间表和倒计时。包含2025年ACT考试日期、注册截止时间、备考规划建议。",
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

export default function ActPage() {
  return <ExamDashboard lang="en" filterType="ACT" />;
}
