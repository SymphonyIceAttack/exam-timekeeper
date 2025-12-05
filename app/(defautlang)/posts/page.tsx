import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import directus from "@/lib/directus";

export const metadata: Metadata = {
  title: "Blog | Exam TimeKeeper",
  description:
    "Explore the latest articles and updates about exam preparation, time management, and test-taking strategies.",
};

export const revalidate = 86400;

export default async function BlogPage() {
  try {
    const posts = await directus.request(
      readItems("posts", {
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "status",
          "language",
        ],
        filter: {
          status: { _eq: "published" },
        },
        sort: ["-published_at"],
        limit: -1,
      }),
    );

    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
          <Breadcrumb items={[{ label: "Blog" }]} className="mb-6" />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Blog Posts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Explore our latest articles and updates about exam preparation,
              time management, and test-taking strategies
            </p>
          </div>

          {posts.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No posts published yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.map((post) => (
                <Link
                  scroll={false}
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group"
                >
                  <Card className="h-full bg-card border-border hover:bg-accent transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors text-balance">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 text-pretty">
                        {post.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

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
    console.error("[symphoneiceattack] Error fetching posts:", error);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
          <Breadcrumb items={[{ label: "Blog" }]} className="mb-6" />
          <Card className="bg-card border-border border-destructive/50">
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-destructive font-semibold">
                Error loading posts
              </p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              {!process.env.NEXT_PUBLIC_DIRECTUS_URL && (
                <p className="text-sm text-muted-foreground">
                  Please check if NEXT_PUBLIC_DIRECTUS_URL environment variable
                  is set
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
