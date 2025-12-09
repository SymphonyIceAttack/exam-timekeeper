import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

export const metadata: Metadata = {
  title: "SAT Countdown",
  description:
    "Live countdown to the upcoming SAT exam dates. Track registration deadlines and test schedules.",
  alternates: {
    canonical: "https://exam-timekeeper.top/sat",
  },
};

export default function SatPage() {
  return <ExamDashboard lang="en" filterType="SAT" />;
}
