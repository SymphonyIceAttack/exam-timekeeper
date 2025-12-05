import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | Exam TimeKeeper",
  description:
    "Terms of Service for Exam TimeKeeper - Your rights and responsibilities when using our service.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
        <Breadcrumb items={[{ label: "Terms of Service" }]} className="mb-6" />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: November 23, 2025
          </p>
        </div>

        <Card className="bg-card border-border p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                By accessing and using Exam TimeKeeper, you accept and agree to
                be bound by the terms and provision of this agreement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
            <div className="space-y-3 text-foreground">
              <p>
                Permission is granted to use Exam TimeKeeper for personal and
                commercial purposes. This is the grant of a license, not a
                transfer of title, and under this license you may:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for your personal or business needs</li>
                <li>Share links to our service</li>
                <li>Use the service in compliance with all applicable laws</li>
              </ul>
              <p className="mt-4">
                This license shall automatically terminate if you violate any of
                these restrictions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
            <div className="space-y-3 text-foreground">
              <p>
                <strong>Exam Information:</strong> While we strive to provide
                accurate exam dates and information from official sources, we
                cannot guarantee the accuracy, completeness, or timeliness of
                all information. Always verify exam dates and registration
                deadlines on official testing organization websites.
              </p>
              <p>
                <strong>No Warranty:</strong> The information on this website is
                provided on an "as is" basis. To the fullest extent permitted by
                law, we exclude all representations, warranties, and conditions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
            <div className="space-y-3 text-foreground">
              <p>
                In no event shall Exam TimeKeeper or its suppliers be liable for
                any damages (including, without limitation, damages for loss of
                data or profit, or due to business interruption) arising out of
                the use or inability to use the materials on our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Accuracy of Materials
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                The materials appearing on our service could include technical,
                typographical, or photographic errors. We do not warrant that
                any of the materials on our service are accurate, complete, or
                current.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Prohibited Uses</h2>
            <div className="space-y-3 text-foreground">
              <p>You may not use our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Modifications</h2>
            <div className="space-y-3 text-foreground">
              <p>
                We may revise these terms of service for our service at any time
                without notice. By using our service, you are agreeing to be
                bound by the then current version of these terms of service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              8. Contact Information
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <p className="font-medium">Email: contact@exam-timekeeper.top</p>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
