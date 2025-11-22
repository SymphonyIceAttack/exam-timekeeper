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
          <p className="text-muted--foreground">
            Last updated: November 23, 2025
          </p>
        </div>

        <Card className="bg-card border-border p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. What Are Cookies</h2>
            <div className="space-y-3 text-foreground">
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile) when you visit a website. They are
                widely used to make websites work more efficiently and provide
                information to the website owners.
              </p>
              <p>
                Cookies enhance user experience by remembering your preferences,
                analyzing website traffic, and personalizing content and
                advertisements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Cookies
            </h2>
            <div className="space-y-3 text-foreground">
              <p>Exam TimeKeeper uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are
                  necessary for the website to function properly and cannot be
                  switched off in our systems.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us
                  understand how visitors interact with our website by
                  collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies enable the
                  website to remember information that changes the way the
                  website behaves or looks.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> These cookies may be
                  used to deliver advertisements more relevant to you and your
                  interests.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-2">Session Cookies</h3>
                <p>
                  These cookies are temporary and are deleted when you close
                  your browser. They are essential for the website to function
                  properly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Persistent Cookies
                </h3>
                <p>
                  These cookies remain on your device for a set period or until
                  you delete them. They help us recognize you when you return to
                  our website.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  First-Party Cookies
                </h3>
                <p>
                  These cookies are set by Exam TimeKeeper and can only be read
                  by our website.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Third-Party Cookies
                </h3>
                <p>
                  These cookies are set by external services we use, such as
                  Google Analytics or advertising networks.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies We Use</h2>
            <div className="space-y-3 text-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-2">Google Analytics</h3>
                <p>
                  We use Google Analytics to analyze website traffic and user
                  behavior. This helps us improve our website and understand how
                  users interact with our content.
                </p>
                <p className="mt-2">
                  <strong>Cookies:</strong> _ga, _ga_*, _gid, _gat
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Google AdSense</h3>
                <p>
                  We use Google AdSense to display advertisements on our
                  website. Google may use cookies to serve ads based on your
                  previous visits to our website or other websites.
                </p>
                <p className="mt-2">
                  <strong>Cookies:</strong> id, IDE, test_cookie
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Theme Preference</h3>
                <p>
                  These cookies remember your theme preference (dark or light
                  mode) so you don't need to select it each time you visit.
                </p>
                <p className="mt-2">
                  <strong>Cookies:</strong> next-theme
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Managing Cookies</h2>
            <div className="space-y-3 text-foreground">
              <p>You have several options for managing cookies:</p>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">Browser Settings</h3>
                  <p>Most web browsers allow you to:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block cookies from being set</li>
                    <li>Block third-party cookies only</li>
                    <li>Receive a warning before a cookie is set</li>
                  </ul>
                  <p className="mt-2">
                    <strong>How to manage cookies in popular browsers:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>
                      <strong>Chrome:</strong> Settings → Privacy and security →
                      Cookies and other site data
                    </li>
                    <li>
                      <strong>Firefox:</strong> Settings → Privacy & Security →
                      Cookies and Site Data
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferences → Privacy → Manage
                      Website Data
                    </li>
                    <li>
                      <strong>Edge:</strong> Settings → Cookies and site
                      permissions → Cookies and site data
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Opt-Out Tools</h3>
                  <p>
                    You can opt out of specific tracking and advertising
                    cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>
                      <strong>Google Analytics:</strong>{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>
                    </li>
                    <li>
                      <strong>Google AdSense:</strong>{" "}
                      <a
                        href="https://adssettings.google.com"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Ad Settings
                      </a>
                    </li>
                    <li>
                      <strong>Network Advertising Initiative:</strong>{" "}
                      <a
                        href="http://optout.networkadvertising.org"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NAI Opt-Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Impact of Blocking Cookies
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                Please note that blocking cookies may impact your experience on
                our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You may need to re-enter preferences each time you visit
                </li>
                <li>Some website features may not function properly</li>
                <li>
                  Personalized content and recommendations may not be available
                </li>
                <li>
                  You may see generic advertisements instead of relevant ones
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Updates to This Policy
            </h2>
            <div className="space-y-3 text-foreground">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We encourage you to review this policy
                periodically.
              </p>
              <p>
                Any changes to this policy will be posted on this page with an
                updated "Last updated" date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <div className="space-y-3 text-foreground">
              <p>
                If you have any questions about our Cookie Policy or how we use
                cookies, please contact us at:
              </p>
              <p className="font-medium">Email: contact@exam-timekeeper.top</p>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
