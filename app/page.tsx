"use client";

import {
  BookOpen,
  Brain,
  Maximize2,
  Minimize2,
  Plus,
  RefreshCw,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { AddExamDialog } from "@/components/add-exam-dialog";
import { FocusMode } from "@/components/focus-mode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

export default function TimeKeeperPage() {
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
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isClockOnly, setIsClockOnly] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  const fetchLiveExams = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/exams/fetch-live");
      const data: ExamApiResponse = await response.json();

      if (data.exams) {
        const formattedExams = data.exams
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

        setExams(formattedExams);
        setLastUpdated(new Date(data.lastUpdated).toLocaleString("en-US"));

        if (formattedExams.length > 0 && !selectedExam) {
          setSelectedExam(formattedExams[0]);
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch live exams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveExams();
    const refreshInterval = setInterval(fetchLiveExams, 30 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {!isClockOnly && (
        <header className="border-b border-border px-4 md:px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">TimeKeeper</h1>
              {lastUpdated && (
                <p className="text-xs mt-1 text-muted-foreground">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <Link href="/posts" scroll={false}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm transition-colors flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground hover:bg-accent px-2 md:px-3 h-8 md:h-9"
                >
                  <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Blog</span>
                </Button>
              </Link>
              <button
                onClick={fetchLiveExams}
                type="button"
                disabled={isLoading}
                className={`text-xs md:text-sm transition-colors flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <RefreshCw
                  className={`w-3 h-3 md:w-4 md:h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs md:text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                THEME
              </button>
              <button
                type="button"
                onClick={() => setShowFavorites(!showFavorites)}
                className={`text-xs md:text-sm transition-colors flex items-center gap-1 ${showFavorites ? "text-yellow-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Star
                  className={`w-5 h-5 md:w-4 md:h-4 ${showFavorites ? "fill-current" : ""}`}
                />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCustom(!showCustom)}
                className={`text-xs md:text-sm transition-colors hidden sm:block ${showCustom ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Custom
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        {/* Main Countdown */}
        {isLoading ? (
          <div className="text-center mb-12 md:mb-16">
            <Card className="bg-card border-border p-8 md:p-12 backdrop-blur">
              <p className="text-lg md:text-2xl text-muted-foreground">
                Loading latest exam data...
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
                <span className="hidden sm:inline">Show All</span>
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
                  <span className="hidden sm:inline">Clock Only View</span>
                  <span className="sm:hidden">Clock View</span>
                </Button>
                <Button
                  onClick={() => setIsFocusMode(true)}
                  size="lg"
                  variant="outline"
                  className="gap-2 text-sm md:text-base px-4 md:px-8 h-10 md:h-12 font-medium"
                >
                  <Brain className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Focus Mode</span>
                  <span className="sm:hidden">Focus</span>
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
                Source: {selectedExam.source}
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
                    days
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.hours}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    hours
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.minutes}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    min
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`${isClockOnly ? "text-5xl md:text-9xl" : "text-5xl md:text-8xl"} font-bold tabular-nums`}
                  >
                    {countdown.seconds}
                  </div>
                  <div className="text-xs md:text-sm mt-1 md:mt-2 text-muted-foreground">
                    sec
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center mb-12 md:mb-16">
            <Card className="bg-card border-border p-8 md:p-12 backdrop-blur">
              <p className="text-lg md:text-2xl text-muted-foreground">
                No exam data available. Click "Refresh" to get latest exam
                information.
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
                  <div className="flex items-start justify-between mb-4 md:mb-6">
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
                        days
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.hours}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        hrs
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.minutes}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        min
                      </div>
                    </div>
                    <div className="text-center">
                      <div>{examCountdown.seconds}</div>
                      <div className="text-xs font-normal mt-1 text-muted-foreground">
                        sec
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
            No favorite exams. Click the star icon to favorite exams.
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
              ADD EXAM
            </Button>
          </div>
        )}
      </main>

      {/* FAQ Section */}
      {!isClockOnly && (
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:gap-6 max-w-3xl mx-auto">
            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                Where does the exam data come from?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                All exam data is automatically fetched from official sources
                including College Board (satsuite.collegeboard.org) for SAT,
                ACT.org for ACT, ETS.org for GRE and TOEFL, and mba.com for
                GMAT. The system retrieves the most up-to-date exam schedules
                directly from these trusted sources and filters out expired
                dates to show only upcoming exams.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                Can I add my own custom exams?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Yes! Click the "ADD EXAM" button to add personal exams or
                important dates. Enter a custom name, select any future date
                using the calendar picker, choose a color theme, and your exam
                will appear alongside the official exam data. Custom exams will
                persist until you refresh the data.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                How do I change the main countdown display?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Simply click on any exam card in the grid to set it as the main
                countdown display. The selected exam will appear in large format
                at the top with real-time countdown. You can switch between
                exams at any time to track multiple important dates.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                How do favorites work?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Click the star icon on any exam card to mark it as a favorite.
                Favorited exams display a filled, colored star. Use the
                "Favorites" button in the header to filter and view only your
                favorited exams, making it easy to focus on your most important
                upcoming tests.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                What is Clock Only View?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Click the "Clock Only View" button to hide all distractions and
                display only the countdown timer in an enlarged, focused format.
                Perfect for distraction-free studying or displaying on a second
                monitor. Click "Show All" to return to the full interface with
                all exam cards and features.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                How accurate is the data?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                While we fetch data directly from official exam websites, exam
                dates and registration deadlines can change.{" "}
                <strong>
                  Always verify exam information on the official testing
                  organization's website
                </strong>{" "}
                before registering or making travel plans. This tool is designed
                as a convenient reference, not a substitute for official
                sources.
              </p>
            </Card>

            <Card className="bg-card border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                How often does the data update?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Exam data automatically refreshes every 30 minutes and when you
                first load the page. You can manually trigger an update anytime
                by clicking the "Refresh" button in the header. The system also
                automatically removes exams that have already started to keep
                your countdown list current.
              </p>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      {!isClockOnly && (
        <footer className="border-t border-border mt-12 md:mt-20 py-6 md:py-8 px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/posts"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Help & FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                © 2025 TimeKeeper | Built by v0
              </p>
              <p className="text-xs text-muted-foreground">
                It is strongly recommended to double-check the information
                provided on this website with official sources to ensure its
                accuracy.
              </p>
            </div>
          </div>
        </footer>
      )}

      <AddExamDialog
        open={isDialogOpen}
        onOpenChangeAction={setIsDialogOpen}
        onAddExamAction={addExam}
      />

      {isFocusMode && selectedExam && (
        <FocusMode
          examName={selectedExam.name}
          onClose={() => setIsFocusMode(false)}
        />
      )}
    </div>
  );
}
