"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/constants";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Section not on current page — redirect to homepage section
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="w-full border-b border-white/10 bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="shrink-0" />
          <div className="flex items-center space-x-8">
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
        </div>
      </div>
    </nav>
  );
}
