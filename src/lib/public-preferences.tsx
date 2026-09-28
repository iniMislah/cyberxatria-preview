"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "id" | "en";
export type Theme = "dark" | "light";
export type Localized<T> = Record<Language, T>;

const LANGUAGE_KEY = "cyberxatria-language";
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
  const [language, setLanguageState] = useState<Language>("id");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);

    queueMicrotask(() => {
      if (savedLanguage === "id" || savedLanguage === "en") setLanguageState(savedLanguage);
      if (savedTheme === "dark" || savedTheme === "light") setThemeState(savedTheme);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo<PublicPreferences>(
    () => ({
      language,
      theme,
      setLanguage: setLanguageState,
      setTheme: setThemeState,
      t: (localized) => localized[language],
    }),
    [language, theme],
  );

  return <PublicPreferencesContext.Provider value={value}>{children}</PublicPreferencesContext.Provider>;
}

export function usePublicPreferences() {
  const context = useContext(PublicPreferencesContext);
  if (!context) throw new Error("usePublicPreferences must be used within PublicPreferencesProvider");
  return context;
}
