import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">News & Blog</p>
        <h1 className="text-4xl font-semibold">Insights, updates, and family stories</h1>
        <p className="text-lg text-slate-200">
          Field notes from CALM implementation, vocational partnerships, and caregiver leadership across California.
        </p>
      </header>
      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-widest text-cyan-200">{formatDate(post.publishedAt)}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-3 text-sm text-white/80">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-cyan-200">
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
