"use client";

import { useState } from "react";
import LetterGlitch from "@/components/effects/LetterGlitch";

export default function HeroSection() {
  const [nameDone, setNameDone] = useState(false);

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-0 sm:min-h-[calc(100vh-8rem)] text-center py-6 sm:py-20"
    >
      <div className="font-mono text-xs md:text-base text-gray-400 mb-4 select-none">
        <span className="text-cyan-400">root@personal-site:~$</span> whoami
      </div>

      <LetterGlitch
        text="ANTONY KURNIAWAN"
        as="h1"
        trigger="mount"
        delayStart={2500}
        speed={20}
        repeatInterval={7000}
        onComplete={() => setNameDone(true)}
        className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 font-mono"
      />

      <p className="text-xs sm:text-lg md:text-xl text-gray-200 font-medium tracking-wide font-sans mb-4 sm:mb-8 whitespace-nowrap sm:whitespace-normal">
        Software Engineer{" "}
        <span className="text-gray-250 mx-2 font-mono">|</span> Full Stack
        Developer{" "}
        <span className="text-gray-250 mx-2 font-mono">|</span> Network Engineer
      </p>

      <p className="text-sm sm:text-base text-gray-100 font-mono mb-2">
        Engineering clean software architectures and high-availability network systems.
      </p>

      <p className="text-[10px] sm:text-xs md:text-sm text-cyan-400 font-mono mb-6 sm:mb-10 whitespace-nowrap">
        Surabaya City, Indonesia{" "}
        <span className="text-cyan-200">|</span> Available for Remote & Local
        WFO
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-sm">
        <a
          href="#contact"
          className="w-full sm:w-64 px-6 py-3 bg-transparent border border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-black transition-colors rounded-none text-center"
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
          download="antony_kurniawan_CV.pdf"
          className="w-full sm:w-64 px-6 py-3 bg-transparent border border-purple-400 text-purple-300 font-semibold hover:bg-purple-400 hover:text-black transition-colors rounded-none text-center"
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
  );
}
