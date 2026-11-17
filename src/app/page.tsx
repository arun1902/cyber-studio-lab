import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/sections/marquee";
import { FeaturedSection } from "@/components/sections/featured-section";
import { LabSection } from "@/components/sections/lab-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { SocialSection } from "@/components/sections/social-section";
import { TerminalSection } from "@/components/sections/terminal-section";
import { TipsSection } from "@/components/sections/tips-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <LabSection />
      <FeaturedSection />
      <TipsSection />
      <TerminalSection />
      <SocialSection />
      <NewsletterSection />
    </>
  );
}
