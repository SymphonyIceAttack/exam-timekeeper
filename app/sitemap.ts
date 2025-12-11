import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import directus from "@/lib/directus";
import type { LanguageType } from "@/lib/translations";

export const revalidate = 86400; // 24 hours in seconds

const supportedLocales: LanguageType[] = ["en", "zh", "fr", "es", "ru", "de"];

const staticRoutes = [
  "/",
  "/posts",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/help",
  "/countdown",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://exam-timekeeper.top";

  try {
    const staticPages: MetadataRoute.Sitemap = [];

    // Generate static pages for all languages
    supportedLocales.forEach((lang) => {
      staticRoutes.forEach((route) => {
        // For English (en), use root paths; for other languages, use language prefix
        const localizedRoute =
          lang === "en"
            ? route
            : route === "/"
              ? `/${lang}`
              : `/${lang}${route}`;

        staticPages.push({
          url: `${baseUrl}${localizedRoute}`,
          lastModified: new Date(),
          changeFrequency:
            route === "/" ? ("monthly" as const) : ("weekly" as const),
          priority: route === "/" ? 1.0 : 0.8,
          alternates: {
            languages: supportedLocales.reduce(
              (acc, locale) => {
                const alternateRoute =
                  locale === "en"
                    ? route
                    : route === "/"
                      ? `/${locale}`
                      : `/${locale}${route}`;
                acc[locale] = `${baseUrl}${alternateRoute}`;
                return acc;
              },
              {} as Record<string, string>,
            ),
          },
        });
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
      if (supportedLocales.includes(lang as LanguageType)) {
        langPosts.forEach((post) => {
          // For English (en), use root paths; for other languages, use language prefix
          const postRoute =
            lang === "en"
              ? `/posts/${post.slug}`
              : `/${lang}/posts/${post.slug}`;

          postEntries.push({
            url: `${baseUrl}${postRoute}`,
            lastModified: new Date(post.date_updated || post.published_at),
            changeFrequency: "weekly" as const,
            priority: lang === "en" ? 0.8 : 0.7,
            alternates: {
              languages: supportedLocales.reduce(
                (acc, locale) => {
                  const alternateRoute =
                    locale === "en"
                      ? `/posts/${post.slug}`
                      : `/${locale}/posts/${post.slug}`;
                  acc[locale] = `${baseUrl}${alternateRoute}`;
                  return acc;
                },
                {} as Record<string, string>,
              ),
            },
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
