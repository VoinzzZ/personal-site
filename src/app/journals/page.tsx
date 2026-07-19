"use client";

import { useState, useEffect, type ReactNode } from "react";
import TypingHeading from "@/components/effects/TypingHeading";
import {
  SiTypescript,
  SiGo,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiMongodb,
  SiMysql,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { TbBrandPowershell } from "react-icons/tb";
import { VscTerminalCmd } from "react-icons/vsc";
import { SiGnubash } from "react-icons/si";

const stackIcons: Record<string, ReactNode> = {
  TypeScript: <SiTypescript />,
  Go: <SiGo />,
  "Node.js": <SiNodedotjs />,
  Express: <SiExpress />,
  React: <SiReact />,
  MongoDB: <SiMongodb />,
  MySQL: <SiMysql />,
  Bash: <SiGnubash />,
  PowerShell: <TbBrandPowershell />,
  CMD: <VscTerminalCmd />,
};

const stackColors: Record<string, string> = {
  TypeScript: "#3178C6",
  Go: "#00ADD8",
  "Node.js": "#339933",
  Express: "#FFFFFF",
  React: "#61DAFB",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  Bash: "#4EAA25",
  PowerShell: "#5391FE",
  CMD: "#4D4D4D",
};

interface BlogMeta {
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image: string;
  github?: string;
  stack: string[];
}

interface Post {
  metadata: BlogMeta;
  slug: string;
}

const cardHoverBorders: Record<string, string> = {
  "Node.js": "hover:border-cyan-400/50 hover:shadow-[0_0_20px_-5px_#22d3ee]",
  Go: "hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_#60a5fa]",
  Fullstack: "hover:border-green-400/50 hover:shadow-[0_0_20px_-5px_#4ade80]",
};

function FlipCard({ post }: { post: Post }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative h-80 sm:h-95 perspective-[1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Inner */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-3d ${
          flipped ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT — hanya judul */}
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
          <div className="p-4 flex flex-col justify-center min-h-0">
            <h3 className="text-sm font-semibold text-white font-mono group-hover:text-cyan-400 transition-colors">
              {post.metadata.title}
            </h3>
            {/* Stack icons */}
            {post.metadata.stack && post.metadata.stack.length > 0 && (
              <div className="flex items-center gap-3 mt-3">
                {post.metadata.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-lg"
                    style={{ color: stackColors[tech] || "#888" }}
                    title={tech}
                  >
                    {stackIcons[tech] || null}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 border border-white/10 rounded-lg bg-[#1a1a1a] backface-hidden transform-[rotateY(180deg)] flex flex-col items-center justify-center p-4 sm:p-6 gap-4 sm:gap-6">
          <h3 className="text-lg font-semibold text-white font-mono text-center line-clamp-3 px-4 leading-tight">
            {post.metadata.title}
          </h3>

          <div className="flex flex-col gap-3 w-full max-w-full sm:max-w-50">
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
    <section className="min-h-screen py-10 sm:py-20 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Headline dengan typing effect */}
        <div className="mb-2">
          <TypingHeading text="$ LS -LA /JOURNALS" inView={true} />
        </div>
        <p className="text-gray-500 font-mono text-sm mt-1 mb-6 sm:mb-10">
          Total entries: {loading ? "..." : posts.length}
        </p>

        {/* Back link — desktop di atas */}
        <div className="hidden md:block mb-8">
          <a
            href="/#journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">cd ..</span>
            <span className="text-cyan-400"> →</span>
          </a>
        </div>

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

        {/* Back link — mobile di bawah */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="/#journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">cd ..</span>
            <span className="text-cyan-400"> →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
