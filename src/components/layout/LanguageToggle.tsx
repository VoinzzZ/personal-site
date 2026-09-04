"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, messages, setLanguage } = useLanguage();

  return (
    <div
      className={`relative grid grid-cols-2 items-center overflow-hidden border border-white/15 bg-black/20 p-0.5 font-mono text-[11px] ${className}`}
      role="group"
      aria-label={messages.language}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] bg-cyan-400 transition-transform duration-200 ease-out ${
          language === "en" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {(["id", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          className={`relative z-10 px-2 py-1 uppercase transition-colors duration-200 cursor-pointer ${
            language === option ? "text-black" : "text-gray-500 hover:text-cyan-300"
          }`}
          aria-pressed={language === option}
          aria-label={`${messages.language}: ${option.toUpperCase()}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
