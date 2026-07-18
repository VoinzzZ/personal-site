"use client";

import LetterGlitch from "@/components/effects/LetterGlitch";

export default function TerminalPrompt() {
  return (
    <span className="text-cyan-400">
      <LetterGlitch
        text="root@personal-site:~$"
        as="span"
        trigger="mount"
        delayStart={500}
        speed={25}
        repeatInterval={30000}
        showCursor={false}
        showGlow={false}
      />
    </span>
  );
}
