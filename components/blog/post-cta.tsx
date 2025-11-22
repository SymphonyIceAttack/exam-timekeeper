import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PostCTA() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="py-12 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Exam TimeKeeper - US Exam Countdown Calendar
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Track important US exam dates with live countdown timers for SAT, ACT,
          GRE, TOEFL, GMAT and more. Real-time data from official sources.
        </p>
        <Button asChild size="lg" className="text-base">
          <Link href="/">
            View Exam Calendar Now →
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
