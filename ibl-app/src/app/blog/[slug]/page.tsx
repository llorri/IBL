import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const revalidate = 0;

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-cyan-200">{formatDate(post.publishedAt)}</p>
      <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
      <p className="mt-4 text-lg text-white/80">{post.excerpt}</p>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-white/80">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={`${post.slug}-${index}`}>{paragraph}</p>
        ))}
      </div>
      <Link href="/blog" className="mt-10 inline-flex text-sm font-semibold text-cyan-200">
        ← Back to news
      </Link>
    </div>
  );
}
