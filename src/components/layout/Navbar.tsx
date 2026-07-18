"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/constants";

export default function Navbar() {
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

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Section not on current page — redirect to homepage section
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
    <nav className="w-full border-b border-white/10 bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          <div className="shrink-0" />

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
                    className={`text-sm font-medium transition-colors hover:text-cyan-400 cursor-pointer ${
                      isActive ? "text-cyan-400" : "text-gray-400"
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
                  className="text-sm font-medium text-gray-400 transition-colors hover:text-cyan-400"
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
                  className={`text-xl font-medium transition-colors hover:text-cyan-400 cursor-pointer ${
                    activeSection === item.sectionId ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="block text-xl font-medium text-gray-300 transition-colors hover:text-cyan-400"
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
