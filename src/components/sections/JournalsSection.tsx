"use client";

import { useRef, useState, useEffect } from "react";
import TypingHeading from "@/components/effects/TypingHeading";

interface BlogMeta {
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image: string;
}

interface Post {
  metadata: BlogMeta;
  slug: string;
}

export default function JournalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
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

  // IntersectionObserver — trigger typing animation on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      id="journals"
      className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] py-10 sm:py-20 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section number */}
        <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest text-left">
          // 03
        </div>

        {/* Headline */}
        <div className="mb-6 text-left">
          <TypingHeading text="$ HEAD -N 3 /JOURNALS" inView={inView} />
        </div>

        <div className="mb-4 text-right hidden md:block">
          <a
            href="/journals"
            className="group font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span className="text-cyan-400">root@personal-site:~/</span>
            <span className="text-gray-400 group-hover:text-white transition-colors">cd /journals/</span>
            <span className="text-gray-500 group-hover:text-cyan-400 transition-colors"> →</span>
          </a>
        </div>

        {/* Journal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg bg-[#1a1a1a] p-5 animate-pulse"
              >
                <div className="h-4 w-16 bg-white/10 rounded mb-3" />
                <div className="h-5 w-full bg-white/10 rounded mb-2" />
                <div className="h-4 w-3/4 bg-white/10 rounded" />
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
              <a
                key={post.slug}
                href={`/journals/${post.slug}`}
                className="group block border border-white/10 rounded-lg bg-[#1a1a1a] p-5 hover:border-cyan-400/50 transition-colors hover:shadow-[0_0_20px_-5px_#22d3ee]"
              >
                {/* Type badge */}
                <span
                  className={`inline-block text-xs font-mono px-2 py-0.5 rounded border mb-3 ${
                    tagColors[post.metadata.tag] || "text-gray-400 border-gray-600"
                  }`}
                >
                  {tagLabels[post.metadata.tag] || "Blog"}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-white font-mono mb-2 line-clamp-2">
                  {post.metadata.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 font-mono leading-relaxed line-clamp-3">
                  {post.metadata.summary}
                </p>
              </a>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-gray-700 rounded-lg p-12 text-center">
              <p className="text-gray-500 font-mono text-base">
                <span className="text-yellow-500">$</span> No entries yet —
                currently building...
              </p>
            </div>
          )}
        </div>

        {/* Mobile: cd /journals/ link di bawah grid */}
        <div className="mt-6 text-center md:hidden">
          <a
            href="/journals"
            className="font-mono text-xs text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">root@personal-site:~/</span>
            <span className="text-white">cd /journals/</span>
            <span className="text-cyan-400"> →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
