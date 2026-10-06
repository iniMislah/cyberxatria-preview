"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

export type Language = "id" | "en";
export type Theme = "dark" | "light";
export type Localized<T> = Record<Language, T>;

const LANGUAGE_KEY = "cyberxatria-language";
const LEGACY_LANGUAGE_KEY = "cyberxatria_lang";
const THEME_KEY = "cyberxatria-theme";

type PublicPreferences = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: <T,>(value: Localized<T>) => T;
};

const PublicPreferencesContext = createContext<PublicPreferences | null>(null);

export function PublicPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const urlLanguage = getLocaleFromPath(window.location.pathname);
    const savedLanguage = readPreference(LANGUAGE_KEY);
    const savedTheme = readPreference(THEME_KEY);

    const userLangs = typeof navigator !== "undefined"
      ? [navigator.language, ...(navigator.languages || [])].filter(Boolean)
      : [];
    const browserLanguage: Language = userLangs.some((lang) => lang.toLowerCase().startsWith("id")) ? "id" : "en";

    queueMicrotask(() => {
      setLanguageState(urlLanguage ?? (savedLanguage === "id" || savedLanguage === "en" ? savedLanguage : browserLanguage));
      if (savedTheme === "dark" || savedTheme === "light") setThemeState(savedTheme);
      setReady(true);
    });
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    writePreference(LANGUAGE_KEY, nextLanguage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    writePreference(THEME_KEY, theme);
  }, [theme, ready]);

  const value = useMemo<PublicPreferences>(
    () => ({
      language,
      theme,
      setLanguage,
      setTheme: setThemeState,
      t: (localized) => localized[language],
    }),
    [language, setLanguage, theme],
  );

  return <PublicPreferencesContext.Provider value={value}>{children}</PublicPreferencesContext.Provider>;
}

export function usePublicPreferences() {
  const context = useContext(PublicPreferencesContext);
  if (!context) throw new Error("usePublicPreferences must be used within PublicPreferencesProvider");
  return context;
}

function readPreference(key: string) {
  try {
    const value = window.localStorage?.getItem(key);
    if (value) return value;
    if (key === LANGUAGE_KEY) {
      return window.localStorage?.getItem(LEGACY_LANGUAGE_KEY) ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

function writePreference(key: string, value: string) {
  try {
    window.localStorage?.setItem(key, value);
    if (key === LANGUAGE_KEY) {
      window.localStorage?.setItem(LEGACY_LANGUAGE_KEY, value);
    }
  } catch {
    // Storage can be unavailable in restricted browsers; language/theme still work in-session.
  }
}

export function getLocaleFromPath(pathname: string): Language | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment === "id" || segment === "en" ? segment : null;
}

export function stripLocalePrefix(pathname: string) {
  const [pathPart = "/", suffix = ""] = pathname.split(/([?#].*)/, 2);
  const parts = pathPart.split("/").filter(Boolean);
  if (parts[0] === "id" || parts[0] === "en") parts.shift();
  const normalized = `/${parts.join("/")}`;
  return `${normalized === "/" ? "/" : normalized}${suffix}`;
}

export function localePath(pathname: string, language: Language) {
  if (!pathname || pathname.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(pathname)) return pathname;
  const [pathPart = "/", suffix = ""] = pathname.split(/([?#].*)/, 2);
  const cleanPath = stripLocalePrefix(pathPart);
  return `/${language}${cleanPath === "/" ? "/" : cleanPath}${suffix}`;
}
