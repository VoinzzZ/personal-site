"use client";

import { useEffect, useRef, useState } from "react";
import TypingHeading from "@/components/effects/TypingHeading";
import LetterGlitch from "@/components/effects/LetterGlitch";
import ScrambledText from "@/components/effects/ScrambledText";
import SkillCard from "@/components/ui/SkillCard";
import { skills } from "@/constants";

export default function AboutSection() {
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
      id="about"
      className="flex flex-col items-center justify-center min-h-[75vh] py-20 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section number */}
        <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest text-left">
          // 01
        </div>

        {/* Headline with typing animation */}
        <div className="mb-6 text-left">
          <TypingHeading text="CAT ABOUT.MD" inView={inView} />
        </div>

        {/* macOS-style terminal window */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#1a1a1a]">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#252525] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-gray-500 font-mono">about.md — terminal</span>
          </div>

          {/* Terminal body */}
          <div className="px-6 py-6 font-space text-base leading-relaxed md:text-lg">
            <div className="font-mono text-sm md:text-base mb-3">
              <span className="text-cyan-400">
                <LetterGlitch
                  text="root@personal-site:~$"
                  as="span"
                  trigger="mount"
                  delayStart={3000}
                  speed={25}
                  repeatInterval={20000}
                  showCursor={false}
                  showGlow={false}
                />
              </span>{" "}
              <span className="text-gray-400">cat about.md</span>
            </div>

            <p className="text-purple-400 font-semibold mb-3">[PROFILE SUMMARY]</p>

            <ScrambledText
              className="m-0! max-w-none! text-base md:text-lg text-gray-300 text-justify mb-6"
              radius={45}
              duration={1.2}
              speed={0.3}
              scrambleChars=""
            >
              A highly motivated Software Engineering graduate focused on full-stack development and system
              architecture. Adept at navigating cross-platform environments and untangling complex backend
              business logic. Possesses a strong curiosity for hardware optimization, cloud infrastructure,
              and low-level mechanics. Driven by continuous learning and a structured problem-solving approach
              to engineering reliable digital solutions.
            </ScrambledText>

            <div className="h-5" />

            <div className="font-mono text-sm md:text-base mb-4">
              <span className="text-cyan-400">
                <LetterGlitch
                  text="root@personal-site:~$"
                  as="span"
                  trigger="mount"
                  delayStart={7000}
                  speed={25}
                  repeatInterval={25000}
                  showCursor={false}
                  showGlow={false}
                />
              </span>{" "}
              <span className="text-gray-400">ls -la /skills/</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  iconColor={skill.iconColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
