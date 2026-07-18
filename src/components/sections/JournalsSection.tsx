"use client";

import { useRef, useState, useEffect } from "react";
import TypingHeading from "@/components/effects/TypingHeading";

interface JournalEntry {
  title: string;
  description: string;
  tags: string[];
  type: "project" | "blog" | "certificate";
}

const journals: JournalEntry[] = [
  {
    title: "Coming Soon",
    description: "Projects, blogs, and certificates will appear here.",
    tags: [],
    type: "project",
  },
];

export default function JournalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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

  const typeLabels: Record<string, string> = {
    project: "Project",
    blog: "Blog",
    certificate: "Certificate",
  };

  const typeColors: Record<string, string> = {
    project: "text-cyan-400 border-cyan-500/30",
    blog: "text-green-400 border-green-500/30",
    certificate: "text-yellow-400 border-yellow-500/30",
  };

  return (
    <section
      ref={sectionRef}
      id="journals"
      className="flex flex-col items-center justify-center min-h-[75vh] py-20 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section number */}
        <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest text-left">
          // 03
        </div>

        {/* Headline */}
        <div className="mb-6 text-left">
          <TypingHeading text="LS -LA /JOURNALS" inView={inView} />
        </div>

        {/* Journal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journals.map((entry, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-lg bg-[#1a1a1a] p-5 hover:border-cyan-400/50 transition-colors hover:shadow-[0_0_20px_-5px_#22d3ee]"
            >
              {/* Type badge */}
              <span
                className={`inline-block text-xs font-mono px-2 py-0.5 rounded border mb-3 ${
                  typeColors[entry.type] || "text-gray-400 border-gray-600"
                }`}
              >
                {typeLabels[entry.type] || entry.type}
              </span>

              {/* Title */}
              <h3 className="text-base font-semibold text-white font-mono mb-2">
                {entry.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 font-mono leading-relaxed">
                {entry.description}
              </p>

              {/* Tags */}
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {entry.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Add placeholder cards if empty */}
          {journals.length === 0 && (
            <div className="col-span-full border border-dashed border-gray-700 rounded-lg p-12 text-center">
              <p className="text-gray-500 font-mono text-base">
                <span className="text-yellow-500">$</span> No entries yet —
                currently building...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
