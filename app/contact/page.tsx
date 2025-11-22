import { Headphones, Mail, MessageSquare, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us | Exam TimeKeeper",
  description:
    "Get in touch with the Exam TimeKeeper team. We're here to help with your questions and feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <Breadcrumb items={[{ label: "Contact Us" }]} className="mb-6" />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from
            you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card border-border p-8">
            <div className="text-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
              <p className="text-muted-foreground">
                Send us an email and we'll respond within 24 hours
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">General Inquiries</p>
                <a
                  href="mailto:contact@exam-timekeeper.top"
                  className="text-primary hover:underline"
                >
                  contact@exam-timekeeper.top
                </a>
              </div>
              <div>
                <p className="font-medium mb-1">Bug Reports</p>
                <a
                  href="mailto:bugs@exam-timekeeper.top"
                  className="text-primary hover:underline"
                >
                  bugs@exam-timekeeper.top
                </a>
              </div>
              <div>
                <p className="font-medium mb-1">Feature Requests</p>
                <a
                  href="mailto:feedback@exam-timekeeper.top"
                  className="text-primary hover:underline"
                >
                  feedback@exam-timekeeper.top
                </a>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="text-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Check our FAQ section for quick answers
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/#faq">
                <Button variant="outline" className="w-full justify-start">
                  View FAQ on Homepage
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                The homepage includes comprehensive answers to common questions
                about exam data, how to use the service, and more.
              </p>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="text-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Support Hours</h2>
              <p className="text-muted-foreground">
                We're here to help during these hours
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 5:00 PM (EST)</p>
              <p className="font-medium mt-4">Saturday - Sunday</p>
              <p className="text-muted-foreground">10:00 AM - 2:00 PM (EST)</p>
            </div>
          </Card>

          <Card className="bg-card border-border p-8">
            <div className="text-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Community</h2>
              <p className="text-muted-foreground">
                Join our community of students and educators
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                Follow our blog for study tips, exam strategies, and the latest
                updates:
              </p>
              <Link href="/posts">
                <Button variant="outline" className="w-full justify-start">
                  Visit Our Blog
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Before You Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Please Check:</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Is your question answered in our FAQ section?</li>
                <li>
                  • Are you reporting a bug? Please include your browser and
                  steps to reproduce
                </li>
                <li>
                  • Is this about exam date accuracy? We fetch from official
                  sources
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When Contacting Us:</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Be as specific as possible</li>
                <li>• Include your device type and browser</li>
                <li>• Let us know if you're a student, educator, or parent</li>
                <li>• We appreciate feedback and suggestions!</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
