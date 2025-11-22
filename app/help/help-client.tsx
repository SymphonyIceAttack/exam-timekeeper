"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Question {
  q: string;
  a: string;
}

interface FAQSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  questions: Question[];
}

interface HelpClientProps {
  faqSections: FAQSection[];
}

export function HelpClient({ faqSections }: HelpClientProps) {
  const [openSection, setOpenSection] = useState<string | null>("general");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="grid gap-4 md:gap-6">
      {faqSections.map((section) => (
        <Card
          key={section.id}
          className="bg-card border-border overflow-hidden"
        >
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-primary">{section.icon}</div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div
              className={`transform transition-transform ${openSection === section.id ? "rotate-180" : ""}`}
            >
              ▼
            </div>
          </button>
          {openSection === section.id && (
            <div className="px-6 pb-6 space-y-4 border-t border-border">
              {section.questions.map((faq, index) => (
                <div key={index} className="pt-4">
                  <h3 className="font-semibold mb-2 text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
