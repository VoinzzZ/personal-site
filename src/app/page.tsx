"use client";

import { useState } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const [nameDone, setNameDone] = useState(false);

  return (
    <>
      <section id="hero" className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center py-20">
        {/* ... existing hero content ... */}
        <div className="font-mono text-sm md:text-base text-gray-400 mb-4 select-none">
          <span className="text-cyan-400">root@personal-site:~$</span> whoami
        </div>
        <LetterGlitch
          text=" ANTONY KURNIAWAN"
          as="h1"
          trigger="mount"
          speed={20}
          repeatInterval={7000}
          onComplete={() => setNameDone(true)}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 font-mono"
        />
        <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide font-sans mb-8">
          Software Engineer <span className="text-gray-600 mx-2 font-mono">|</span> Full Stack Developer
        </p>
        <p className="text-sm md:text-base text-gray-500 font-mono mb-2 whitespace-nowrap">
          Building clean software architectures and engineering scalable backend systems.
        </p>
        <p className="text-xs md:text-sm text-gray-600 font-mono mb-10">
          Surabaya City, Indonesia <span className="text-gray-700">|</span> Available for Remote & Local WFO
        </p>
        <div className="flex flex-row gap-4 font-mono text-sm">
          <a
            href="/contact"
            className="w-64 px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-colors rounded-none text-center"
          >
            <LetterGlitch
              key={nameDone ? "btn1-go" : "btn1-wait"}
              text="$ ssh connect@Antony"
              as="span"
              trigger="mount"
              delayStart={nameDone ? 2000 : 999999}
              speed={25}
              showCursor={false}
              showGlow={false}
              repeatInterval={7000}
            />
          </a>
          <a
            href="/cv.pdf"
            download
            className="w-64 px-6 py-3 bg-transparent border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 transition-colors rounded-none text-center"
          >
            <LetterGlitch
              key={nameDone ? "btn2-go" : "btn2-wait"}
              text="$ wget download --cv"
              as="span"
              trigger="mount"
              delayStart={nameDone ? 2000 : 999999}
              speed={25}
              showCursor={false}
              showGlow={false}
              repeatInterval={7000}
            />
          </a>
        </div>
      </section>

      <AboutSection />
    </>
  );
}
