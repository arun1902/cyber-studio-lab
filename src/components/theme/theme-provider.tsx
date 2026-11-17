"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "csl-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  if (document.documentElement.dataset.theme === "light") return "light";
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (next) => {
        window.localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        setThemeState(next);
      },
      toggleTheme: () => {
        setThemeState((current) => {
          const next = current === "dark" ? "light" : "dark";
          window.localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
          return next;
        });
      },
    }),
    [theme],
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

export const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem("${STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    root.dataset.theme = theme;
  } catch (_) {}
})();`;
