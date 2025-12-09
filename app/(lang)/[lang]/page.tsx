"use client";

import { useParams } from "next/navigation";
import { ExamDashboard } from "@/components/exam-dashboard";
import type { LanguageType } from "@/lib/translations";

export default function TimeKeeperPage() {
  const params = useParams();
  const lang = params.lang as LanguageType;
  return <ExamDashboard lang={lang} />;
}
