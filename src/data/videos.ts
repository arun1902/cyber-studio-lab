import type { Cover } from "@/data/articles";
import type { TopicId } from "@/data/topics";

export type VideoStatus = "In production" | "Scripted" | "Planned";

export type Video = {
  slug: string;
  title: string;
  synopsis: string;
  topic: TopicId;
  duration: string;
  status: VideoStatus;
  cover: Cover;
  chapters: string[];
  relatedSlug?: string;
};

export const videos: Video[] = [
  {
    slug: "rate-limiting-visualized",
    title: "Rate Limiting Algorithms, Visualized",
    synopsis:
      "Watch fixed windows, sliding windows, and token buckets handle the same burst of traffic side by side, and see why the edge case matters.",
    topic: "backend-api",
    duration: "≈ 7 min",
    status: "In production",
    cover: "radar",
    chapters: ["Why limits exist", "Fixed window edge bursts", "Sliding window smoothing", "Token bucket refill", "Choosing per endpoint"],
    relatedSlug: "api-rate-limiting-production",
  },
  {
    slug: "tls-handshake",
    title: "How HTTPS Works: The TLS 1.3 Handshake",
    synopsis:
      "From ClientHello to encrypted application data in one round trip: key exchange, certificates, and what an attacker on the network can and cannot see.",
    topic: "linux-networking",
    duration: "≈ 9 min",
    status: "In production",
    cover: "lattice",
    chapters: ["ClientHello and key shares", "Certificates and chains", "Deriving session keys", "0-RTT and its risks", "What leaks: SNI and metadata"],
  },
  {
    slug: "sql-injection-request-to-database",
    title: "SQL Injection: From HTTP Request to Database",
    synopsis:
      "Follow one malicious parameter through a vulnerable endpoint, watch the query change shape, then see exactly how parameterized queries stop it.",
    topic: "app-api-security",
    duration: "≈ 8 min",
    status: "Scripted",
    cover: "signal",
    chapters: ["String concatenation", "How the parser sees it", "Blind and time-based variants", "Parameterized queries", "ORMs are not automatic protection"],
  },
  {
    slug: "kubernetes-oomkilled",
    title: "Kubernetes Scheduling, Throttling, and OOMKills",
    synopsis:
      "Animated nodes and pods show how requests drive scheduling, how CPU limits cause throttling, and why memory limits end in OOMKilled.",
    topic: "docker-kubernetes",
    duration: "≈ 10 min",
    status: "Scripted",
    cover: "mesh",
    chapters: ["The scheduler's view", "CFS quota and throttling", "Memory cgroups and OOM", "QoS classes and eviction", "Sizing from metrics"],
    relatedSlug: "kubernetes-cpu-memory-requests",
  },
  {
    slug: "what-docker-run-does",
    title: "What Actually Happens When You Run docker run",
    synopsis:
      "Namespaces, cgroups, overlay filesystems, and capabilities, animated layer by layer, so container hardening flags finally make sense.",
    topic: "docker-kubernetes",
    duration: "≈ 8 min",
    status: "Planned",
    cover: "key",
    chapters: ["Image layers and overlayfs", "Namespaces: isolation", "Cgroups: limits", "Capabilities and root", "Networking and port publishing"],
    relatedSlug: "docker-run-flags-explained",
  },
  {
    slug: "jwt-misuse",
    title: "JWTs: What's Inside and How They Get Misused",
    synopsis:
      "Decode a token piece by piece, then walk through the classic failures: alg none, key confusion, missing expiry, and tokens stored where scripts can read them.",
    topic: "app-api-security",
    duration: "≈ 7 min",
    status: "Planned",
    cover: "orbit",
    chapters: ["Header, payload, signature", "Signing algorithms", "alg:none and key confusion", "Expiry and revocation", "Where to store tokens"],
  },
  {
    slug: "prompt-injection-explained",
    title: "Prompt Injection Explained in Six Minutes",
    synopsis:
      "See how a hidden instruction in a web page hijacks an AI agent, and how least privilege and confirmation steps contain the damage.",
    topic: "ai-security",
    duration: "≈ 6 min",
    status: "Planned",
    cover: "orbit",
    chapters: ["One channel for instructions and data", "Indirect injection", "Data exfiltration paths", "Designing for failure"],
    relatedSlug: "prompt-injection-design-controls",
  },
  {
    slug: "dns-end-to-end",
    title: "DNS Resolution, End to End",
    synopsis:
      "Stub resolver, recursive resolver, root, TLD, and authoritative servers, plus caching, TTLs, and why \"it's always DNS\" during outages.",
    topic: "linux-networking",
    duration: "≈ 7 min",
    status: "Planned",
    cover: "signal",
    chapters: ["Resolver chain", "Caching and TTLs", "Record types that matter", "DNSSEC basics", "Debugging with dig"],
  },
];
