"use client";

import {
  BookOpen,
  Brain,
  ChevronDown,
  HelpCircle,
  Info,
  Maximize2,
  Minimize2,
  Plus,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AddExamDialog } from "@/components/add-exam-dialog";
import { FocusMode } from "@/components/focus-mode";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NewUserTutorial } from "@/components/new-user-tutorial";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";

interface Exam {
  id: string;
  name: string;
  date: Date;
  favorite: boolean;
  color: string;
  source?: string;
}

interface ExamApiResponse {
  exams: Array<{
    name: string;
    date: string;
    source: string;
    category: string;
  }>;
  lastUpdated: string;
  sources: string[];
}

interface ExamDashboardProps {
  lang: LanguageType;
  filterType?: string; // e.g., "sat", "act"
}

export function ExamDashboard({ lang, filterType }: ExamDashboardProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isClockOnly, setIsClockOnly] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [examFilter, setExamFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("compact");
  const clockRef = useRef<HTMLDivElement>(null);

  const fetchLiveExams = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/exams/fetch-live");
      const data: ExamApiResponse = await response.json();

      if (data.exams) {
        let formattedExams = data.exams
          .slice(0, 20)
          .map((exam, index: number) => ({
            id: `live-${index}`,
            name: exam.name,
            date: new Date(exam.date),
            favorite: false,
            color: ["rose", "cyan", "orange", "purple", "green", "blue"][
              index % 6
            ] as string,
            source: exam.source,
          }));

        // Initial filtering for selecting default exam
        if (filterType) {
          // We keep all exams in state but maybe sort or filter for display?
          // The user requested independent pages.
          // If I am on /sat, I probably only want to see SAT exams, or at least SAT exams first.
          // Let's filter the MAIN list if filterType is present.
          formattedExams = formattedExams.filter((e) =>
            e.name.toLowerCase().includes(filterType.toLowerCase()),
          );
        }

        setExams(formattedExams);
        setLastUpdated(
          new Date(data.lastUpdated).toLocaleString(
            lang === "en" ? "en-US" : lang,
          ),
        );

        if (formattedExams.length > 0 && !selectedExam) {
          setSelectedExam(formattedExams[0]);
        }
      }
    } catch (error) {
      console.error("[symphoneiceattack] Failed to fetch live exams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveExams();
    const refreshInterval = setInterval(fetchLiveExams, 30 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [filterType, lang]);

  // Check if user has seen tutorial
  useEffect(() => {
    const hasSeenTutorialBefore = localStorage.getItem(
      "exam-timekeeper-tutorial-seen",
    );
    if (!hasSeenTutorialBefore) {
      // Show tutorial after a short delay for better UX
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 2000); // Increased delay for better visibility
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem("exam-timekeeper-tutorial-seen", "true");
    setShowTutorial(false);
  };

  const calculateCountdown = (targetDate: Date) => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const checkExpiredExams = () => {
      const now = new Date();
      const activeExams = exams.filter((exam) => exam.date > now);

      if (activeExams.length !== exams.length) {
        setExams(activeExams);

        if (selectedExam && selectedExam.date <= now) {
          setSelectedExam(activeExams.length > 0 ? activeExams[0] : null);
        }
      }
    };

    const interval = setInterval(checkExpiredExams, 60000);
    return () => clearInterval(interval);
  }, [exams, selectedExam]);

  useEffect(() => {
    if (!selectedExam) return;

    const timer = setInterval(() => {
      setCountdown(calculateCountdown(selectedExam.date));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedExam]);

  const toggleFavorite = (id: string) => {
    setExams(
      exams.map((exam) =>
        exam.id === id ? { ...exam, favorite: !exam.favorite } : exam,
      ),
    );
  };

  const addExam = (exam: Omit<Exam, "id">) => {
    const newExam = {
      ...exam,
      id: `custom-${Date.now()}`,
    };
    setExams([...exams, newExam]);
    if (!selectedExam) {
      setSelectedExam(newExam);
    }
  };

  const getColorClass = (color: string) => {
    const colors = {
      rose: "text-rose-400",
      cyan: "text-cyan-400",
      orange: "text-orange-400",
      purple: "text-purple-400",
      green: "text-green-400",
      blue: "text-blue-400",
    };
    return colors[color as keyof typeof colors] || "text-rose-400";
  };

  const filteredExams = exams.filter((exam) => {
    // Filter by favorites if enabled
    if (showFavorites && !exam.favorite) return false;

    // Filter by exam type
    if (examFilter !== "all") {
      const examType = exam.name.toLowerCase();
      switch (examFilter) {
        case "sat":
          if (!examType.includes("sat")) return false;
          break;
        case "act":
          if (!examType.includes("act")) return false;
          break;
        case "gre":
          if (!examType.includes("gre")) return false;
          break;
        case "toefl":
          if (!examType.includes("toefl")) return false;
          break;
        case "gmat":
          if (!examType.includes("gmat")) return false;
          break;
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (
        !exam.name.toLowerCase().includes(query) &&
        !exam.source?.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });

  const examTypes = ["SAT", "ACT", "GRE", "TOEFL", "GMAT"];

  const getLink = (path: string) => {
    return lang === "en" ? path : `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {!isClockOnly && (
        <header className="border-b border-border px-2 md:px-6 py-2 md:py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <Link href={getLink("/")} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold cursor-pointer leading-tight">
                      <span className="block">
                        <span className="block sm:inline">Exam TimeKeeper</span>
                        {!filterType && (
                          <span className="block sm:inline sm:ml-2 text-primary">
                            – US Exam Calendar
                          </span>
                        )}
                      </span>
                      {filterType && (
                        <span className="text-primary block sm:inline sm:ml-2 mt-1 sm:mt-0">
                          – {filterType.toUpperCase()}
                        </span>
                      )}
                    </h1>
                  </div>
                </Link>
                {lastUpdated && (
                  <p className="text-xs mt-1 text-muted-foreground">
                    {t("common.lastUpdated", lang)} {lastUpdated}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-6">
              {/* Exam Navigation */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs md:text-sm transition-colors flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground hover:bg-accent px-2 md:px-3 h-8 md:h-9"
                  >
                    <span className="hidden sm:inline">Exams</span>
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={getLink("/")} className="w-full cursor-pointer">
                      All Exams
                    </Link>
                  </DropdownMenuItem>
                  {examTypes.map((type) => (
                    <DropdownMenuItem key={type} asChild>
                      <Link
                        href={getLink(`/${type.toLowerCase()}`)}
                        className="w-full cursor-pointer"
                      >
                        {type}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={getLink("/posts")} scroll={false}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm transition-colors flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground hover:bg-accent px-2 md:px-3 h-8 md:h-9"
                >
                  <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">
                    {t("nav.posts", lang)}
                  </span>
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setShowFavorites(!showFavorites)}
                className={`text-xs md:text-sm transition-colors flex items-center gap-1 ${showFavorites ? "text-yellow-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Star
                  className={`w-5 h-5 md:w-4 md:h-4 ${showFavorites ? "fill-current" : ""}`}
                />
                <span className="hidden sm:inline">
                  {t("button.favorites", lang)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowCustom(!showCustom)}
                className={`text-xs md:text-sm transition-colors hidden sm:block ${showCustom ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t("button.custom", lang)}
              </button>
              <button
                type="button"
                onClick={() => setShowTutorial(true)}
                className="text-xs md:text-sm transition-colors hidden sm:flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-accent px-2 md:px-3 h-8 md:h-9"
                title="Help & Tutorial"
              >
                <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Help</span>
              </button>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        {/* V2.0 SEO优化落地页结构 */}
        {filterType && !isClockOnly && !isFocusMode && (
          <div className="mb-8 md:mb-12">
            {/* SEO优化主标题 */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
              {filterType === "SAT" && t("sat.page.h1", lang)}
              {filterType === "ACT" && t("act.page.h1", lang)}
              {filterType === "GRE" && t("gre.page.h1", lang)}
              {filterType === "TOEFL" && t("toefl.page.h1", lang)}
              {filterType === "GMAT" && t("gmat.page.h1", lang)}
            </h1>

            {/* V2.0 高度整合内容区域 */}
            <div className="grid gap-8 md:gap-12 mb-12 md:mb-16">
              {/* 考试时间表 - SEO优化内容 */}
              <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-primary flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  {filterType === "SAT" && "SAT考试时间表与重要日期"}
                  {filterType === "ACT" && "ACT考试时间表与重要日期"}
                  {filterType === "GRE" && "GRE考试时间表与重要日期"}
                  {filterType === "TOEFL" && "TOEFL考试时间表与重要日期"}
                  {filterType === "GMAT" && "GMAT考试时间表与重要日期"}
                </h2>
                <div className="prose prose-sm md:prose-base text-muted-foreground">
                  {filterType === "SAT" && (
                    <div>
                      <p className="mb-4">
                        SAT考试是申请美国大学的重要标准化考试。我们提供最新的SAT考试时间表，帮助您合理规划备考进度。
                      </p>
                      <ul className="space-y-2">
                        <li>
                          • <strong>2025年3月考试：</strong>3月8日 -
                          建议提前2-3个月开始备考
                        </li>
                        <li>
                          • <strong>2025年5月考试：</strong>5月3日 -
                          春季考试季，热门报名时段
                        </li>
                        <li>
                          • <strong>2025年6月考试：</strong>6月7日 -
                          夏季前最后机会
                        </li>
                        <li>
                          • <strong>2025年8月考试：</strong>8月23日 -
                          暑期集中备考
                        </li>
                        <li>
                          • <strong>2025年10月考试：</strong>10月4日 -
                          秋季考试高峰
                        </li>
                        <li>
                          • <strong>2025年11月考试：</strong>11月8日 -
                          ED申请前最后机会
                        </li>
                        <li>
                          • <strong>2025年12月考试：</strong>12月6日 -
                          RD申请季重要考试
                        </li>
                      </ul>
                    </div>
                  )}
                  {filterType === "ACT" && (
                    <div>
                      <p className="mb-4">
                        ACT考试是美国大学认可的另一种标准化考试形式，涵盖英语、数学、阅读、科学和写作五个部分。
                      </p>
                      <ul className="space-y-2">
                        <li>
                          • <strong>2025年2月考试：</strong>2月8日 -
                          年初考试，为春季申请做准备
                        </li>
                        <li>
                          • <strong>2025年4月考试：</strong>4月5日 -
                          春季考试，避开SAT高峰期
                        </li>
                        <li>
                          • <strong>2025年6月考试：</strong>6月14日 -
                          夏季考试，学生时间充裕
                        </li>
                        <li>
                          • <strong>2025年7月考试：</strong>7月12日 -
                          夏季考试，适合暑期备考
                        </li>
                        <li>
                          • <strong>2025年9月考试：</strong>9月6日 -
                          秋季考试开始
                        </li>
                        <li>
                          • <strong>2025年10月考试：</strong>10月18日 -
                          申请季重要考试
                        </li>
                        <li>
                          • <strong>2025年12月考试：</strong>12月13日 -
                          年末最后考试机会
                        </li>
                      </ul>
                    </div>
                  )}
                  {filterType === "GRE" && (
                    <div>
                      <p className="mb-4">
                        GRE考试是申请研究生院的重要考试，包括语文、数学和写作三个部分，全年多次考试机会。
                      </p>
                      <ul className="space-y-2">
                        <li>
                          • <strong>全年考试：</strong>GRE每月提供多次考试机会
                        </li>
                        <li>
                          • <strong>灵活安排：</strong>
                          可根据个人准备情况选择最佳考试时间
                        </li>
                        <li>
                          • <strong>成绩有效期：</strong>5年内有效，适合提前规划
                        </li>
                        <li>
                          • <strong>重考政策：</strong>21天内可重考一次
                        </li>
                      </ul>
                    </div>
                  )}
                  {filterType === "TOEFL" && (
                    <div>
                      <p className="mb-4">
                        TOEFL考试是评估非英语母语者英语能力的标准化考试，是申请英语授课项目的重要要求。
                      </p>
                      <ul className="space-y-2">
                        <li>
                          • <strong>全年考试：</strong>TOEFL iBT每周多次考试机会
                        </li>
                        <li>
                          • <strong>快速出分：</strong>考试后6-10天即可获得成绩
                        </li>
                        <li>
                          • <strong>成绩有效期：</strong>2年内有效
                        </li>
                        <li>
                          • <strong>灵活安排：</strong>可随时报名参加考试
                        </li>
                      </ul>
                    </div>
                  )}
                  {filterType === "GMAT" && (
                    <div>
                      <p className="mb-4">
                        GMAT考试是申请商学院的重要考试，评估学生的逻辑推理、数学和语言能力。
                      </p>
                      <ul className="space-y-2">
                        <li>
                          • <strong>全年考试：</strong>GMAT每月提供多次考试机会
                        </li>
                        <li>
                          • <strong>成绩有效期：</strong>5年内有效
                        </li>
                        <li>
                          • <strong>重考政策：</strong>16天内可重考一次
                        </li>
                        <li>
                          • <strong>最佳时间：</strong>建议在申请前6个月参加考试
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* 使用指南 - 工具功能整合 */}
              <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-primary flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  {filterType === "SAT" && "如何使用SAT考试倒计时工具"}
                  {filterType === "ACT" && "如何使用ACT考试倒计时工具"}
                  {filterType === "GRE" && "如何使用GRE考试倒计时工具"}
                  {filterType === "TOEFL" && "如何使用TOEFL考试倒计时工具"}
                  {filterType === "GMAT" && "如何使用GMAT考试倒计时工具"}
                </h2>
                <div className="prose prose-sm md:prose-base text-muted-foreground">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">基础功能</h3>
                      <ul className="space-y-2">
                        <li>• 实时倒计时显示</li>
                        <li>• 多个考试日期对比</li>
                        <li>• 自定义考试添加</li>
                        <li>• 收藏重要考试</li>
                        <li>• 专注模式学习</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">高级功能</h3>
                      <ul className="space-y-2">
                        <li>• 多语言支持</li>
                        <li>• 移动端适配</li>
                        <li>• 离线使用支持</li>
                        <li>• 进度提醒设置</li>
                        <li>• 学习计划生成</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-2">💡 专家提示</h4>
                    <p className="text-sm">
                      将考试日期添加到日历中，搭配我们的倒计时工具，可以更好地管理备考时间。建议制定详细的学习计划，并定期检查进度。
                    </p>
                  </div>
                </div>
              </section>

              {/* 备考规划 - UGC内容展示 */}
              <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-primary flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  {filterType === "SAT" && "SAT备考规划与学习建议"}
                  {filterType === "ACT" && "ACT备考规划与学习建议"}
                  {filterType === "GRE" && "GRE备考规划与学习建议"}
                  {filterType === "TOEFL" && "TOEFL备考规划与学习建议"}
                  {filterType === "GMAT" && "GMAT备考规划与学习建议"}
                </h2>

                {/* 学习建议内容 */}
                <div className="prose prose-sm md:prose-base text-muted-foreground">
                  {filterType === "SAT" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        SAT备考时间规划
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2">
                            基础阶段 (2-3个月)
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 熟悉考试结构和题型</li>
                            <li>• 制定学习计划</li>
                            <li>• 开始基础词汇积累</li>
                            <li>• 数学基础概念复习</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            强化阶段 (1-2个月)
                          </h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 专项练习和刷题</li>
                            <li>• 模拟考试训练</li>
                            <li>• 错题分析和总结</li>
                            <li>• 时间管理训练</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterType === "ACT" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        ACT备考策略
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2">各科重点</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 英语：语法规则和写作技巧</li>
                            <li>• 数学：代数和几何基础</li>
                            <li>• 阅读：快速阅读和理解</li>
                            <li>• 科学：科学推理和分析</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">时间分配</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 建议备考时间：3-6个月</li>
                            <li>• 每日学习：2-3小时</li>
                            <li>• 周末集中复习</li>
                            <li>• 定期模拟考试</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterType === "GRE" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        GRE备考要点
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2">语文部分</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 词汇量要求：10,000+</li>
                            <li>• 阅读理解技巧</li>
                            <li>• 逻辑推理训练</li>
                            <li>• 同义词替换练习</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">数学部分</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 基础数学概念</li>
                            <li>• 定量推理能力</li>
                            <li>• 数据分析技能</li>
                            <li>• 几何和代数</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterType === "TOEFL" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        TOEFL备考建议
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2">技能提升</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 听力理解训练</li>
                            <li>• 口语表达练习</li>
                            <li>• 阅读速度提升</li>
                            <li>• 写作逻辑训练</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">备考资源</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 官方OG练习题</li>
                            <li>• TPO模考系统</li>
                            <li>• 学术词汇积累</li>
                            <li>• 英语环境浸泡</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterType === "GMAT" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        GMAT备考规划
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2">考试结构</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 语文：36题，65分钟</li>
                            <li>• 数学：31题，62分钟</li>
                            <li>• 综合推理：12题，30分钟</li>
                            <li>• 分析写作：1篇，30分钟</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">备考重点</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• 逻辑推理能力</li>
                            <li>• 数据分析技能</li>
                            <li>• 写作论证能力</li>
                            <li>• 时间管理策略</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {!isClockOnly && !isFocusMode && selectedExam && (
          <div className="relative mb-8 md:mb-12 rounded-lg overflow-hidden">
            <Image
              src="/images/illustrations/hero-banner.jpeg"
              alt="US Exam Countdown Calendar - SAT ACT GRE TOEFL GMAT real-time countdown tracker"
              width={1200}
              height={400}
              className="w-full h-[200px] md:h-[300px] object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 leading-tight">
                  <span className="block text-balance">
                    {t("app.hero.title", lang)}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed text-balance">
                  {t("app.hero.subtitle", lang)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Countdown */}
        {isLoading ? (
          <div className="text-center mb-12 md:mb-16">
            <Card className="bg-card border-border p-8 md:p-12 backdrop-blur">
              <p className="text-lg md:text-2xl text-muted-foreground">
                {t("app.loading.exams", lang)}
              </p>
            </Card>
          </div>
        ) : selectedExam ? (
          <div
            ref={clockRef}
            className={`text-center ${isClockOnly ? "min-h-screen flex flex-col items-center justify-center relative" : "mb-12 md:mb-16"}`}
          >
            {isClockOnly ? (
              <Button
                onClick={() => setIsClockOnly(false)}
                size="lg"
                variant="outline"
                className="absolute top-4 left-4 md:top-8 md:left-8 gap-2 text-sm md:text-base px-4 md:px-8 h-10 md:h-12 font-medium"
              >
                <Minimize2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">
                  {t("button.showAll", lang)}
                </span>
              </Button>
            ) : (
              <div className="flex justify-center gap-4 mb-4 md:mb-6">
                <Button
                  onClick={() => setIsClockOnly(true)}
                  size="lg"
                  variant="outline"
                  className="gap-2 text-sm md:text-base px-4 md:px-8 h-10 md:h-12 font-medium"
                >
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">
                    {t("button.clockOnlyView", lang)}
                  </span>
                  <span className="sm:hidden">
                    {t("button.clockView", lang)}
                  </span>
                </Button>
                <Button
                  onClick={() => setIsFocusMode(true)}
                  size="lg"
                  variant="outline"
                  className="gap-2 text-sm md:text-base px-4 md:px-8 h-10 md:h-12 font-medium"
                >
                  <Brain className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">
                    {t("button.focusMode", lang)}
                  </span>
                  <span className="sm:hidden">{t("button.focus", lang)}</span>
                </Button>
              </div>
            )}
            <h2
              className={`${isClockOnly ? "text-4xl md:text-7xl" : "text-3xl md:text-5xl"} font-bold mb-2 px-4`}
            >
              {selectedExam.name}
            </h2>
            {selectedExam.source && (
              <p className="text-xs md:text-sm mb-4 md:mb-6 text-muted-foreground">
                {t("common.source", lang)} {selectedExam.source}
              </p>
            )}
            <Card
              className={`bg-card border-border ${isClockOnly ? "p-8 md:p-20" : "p-6 md:p-12"} backdrop-blur`}
            >
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.days}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    {t("countdown.days", lang)}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.hours}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    {t("countdown.hours", lang)}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.minutes}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    {t("countdown.minutes", lang)}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.seconds}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    {t("countdown.seconds", lang)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center mb-12 md:mb-16">
            <Card className="bg-card border-border p-8 md:p-12 backdrop-blur">
              <p className="text-lg md:text-2xl text-muted-foreground">
                {t("app.noData.available", lang)}
              </p>
            </Card>
          </div>
        )}

        {/* Mobile-optimized filter and search controls */}
        {!isClockOnly && (
          <div className="mb-6 md:mb-8 space-y-4">
            {/* Search bar - Mobile optimized */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search SAT ACT GRE TOEFL GMAT exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Filter buttons - Mobile optimized */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setExamFilter("all")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("sat")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "sat"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                SAT
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("act")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "act"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                ACT
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("gre")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "gre"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                GRE
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("toefl")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "toefl"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                TOEFL
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("gmat")}
                className={`px-3 py-2 text-xs rounded-full transition-colors ${
                  examFilter === "gmat"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                GMAT
              </button>
            </div>

            {/* View mode toggle and count */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredExams.length} exam
                {filteredExams.length !== 1 ? "s" : ""} found
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("compact")}
                  className={`p-2 rounded ${
                    viewMode === "compact"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                  title="Compact view"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                  title="Grid view"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exam Cards Grid */}
        {!isClockOnly && (
          <div
            className={`grid gap-4 md:gap-6 mb-6 md:mb-8 ${
              viewMode === "compact"
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredExams.map((exam) => {
              const examCountdown = calculateCountdown(exam.date);
              return (
                <Card
                  key={exam.id}
                  className={`bg-card border-border hover:bg-accent cursor-pointer transition-colors ${
                    viewMode === "compact" ? "p-3 md:p-4" : "p-4 md:p-6"
                  }`}
                  onClick={() => setSelectedExam(exam)}
                >
                  <div
                    className={`flex items-start gap-3 ${
                      viewMode === "compact" ? "mb-2 md:mb-3" : "mb-4 md:mb-6"
                    }`}
                  >
                    {exam.name.toLowerCase().includes("sat") && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-200 dark:border-blue-800">
                        <Image
                          src="/images/illustrations/students-studying.jpeg"
                          alt="SAT"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {exam.name.toLowerCase().includes("act") && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-red-200 dark:border-red-800">
                        <Image
                          src="/images/exams/act-logo.jpeg"
                          alt="ACT"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {exam.name.toLowerCase().includes("gre") && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-200 dark:border-purple-800">
                        <Image
                          src="/images/exams/gre-logo.jpeg"
                          alt="GRE"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {exam.name.toLowerCase().includes("toefl") && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-200 dark:border-green-800">
                        <Image
                          src="/images/exams/toefl-logo.jpeg"
                          alt="TOEFL"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {exam.name.toLowerCase().includes("gmat") && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-200 dark:border-purple-800">
                        <Image
                          src="/images/exams/gmat-logo.jpeg"
                          alt="GMAT"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!["sat", "act", "gre", "toefl", "gmat"].some((keyword) =>
                      exam.name.toLowerCase().includes(keyword),
                    ) && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-accent">
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-medium truncate">
                        {exam.name}
                      </h3>
                      {exam.source && (
                        <p className="text-xs mt-1 text-muted-foreground truncate">
                          {exam.source}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exam.id);
                      }}
                      className="hover:scale-110 transition-transform ml-2 flex-shrink-0"
                    >
                      <Star
                        className={`w-5 h-5 ${exam.favorite ? `fill-current ${getColorClass(exam.color)}` : "text-muted"} ${getColorClass(exam.color)}`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-2xl md:text-3xl font-bold tabular-nums">
                    <div className="text-center">
                      <div>{examCountdown.days}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        {t("countdown.days", lang)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.hours}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        {t("countdown.hours", lang)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.minutes}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        {t("countdown.minutes", lang)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.seconds}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        {t("countdown.seconds", lang)}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* V2.0 主页面SEO优化内容 */}
        {!filterType && !isClockOnly && !isFocusMode && (
          <div className="mb-12 md:mb-16">
            <div className="grid gap-8 md:gap-12">
              {/* 主页面SEO优化内容区域 */}
              <section className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                    {t("v2.seo.title", lang)}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t("v2.seo.subtitle", lang)}
                  </p>
                </div>

                {/* 核心功能展示 */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  <div className="text-center p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("v2.seo.features.realtime", lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("v2.seo.features.realtime.desc", lang)}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("v2.seo.features.official", lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("v2.seo.features.official.desc", lang)}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("v2.seo.features.personalized", lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("v2.seo.features.personalized.desc", lang)}
                    </p>
                  </div>
                </div>

                {/* SEO关键词优化内容 */}
                <div className="prose prose-sm md:prose-base max-w-none">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">
                        {t("v2.seo.whyChoose.title", lang)}
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>
                            <strong>
                              {t("v2.seo.whyChoose.accuracy", lang)}：
                            </strong>
                            {t("v2.seo.whyChoose.accuracy.desc", lang)}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>
                            <strong>
                              {t("v2.seo.whyChoose.updates", lang)}：
                            </strong>
                            {t("v2.seo.whyChoose.updates.desc", lang)}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>
                            <strong>
                              {t("v2.seo.whyChoose.multilingual", lang)}：
                            </strong>
                            {t("v2.seo.whyChoose.multilingual.desc", lang)}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>
                            <strong>
                              {t("v2.seo.whyChoose.mobile", lang)}：
                            </strong>
                            {t("v2.seo.whyChoose.mobile.desc", lang)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">
                        {t("v2.seo.supportedExams.title", lang)}
                      </h3>
                      <div className="grid gap-4">
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            {t("v2.seo.supportedExams.sat", lang)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("v2.seo.supportedExams.sat.desc", lang)}
                          </p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                            {t("v2.seo.supportedExams.act", lang)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("v2.seo.supportedExams.act.desc", lang)}
                          </p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                            {t("v2.seo.supportedExams.gre", lang)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("v2.seo.supportedExams.gre.desc", lang)}
                          </p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                            {t("v2.seo.supportedExams.toefl", lang)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("v2.seo.supportedExams.toefl.desc", lang)}
                          </p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                            {t("v2.seo.supportedExams.gmat", lang)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("v2.seo.supportedExams.gmat.desc", lang)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {!isClockOnly && showFavorites && filteredExams.length === 0 && (
          <div className="text-center mb-6 md:mb-8 text-muted-foreground">
            {t("app.noFavorites", lang)}
          </div>
        )}

        {/* Action Buttons */}
        {!isClockOnly && (
          <div className="flex justify-center px-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto md:max-w-md h-14 md:h-16 text-base"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              {t("button.addExam", lang)}
            </Button>
          </div>
        )}
      </main>

      {/* FAQ Section */}
      {!isClockOnly && (
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 border-t border-border">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8 md:mb-12">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("faq.title", lang)}
              </h2>
              <p className="text-muted-foreground">{t("faq.subtitle", lang)}</p>
            </div>
            <div className="w-full md:w-80 h-48 md:h-56 rounded-lg overflow-hidden">
              <Image
                src="/images/illustrations/faq-support.jpeg"
                alt="FAQ and Support"
                width={320}
                height={224}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* Mobile-optimized FAQ items with collapsible content */}
            <div className="space-y-3 md:space-y-4">
              {[
                {
                  icon: BookOpen,
                  iconColor: "text-blue-600 dark:text-blue-400",
                  bgColor: "bg-blue-100 dark:bg-blue-900/20",
                  title: t("faq.dataSource.title", lang),
                  content: t("faq.dataSource.content", lang),
                  index: 0,
                },
                {
                  icon: Plus,
                  iconColor: "text-green-600 dark:text-green-400",
                  bgColor: "bg-green-100 dark:bg-green-900/20",
                  title: t("faq.customExam.title", lang),
                  content: t("faq.customExam.content", lang),
                  index: 1,
                },
                {
                  icon: Maximize2,
                  iconColor: "text-purple-600 dark:text-purple-400",
                  bgColor: "bg-purple-100 dark:bg-purple-900/20",
                  title: t("faq.changeDisplay.title", lang),
                  content: t("faq.changeDisplay.content", lang),
                  index: 2,
                },
                {
                  icon: Star,
                  iconColor: "text-yellow-600 dark:text-yellow-400",
                  bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
                  title: t("faq.favorites.title", lang),
                  content: t("faq.favorites.content", lang),
                  index: 3,
                },
                {
                  icon: Minimize2,
                  iconColor: "text-cyan-600 dark:text-cyan-400",
                  bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
                  title: t("faq.clockView.title", lang),
                  content: t("faq.clockView.content", lang),
                  index: 4,
                },
                {
                  icon: Info,
                  iconColor: "text-orange-600 dark:text-orange-400",
                  bgColor: "bg-orange-100 dark:bg-orange-900/20",
                  title: t("faq.accuracy.title", lang),
                  content: t("faq.accuracy.content", lang),
                  index: 5,
                },
                {
                  icon: Brain,
                  iconColor: "text-rose-600 dark:text-rose-400",
                  bgColor: "bg-rose-100 dark:bg-rose-900/20",
                  title: t("faq.updateFrequency.title", lang),
                  content: t("faq.updateFrequency.content", lang),
                  index: 6,
                },
              ].map((faq) => {
                const Icon = faq.icon;
                const isExpanded = expandedFaq === faq.index;

                return (
                  <Card
                    key={faq.index}
                    className="bg-card border-border overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedFaq(isExpanded ? null : faq.index)
                      }
                      className="w-full p-4 md:p-6 text-left hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${faq.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`w-5 h-5 ${faq.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-semibold">
                            {faq.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <div className="pl-13 md:pl-13">
                          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                            {faq.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Add Exam Dialog */}
      <AddExamDialog
        open={isDialogOpen}
        onOpenChangeAction={setIsDialogOpen}
        onAddExamAction={addExam}
      />

      {/* Focus Mode */}
      {isFocusMode && selectedExam && (
        <FocusMode
          examName={selectedExam.name}
          onClose={() => setIsFocusMode(false)}
        />
      )}

      {/* Footer */}
      {!isClockOnly && (
        <footer className="border-t border-border mt-12 md:mt-20 py-6 md:py-8 px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h4 className="font-semibold mb-2">
                  {t("footer.company", lang)}
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href={getLink("/about")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.aboutUs", lang)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getLink("/contact")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.contact", lang)}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {t("footer.resources", lang)}
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href={getLink("/posts")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.blog", lang)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getLink("/help")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.helpFaq", lang)}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {t("footer.legal", lang)}
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href={getLink("/privacy")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.privacyPolicy", lang)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getLink("/terms")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.termsOfService", lang)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getLink("/cookies")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.cookiePolicy", lang)}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {t("footer.developer", lang)}
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a
                      href="https://github.com/SymphonyIceAttack/exam-timekeeper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.sourceCode", lang)}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/SymphonyIceAttack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t("footer.githubProfile", lang)}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                {t("footer.copyright", lang)}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("footer.disclaimer", lang)}
              </p>
            </div>
          </div>
        </footer>
      )}
      {/* New User Tutorial */}
      {showTutorial && (
        <NewUserTutorial
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={handleTutorialComplete}
          lang={lang}
        />
      )}
    </div>
  );
}
