"use client";

import { Languages } from "lucide-react";
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

const languages: { code: LanguageType; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export function LanguageSwitcher({
  isFixed = false,
  useLanguagePrefix = true,
}: {
  isFixed?: boolean;
  useLanguagePrefix?: boolean;
}) {
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

    if (useLanguagePrefix) {
      // For language-specific paths: /en/posts -> /zh/posts
      const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "");
      return `/${newLang}${pathWithoutLang || ""}`;
    } else {
      // For default paths: /posts -> /zh/posts
      return `/${newLang}${pathname}`;
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  const buttonClass = isFixed
    ? "fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
    : "bg-background border-border hover:bg-accent";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={buttonClass}>
          <Languages className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-background/95 backdrop-blur-sm min-w-[180px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            asChild
            className={currentLang === language.code ? "bg-accent" : ""}
          >
            <Link
              href={getLanguagePath(language.code)}
              className="cursor-pointer w-full flex items-center px-2 py-1.5"
            >
              <span className="mr-3 text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
