import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import { supportedLocales } from "@/lib/constants";

// Generate static params for all non-default languages
export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export const metadata: Metadata = {
  title: "Privacy Policy | Exam TimeKeeper",
  description:
    "Privacy Policy for Exam TimeKeeper - How we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6">
        <Breadcrumb
          items={[{ label: "Privacy Policy" }]}
          className="mb-6"
          showLanguageSwitch
        />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: November 23, 2025
          </p>
        </div>

        <Card className="bg-card border-border p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                <strong>Information you provide:</strong> When you use our
                service, we may collect information you voluntarily provide,
                such as when you add custom exam dates or contact us.
              </p>
              <p>
                <strong>Automatically collected information:</strong> We
                automatically collect certain information about your device and
                usage of our service, including IP address, browser type, device
                information, and pages visited.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <div className="space-y-3 text-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our service</li>
                <li>Improve user experience</li>
                <li>Analyze usage patterns</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Cookies and Tracking
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                We use cookies and similar tracking technologies to track
                activity on our service and store certain information. You can
                instruct your browser to refuse cookies, but some features may
                not work properly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Third-Party Services
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                Our service may contain links to other sites or use third-party
                services (such as Google AdSense). This privacy policy does not
                apply to third-party sites or services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
            <div className="space-y-3 text-foreground">
              <p>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Children's Privacy
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                Our service does not address anyone under the age of 13. We do
                not knowingly collect personal information from children under
                13.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Changes to Privacy Policy
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <div className="space-y-3 text-foreground">
              <p>
                If you have any questions about this Privacy Policy, please
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
