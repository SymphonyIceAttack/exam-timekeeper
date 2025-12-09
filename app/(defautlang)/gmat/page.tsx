import type { Metadata } from "next";
import { ExamDashboard } from "@/components/exam-dashboard";

export const metadata: Metadata = {
  title: "GMAT Countdown",
  description:
    "Live countdown to the upcoming GMAT exam dates. Track registration deadlines and test schedules.",
  alternates: {
    canonical: "https://exam-timekeeper.top/gmat",
  },
};

export default function GmatPage() {
  return <ExamDashboard lang="en" filterType="GMAT" />;
}
