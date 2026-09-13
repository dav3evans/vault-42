import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, Tag } from "@vault42/ui";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHeader eyebrow={post.category} heading={post.title} description={`${formatDate(post.date)} · ${post.excerpt}`} />
      <article className="mx-auto max-w-3xl px-3.5 py-16">
        <Tag tone="muted" className="mb-6 block">
          {formatDate(post.date)}
        </Tag>
        <div className="grid gap-5">
          {post.body.map((paragraph, index) => (
            <p key={index} className="text-[1.03rem] leading-[1.85] text-text/78">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
