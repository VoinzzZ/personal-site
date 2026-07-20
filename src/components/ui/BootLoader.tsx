"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LazyTerminal,
  LazyTypingAnimation,
  LazyAnimatedSpan,
  LazyFlickeringGrid,
} from "@/components/effects/DynamicEffects";

const BOOT_STORAGE_KEY = "boot-seen";

export default function BootLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);
  const readyRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visitorData, setVisitorData] = useState({ ip: "...", city: "..." });

  useEffect(() => {
    try {
      if (sessionStorage.getItem(BOOT_STORAGE_KEY) === "1") {
        setSkipBoot(true);
        setDone(true);
        return;
      }
    } catch {
      // sessionStorage blocked
    }
  }, []);

  useEffect(() => {
    if (skipBoot || done) return;
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [skipBoot, done]);

  useEffect(() => {
    if (skipBoot || done) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setVisitorData({
          ip: data.ip || "unknown",
          city: data.country_name || "unknown",
        });
      })
      .catch(() => {
        setVisitorData({ ip: "unknown", city: "unknown" });
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [skipBoot, done]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setFading(true);
    setTimeout(() => setDone(true), 500);
  }, []);

  useEffect(() => {
    if (skipBoot || done) return;
    const timer = setTimeout(() => {
      readyRef.current = true;
    }, 8000);
    return () => clearTimeout(timer);
  }, [skipBoot, done]);

  useEffect(() => {
    if (skipBoot || done) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && readyRef.current) finish();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [finish, skipBoot, done]);

  // Lock body scroll while boot overlay is visible
  useEffect(() => {
    if (skipBoot || done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skipBoot, done]);

  // Release scroll after fade completes
  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    return () => {};
  }, [done]);

  return (
    <>
      {!done && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#121212] transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          onClick={isMobile && readyRef.current ? finish : undefined}
          aria-hidden={fading}
        >
          <LazyFlickeringGrid
            className="absolute inset-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)]"
            squareSize={8}
            gridGap={6}
            color="#FFFFFF"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
          <div className="relative w-full max-w-xl mx-4 px-2 sm:px-0">
            <LazyTerminal
              startOnView={false}
              className="w-full text-[9px] sm:text-sm h-auto! max-h-none!"
            >
              <LazyTypingAnimation duration={30}>
                systemctl start personal-site --env=production
              </LazyTypingAnimation>

              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Loading kernel modules
                  ...... <span className="text-green-400">[OK]</span>
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Initializing network
                  stack .. <span className="text-green-400">[OK]</span>
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Mounting filesystems
                  ........ <span className="text-green-400">[OK]</span>
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Starting display manager
                  .... <span className="text-green-400">[OK]</span>
                </span>
              </LazyAnimatedSpan>

              <LazyTypingAnimation duration={40}>
                Service ready. Listening on port 3000.
              </LazyTypingAnimation>

              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Fetching visitor IP
                  ......... [
                  <span className="text-purple-400">{visitorData.ip}</span>]
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Geolocating country
                  ......... [
                  <span className="text-cyan-400">{visitorData.city}</span>]
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span>
                  <span className="text-purple-400">✔</span> Establishing secure
                  channel . [<span className="text-cyan-400">TLS 1.3</span>]
                </span>
              </LazyAnimatedSpan>

              <LazyTypingAnimation duration={25}>
                ./greet --user antony
              </LazyTypingAnimation>

              <LazyAnimatedSpan>
                <span>
                  <span className="text-cyan-400">root@personal-site:~$</span>{" "}
                  <span className="text-green-400">Welcome visitors to</span>
                </span>
              </LazyAnimatedSpan>
              <LazyAnimatedSpan>
                <span className="text-green-400 ml-0">
                  personal-site — Antony Kurniawan
                </span>
              </LazyAnimatedSpan>

              <LazyAnimatedSpan>
                <span className="text-gray-500">─── Personal site v3.2.1 ───</span>
              </LazyAnimatedSpan>

              <LazyAnimatedSpan delay={400}>
                <span
                  className="inline-block cursor-pointer text-cyan-400 hover:text-cyan-300 underline underline-offset-4 subtle-blink"
                  onClick={(e) => {
                    e.stopPropagation();
                    finish();
                  }}
                >
                  {isMobile
                    ? "Click to continue..."
                    : "Press ENTER to continue..."}
                </span>
              </LazyAnimatedSpan>
            </LazyTerminal>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
