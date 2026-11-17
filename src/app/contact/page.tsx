import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { SocialIcon } from "@/components/ui/social-icon";
import { socialLinks } from "@/data/social-links";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Contact",
  "Contact Cyber Studio Lab about editorial ideas, tutorials, and partnerships. The form is a local preview.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageHero index="05" kicker="Correspondence" title="Let's connect.">
        Notes about a tutorial, a correction, or a collaboration. The form validates on this device and stops there — it does not send email yet.
      </PageHero>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <aside className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">Elsewhere</p>
          <ul className="mt-6 space-y-4">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a href={link.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-line py-3">
                  <span className="inline-flex items-center gap-3">
                    <SocialIcon platform={link.platform} className="h-4 w-4 text-lime" />
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-mist group-hover:text-paper">{link.handle}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-6 text-mist">cyberstudiolab.com · editorial studio for digital safety</p>
        </aside>
      </div>
    </>
  );
}
