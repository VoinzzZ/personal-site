"use client";

import { useState, useEffect, useRef } from "react";

interface LetterGlitchProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  trigger?: "mount" | "hover" | "both";
  delayStart?: number;
  speed?: number;
  repeatInterval?: number | null;
  showCursor?: boolean;
  showGlow?: boolean;
  onComplete?: () => void;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#__";

export default function LetterGlitch({
  text,
  className = "",
  as: Tag = "h1",
  trigger = "mount",
  delayStart = 0,
  speed = 45,
  repeatInterval = null,
  showCursor = true,
  showGlow = true,
  onComplete,
}: LetterGlitchProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isComplete, setIsComplete] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const frameRef = useRef<number | null>(null);
  const iterationRef = useRef(0);
  const glowOffRef = useRef(false);
  const textArrRef = useRef(text.split(""));
  const charsRef = useRef(text.split(""));

  const scramble = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    iterationRef.current = 0;
    glowOffRef.current = false;
    setIsComplete(false);
    setGlowActive(true);

    const original = textArrRef.current;
    const chars = charsRef.current;
    const len = chars.length;

    for (let i = 0; i < len; i++) {
      chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    const maxIterations = Math.floor((len * 3 + 15) * (45 / speed));

    const animate = () => {
      iterationRef.current++;
      const progress = iterationRef.current / maxIterations;
      const typingPos = Math.floor(progress * len * 1.3);

      for (let i = 0; i < len; i++) {
        if (i < typingPos && i < len) {
          chars[i] = original[i];
        } else if (i === typingPos && typingPos < len) {
          chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        } else if (Math.random() < 0.3) {
          chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(chars.join(""));

      if (
        !glowOffRef.current &&
        iterationRef.current >= Math.floor(maxIterations / 2)
      ) {
        glowOffRef.current = true;
        setGlowActive(false);
      }

      if (iterationRef.current < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsComplete(true);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (trigger === "mount" || trigger === "both") {
        scramble();
      }
    }, delayStart);

    let interval: ReturnType<typeof setInterval> | null = null;
    if (repeatInterval && repeatInterval > 0) {
      const intervalStart = setTimeout(() => {
        interval = setInterval(scramble, repeatInterval);
      }, delayStart);

      return () => {
        clearTimeout(startDelay);
        clearTimeout(intervalStart);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        if (interval) clearInterval(interval);
      };
    }

    return () => {
      clearTimeout(startDelay);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInteraction = () => {
    if (trigger === "hover" || trigger === "both") {
      scramble();
    }
  };

  return (
    <Tag
      className={className}
      onMouseEnter={trigger !== "mount" ? handleInteraction : undefined}
      onFocus={trigger !== "mount" ? handleInteraction : undefined}
    >
      <span className="relative inline">
        <span
          className={
            glowActive && showGlow
              ? "transition-all duration-500 [text-shadow:0_0_15px_#06b6d4,0_0_40px_#06b6d4]"
              : "transition-all duration-500"
          }
        >
          {displayText}
        </span>
        {isComplete && showCursor && (
          <span className="absolute top-1/2 -translate-y-1/2 left-full ml-1 w-2 h-[1.1em] bg-cyan-400 animate-blink" />
        )}
      </span>
    </Tag>
  );
}
