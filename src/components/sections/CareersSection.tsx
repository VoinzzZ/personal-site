"use client";

import { useRef, useState, useEffect } from "react";
import TypingHeading from "@/components/effects/TypingHeading";
import FadeIn from "@/components/ui/FadeIn";

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    role: "Student — Software Engineering",
    company: "SMKN 2 Surabaya",
    location: "Surabaya, Indonesia",
    period: "2023 — 2026",
    highlights: [
      "Studied programming fundamentals and algorithmic problem-solving",
      "Learned database design, normalization, and query optimization",
      "Gained foundational knowledge in computer networking and server administration",
      "Built full-stack web applications through hands-on projects",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "PT Intidaya Energitama",
    location: "Surabaya, Indonesia",
    period: "May 2025 — Dec 2025",
    highlights: [
      "Contributed to building a PLC (Programmable Logic Controller) web monitoring application for PT Pupuk Utilitas Indonesia (PIU)",
      "Developed an early warning system feature integrated with WhatsApp notifications to deliver real-time error code handling guides",
      "Implemented the system using React.js, Node.js/Express.js, and SQL Server",
    ],
  },
];

export default function CareersSection() {
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

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] py-10 sm:py-20 px-4 scroll-mt-20"
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
              <div
                className="border border-white/10 rounded-lg bg-[#1a1a1a] px-4 py-5 sm:p-6 hover:border-purple-400 transition-colors hover:shadow-[0_0_20px_-5px_#a855f7]"
              >
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
                <span className="text-yellow-500">$</span> No experiences found
                — currently building...
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-400 font-mono text-sm">
                  Open for opportunities
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
