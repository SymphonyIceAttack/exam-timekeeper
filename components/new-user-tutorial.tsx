"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";
import { cn } from "@/lib/utils";

interface TutorialStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image?: string;
}

interface NewUserTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  lang: LanguageType;
}

export function NewUserTutorial({
  isOpen,
  onClose,
  onComplete,
  lang,
}: NewUserTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Define tutorial steps inside the component to access lang
  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: t("tutorial.welcome.title", lang),
      subtitle: t("tutorial.welcome.subtitle", lang),
      description: t("tutorial.welcome.description", lang),
      beforeAfter: {
        before: t("tutorial.welcome.before", lang),
        after: t("tutorial.welcome.after", lang),
      },
      features: t("tutorial.welcome.features", lang).split("\n"),
      icon: BookOpen,
    },
    {
      id: 2,
      title: t("tutorial.quickstart.title", lang),
      subtitle: t("tutorial.quickstart.subtitle", lang),
      description: t("tutorial.quickstart.description", lang),
      beforeAfter: {
        before: t("tutorial.quickstart.before", lang),
        after: t("tutorial.quickstart.after", lang),
      },
      features: t("tutorial.quickstart.features", lang).split("\n"),
      icon: Target,
    },
    {
      id: 3,
      title: t("tutorial.advanced.title", lang),
      subtitle: t("tutorial.advanced.subtitle", lang),
      description: t("tutorial.advanced.description", lang),
      beforeAfter: {
        before: t("tutorial.advanced.before", lang),
        after: t("tutorial.advanced.after", lang),
      },
      features: t("tutorial.advanced.features", lang).split("\n"),
      icon: Zap,
    },
  ];

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsCompleted(false);
    }
  }, [isOpen]);

  // Reset state when dialog is closed and reopened
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsCompleted(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  const handleClose = () => {
    if (isCompleted) {
      onComplete();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          {isCompleted
            ? "Tutorial Completed"
            : `Tutorial Step ${currentStep + 1}`}
        </DialogTitle>
        {!isCompleted ? (
          <>
            {/* Header - Fixed */}
            <div className="flex-shrink-0 relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{step.title}</h1>
                  <p className="text-blue-100">{step.subtitle}</p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index <= currentStep ? "bg-white" : "bg-white/30",
                      index === currentStep ? "w-8" : "w-2",
                    )}
                  />
                ))}
                <span className="text-sm text-blue-100 ml-2">
                  {currentStep + 1} / {tutorialSteps.length}
                </span>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left column - Description */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">
                        {t("tutorial.coreFeatures", lang)}
                      </h3>
                      <ul className="space-y-2">
                        {step.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {t("tutorial.benefits.title", lang)}
                      </h4>
                      <div className="text-sm text-green-700 space-y-1">
                        {t("tutorial.benefits", lang)
                          .split("\n")
                          .map((benefit, index) => (
                            <div key={index}>{benefit}</div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Right column - Before/After */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        {t("tutorial.beforeAfter", lang)}
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        {/* Before */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {t("tutorial.beforeTitle", lang)}
                          </h4>
                          <pre className="text-xs text-red-700 whitespace-pre-line font-mono">
                            {step.beforeAfter.before}
                          </pre>
                        </div>

                        {/* After */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            {t("tutorial.afterTitle", lang)}
                          </h4>
                          <pre className="text-xs text-green-700 whitespace-pre-line font-mono">
                            {step.beforeAfter.after}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">
                        {t("tutorial.platformStats", lang)}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            5+
                          </div>
                          <div className="text-xs text-blue-700">
                            {t("tutorial.stats.exams", lang)}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            24/7
                          </div>
                          <div className="text-xs text-blue-700">
                            {t("tutorial.stats.updates", lang)}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            100%
                          </div>
                          <div className="text-xs text-blue-700">
                            {t("tutorial.stats.sources", lang)}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            ∞
                          </div>
                          <div className="text-xs text-blue-700">
                            {t("tutorial.stats.free", lang)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="flex-shrink-0 border-t bg-gray-50 p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {currentStep > 0 ? (
                    <Button
                      variant="outline"
                      onClick={handlePrev}
                      type="button"
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t("tutorial.prev", lang)}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={handleSkip}
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {t("tutorial.skip", lang)}
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {currentStep + 1} / {tutorialSteps.length}
                  </span>
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {isLastStep
                      ? t("tutorial.startUsing", lang)
                      : t("tutorial.next", lang)}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Completion State - Full height for centered content */
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("tutorial.completed.title", lang)}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {t("tutorial.completed.description", lang)}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleClose}
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  {t("tutorial.completed.button", lang)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
