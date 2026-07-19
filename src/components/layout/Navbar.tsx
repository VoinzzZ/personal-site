"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navItems } from "@/constants";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

function VisitorDetails() {
  const [ip, setIp] = useState<string>("—");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIp(d.ip))
      .catch(() => setIp("—"));
  }, []);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-4 leading-tight font-mono select-none">
      <span className="text-sm font-medium text-cyan-400 tracking-wide">Visitors Detail</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Uptime</span>
          <span className="text-white font-medium">{formatTime(uptime)}</span>
        </div>
        <div className="w-px h-5 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">IP</span>
          <span className="text-purple-400 font-medium">{ip}</span>
        </div>
        <div className="w-px h-5 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Status</span>
          <span className="text-green-400 font-medium animate-pulse">ONLINE</span>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sectionIds = navItems
      .filter((item) => item.sectionId)
      .map((item) => item.sectionId!);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Track pending scroll after client-side nav to home
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    if (pendingSection && pathname === "/") {
      const el = document.getElementById(pendingSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setPendingSection(null);
      } else {
        // Retry once if element not yet rendered
        const id = setTimeout(() => {
          document.getElementById(pendingSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
          setPendingSection(null);
        }, 300);
        return () => clearTimeout(id);
      }
    }
  }, [pathname, pendingSection]);

  const scrollToSection = useCallback((sectionId: string) => {
    setMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Section not on current page — navigate client-side to home, scroll after route change
      setPendingSection(sectionId);
      router.push("/");
    }
  }, [router]);

  return (
    <>
    <nav className="w-full border-b border-white/10 bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-50 font-mono text-xs md:text-sm">
      <div className="w-full">
        <div className="flex items-center justify-between h-12 md:h-14 px-4 sm:px-6 lg:px-8">
          <div className="shrink-0">
            <VisitorDetails />
            <span className="md:hidden text-sm font-medium text-cyan-400 tracking-wide select-none">VISITOR</span>
          </div>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = item.sectionId
                ? activeSection === item.sectionId
                : false;

              if (item.sectionId) {
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.sectionId!)}
                    className={`text-sm font-normal transition-all hover:text-cyan-400 cursor-pointer ${
                      isActive ? "text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]" : "text-gray-400"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-normal text-gray-400 transition-all hover:text-cyan-400 hover:drop-shadow-[0_0_6px_#22d3ee]"
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile menu modal overlay */}
    {menuOpen && (
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex md:hidden flex-col items-center justify-center"
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="flex flex-col items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => (
            <div key={item.name}>
              {item.sectionId ? (
                <button
                  onClick={() => scrollToSection(item.sectionId!)}
                  className={`text-xl font-mono font-medium transition-colors hover:text-cyan-400 cursor-pointer ${
                    activeSection === item.sectionId ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="block text-xl font-mono font-medium text-gray-300 transition-colors hover:text-cyan-400"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  );
}
