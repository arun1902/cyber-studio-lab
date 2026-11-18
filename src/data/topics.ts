export type TopicId =
  | "software-development"
  | "clean-code"
  | "backend-api"
  | "database-system-design"
  | "app-api-security"
  | "ethical-hacking"
  | "cloud"
  | "devops-devsecops"
  | "docker-kubernetes"
  | "linux-networking"
  | "ai-llm"
  | "ai-security"
  | "developer-tools";

export type Topic = {
  id: TopicId;
  index: string;
  title: string;
  short: string;
  description: string;
  pillar: "build" | "secure" | "operate";
};

export const topics: Topic[] = [
  {
    id: "software-development",
    index: "01",
    title: "Software Development & Programming",
    short: "Programming",
    description: "Language fundamentals, idioms, and patterns that hold up once the code meets real users and real load.",
    pillar: "build",
  },
  {
    id: "clean-code",
    index: "02",
    title: "Clean Code & Coding Standards",
    short: "Clean Code",
    description: "Naming, boundaries, reviews, and performance habits that keep a codebase cheap to change.",
    pillar: "build",
  },
  {
    id: "backend-api",
    index: "03",
    title: "Backend & API Development",
    short: "Backend & APIs",
    description: "REST and gRPC design, pagination, idempotency, rate limiting, and the defaults production APIs need.",
    pillar: "build",
  },
  {
    id: "database-system-design",
    index: "04",
    title: "Database & System Design",
    short: "Databases",
    description: "Indexes, connection pools, caching, queues, and the trade-offs behind systems that scale calmly.",
    pillar: "build",
  },
  {
    id: "app-api-security",
    index: "05",
    title: "Application & API Security",
    short: "AppSec",
    description: "OWASP risks explained with fixes: authentication, authorization, input handling, headers, and secrets.",
    pillar: "secure",
  },
  {
    id: "ethical-hacking",
    index: "06",
    title: "Ethical Hacking",
    short: "Ethical Hacking",
    description: "How attacks work, how to test your own systems with permission, and how to turn findings into fixes.",
    pillar: "secure",
  },
  {
    id: "cloud",
    index: "07",
    title: "Cloud Computing (AWS, Azure, GCP)",
    short: "Cloud",
    description: "Secure account baselines, IAM, networking, and cost-aware architecture across the major clouds.",
    pillar: "operate",
  },
  {
    id: "devops-devsecops",
    index: "08",
    title: "DevOps & DevSecOps",
    short: "DevSecOps",
    description: "CI/CD pipelines, infrastructure as code, supply-chain security, and shipping safely on every commit.",
    pillar: "operate",
  },
  {
    id: "docker-kubernetes",
    index: "09",
    title: "Docker & Kubernetes",
    short: "Containers",
    description: "Every flag and field explained: images, runtime hardening, resource requests, probes, and rollouts.",
    pillar: "operate",
  },
  {
    id: "linux-networking",
    index: "10",
    title: "Linux & Networking",
    short: "Linux & Net",
    description: "Shell fluency, systemd, TLS, DNS, reverse proxies, and the network basics behind every outage.",
    pillar: "operate",
  },
  {
    id: "ai-llm",
    index: "11",
    title: "AI & LLM Development",
    short: "AI & LLMs",
    description: "Building with language models: retrieval, evaluation, tool calling, latency, and cost control.",
    pillar: "build",
  },
  {
    id: "ai-security",
    index: "12",
    title: "AI Security",
    short: "AI Security",
    description: "Prompt injection, data leakage, model supply chain, and guardrails for LLM-powered products.",
    pillar: "secure",
  },
  {
    id: "developer-tools",
    index: "13",
    title: "Developer Tools & Productivity",
    short: "Dev Tools",
    description: "Git, editors, terminals, debugging, and the small configurations that save hours every week.",
    pillar: "build",
  },
];

export const pillars = {
  build: { label: "Build", note: "Write better code" },
  secure: { label: "Secure", note: "Understand security" },
  operate: { label: "Operate", note: "Run reliable systems" },
} as const;

export function getTopic(id: TopicId) {
  const topic = topics.find((item) => item.id === id);
  if (!topic) {
    throw new Error(`Unknown topic: ${id}`);
  }
  return topic;
}
