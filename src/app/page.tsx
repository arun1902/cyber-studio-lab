import { Hero } from "@/components/hero/hero";
import { FeaturedSection } from "@/components/sections/featured-section";
import { FormatsSection } from "@/components/sections/formats-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PathsSection } from "@/components/sections/paths-section";
import { ProofStrip } from "@/components/sections/proof-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialSection } from "@/components/sections/social-section";
import { TopicsSection } from "@/components/sections/topics-section";
import { VideosSection } from "@/components/sections/videos-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <PathsSection />
      <FormatsSection />
      <VideosSection />
      <FeaturedSection />
      <TopicsSection />
      <ServicesSection />
      <SocialSection />
      <NewsletterSection index="08" />
    </>
  );
}
