import { BookOpen, Clock, HelpCircle, RefreshCw, Settings } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HelpClient } from "./help-client";

export const metadata: Metadata = {
  title: "Help & FAQ | Exam TimeKeeper",
  description:
    "Get help and answers to frequently asked questions about using Exam TimeKeeper.",
};

const faqSections = [
  {
    id: "general",
    title: "General Questions",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        q: "What is Exam TimeKeeper?",
        a: "Exam TimeKeeper is a free online tool that helps you track important US standardized exam dates with live countdown timers. We aggregate data from official sources including College Board, ACT.org, ETS, and mba.com to provide you with accurate, up-to-date exam schedules.",
      },
      {
        q: "How often is the exam data updated?",
        a: "Exam data automatically refreshes every 30 minutes. You can also manually trigger a refresh by clicking the 'Refresh' button in the header. All data is sourced directly from official testing organizations.",
      },
      {
        q: "Is Exam TimeKeeper free to use?",
        a: "Yes! Exam TimeKeeper is completely free to use. There are no subscriptions, no hidden fees, and no premium features. We're committed to helping students access exam information without barriers.",
      },
      {
        q: "Which exams are covered?",
        a: "We currently track SAT, ACT, GRE, TOEFL, and GMAT dates. These are the most commonly required standardized tests for college and graduate school admissions in the United States.",
      },
      {
        q: "How accurate is the information?",
        a: "While we fetch data directly from official sources, exam dates and registration deadlines can change. We strongly recommend always verifying information on the official testing organization websites before making any decisions or registrations.",
      },
    ],
  },
  {
    id: "using",
    title: "Using the Website",
    icon: <Settings className="w-5 h-5" />,
    questions: [
      {
        q: "How do I change the main countdown display?",
        a: "Simply click on any exam card in the grid to set it as the main countdown display. The selected exam will appear in large format at the top with real-time countdown. You can switch between exams at any time.",
      },
      {
        q: "How do I add my own custom exams?",
        a: "Click the 'ADD EXAM' button at the bottom of the page. Enter a custom name, select any future date using the calendar picker, choose a color theme, and your exam will appear alongside the official exam data. Custom exams persist until you refresh the page.",
      },
      {
        q: "How do favorites work?",
        a: "Click the star icon on any exam card to mark it as a favorite. Favorited exams display a filled, colored star. Use the 'Favorites' button in the header to filter and view only your favorited exams.",
      },
      {
        q: "What is Clock Only View?",
        a: "Click the 'Clock Only View' button to hide all distractions and display only the countdown timer in an enlarged, focused format. Perfect for studying or displaying on a second monitor. Click 'Show All' to return to the full interface.",
      },
      {
        q: "Can I use Exam TimeKeeper on my phone or tablet?",
        a: "Yes! Exam TimeKeeper is fully responsive and works great on all devices including smartphones, tablets, and desktop computers. The interface adapts to your screen size for optimal viewing.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Questions",
    icon: <RefreshCw className="w-5 h-5" />,
    questions: [
      {
        q: "Why am I seeing expired exams?",
        a: "The system automatically filters out exams that have already passed. However, if you're seeing expired exams, try refreshing the page to reload the data. We update the database every 30 minutes.",
      },
      {
        q: "My page isn't loading properly. What should I do?",
        a: "First, try refreshing the page. If that doesn't work, clear your browser's cache and cookies, then reload. Make sure you're using a modern browser (Chrome, Firefox, Safari, or Edge). Contact us if problems persist.",
      },
      {
        q: "Do you store any personal information?",
        a: "No personal data is stored on our servers. Any custom exams you add are stored locally in your browser and will be lost if you clear your browser data or switch devices.",
      },
      {
        q: "Can I download or export the exam data?",
        a: "Currently, export functionality is not available. However, you can easily screenshot or manually record the information you need. We're considering adding export features in future updates.",
      },
      {
        q: "Does the website work offline?",
        a: "No, Exam TimeKeeper requires an internet connection to fetch the latest exam data and update countdowns. However, once loaded, the basic interface will display even if your connection temporarily drops.",
      },
    ],
  },
  {
    id: "exams",
    title: "About Specific Exams",
    icon: <BookOpen className="w-5 h-5" />,
    questions: [
      {
        q: "Where does SAT data come from?",
        a: "SAT dates are sourced directly from College Board's official website (satsuite.collegeboard.org). We retrieve the most current test dates and registration deadlines from their published schedule.",
      },
      {
        q: "Are ACT dates accurate?",
        a: "ACT dates are fetched from ACT.org, the official ACT website. We recommend confirming registration deadlines on their site as they can sometimes adjust dates based on various factors.",
      },
      {
        q: "How do you handle GRE and TOEFL dates?",
        a: "GRE and TOEFL are offered year-round through ETS. We display common test dates and note that these tests have more flexible scheduling. Check ETS.org for specific availability at test centers near you.",
      },
      {
        q: "When are GMAT dates posted?",
        a: "GMAT dates are available from GMAC (mba.com). GMAT testing is offered year-round at test centers, though availability varies by location and date. We show general date ranges, but check mba.com for specific availability.",
      },
      {
        q: "Can I request support for additional exams?",
        a: "Yes! We'd love to hear from you. Contact us at feedback@exam-timekeeper.top to suggest additional exams or features. We're always looking to improve the service based on user feedback.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <Clock className="w-5 h-5" />,
    questions: [
      {
        q: "The countdown isn't updating. What's wrong?",
        a: "Countdown timers update every second. If yours has stopped, check that you haven't paused the page or lost internet connection. Refresh the page to restart the countdown if needed.",
      },
      {
        q: "I'm seeing an error message. How do I fix it?",
        a: "Most errors are temporary and can be resolved by refreshing the page. If the error persists, try clearing your browser cache or using an incognito/private browsing window. Contact us if you continue to experience issues.",
      },
      {
        q: "The exam I need isn't showing up. Where is it?",
        a: "We may not have added that exam yet, or it might be too far in the future. Use the 'ADD EXAM' feature to add custom exam dates. You can also contact us to request support for specific exams.",
      },
      {
        q: "Can I share Exam TimeKeeper with others?",
        a: "Absolutely! Please share Exam TimeKeeper with friends, classmates, teachers, or anyone who might find it helpful. You can share the URL or bookmark it for easy access.",
      },
      {
        q: "How do I report a bug or suggest a feature?",
        a: "We'd love to hear from you! Use the contact form on our Contact page or email bugs@exam-timekeeper.top for bug reports and feedback@exam-timekeeper.top for feature requests.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb items={[{ label: "Help & FAQ" }]} className="mb-6" />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & FAQ</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about using Exam TimeKeeper
          </p>
        </div>

        <HelpClient faqSections={faqSections} />

        <Card className="bg-primary/5 border-primary/20 p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-foreground mb-6">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <HelpCircle className="w-5 h-5" />
                Contact Us
              </Button>
            </Link>
            <a href="mailto:contact@exam-timekeeper.top">
              <Button variant="outline" size="lg">
                Email Support
              </Button>
            </a>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link href="/posts">
              <Button variant="ghost">Blog</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost">Privacy Policy</Button>
            </Link>
            <Link href="/terms">
              <Button variant="ghost">Terms of Service</Button>
            </Link>
            <Link href="/cookies">
              <Button variant="ghost">Cookie Policy</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
