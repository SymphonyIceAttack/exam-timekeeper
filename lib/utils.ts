import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Site configuration
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Exam Timekeeper",
  description:
    "Never miss an important exam date again. Real-time countdowns for standardized tests.",
};

// Helper function to get absolute URLs for site links
export function getSiteUrl(path: string = ""): string {
  const baseUrl = siteConfig.url;
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
