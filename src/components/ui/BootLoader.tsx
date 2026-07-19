"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { FlickeringGrid } from "@/components/magicui/FlickeringGrid";

export default function BootLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const readyRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visitorData, setVisitorData] = useState({ ip: "...", city: "..." });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch real visitor IP & city
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setVisitorData({
          ip: data.ip || "unknown",
          city: data.country_name || "unknown",
        });
      })
      .catch(() => {
        setVisitorData({ ip: "unknown", city: "unknown" });
      });
  }, []);

  const finish = useCallback(() => {
    setFading(true);
    setTimeout(() => setDone(true), 500);
  }, []);

  // Set ready after estimated total animation duration
  useEffect(() => {
    const timer = setTimeout(() => { readyRef.current = true; }, 11000);
    return () => clearTimeout(timer);
  }, []);

  // Enter/tap hanya bekerja setelah ready
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && readyRef.current) finish();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [finish]);

  // Only show boot animation on first mount (full page load / refresh)
  if (done) return <>{children}</>;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#121212] transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      onClick={isMobile && readyRef.current ? finish : undefined}
    >
      <FlickeringGrid
        className="absolute inset-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)]"
        squareSize={8}
        gridGap={6}
        color="#FFFFFF"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      <div className="relative w-full max-w-xl mx-4 px-2 sm:px-0">
        <Terminal startOnView={false} className="w-full text-[9px] sm:text-sm h-auto! max-h-none!">
          <TypingAnimation duration={30}>systemctl start personal-site --env=production</TypingAnimation>

          <AnimatedSpan><span><span className="text-purple-400">✔</span> Loading kernel modules ...... <span className="text-green-400">[OK]</span></span></AnimatedSpan>
          <AnimatedSpan><span><span className="text-purple-400">✔</span> Initializing network stack .. <span className="text-green-400">[OK]</span></span></AnimatedSpan>
          <AnimatedSpan><span><span className="text-purple-400">✔</span> Mounting filesystems ........ <span className="text-green-400">[OK]</span></span></AnimatedSpan>
          <AnimatedSpan><span><span className="text-purple-400">✔</span> Starting display manager .... <span className="text-green-400">[OK]</span></span></AnimatedSpan>

          <TypingAnimation duration={40}>Service ready. Listening on port 3000.</TypingAnimation>

          <AnimatedSpan><span><span className="text-purple-400">✔</span> Fetching visitor IP ......... [<span className="text-purple-400">{visitorData.ip}</span>]</span></AnimatedSpan>
          <AnimatedSpan><span><span className="text-purple-400">✔</span> Geolocating country ......... [<span className="text-cyan-400">{visitorData.city}</span>]</span></AnimatedSpan>
          <AnimatedSpan><span><span className="text-purple-400">✔</span> Establishing secure channel . [<span className="text-cyan-400">TLS 1.3</span>]</span></AnimatedSpan>

          <TypingAnimation duration={25}>./greet --user antony</TypingAnimation>

          <AnimatedSpan>
            <span>
              <span className="text-cyan-400">root@personal-site:~$</span>{" "}
              <span className="text-green-400">Welcome visitors to</span>
            </span>
          </AnimatedSpan>
          <AnimatedSpan>
            <span className="text-green-400 ml-0">personal-site — Antony Kurniawan</span>
          </AnimatedSpan>

          <AnimatedSpan>
            <span className="text-gray-500">─── Personal site v3.2.1 ───</span>
          </AnimatedSpan>

          <AnimatedSpan delay={400}>
            <span
              className="inline-block cursor-pointer text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              onClick={(e) => { e.stopPropagation(); finish(); }}
            >
              {isMobile ? "Click to continue..." : "Press ENTER to continue..."}
            </span>
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}
