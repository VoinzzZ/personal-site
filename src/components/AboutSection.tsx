"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiTypescript,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiSupabase,
  SiTailwindcss,
  SiMongodb,
  SiAntdesign,
  SiJavascript,
  SiCplusplus,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import TypingHeading from "@/components/TypingHeading";
import LetterGlitch from "@/components/LetterGlitch";
import SkillCard from "@/components/SkillCard";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver trigger
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
        {/* section number */}
        <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest text-left">
          // 01
        </div>

        {/* headline */}
        <div className="mb-6 text-left">
          <TypingHeading text="CAT ABOUT.MD" inView={inView} />
        </div>

        {/* macOS terminal window */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#1a1a1a]">
          {/* window title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#252525] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-gray-500 font-mono">about.md — terminal</span>
          </div>
          {/* terminal body */}
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
            <p className="text-gray-300 text-justify mb-6">
              A highly motivated Software Engineering graduate with a deep interest in full-stack
              development and system architecture. Adept at navigating cross-platform
              environments and untangling complex backend business logic. Possesses a strong
              curiosity for hardware optimization, cloud infrastructure, and low-level mechanics.
              Driven by continuous learning, deep focus, and a structured problem-solving approach
              to engineering reliable digital solutions.
            </p>

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
              <SkillCard name="TypeScript" icon={<SiTypescript />} iconColor="#3178C6" />
              <SkillCard name="JavaScript" icon={<SiJavascript />} iconColor="#F7DF1E" />
              <SkillCard name="Go" icon={<SiGo />} iconColor="#00ADD8" />
              <SkillCard name="C++" icon={<SiCplusplus />} iconColor="#00599C" />
              <SkillCard name="React" icon={<SiReact />} iconColor="#61DAFB" />
              <SkillCard name="React Native" icon={<SiReact />} iconColor="#61DAFB" />
              <SkillCard name="Next.js" icon={<SiNextdotjs />} iconColor="white" />
              <SkillCard name="Express.js" icon={<SiExpress />} iconColor="white" />
              <SkillCard name="Tailwind CSS" icon={<SiTailwindcss />} iconColor="#06B6D4" />
              <SkillCard name="Ant Design" icon={<SiAntdesign />} iconColor="#1677FF" />
              <SkillCard name="Node.js" icon={<SiNodedotjs />} iconColor="#339933" />
              <SkillCard name="PostgreSQL" icon={<SiPostgresql />} iconColor="#4169E1" />
              <SkillCard name="MongoDB" icon={<SiMongodb />} iconColor="#47A248" />
              <SkillCard name="SQL Server" icon={<DiMsqlServer />} iconColor="#CC2927" />
              <SkillCard name="Supabase" icon={<SiSupabase />} iconColor="#3FCF8E" />
              <SkillCard name="Git" icon={<SiGit />} iconColor="#F05032" />
              <SkillCard name="Docker" icon={<SiDocker />} iconColor="#2496ED" />
              <SkillCard name="AWS" icon={<FaAws />} iconColor="#FF9900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
