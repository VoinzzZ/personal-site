"use client";

import { useRef, useState, useEffect } from "react";
import TypingHeading from "@/components/effects/TypingHeading";
import FadeIn from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function CareersSection() {
  const { messages } = useLanguage();
  const experiences = messages.careers.experiences;
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] py-20 sm:py-24 px-4 scroll-mt-20"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section number */}
        <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest text-left">
          // 02
        </div>

        {/* Headline */}
        <div className="mb-6 text-left">
          <TypingHeading text="LS -LA /CAREERS/EXPERIENCE" inView={inView} />
        </div>

        {/* Career cards — staggered fade per card */}
        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp, idx) => (
              <FadeIn key={idx} visible={inView} delay={600 + idx * 200}>
                <div className="border border-white/10 rounded-lg bg-[#1a1a1a] px-4 py-5 sm:p-6 hover:border-purple-400/50 transition-colors">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-white font-mono">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gray-400 font-mono mt-0.5">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">
                      {exp.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-400 font-mono flex items-start gap-2"
                      >
                        <span className="text-purple-400 mt-0.5 shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))
          ) : (
            <FadeIn visible={inView} delay={600}>
              <div className="border border-dashed border-gray-700 rounded-lg p-12 text-center">
                <p className="text-gray-500 font-mono text-base mb-4">
                  <span className="text-yellow-500">$</span> {messages.careers.empty}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-gray-400 font-mono text-sm">
                    {messages.careers.open}
                  </span>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
