import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import directus from "@/lib/directus";
import type { LanguageType } from "@/lib/translations";

export const revalidate = 86400; // 24 hours in seconds

const supportedLocales: LanguageType[] = ["zh", "fr", "es", "ru", "de"];

const staticRoutes = [
  "/",
  "/posts",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/help",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  try {
    const staticPages: MetadataRoute.Sitemap = [];

    // Generate static pages for all languages
    supportedLocales.forEach((lang) => {
      staticRoutes.forEach((route) => {
        // For default locale (en), use root paths
        const localizedRoute = route === "/" ? `/${lang}` : `/${lang}${route}`;

        staticPages.push({
          url: `${baseUrl}${localizedRoute}`,
          lastModified: new Date(),
          changeFrequency:
            route === "/" ? ("monthly" as const) : ("weekly" as const),
          priority: route === "/" ? 1.0 : 0.8,
        });
      });
    });

    // Add default locale routes without language prefix
    staticRoutes.forEach((route) => {
      staticPages.push({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency:
          route === "/" ? ("monthly" as const) : ("weekly" as const),
        priority: route === "/" ? 1.0 : 0.9, // Higher priority for default locale
      });
    });

    // Fetch all published posts from Directus for dynamic routes
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
        },
        fields: ["slug", "published_at", "date_updated", "language"],
        sort: ["-published_at"],
      }),
    );

    // Generate sitemap entries for all posts in their respective languages
    const postEntries: MetadataRoute.Sitemap = [];

    // Group posts by language
    const postsByLanguage = posts.reduce(
      (acc, post) => {
        const lang = post.language || "en";
        if (!acc[lang]) acc[lang] = [];
        acc[lang].push(post);
        return acc;
      },
      {} as Record<string, typeof posts>,
    );

    // Generate entries for each language
    Object.entries(postsByLanguage).forEach(([lang, langPosts]) => {
      if (lang === "en") {
        // English posts use root paths (no language prefix)
        langPosts.forEach((post) => {
          postEntries.push({
            url: `${baseUrl}/posts/${post.slug}`,
            lastModified: new Date(post.date_updated || post.published_at),
            changeFrequency: "weekly" as const,
            priority: 0.8, // Higher priority for default locale
          });
        });
      } else if (supportedLocales.includes(lang as LanguageType)) {
        // Non-English posts use language prefix
        langPosts.forEach((post) => {
          postEntries.push({
            url: `${baseUrl}/${lang}/posts/${post.slug}`,
            lastModified: new Date(post.date_updated || post.published_at),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          });
        });
      }
    });

    return [...staticPages, ...postEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal fallback if everything fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1.0,
      },
    ];
  }
}
