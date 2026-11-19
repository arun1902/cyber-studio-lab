export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "csl-theme";

/** Runs before paint so the first frame matches the saved theme. */
export const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark" ? stored : "light";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    root.dataset.theme = theme;
  } catch (_) {}
})();`;

export function readDocumentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.dataset.theme === "dark") return "dark";
  return "light";
}

export function applyDocumentTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
}
