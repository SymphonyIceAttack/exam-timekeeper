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

  const filteredExams = showFavorites
    ? exams.filter((exam) => exam.favorite)
    : exams;

  const examTypes = ["SAT", "ACT", "GRE", "TOEFL", "GMAT"];

  const getLink = (path: string) => {
    return lang === "en" ? path : `/${lang}${path}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {!isClockOnly && (
        <header className="border-b border-border px-4 md:px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <Link href={getLink("/")} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap leading-tight">
                      <span className="block truncate">
                        {t("app.title", lang)}
                      </span>
                      {filterType && (
                        <span className="text-primary block sm:inline sm:ml-2 mt-1 sm:mt-0 text-ellipsis overflow-hidden whitespace-nowrap">
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
            <div className="flex items-center gap-3 md:gap-6">
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
        {/* Page Title Structure */}
        {filterType && !isClockOnly && !isFocusMode && (
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
              {filterType === "SAT" && t("sat.page.h1", lang)}
              {filterType === "ACT" && t("act.page.h1", lang)}
              {filterType === "GRE" && t("gre.page.h1", lang)}
              {filterType === "TOEFL" && t("toefl.page.h1", lang)}
              {filterType === "GMAT" && t("gmat.page.h1", lang)}
            </h1>

            <div className="grid gap-6 md:gap-8 mb-8 md:mb-12">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  {filterType === "SAT" && t("sat.page.schedules", lang)}
                  {filterType === "ACT" && t("act.page.schedules", lang)}
                  {filterType === "GRE" && t("gre.page.schedules", lang)}
                  {filterType === "TOEFL" && t("toefl.page.schedules", lang)}
                  {filterType === "GMAT" && t("gmat.page.schedules", lang)}
                </h2>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  {filterType === "SAT" && t("sat.page.howToUse", lang)}
                  {filterType === "ACT" && t("act.page.howToUse", lang)}
                  {filterType === "GRE" && t("gre.page.howToUse", lang)}
                  {filterType === "TOEFL" && t("toefl.page.howToUse", lang)}
                  {filterType === "GMAT" && t("gmat.page.howToUse", lang)}
                </h2>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  {filterType === "SAT" && t("sat.page.studyPlanning", lang)}
                  {filterType === "ACT" && t("act.page.studyPlanning", lang)}
                  {filterType === "GRE" && t("gre.page.studyPlanning", lang)}
                  {filterType === "TOEFL" &&
                    t("toefl.page.studyPlanning", lang)}
                  {filterType === "GMAT" && t("gmat.page.studyPlanning", lang)}
                </h2>
              </section>
            </div>
          </div>
        )}

        {!isClockOnly && !isFocusMode && selectedExam && (
          <div className="relative mb-8 md:mb-12 rounded-lg overflow-hidden">
            <Image
              src="/images/illustrations/hero-banner.jpeg"
              alt={t("app.hero.title", lang)}
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

        {/* Exam Cards Grid */}
        {!isClockOnly && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {filteredExams.map((exam) => {
              const examCountdown = calculateCountdown(exam.date);
              return (
                <Card
                  key={exam.id}
                  className="bg-card border-border hover:bg-accent p-4 md:p-6 cursor-pointer transition-colors"
                  onClick={() => setSelectedExam(exam)}
                >
                  <div className="flex items-start gap-3 mb-4 md:mb-6">
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
          <div className="grid gap-4 md:gap-6 max-w-3xl mx-auto">
            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.dataSource.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.dataSource.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.customExam.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.customExam.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.changeDisplay.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.changeDisplay.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.favorites.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.favorites.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center flex-shrink-0">
                  <Minimize2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.clockView.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.clockView.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.accuracy.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.accuracy.content", lang)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {t("faq.updateFrequency.title", lang)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {t("faq.updateFrequency.content", lang)}
                  </p>
                </div>
              </div>
            </Card>
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
