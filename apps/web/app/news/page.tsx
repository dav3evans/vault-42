import type { Metadata } from "next";
import { PageHeader, BlogPostCard } from "@vault42/ui";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News",
  description: "Event announcements, behind-the-scenes updates and community stories from Vault 42.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="News"
        heading="What's happening at the Vault"
        description="Event announcements, build progress and stories from the people who visit."
      />
      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              category={post.category}
              date={formatDate(post.date)}
              title={post.title}
              excerpt={post.excerpt}
              href={`/news/${post.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
