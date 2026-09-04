"use client";

import Link from "next/link";
import TypingHeading from "@/components/effects/TypingHeading";
import FlipCard from "@/components/journals/FlipCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { BlogPost } from "@/lib/blog";

type PostListItem = Pick<BlogPost, "metadata" | "slug">;

export default function JournalsPageContent({ posts }: { posts: PostListItem[] }) {
  const { messages } = useLanguage();

  return (
    <section className="min-h-screen py-10 sm:py-20 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-2">
          <TypingHeading text="$ LS -LA /JOURNALS" inView={true} />
        </div>
        <p className="text-gray-500 font-mono text-sm mt-1 mb-2">
          {messages.journals.total(posts.length)}
        </p>
        <p className="text-gray-600 font-mono text-xs mb-6 sm:mb-10">
          {messages.journals.sourceLanguage}
        </p>

        <div className="mb-8">
          <BackLink />
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <FlipCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-500 font-mono text-base">
              <span className="text-yellow-500">$</span> {messages.journals.empty}
            </p>
          </div>
        )}

        <div className="flex justify-center md:justify-end mt-8">
          <BackLink />
        </div>
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <Link
      href="/#journals"
      className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
    >
      <span className="text-cyan-400">root@personal-site:~/journals$</span>
      <span className="text-white">cd ..</span>
      <span className="text-cyan-400"> →</span>
    </Link>
  );
}
