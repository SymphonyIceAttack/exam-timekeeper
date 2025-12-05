import { BookOpen, Clock, Target, Users } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translation";

const supportedLocales: LanguageType[] = ["zh", "fr", "es", "ru", "de"];

// Generate static params for all non-default languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb
          items={[{ label: "About Us" }]}
          className="mb-6"
          showLanguageSwitch
        />
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

<Card className="bg-card border-border p-8 text-center">
  <h2 className="text-3xl font-bold mb-4">Open Source</h2>
  <p className="text-lg text-foreground mb-6">
    Exam TimeKeeper is an open source project built with transparency and
    community collaboration in mind.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <a
      href="https://github.com/SymphonyIceAttack/exam-timekeeper"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
          clipRule="evenodd"
        />
      </svg>
      View Source Code
    </a>
    <a
      href="https://github.com/SymphonyIceAttack"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-lg font-medium transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
          clipRule="evenodd"
        />
      </svg>
      Developer Profile
    </a>
  </div>
</Card>;
