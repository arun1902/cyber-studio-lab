import { PageHero } from "@/components/layout/page-hero";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Terms & Conditions",
  "Terms for reading and using the Cyber Studio Lab website.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <PageHero index="07" kicker="Terms" title="Terms & conditions">
        Last updated November 1, 2026. By using cyberstudiolab.com you agree to read the work as education, not as a service engagement.
      </PageHero>
      <div className="prose-lab mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h2 id="purpose">Purpose</h2>
        <p className="mt-5">
          Cyber Studio Lab publishes general information about cybersecurity awareness. Nothing on the site is legal, financial, or incident-response advice for your specific situation. Confirm important decisions with someone accountable for your systems.
        </p>
        <h2 id="use">Acceptable use</h2>
        <p className="mt-5">
          You may read, quote with credit, and link to the articles. You may not present the material as instructions to access systems you do not own or as a guarantee that a habit will prevent every incident. The simulated terminal is a visual teaching aid. It does not scan networks and must not be treated as a tool that does.
        </p>
        <h2 id="content">Content</h2>
        <p className="mt-5">
          Articles are original editorial copy for this project. Trademarks mentioned in passing belong to their owners. We may revise or remove a piece when it is no longer accurate.
        </p>
        <h2 id="liability">Liability</h2>
        <p className="mt-5">
          The site is provided as available. We are not liable for decisions made solely from an article, for third-party sites linked from the lab, or for preview forms that intentionally do not deliver messages.
        </p>
      </div>
    </>
  );
}
