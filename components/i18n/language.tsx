"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { languages, translate, type Lang, type MessageKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageState = { lang: Lang; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageState>({ lang: "en", setLang: () => {} });
const STORAGE_KEY = "bhavishya-lang";

/** Wraps the app (see app/*\/dashboard/layout.tsx) and remembers the chosen language on this device. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "hi" || saved === "mr") setLangState(saved);
    } catch {
      // Storage can be blocked (private mode). English is fine.
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageState {
  return useContext(LanguageContext);
}

/** Translated text: <T k="nav.home" /> */
export function T({ k }: { k: MessageKey }) {
  const { lang } = useLanguage();
  return <>{translate(k, lang)}</>;
}

/** "Good morning, Priya" in the chosen language. */
export function Greeting({ name }: { name: string }) {
  const { lang } = useLanguage();
  return (
    <>
      {translate("greeting.morning", lang)}, {name}
    </>
  );
}

/** EN · हिं · मरा switch. */
export function LanguageSwitch({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className={cn("inline-flex overflow-hidden rounded-[10px] border", dark ? "border-white/15 bg-white/5" : "border-line-2 bg-white", className)}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          role="radio"
          aria-checked={lang === l.code}
          title={l.label}
          onClick={() => setLang(l.code)}
          className={cn(
            "px-2.5 py-1.5 text-[12.5px] font-semibold transition-colors",
            lang === l.code ? (dark ? "bg-white text-night-900" : "bg-ink text-white") : dark ? "text-white/70" : "text-ink-3 hover:text-ink",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
