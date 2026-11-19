"use client";

import { SearchDialog } from "@/components/navigation/search-dialog";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { socialLinks } from "@/data/social-links";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const searchOpen = searchPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, select, [contenteditable='true']");
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchPath((current) => (current === pathname ? null : pathname));
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setSearchPath(pathname);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-300 md:px-4",
            scrolled || open
              ? "border-line shadow-[var(--shadow)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
          style={scrolled || open ? { background: "var(--nav-bg)" } : undefined}
        >
          <Logo compact />
          <nav className="hidden items-center xl:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[0.8rem] font-medium tracking-[-0.01em] transition-colors",
                    active ? "bg-cyan/10 text-cyan" : "text-paper/70 hover:text-paper",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              className="hidden h-10 items-center gap-3 rounded-xl border border-line px-3 text-mist transition-colors hover:border-cyan hover:text-paper md:inline-flex"
              aria-label="Search"
              aria-keyshortcuts="Control+K Meta+K"
              onClick={() => setSearchPath(pathname)}
            >
              <Search className="h-4 w-4" />
              <span className="text-[0.75rem] font-medium">Search</span>
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.6rem] text-paper/70">Ctrl K</kbd>
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-paper/75 transition-colors hover:text-cyan md:hidden"
              aria-label="Search"
              onClick={() => setSearchPath(pathname)}
            >
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setMenuPath(open ? null : pathname)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-ink xl:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex min-h-full flex-col justify-between gap-10 px-6 pb-10 pt-28" aria-label="Mobile">
              <ul>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * index, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-baseline justify-between border-b border-line py-3 font-display text-3xl tracking-[-0.04em]",
                        isActive(pathname, link.href) && "text-cyan",
                      )}
                      onClick={() => setMenuPath(null)}
                    >
                      {link.label}
                      <span className="font-mono text-xs tracking-[0.18em] text-yellow">{String(index + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a key={link.platform} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="text-mist hover:text-cyan">
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchDialog open={searchOpen} onClose={() => setSearchPath(null)} />
    </>
  );
}
