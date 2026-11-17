import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { categories } from "@/data/categories";
import { socialLinks } from "@/data/social-links";
import { navLinks, site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-7 text-mist">
            A studio for cybersecurity awareness, practical tutorials, and a calmer way to stay ahead of ordinary threats.
          </p>
          <p className="mt-6 font-display text-2xl tracking-[-0.04em] text-paper">{site.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-lime">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-paper/80 hover:text-lime">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-sm text-paper/80 hover:text-lime">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-lime">Inside the lab</p>
          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={category.href} className="text-sm text-paper/80 hover:text-lime">
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-lime">Follow</p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-paper/80 hover:text-lime">
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 text-xs text-mist md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {site.year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-paper">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
