import type { LanguageType } from "./translation";

/**
 * Supported language locales for the application
 */
export const supportedLocales: LanguageType[] = ["zh", "fr", "es", "ru", "de"];

/**
 * Default language for the application
 */
export const defaultLocale: LanguageType = "en";

/**
 * All available languages including default
 */
export const allLanguages: LanguageType[] = [
  defaultLocale,
  ...supportedLocales,
];

/**
 * Language display names with native scripts
 */
export const languageNames: Record<LanguageType, string> = {
  en: "English",
  zh: "中文",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
};

/**
 * Language flags for display
 */
export const languageFlags: Record<LanguageType, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  fr: "🇫🇷",
  es: "🇪🇸",
  ru: "🇷🇺",
  de: "🇩🇪",
};
