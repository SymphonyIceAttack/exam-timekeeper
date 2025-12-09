import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

export const metadata: Metadata = {
  title: "GRE Countdown",
  description:
    "Live countdown to the upcoming GRE exam dates. Track registration deadlines and test schedules.",
  alternates: {
    canonical: "https://exam-timekeeper.top/gre",
  },
};

export default function GrePage() {
  return <ExamDashboard lang="en" filterType="GRE" />;
}
