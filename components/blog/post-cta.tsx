import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PostCTA() {
  return (
    <Card className="mt-8 border-2 border-purple-500 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
      <CardContent className="py-12 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Exam TimeKeeper - US Exam Countdown Calendar
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Track important US exam dates with live countdown timers for SAT, ACT,
          GRE, TOEFL, GMAT and more. Real-time data from official sources.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          View Exam Calendar Now →
        </Link>
      </CardContent>
    </Card>
  );
}
