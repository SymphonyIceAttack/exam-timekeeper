"use client";

import { ChevronRight, Home, Languages } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LanguageType } from "@/lib/translations";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showLanguageSwitch?: boolean;
}

const languages: { code: LanguageType; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export function Breadcrumb({
  items,
  className = "",
  showLanguageSwitch = false,
}: BreadcrumbProps) {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = params.lang as LanguageType;

  const getLanguagePath = (newLang: LanguageType) => {
    if (!pathname) {
      // Default to root path for English
      return newLang === "en" ? "/" : `/${newLang}`;
    }

    if (newLang === "en") {
      // For English, navigate to root path
      const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "");
      return pathWithoutLang || "/";
    }

    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "");
    return `/${newLang}${pathWithoutLang || ""}`;
  };

  const getHomePath = () => {
    if (currentLang === "en") {
      return "/";
    }
    return `/${currentLang}`;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
    >
      <Link
        href={getHomePath()}
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}

      {showLanguageSwitch && (
        <>
          <ChevronRight className="w-4 h-4 mx-1" />
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center">
              {/* Use dropdown menu instead of direct links */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs font-normal text-muted-foreground hover:text-foreground"
                  >
                    {languages.find((l) => l.code === currentLang)?.flag ||
                      "🌐"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-background min-w-[160px]"
                >
                  {languages.map((language) => (
                    <DropdownMenuItem key={language.code} asChild>
                      <Link
                        href={getLanguagePath(language.code)}
                        className={`cursor-pointer w-full flex items-center px-2 py-1.5 text-sm ${
                          currentLang === language.code ? "bg-accent" : ""
                        }`}
                      >
                        <span className="mr-2 text-base">{language.flag}</span>
                        <span>{language.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
