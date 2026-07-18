"use client";

import { useEffect, useState, useRef } from "react";

interface TypingHeadingProps {
  text: string;
  inView: boolean;
}

export default function TypingHeading({ text, inView }: TypingHeadingProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const activeRef = useRef(true);

  useEffect(() => {
    if (!inView) {
      setDisplayText("");
      setShowCursor(false);
      return;
    }

    activeRef.current = true;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;

    function scheduleTimer(fn: () => void, ms: number) {
      timer = setTimeout(() => {
        if (activeRef.current) fn();
      }, ms);
    }

    function typeForward() {
      if (!activeRef.current) return;
      let i = 0;
      setDisplayText("");
      setShowCursor(true);

      interval = setInterval(() => {
        if (!activeRef.current) {
          clearInterval(interval!);
          return;
        }
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval!);
          interval = null;
          scheduleTimer(deleteBackward, 2000);
        }
      }, 50);
    }

    function deleteBackward() {
      if (!activeRef.current) return;
      let i = text.length;

      interval = setInterval(() => {
        if (!activeRef.current) {
          clearInterval(interval!);
          return;
        }
        if (i > 0) {
          i--;
          setDisplayText(text.slice(0, i));
          setShowCursor(true);
        } else {
          clearInterval(interval!);
          interval = null;
          setShowCursor(false);
          scheduleTimer(typeForward, 1000);
        }
      }, 25);
    }

    typeForward();

    return () => {
      activeRef.current = false;
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [inView, text]);

  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-wider min-h-[1.2em]">
      {displayText || " "}
      {showCursor && (
        <span className="inline-block w-2 h-[1.1em] bg-cyan-400 ml-1 align-middle animate-blink" />
      )}
    </h2>
  );
}
