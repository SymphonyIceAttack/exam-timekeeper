import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cookie Policy | Exam TimeKeeper",
  description:
    "Cookie Policy for Exam TimeKeeper - Learn about how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
        <Breadcrumb items={[{ label: "Cookie Policy" }]} className="mb-6" />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">
            Last updated: November 23, 2025
          </p>
        </div>

        <Card className="bg-card border-border p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Our Cookie Policy
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                Exam TimeKeeper currently <strong>does not use cookies</strong>{" "}
                or similar tracking technologies. Our service operates without
                collecting or storing any information on your device through
                cookies or other means.
              </p>
              <p>
                We believe in protecting your privacy and have designed our
                service to work without the need for tracking technologies. This
                means we do not use cookies for analytics, advertising, or any
                other purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Future Changes</h2>
            <div className="space-y-3 text-foreground">
              <p>
                Should we decide to implement cookies or similar tracking
                technologies in the future, we will update this Cookie Policy
                and provide appropriate notice to users before implementing any
                such changes.
              </p>
              <p>
                Any future use of cookies will be disclosed in this policy with
                detailed information about what cookies we use and how you can
                manage them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Third-Party Services
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                While we currently do not use cookies, our service may contain
                links to third-party websites or services. This Cookie Policy
                does not apply to external sites or services.
              </p>
              <p>
                We recommend reviewing the privacy policies of any third-party
                services you access through links on our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Contact Us</h2>
            <div className="space-y-3 text-foreground">
              <p>
                If you have any questions about our Cookie Policy or our
                approach to privacy, please contact us at:
              </p>
              <p className="font-medium">Email: contact@exam-timekeeper.top</p>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
