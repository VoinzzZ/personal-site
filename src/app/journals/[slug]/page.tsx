import { notFound } from "next/navigation";
import { Metadata } from "next";
import { findPostBySlug, getPosts } from "@/lib/blog";
import { CustomMDX } from "@/components/shared/MdxRenderer";
import ScrambledContent from "@/components/shared/ScrambledContent";
import TerminalPrompt from "./TerminalPrompt";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.metadata.title} — Journals`,
    description: post.metadata.summary,
  };
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tagColors: Record<string, string> = {
    "Node.js": "text-cyan-400 border-cyan-500/30",
    Go: "text-blue-400 border-blue-500/30",
    Fullstack: "text-green-400 border-green-500/30",
  };

  return (
    <article className="min-h-screen py-10 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back link — desktop di atas */}
        <div className="hidden md:block mb-10">
          <a
            href="/journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">ls</span>
            <span className="text-cyan-400"> →</span>
          </a>
        </div>

        {/* Header di luar terminal */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-mono text-gray-500">
              {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-gray-600">/</span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded border ${
                tagColors[post.metadata.tag] || "text-gray-400 border-gray-600"
              }`}
            >
              {post.metadata.tag}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-mono leading-tight">
            {post.metadata.title}
          </h1>
        </div>

        {/* Featured image di luar terminal */}
        {post.metadata.image && (
          <div className="mb-10">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full rounded-lg border border-white/10"
            />
          </div>
        )}

        {/* macOS-style terminal window — hanya teks */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#1a1a1a]">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#252525] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-gray-500 font-mono">
              {post.slug}.md — terminal
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-4 sm:px-6 md:px-10 py-6 md:py-8">
            {/* Prompt line */}
            <div className="font-mono text-sm md:text-base mb-6">
              <TerminalPrompt />
              <span className="text-gray-400"> cat {post.slug}.md</span>
            </div>

            {/* Content */}
            <ScrambledContent>
              <CustomMDX source={post.content} />
            </ScrambledContent>
          </div>
        </div>

        {/* Back link — mobile di bawah */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="/journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">ls</span>
            <span className="text-cyan-400"> →</span>
          </a>
        </div>
      </div>
    </article>
  );
}
