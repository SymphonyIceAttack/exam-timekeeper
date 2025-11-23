"use client";

import {
  CheckCircle,
  Clock,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Target,
  Timer,
  TrendingUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Session {
  id: string;
  type: "focus" | "short-break" | "long-break";
  duration: number;
  completed: boolean;
  timestamp: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
}

export function FocusMode({
  examName,
  onClose,
}: {
  examName: string;
  onClose: () => void;
}) {
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "short-break" | "long-break">(
    "focus",
  );
  const [sessions, setSessions] = useState<Session[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("focusSoundEnabled") === "true";
    }
    return false;
  });
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [selectedTimePreset, setSelectedTimePreset] = useState("25");
  const [customMinutes, setCustomMinutes] = useState("25");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes = {
    focus: {
      duration: 25 * 60,
      label: "Focus Session",
      color: "text-blue-500",
    },
    "short-break": {
      duration: 5 * 60,
      label: "Short Break",
      color: "text-green-500",
    },
    "long-break": {
      duration: 15 * 60,
      label: "Long Break",
      color: "text-purple-500",
    },
  };

  const focusPresets = [
    { label: "15 min", value: "15" },
    { label: "25 min", value: "25" },
    { label: "45 min", value: "45" },
    { label: "50 min", value: "50" },
    { label: "90 min", value: "90" },
    { label: "Custom", value: "custom" },
  ];

  const breakPresets = [
    { label: "3 min", value: "3" },
    { label: "5 min", value: "5" },
    { label: "10 min", value: "10" },
    { label: "15 min", value: "15" },
    { label: "20 min", value: "20" },
    { label: "Custom", value: "custom" },
  ];

  useEffect(() => {
    localStorage.setItem("focusSoundEnabled", soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    if (isActive && currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((time) => time - 1);
      }, 1000);
    } else if (currentTime === 0) {
      handleSessionComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentTime]);

  const handleTimeChange = (preset: string) => {
    setIsActive(false);
    setSelectedTimePreset(preset);

    if (preset === "custom") {
      setShowCustomInput(true);
      return;
    }

    setShowCustomInput(false);
    const minutes = parseInt(preset, 10);
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setCurrentTime(seconds);
  };

  const handleCustomTimeSubmit = () => {
    const minutes = parseInt(customMinutes, 10);
    if (minutes > 0 && minutes <= 180) {
      const seconds = minutes * 60;
      setInitialTime(seconds);
      setCurrentTime(seconds);
      setShowCustomInput(false);
      setSelectedTimePreset("custom");
    }
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    if (soundEnabled) {
      const audio = new Audio("/sounds/bell.mp3");
      audio.play().catch(() => {});
    }

    const newSession: Session = {
      id: Date.now().toString(),
      type: mode,
      duration: initialTime,
      completed: true,
      timestamp: Date.now(),
    };

    setSessions((prev) => [...prev, newSession]);

    if (mode === "focus") {
      setCompletedPomodoros((prev) => prev + 1);

      if ((sessions.filter((s) => s.type === "focus").length + 1) % 4 === 0) {
        setMode("long-break");
        setInitialTime(modes["long-break"].duration);
      } else {
        setMode("short-break");
        setInitialTime(modes["short-break"].duration);
      }
    } else {
      setMode("focus");
      setInitialTime(modes.focus.duration);
    }

    setCurrentTime(
      mode === "focus"
        ? (sessions.filter((s) => s.type === "focus").length + 1) % 4 === 0
          ? modes["long-break"].duration
          : modes["short-break"].duration
        : modes.focus.duration,
    );
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTime(initialTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((initialTime - currentTime) / initialTime) * 100;

  const todaySessions = sessions.filter(
    (s) => new Date(s.timestamp).toDateString() === new Date().toDateString(),
  );

  const todayFocusTime = todaySessions
    .filter((s) => s.type === "focus" && s.completed)
    .reduce((acc, s) => acc + s.duration, 0);

  const milestones: Milestone[] = [
    {
      id: "1",
      title: "First Pomodoro",
      description: "Complete your first focus session",
      target: 1,
      current: completedPomodoros,
      completed: completedPomodoros >= 1,
    },
    {
      id: "2",
      title: "Morning Warrior",
      description: "Complete 2 hours of focused study",
      target: 120 * 60,
      current: todayFocusTime,
      completed: todayFocusTime >= 120 * 60,
    },
    {
      id: "3",
      title: "Dedication",
      description: "Complete 5 pomodoros today",
      target: 5,
      current: todaySessions.filter((s) => s.type === "focus" && s.completed)
        .length,
      completed:
        todaySessions.filter((s) => s.type === "focus" && s.completed).length >=
        5,
    },
    {
      id: "4",
      title: "Marathon",
      description: "Study for 4 hours straight",
      target: 240 * 60,
      current: todayFocusTime,
      completed: todayFocusTime >= 240 * 60,
    },
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h2 className="text-xl font-bold">Focus Mode - {examName}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Stats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            <Minimize2 className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </div>
      </div>

      {showStats ? (
        <div className="flex-1 overflow-y-auto p-8">
          <h3 className="text-2xl font-bold mb-6">Today's Progress</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold">Focus Time</h4>
                </div>
                <p className="text-3xl font-bold">
                  {Math.floor(todayFocusTime / 60)}m
                </p>
                <p className="text-sm text-muted-foreground">
                  of focused study
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold">Pomodoros</h4>
                </div>
                <p className="text-3xl font-bold">
                  {
                    todaySessions.filter(
                      (s) => s.type === "focus" && s.completed,
                    ).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">completed today</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <h4 className="font-semibold">Milestones</h4>
                </div>
                <p className="text-3xl font-bold">
                  {milestones.filter((m) => m.completed).length}/
                  {milestones.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  achievements unlocked
                </p>
              </CardContent>
            </Card>
          </div>

          <h4 className="text-xl font-bold mb-4">Achievements</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {milestones.map((milestone) => (
              <Card
                key={milestone.id}
                className={`${milestone.completed ? "border-green-500" : "border-border"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {milestone.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground mt-1" />
                    )}
                    <div className="flex-1">
                      <h5 className="font-semibold">{milestone.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, (milestone.current / milestone.target) * 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.floor(milestone.current / 60)}m /{" "}
                          {Math.floor(milestone.target / 60)}m
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-8">
            <p className={`text-2xl font-semibold ${modes[mode].color}`}>
              {modes[mode].label}
            </p>
            <p className="text-muted-foreground mt-2">Exam: {examName}</p>
          </div>

          <div className="relative w-80 h-80 mb-8">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className={modes[mode].color.replace("text-", "text-")}
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl font-bold tabular-nums">
                {formatTime(currentTime)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {isActive ? "Running" : "Paused"}
              </p>
            </div>
          </div>

          <div className="mb-8 w-full max-w-md">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Select Duration</p>
            </div>

            {!showCustomInput ? (
              <Select
                value={selectedTimePreset}
                onValueChange={handleTimeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time duration" />
                </SelectTrigger>
                <SelectContent>
                  {mode === "focus" &&
                    focusPresets.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  {mode !== "focus" &&
                    breakPresets.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Minutes (1-180)"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  min={1}
                  max={180}
                  className="flex-1"
                />
                <Button
                  onClick={handleCustomTimeSubmit}
                  disabled={!customMinutes}
                >
                  Set
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCustomInput(false);
                    setSelectedTimePreset(
                      Math.floor(initialTime / 60).toString(),
                    );
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button size="lg" onClick={toggleTimer} className="gap-2">
              {isActive ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetTimer}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Completed Pomodoros: {completedPomodoros}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedPomodoros % 4 === 0 && completedPomodoros > 0
                ? "Long break incoming!"
                : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
