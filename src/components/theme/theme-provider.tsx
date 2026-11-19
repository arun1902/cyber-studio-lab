"use client";

import {
  THEME_STORAGE_KEY,
  applyDocumentTheme,
  readDocumentTheme,
  type Theme,
} from "@/lib/theme";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextValue = {
  theme: Theme;
  ready: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start as light on server + first client render to avoid hydration mismatch.
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readDocumentTheme();
    setThemeState(next);
    applyDocumentTheme(next);
    setReady(true);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      ready,
      setTheme: (next) => {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
        applyDocumentTheme(next);
        setThemeState(next);
      },
      toggleTheme: () => {
        setThemeState((current) => {
          const next = current === "dark" ? "light" : "dark";
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
          applyDocumentTheme(next);
          return next;
        });
      },
    }),
    [theme, ready],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
