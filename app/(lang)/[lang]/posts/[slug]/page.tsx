import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownWithIds } from "@/components/blog/markdown-with-ids";
import { PostCTA } from "@/components/blog/post-cta";
import { RecentPosts } from "@/components/blog/recent-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import directus from "@/lib/directus";
import type { LanguageType } from "@/lib/translation";

const supportedLocales: LanguageType[] = ["zh", "fr", "es", "ru", "de"];

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const { isEnabled } = await draftMode();

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
          language: {
            _eq: lang,
          },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "content",
          "status",
          "imageurl",
          "language",
        ],
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      notFound();
    }

    const { title, content, description, published_at, imageurl } = post;

    const recentPosts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
          slug: { _neq: slug },
          language: { _eq: lang },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "language",
        ],
        sort: ["-published_at"],
        limit: 6,
      }),
    );

    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
          <Breadcrumb
            items={[
              {
                label: "Blog",
                href: lang === "en" ? "/posts" : `/${lang}/posts`,
              },
              { label: title },
            ]}
            className="mb-6"
            showLanguageSwitch
          />

          {isEnabled && (
            <Card className="mb-6 border-destructive/50 bg-destructive/5">
              <CardContent className="py-3">
                <p className="text-sm font-medium text-destructive">
                  Draft mode enabled - You are previewing unpublished content
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            <article className="flex-1 min-w-0">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-bold mb-2 text-balance">
                    {title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {description && (
                    <p className="text-lg text-muted-foreground mt-4 text-pretty">
                      {description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  {imageurl && (
                    <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                      <Image
                        fill={true}
                        src={`https://exam-timekeeper.top/${imageurl}`}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <MarkdownWithIds content={content} />
                </CardContent>
              </Card>

              <div className="mt-8">
                <PostCTA />
              </div>

              <div className="mt-8">
                <RecentPosts
                  posts={recentPosts}
                  lang={lang}
                  useLanguagePrefix={lang !== "en"}
                />
              </div>
            </article>

            <aside className="w-full md:w-64 shrink-0">
              <TableOfContents content={content} />
            </aside>
          </div>

          <footer className="border-t border-border mt-12 md:mt-20 py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/help"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Help & FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                © 2025 TimeKeeper | Built by symphoneiceattack
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  } catch (error) {
    console.error("[symphoneiceattack] Error fetching post:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "language"],
        limit: -1,
      }),
    );

    // Generate static params for all language-slug combinations
    return posts
      .filter((post) =>
        supportedLocales.includes(post.language as LanguageType),
      )
      .map((post) => ({
        lang: post.language,
        slug: post.slug,
      }));
  } catch (error) {
    console.error("[symphoneiceattack] Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
          language: {
            _eq: lang,
          },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "content",
          "status",
          "imageurl",
          "language",
        ],
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      return {
        title: "Post not found",
      };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post not found",
    };
  }
}
