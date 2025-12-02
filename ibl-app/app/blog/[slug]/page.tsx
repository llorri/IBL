import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface BlogProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: `${post.title} | Institute for Behavior and Learning`,
    description: post.excerpt,
  };
}

export default async function BlogDetail({ params }: BlogProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return notFound();
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-16">
      <Link href="/blog" className="text-sm font-semibold text-indigo-600">
        ← Back to all posts
      </Link>
      <article className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString()} · {post.author}
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">{post.title}</h1>
        <p className="text-lg text-slate-600">{post.excerpt}</p>
        <div className="space-y-4 text-base text-slate-700">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
