"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { translations, type Language, type Messages } from "./translations";

const LANGUAGE_STORAGE_KEY = "preferred-language";
const LANGUAGE_COOKIE_KEY = "preferred-language";
const LANGUAGE_CHANGE_EVENT = "language-change";

function persistLanguage(nextLanguage: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  document.cookie = `${LANGUAGE_COOKIE_KEY}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
}

function getLanguageSnapshot(): Language {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === "id" ? "id" : "en";
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

interface LanguageContextValue {
  language: Language;
  messages: Messages;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const router = useRouter();
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    () => initialLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;

    const cookieLanguage = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${LANGUAGE_COOKIE_KEY}=`))
      ?.split("=")[1];

    if (cookieLanguage !== language) {
      persistLanguage(language);
      startTransition(() => router.refresh());
    }
  }, [language, router]);

  const setLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    persistLanguage(nextLanguage);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    startTransition(() => {
      router.refresh();
    });
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "id" : "en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        messages: translations[language],
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
