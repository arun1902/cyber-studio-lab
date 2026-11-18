import { Hero } from "@/components/hero/hero";
import { BeyondBasicsSection } from "@/components/sections/beyond-basics-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { FormatsSection } from "@/components/sections/formats-section";
import { Marquee } from "@/components/sections/marquee";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialSection } from "@/components/sections/social-section";
import { TerminalSection } from "@/components/sections/terminal-section";
import { TipsSection } from "@/components/sections/tips-section";
import { TopicsSection } from "@/components/sections/topics-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FormatsSection />
      <BeyondBasicsSection />
      <FeaturedSection />
      <TopicsSection />
      <TipsSection />
      <TerminalSection />
      <ServicesSection />
      <SocialSection />
      <NewsletterSection index="09" />
    </>
  );
}
