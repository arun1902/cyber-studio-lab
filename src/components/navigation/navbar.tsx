"use client";

import { SearchDialog } from "@/components/navigation/search-dialog";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
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
            "pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-4 border px-3 py-2.5 transition-all duration-300 md:px-4",
            scrolled || open
              ? "border-line shadow-[var(--shadow)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
          style={scrolled || open ? { background: "var(--nav-bg)" } : undefined}
        >
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors",
                    active ? "text-lime" : "text-paper/75 hover:text-paper",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && <span className="absolute bottom-1 left-3 right-3 h-px bg-lime" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-paper/75 transition-colors hover:text-lime"
              aria-label="Search articles"
              onClick={() => setSearchPath(pathname)}
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="hidden items-center gap-1 xl:flex">
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="grid h-10 w-10 place-items-center text-paper/65 transition-colors hover:text-lime"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Magnetic className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center bg-lime px-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90"
              >
                Let&apos;s Connect
              </Link>
            </Magnetic>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center lg:hidden"
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
            className="fixed inset-0 z-40 bg-ink lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex h-full flex-col justify-between px-6 pb-10 pt-28" aria-label="Mobile">
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline justify-between border-b border-line py-3 font-display text-5xl tracking-[-0.05em]"
                    >
                      {link.label}
                      <span className="font-mono text-xs tracking-[0.18em] text-lime">0{index + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  {socialLinks.slice(0, 4).map((link) => (
                    <a key={link.platform} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex bg-lime px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-on-accent">
                  Let&apos;s Connect
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchDialog open={searchOpen} onClose={() => setSearchPath(null)} />
    </>
  );
}
