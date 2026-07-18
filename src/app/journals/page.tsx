"use client";

import { useState, useEffect } from "react";
import TypingHeading from "@/components/effects/TypingHeading";

interface BlogMeta {
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image: string;
  github?: string;
}

interface Post {
  metadata: BlogMeta;
  slug: string;
}

const tagLabels: Record<string, string> = {
  "Node.js": "Node.js",
  Go: "Go",
  Fullstack: "Fullstack",
};

const tagColors: Record<string, string> = {
  "Node.js": "text-cyan-400 border-cyan-500/30",
  Go: "text-blue-400 border-blue-500/30",
  Fullstack: "text-green-400 border-green-500/30",
};

const tagHoverColors: Record<string, string> = {
  "Node.js": "group-hover:bg-cyan-400 group-hover:text-black",
  Go: "group-hover:bg-blue-400 group-hover:text-black",
  Fullstack: "group-hover:bg-green-400 group-hover:text-black",
};

const cardHoverBorders: Record<string, string> = {
  "Node.js": "hover:border-cyan-400/50 hover:shadow-[0_0_20px_-5px_#22d3ee]",
  Go: "hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_#60a5fa]",
  Fullstack: "hover:border-green-400/50 hover:shadow-[0_0_20px_-5px_#4ade80]",
};

function FlipCard({ post }: { post: Post }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative h-95 perspective-[1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Inner */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-3d ${
          flipped ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 border border-white/10 rounded-lg bg-[#1a1a1a] overflow-hidden backface-hidden ${cardHoverBorders[post.metadata.tag] || "hover:border-cyan-400/50"} transition-all`}
        >
          {post.metadata.image && (
            <div className="w-full aspect-video overflow-hidden border-b border-white/5">
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`inline-block text-xs font-mono px-2 py-0.5 rounded border transition-colors duration-300 ${
                  tagColors[post.metadata.tag] || "text-gray-400 border-gray-600"
                } ${tagHoverColors[post.metadata.tag] || ""}`}
              >
                {tagLabels[post.metadata.tag] || "Blog"}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white font-mono mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {post.metadata.title}
            </h3>
            <p className="text-sm text-gray-400 font-mono leading-relaxed line-clamp-3">
              {post.metadata.summary}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 border border-white/10 rounded-lg bg-[#1a1a1a] backface-hidden transform-[rotateY(180deg)] flex flex-col items-center justify-center p-6 gap-6">
          <h3 className="text-lg font-semibold text-white font-mono text-center line-clamp-3 px-4 leading-tight">
            {post.metadata.title}
          </h3>

          <div className="flex flex-col gap-3 w-full max-w-50">
            {post.metadata.github && (
              <a
                href={post.metadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-transparent border border-gray-500 text-gray-400 font-mono text-sm font-semibold text-center hover:bg-gray-500 hover:text-white transition-all duration-300 rounded-none flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>github</span>
              </a>
            )}
            <a
              href={`/journals/${post.slug}`}
              className="w-full py-2.5 px-4 bg-transparent border border-cyan-400 text-cyan-300 font-mono text-sm font-semibold text-center hover:bg-cyan-400 hover:text-black transition-all duration-300 rounded-none"
            >
              $ cat README.md
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JournalsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Headline dengan typing effect */}
        <div className="mb-2">
          <TypingHeading text="$ LS -LA /JOURNALS" inView={true} />
        </div>
        <p className="text-gray-500 font-mono text-sm mt-1 mb-10">
          Total entries: {loading ? "..." : posts.length}
        </p>

        {/* Back link */}
        <a
          href="/#journals"
          className="group inline-flex items-center gap-1 font-mono text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <span className="text-cyan-400">root@personal-site:~/journals$</span>
          <span className="text-gray-400 group-hover:text-white transition-colors">cd ..</span>
          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors"> →</span>
        </a>

        {/* Posts grid — 2 columns */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg bg-[#1a1a1a] overflow-hidden animate-pulse h-95"
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-16 bg-white/10 rounded" />
                  <div className="h-5 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <FlipCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-500 font-mono text-base">
              <span className="text-yellow-500">$</span> No entries yet — currently
              building...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
