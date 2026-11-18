import { PageHero } from "@/components/layout/page-hero";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { KindBadge, TopicMark } from "@/components/ui/topic-mark";
import type { TopicId } from "@/data/topics";
import { pageMeta } from "@/lib/metadata";
import { FlaskConical } from "lucide-react";

export const metadata = pageMeta(
  "Labs",
  "Hands-on CyberStudioLab labs are coming: break and fix real configurations in safe, isolated environments.",
  "/labs",
);

const plannedLabs: { title: string; body: string; topic: TopicId; level: string }[] = [
  {
    title: "Exploit and fix a broken object-level authorization bug",
    body: "Find the IDOR in a sample API, read another user's data, then patch the query and prove the fix with a test.",
    topic: "app-api-security",
    level: "Beginner",
  },
  {
    title: "Harden a container until the scanner goes quiet",
    body: "Start from a root, writable, unlimited container and apply flags one by one while a checker scores each change.",
    topic: "docker-kubernetes",
    level: "Beginner",
  },
  {
    title: "Tune a PostgreSQL pool under load",
    body: "Drive traffic at a service, watch latency climb, and find the pool size and timeouts that bring p99 back down.",
    topic: "database-system-design",
    level: "Intermediate",
  },
  {
    title: "Diagnose an OOMKilled deployment",
    body: "A Kubernetes workload keeps restarting. Use events, metrics, and runtime flags to find and fix the real cause.",
    topic: "docker-kubernetes",
    level: "Intermediate",
  },
  {
    title: "Contain a prompt-injected AI agent",
    body: "Plant an indirect injection in a document, watch the agent misbehave, then add the controls that stop the damage.",
    topic: "ai-security",
    level: "Advanced",
  },
  {
    title: "Investigate a leaked AWS key with CloudTrail",
    body: "Trace what an attacker did with exposed credentials, revoke access, and write the guardrail that would have blocked it.",
    topic: "cloud",
    level: "Advanced",
  },
];

export default function LabsPage() {
  return (
    <>
      <PageHero index="05" kicker="Labs · coming soon" title="Break it. Fix it. Understand it.">
        Interactive labs are the next stage of CyberStudioLab. Each lab runs in an isolated environment you are allowed to attack, so you can practice real techniques without touching real systems.
      </PageHero>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <FlaskConical className="h-8 w-8 text-cyan" aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl tracking-[-0.03em]">Why labs come later</h2>
            <p className="mt-4 text-mist">
              Good labs are built on good explanations. We are publishing the blogs, tutorials, and videos first, then turning the most useful ones into guided, hands-on environments.
            </p>
            <p className="mt-4 text-mist">
              Every lab will pair with written material, run safely in the browser, and be scoped to systems built for practice.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {plannedLabs.map((lab) => (
              <li key={lab.title} className="flex flex-col border border-line bg-surface p-5">
                <span className="flex flex-wrap items-center gap-3">
                  <KindBadge>{lab.level}</KindBadge>
                  <TopicMark id={lab.topic} />
                </span>
                <h3 className="mt-4 font-display text-xl leading-snug tracking-[-0.02em]">{lab.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{lab.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NewsletterSection
        kicker="Early access"
        title="Get notified when labs open."
        description="Join the list to hear first when the hands-on labs open."
      />
    </>
  );
}
