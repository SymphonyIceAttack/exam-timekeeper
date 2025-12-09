import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

export const metadata: Metadata = {
  title: "ACT Countdown",
  description:
    "Live countdown to the upcoming ACT exam dates. Track registration deadlines and test schedules.",
  alternates: {
    canonical: "https://exam-timekeeper.top/act",
  },
};

export default function ActPage() {
  return <ExamDashboard lang="en" filterType="ACT" />;
}
