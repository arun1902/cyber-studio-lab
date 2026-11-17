import { PageHero } from "@/components/layout/page-hero";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Privacy Policy",
  "How Cyber Studio Lab treats information on this informational website.",
  "/privacy-policy",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero index="06" kicker="Policy" title="Privacy policy">
        Last updated November 1, 2026. This site is an editorial publication. It does not run accounts, payments, or a mailing list yet.
      </PageHero>
      <div className="prose-lab mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h2 id="what-we-collect">What this version collects</h2>
        <p className="mt-5">
          Pages are static. The newsletter field and the contact form check what you type in the browser and then discard it. They do not transmit the address or the message to a server controlled by Cyber Studio Lab.
        </p>
        <h2 id="hosting">Hosting and logs</h2>
        <p className="mt-5">
          When the site is deployed, the host may keep standard server logs such as IP address, browser type, and the page requested. Those logs are used to operate and protect the site. We do not sell them.
        </p>
        <h2 id="links">Links away from the lab</h2>
        <p className="mt-5">
          Social profiles and share buttons leave this site. Those services have their own policies. Placeholder profile URLs may change when the channels are live.
        </p>
        <h2 id="contact">Questions</h2>
        <p className="mt-5">
          Privacy questions can be sent through the contact page once delivery is connected. Until then, treat that form as a local preview and do not include secrets in it.
        </p>
      </div>
    </>
  );
}
