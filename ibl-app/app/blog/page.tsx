import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-16">
      <SectionHeading
        eyebrow="Blog & News"
        heading="Practice updates, caregiver stories, and advocacy notes"
        description="Bookmark this feed for the latest from the Institute for Behavior and Learning."
      />
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="card space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {new Date(post.publishedAt).toLocaleDateString()} · {post.author}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-slate-600">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-indigo-600">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
