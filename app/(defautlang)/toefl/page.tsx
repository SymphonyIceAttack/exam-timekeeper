import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

export const metadata: Metadata = {
  title: "TOEFL Countdown",
  description:
    "Live countdown to the upcoming TOEFL exam dates. Track registration deadlines and test schedules.",
  alternates: {
    canonical: "https://exam-timekeeper.top/toefl",
  },
};

export default function ToeflPage() {
  return <ExamDashboard lang="en" filterType="TOEFL" />;
}
