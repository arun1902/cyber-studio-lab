import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { socialLinks } from "@/data/social-links";
import { topics } from "@/data/topics";
import { navLinks, site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.3fr_0.8fr_1.4fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-7 text-mist">
            A developer and cybersecurity knowledge platform. From beginner concepts to advanced production engineering.
          </p>
          <p className="mt-6 max-w-sm font-display text-xl leading-snug tracking-[-0.03em] text-paper">{site.promise}</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan">Platform</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-paper/80 hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/topics" className="text-sm text-paper/80 hover:text-cyan">
                All topics
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-paper/80 hover:text-cyan">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan">Topics</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.id}>
                <Link href={`/topics#${topic.id}`} className="text-sm text-paper/80 hover:text-cyan">
                  {topic.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan">Follow</p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-paper/80 hover:text-cyan">
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
          <p>
            © {site.year} {site.name}. Professional services delivered with {site.servicesPartner}.
          </p>
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
