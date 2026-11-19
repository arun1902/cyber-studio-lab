"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, ready, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center text-paper/75 transition-colors hover:text-cyan"
      aria-label={!ready ? "Toggle color theme" : isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={!ready ? "Theme" : isLight ? "Dark mode" : "Light mode"}
    >
      {/* Fixed placeholder until mounted so SSR and client markup match */}
      {!ready ? (
        <span className="h-4 w-4" aria-hidden="true" />
      ) : isLight ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
