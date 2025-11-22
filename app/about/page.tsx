import { BookOpen, Clock, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Exam TimeKeeper",
  description:
    "Learn about Exam TimeKeeper - Your trusted source for US standardized exam countdowns and important dates.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb items={[{ label: "About Us" }]} className="mb-6" />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Exam TimeKeeper
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted companion for tracking important US standardized exam
            dates with precision and ease
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                <p className="text-foreground leading-relaxed">
                  To help students, educators, and test-takers stay informed
                  about important exam dates through an intuitive, reliable, and
                  always-up-to-date countdown platform. We believe that being
                  aware of upcoming deadlines is the first step to success.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
                <p className="text-foreground leading-relaxed">
                  Exam TimeKeeper aggregates exam dates from official sources
                  including College Board, ACT.org, ETS, and mba.com, presenting
                  them in an easy-to-understand countdown format. Our platform
                  automatically updates to show only upcoming exams, helping you
                  never miss an important test date again.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Who We Serve</h2>
                <p className="text-foreground leading-relaxed">
                  We serve high school students preparing for the SAT and ACT,
                  graduate students planning for the GRE and TOEFL, and business
                  school candidates gearing up for the GMAT. Our platform is
                  designed for anyone who needs to track standardized test dates
                  as part of their academic journey.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
                <ul className="text-foreground space-y-2 leading-relaxed">
                  <li>
                    • <strong>Always Accurate:</strong> Data sourced directly
                    from official testing organizations
                  </li>
                  <li>
                    • <strong>Real-Time Updates:</strong> Information refreshes
                    automatically every 30 minutes
                  </li>
                  <li>
                    • <strong>User-Friendly:</strong> Clean, intuitive interface
                    that works on all devices
                  </li>
                  <li>
                    • <strong>Comprehensive:</strong> Coverage of major US
                    standardized tests in one place
                  </li>
                  <li>
                    • <strong>Customizable:</strong> Add your own personal exam
                    dates and important deadlines
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-card border-border p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              Exam TimeKeeper was born from a simple observation: students were
              missing important exam registration deadlines simply because they
              didn't know when the tests were scheduled. With so many
              standardized tests to track and various sources to monitor,
              staying on top of exam dates became a challenge.
            </p>
            <p>
              We realized that by centralizing this information and presenting
              it in a visually clear countdown format, we could help students
              make better decisions about their test preparation timeline. What
              started as a personal tool quickly grew into a comprehensive
              platform that serves thousands of students each month.
            </p>
            <p>
              Today, Exam TimeKeeper continues to evolve, adding new features
              based on user feedback and expanding coverage to include more
              tests and dates. Our commitment remains the same: to provide
              accurate, timely, and accessible exam information to everyone who
              needs it.
            </p>
          </div>
        </Card>

        <Card className="bg-primary/5 border-primary/20 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-foreground mb-6">
            We're building a community of students who support each other's
            academic journeys.
          </p>
          <p className="text-muted-foreground">
            Have feedback or suggestions? We'd love to hear from you at{" "}
            <span className="font-medium text-foreground">
              contact@exam-timekeeper.top
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
