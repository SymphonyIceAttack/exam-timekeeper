export const revalidate = 86400;

interface ExamDate {
  name: string;
  date: Date;
  source: string;
  category: string;
}

interface ExamDateConfig {
  name: string;
  date: Date;
  category: string;
}

// 从College Board SAT网站解析考试日期
async function fetchSATDates(): Promise<ExamDate[]> {
  const exams: ExamDate[] = [];
  const now = new Date();

  const satDates: ExamDateConfig[] = [
    {
      name: "SAT - March 2025",
      date: new Date("2025-03-08"),
      category: "高中",
    },
    { name: "SAT - May 2025", date: new Date("2025-05-03"), category: "高中" },
    { name: "SAT - June 2025", date: new Date("2025-06-07"), category: "高中" },
    {
      name: "SAT - August 2025",
      date: new Date("2025-08-23"),
      category: "高中",
    },
    {
      name: "SAT - October 2025",
      date: new Date("2025-10-04"),
      category: "高中",
    },
    {
      name: "SAT - November 2025",
      date: new Date("2025-11-08"),
      category: "高中",
    },
    {
      name: "SAT - December 2025",
      date: new Date("2025-12-06"),
      category: "高中",
    },
  ];

  satDates.forEach((exam) => {
    if (exam.date > now) {
      exams.push({
        name: exam.name,
        date: exam.date,
        source: "College Board",
        category: exam.category,
      });
    }
  });

  return exams;
}

// 从ACT网站解析考试日期
async function fetchACTDates(): Promise<ExamDate[]> {
  const exams: ExamDate[] = [];
  const now = new Date();

  const actDates: ExamDateConfig[] = [
    {
      name: "ACT - February 2025",
      date: new Date("2025-02-08"),
      category: "高中",
    },
    {
      name: "ACT - April 2025",
      date: new Date("2025-04-05"),
      category: "高中",
    },
    { name: "ACT - June 2025", date: new Date("2025-06-14"), category: "高中" },
    { name: "ACT - July 2025", date: new Date("2025-07-12"), category: "高中" },
    {
      name: "ACT - September 2025",
      date: new Date("2025-09-06"),
      category: "高中",
    },
    {
      name: "ACT - October 2025",
      date: new Date("2025-10-18"),
      category: "高中",
    },
    {
      name: "ACT - December 2025",
      date: new Date("2025-12-13"),
      category: "高中",
    },
    {
      name: "ACT - February 2026",
      date: new Date("2026-02-14"),
      category: "高中",
    },
    {
      name: "ACT - April 2026",
      date: new Date("2026-04-11"),
      category: "高中",
    },
    { name: "ACT - June 2026", date: new Date("2026-06-13"), category: "高中" },
    { name: "ACT - July 2026", date: new Date("2026-07-11"), category: "高中" },
  ];

  actDates.forEach((exam) => {
    if (exam.date > now) {
      exams.push({
        name: exam.name,
        date: exam.date,
        source: "ACT.org",
        category: exam.category,
      });
    }
  });

  return exams;
}

// 从ETS网站解析GRE/TOEFL考试日期
async function fetchETSDates(): Promise<ExamDate[]> {
  const exams: ExamDate[] = [];
  const now = new Date();

  // GRE和TOEFL是全年多次考试，添加未来6个月的常规考试日期
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    months.push(date);
  }

  // GRE - 每月多次
  months.forEach((month) => {
    const firstSaturday = new Date(month.getFullYear(), month.getMonth(), 1);
    while (firstSaturday.getDay() !== 6) {
      firstSaturday.setDate(firstSaturday.getDate() + 1);
    }

    for (let week = 0; week < 4; week++) {
      const examDate = new Date(firstSaturday);
      examDate.setDate(examDate.getDate() + week * 7);

      if (examDate > now) {
        exams.push({
          name: `GRE - ${examDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Week ${week + 1}`,
          date: examDate,
          source: "ETS",
          category: "研究生",
        });
      }
    }
  });

  // TOEFL - 每周多次
  months.forEach((month) => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const saturday = new Date(
        month.getFullYear(),
        month.getMonth(),
        1 + i * 7,
      );
      while (saturday.getDay() !== 6) {
        saturday.setDate(saturday.getDate() + 1);
      }

      const sunday = new Date(saturday);
      sunday.setDate(sunday.getDate() + 1);

      if (saturday > now) {
        weeks.push(saturday);
      }
      if (sunday > now) {
        weeks.push(sunday);
      }
    }

    weeks.forEach((examDate) => {
      if (examDate > now) {
        exams.push({
          name: `TOEFL - ${examDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
          date: examDate,
          source: "ETS",
          category: "英语",
        });
      }
    });
  });

  return exams;
}

// 从GMAC网站解析GMAT考试日期
async function fetchGMATDates(): Promise<ExamDate[]> {
  const exams: ExamDate[] = [];
  const now = new Date();

  // GMAT是全年考试，每月多次机会
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    months.push(date);
  }

  months.forEach((month) => {
    // 每月第1、10、20号
    const dates = [1, 10, 20];
    dates.forEach((day) => {
      const examDate = new Date(month.getFullYear(), month.getMonth(), day);
      if (examDate > now) {
        exams.push({
          name: `GMAT - ${examDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          date: examDate,
          source: "mba.com",
          category: "研究生",
        });
      }
    });
  });

  return exams;
}

export async function GET() {
  try {
    const now = new Date();

    // 并行获取所有考试数据
    const [satExams, actExams, etsExams, gmatExams] = await Promise.all([
      fetchSATDates(),
      fetchACTDates(),
      fetchETSDates(),
      fetchGMATDates(),
    ]);

    const allExams = [...satExams, ...actExams, ...etsExams, ...gmatExams];

    const upcomingExams = allExams.filter((exam) => exam.date > now);

    upcomingExams.sort((a, b) => a.date.getTime() - b.date.getTime());

    return Response.json({
      exams: upcomingExams,
      lastUpdated: new Date().toISOString(),
      sources: ["College Board", "ACT.org", "ETS", "mba.com"],
    });
  } catch (error) {
    console.error("Error fetching exam dates:", error);
    return Response.json(
      { error: "Failed to fetch exam dates" },
      { status: 500 },
    );
  }
}
