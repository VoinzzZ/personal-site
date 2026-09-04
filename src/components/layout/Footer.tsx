"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { messages } = useLanguage();

  return (
    <footer className="w-full border-t border-white/10 bg-[#1e1e1e]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto py-4 text-center px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-600 font-mono">
          &copy; 2026 {messages.footer}{" "}
          <span className="text-cyan-400">Antony Kurniawan</span>.
        </p>
      </div>
    </footer>
  );
}
