import type { TopicId } from "@/data/topics";

export type ArticleFormat = "blog" | "tutorial";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; text: string }
  | { type: "callout"; tone: "tip" | "warning"; text: string }
  | { type: "code"; lang: string; filename?: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type ArticleStep = {
  title: string;
  body: string;
};

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Cover = "radar" | "lattice" | "signal" | "key" | "mesh" | "orbit";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topics: TopicId[];
  format: ArticleFormat;
  readingMinutes: number;
  publishedAt: string;
  featured?: boolean;
  cover: Cover;
  author: string;
  tags: string[];
  level: Level;
  duration?: string;
  steps?: ArticleStep[];
  content: ArticleBlock[];
};

const author = "CyberStudioLab";

export const articles: Article[] = [
  {
    slug: "api-rate-limiting-production",
    title: "API Rate Limiting: Configurations That Hold Up in Production",
    excerpt:
      "Which algorithm to pick, what numbers to start with, what to key on, and how to tell clients when to come back.",
    topics: ["backend-api", "app-api-security"],
    format: "blog",
    readingMinutes: 11,
    publishedAt: "2026-11-12",
    featured: true,
    cover: "radar",
    author,
    tags: ["rate limiting", "nginx", "redis", "api design"],
    level: "Intermediate",
    content: [
      {
        type: "p",
        text: "Most rate limiting tutorials stop at `limit_req` or a middleware import. That is the easy part. The decisions that matter in production are which algorithm you use, which identity you count against, what the limits actually are, and how you communicate a rejection so well-behaved clients back off instead of hammering harder.",
      },
      { type: "h2", id: "algorithm", text: "Pick the algorithm deliberately" },
      {
        type: "table",
        head: ["Algorithm", "Behaviour", "Use it for"],
        rows: [
          ["Fixed window", "Counts requests per clock window. Allows 2× bursts at window edges.", "Cheap quotas, daily or monthly plan limits"],
          ["Sliding window", "Weights the previous window to smooth the edge problem.", "Per-user API limits where fairness matters"],
          ["Token bucket", "Refills at a steady rate, allows bursts up to bucket size.", "Most request-level limits: burst-friendly, rate-bounded"],
          ["Concurrency limit", "Caps in-flight requests rather than requests per second.", "Expensive endpoints: exports, reports, LLM calls"],
        ],
      },
      {
        type: "p",
        text: "Token bucket is the right default for request-level limits. Real clients are bursty: a page load fires eight calls at once, then nothing for ten seconds. A token bucket lets that burst through while still bounding the sustained rate.",
      },
      { type: "h2", id: "starting-numbers", text: "Starting numbers that rarely hurt anyone" },
      {
        type: "p",
        text: "There is no universal correct limit, but these defaults are a sane place to start. Measure your p99 legitimate usage for a week, then set limits at roughly 3–5× that so real users never notice them.",
      },
      {
        type: "table",
        head: ["Endpoint class", "Key", "Starting limit"],
        rows: [
          ["Public, unauthenticated reads", "Client IP (or /64 for IPv6)", "60 req/min, burst 20"],
          ["Authenticated API", "API key or user ID", "600 req/min, burst 50"],
          ["Login / token issue", "Account + IP", "5 attempts/min, 20 per 15 min"],
          ["Password reset / OTP send", "Account", "3 per hour"],
          ["Expensive jobs (exports, AI)", "User ID", "2–4 concurrent, queue the rest"],
        ],
      },
      { type: "h2", id: "what-to-key-on", text: "Key on identity, not just IP" },
      {
        type: "ul",
        items: [
          "Corporate NAT and mobile carriers put thousands of real users behind one IPv4 address. IP-only limits punish them.",
          "A single IPv6 host can rotate through 2^64 addresses. Aggregate IPv6 clients by /64 prefix.",
          "Authenticated traffic should be limited by API key or user ID, with a looser IP limit as an outer guard.",
          "Login endpoints need both: per-account limits stop credential stuffing against one user, per-IP limits stop spraying across many.",
          "Behind a load balancer, make sure you read the real client IP from a trusted header, not the proxy's address.",
        ],
      },
      { type: "h2", id: "edge", text: "Layer 1: coarse limits at the edge" },
      {
        type: "p",
        text: "Nginx's `limit_req` module implements a leaky bucket and is ideal as a cheap first line. It protects capacity before requests ever reach your application.",
      },
      {
        type: "code",
        lang: "nginx",
        filename: "/etc/nginx/conf.d/rate-limits.conf",
        code: `# 10 MB of shared memory holds roughly 160,000 client states
limit_req_zone $binary_remote_addr zone=per_ip:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m  rate=5r/m;
limit_req_status 429;

server {
    location /api/ {
        # absorb short bursts, reject beyond 20 queued requests
        limit_req zone=per_ip burst=20 nodelay;
        proxy_pass http://app;
    }

    location = /api/auth/login {
        limit_req zone=login burst=5;
        proxy_pass http://app;
    }
}`,
      },
      {
        type: "table",
        head: ["Parameter", "What it does"],
        rows: [
          ["`rate=10r/s`", "Sustained rate. Nginx tracks it in milliseconds, so this means one request every 100 ms."],
          ["`burst=20`", "How many requests can queue above the rate before rejection."],
          ["`nodelay`", "Serve burst requests immediately instead of spacing them out. Usually what you want for APIs."],
          ["`limit_req_status 429`", "Return 429 Too Many Requests instead of the default 503, which clients treat as an outage."],
        ],
      },
      { type: "h2", id: "app", text: "Layer 2: precise limits in the application" },
      {
        type: "p",
        text: "Per-user and per-key limits belong in the application, backed by a shared store so every instance sees the same counts. This Redis Lua script implements an atomic token bucket in one round trip.",
      },
      {
        type: "code",
        lang: "lua",
        filename: "token_bucket.lua",
        code: `-- KEYS[1] = bucket key
-- ARGV = capacity, refill_per_sec, now_ms, cost
local capacity = tonumber(ARGV[1])
local rate     = tonumber(ARGV[2])
local now      = tonumber(ARGV[3])
local cost     = tonumber(ARGV[4])

local state  = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(state[1]) or capacity
local ts     = tonumber(state[2]) or now

tokens = math.min(capacity, tokens + (now - ts) / 1000 * rate)
local allowed = tokens >= cost
if allowed then tokens = tokens - cost end

redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))

return { allowed and 1 or 0, math.floor(tokens) }`,
      },
      { type: "h2", id: "responses", text: "Tell clients when to come back" },
      {
        type: "p",
        text: "A rejection without guidance invites retry storms. Return `429` with a `Retry-After` header in seconds, and expose the remaining budget so clients can pace themselves before they hit the wall.",
      },
      {
        type: "code",
        lang: "http",
        code: `HTTP/1.1 429 Too Many Requests
Retry-After: 12
RateLimit-Limit: 600
RateLimit-Remaining: 0
RateLimit-Reset: 12
Content-Type: application/problem+json

{"type":"https://api.example.com/errors/rate-limited","title":"Rate limit exceeded","status":429}`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "The `RateLimit-*` headers come from an IETF draft. Many APIs still send `X-RateLimit-*`. Pick one convention, document it, and keep it stable.",
      },
      { type: "h2", id: "mistakes", text: "Mistakes we see in reviews" },
      {
        type: "ul",
        items: [
          "Using in-memory counters with multiple replicas, which multiplies the effective limit by the instance count.",
          "Failing closed when Redis is down and turning a cache outage into a full API outage. Fail open with an edge limit as backup.",
          "Rate limiting health checks and internal service traffic.",
          "Returning 403 or 503 for limits, which breaks client retry logic.",
          "Never alerting on 429 rates, so abuse and misconfigured clients go unnoticed.",
        ],
      },
    ],
  },
  {
    slug: "postgresql-connection-pool-sizing",
    title: "PostgreSQL Connection Pool Sizing: The Numbers and the Reasoning",
    excerpt:
      "Why a pool of 100 is usually slower than a pool of 10, how to budget connections across replicas, and when PgBouncer earns its place.",
    topics: ["database-system-design", "backend-api"],
    format: "blog",
    readingMinutes: 10,
    publishedAt: "2026-11-05",
    cover: "lattice",
    author,
    tags: ["postgresql", "connection pooling", "pgbouncer", "performance"],
    level: "Intermediate",
    content: [
      {
        type: "p",
        text: "When a PostgreSQL-backed service slows down under load, the instinctive fix is to raise the pool size. It almost always makes things worse. Each PostgreSQL connection is a separate operating system process with its own memory, and beyond a small multiple of your CPU cores, extra connections only add contention for locks, CPU, and disk.",
      },
      { type: "h2", id: "formula", text: "Start with the formula, then measure" },
      {
        type: "p",
        text: "A widely used starting point from the PostgreSQL community is: active connections ≈ (CPU cores × 2) + effective spindle count. On a 4-vCPU database with SSD storage, that is roughly 9–10 connections doing real work at once. That number surprises people, but a small pool with a short queue usually beats a large pool where every query fights for the same resources.",
      },
      {
        type: "quote",
        text: "You want a small pool saturated with work, not a large pool waiting on locks.",
      },
      { type: "h2", id: "budget", text: "Budget connections across every client" },
      {
        type: "p",
        text: "The database sees the sum of every pool. Before choosing a per-instance size, write down the budget:",
      },
      {
        type: "code",
        lang: "text",
        code: `max_connections (e.g. 100)
  − superuser_reserved_connections (default 3)
  − admin, migrations, monitoring headroom (≈ 10)
  = 87 available for applications

87 ÷ (API replicas 6 + worker replicas 2) ≈ 10 per instance`,
      },
      {
        type: "callout",
        tone: "warning",
        text: "Autoscaling breaks this math silently. If your API can scale to 20 replicas, size pools for 20, or put PgBouncer in front of the database.",
      },
      { type: "h2", id: "client-settings", text: "Recommended client pool settings" },
      {
        type: "table",
        head: ["Setting", "Starting value", "Why"],
        rows: [
          ["Max pool size", "5–20 per instance", "Derived from the budget above, never from guesswork"],
          ["Connection timeout", "3–5 s", "Fail fast when the pool is exhausted instead of piling up requests"],
          ["Idle timeout", "30 s – 10 min", "Release connections during quiet periods"],
          ["Max lifetime", "30 min", "Recycle connections so failovers and DNS changes are picked up"],
          ["`statement_timeout`", "5–30 s for APIs", "Stop runaway queries from holding a connection forever"],
          ["`idle_in_transaction_session_timeout`", "30–60 s", "Kill sessions that opened a transaction and forgot about it"],
          ["`application_name`", "Service name", "Makes `pg_stat_activity` readable during incidents"],
        ],
      },
      {
        type: "code",
        lang: "ts",
        filename: "db.ts",
        code: `import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  maxLifetimeSeconds: 1_800,
  statement_timeout: 15_000,
  idle_in_transaction_session_timeout: 30_000,
  application_name: "orders-api",
});`,
      },
      { type: "h2", id: "pgbouncer", text: "When to add PgBouncer" },
      {
        type: "p",
        text: "Add a pooler when the number of clients is large or unpredictable: many replicas, serverless functions, or several services sharing one database. In transaction mode, PgBouncer hands a server connection to a client only for the duration of a transaction, so thousands of clients can share a few dozen real connections.",
      },
      {
        type: "code",
        lang: "ini",
        filename: "/etc/pgbouncer/pgbouncer.ini",
        code: `[databases]
app = host=10.0.1.10 port=5432 dbname=app

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt

pool_mode = transaction
max_client_conn = 2000
default_pool_size = 20
reserve_pool_size = 5
reserve_pool_timeout = 3
server_idle_timeout = 300
max_prepared_statements = 100`,
      },
      {
        type: "ul",
        items: [
          "Transaction mode breaks session state: `SET`, session-level advisory locks, `LISTEN/NOTIFY`, and temporary tables do not survive between transactions.",
          "PgBouncer 1.21+ supports protocol-level prepared statements via `max_prepared_statements`. Older versions need prepared statements disabled in the driver.",
          "Run migrations against PostgreSQL directly, not through the transaction pooler.",
        ],
      },
      { type: "h2", id: "observe", text: "Watch the pool, not just the database" },
      {
        type: "code",
        lang: "sql",
        code: `SELECT application_name, state, count(*)
FROM pg_stat_activity
WHERE datname = current_database()
GROUP BY application_name, state
ORDER BY count(*) DESC;`,
      },
      {
        type: "p",
        text: "Many `idle in transaction` sessions point to application bugs. A pool that is always fully checked out with a growing wait queue means queries are too slow. Fix the queries before you grow the pool.",
      },
    ],
  },
  {
    slug: "kubernetes-cpu-memory-requests",
    title: "Kubernetes CPU and Memory: Requests, Limits, and Sane Defaults",
    excerpt:
      "What requests and limits actually do, why CPU limits often hurt latency, and how to size containers from real usage instead of guesses.",
    topics: ["docker-kubernetes", "devops-devsecops"],
    format: "blog",
    readingMinutes: 12,
    publishedAt: "2026-10-28",
    cover: "mesh",
    author,
    tags: ["kubernetes", "resources", "oomkilled", "throttling"],
    level: "Advanced",
    content: [
      {
        type: "p",
        text: "Resource settings are the most copy-pasted lines in Kubernetes manifests and the least understood. Getting them wrong produces three classic failures: pods stuck in Pending, containers OOMKilled at random, and services with mysterious latency spikes caused by CPU throttling.",
      },
      { type: "h2", id: "semantics", text: "What requests and limits really mean" },
      {
        type: "table",
        head: ["Field", "CPU", "Memory"],
        rows: [
          ["`requests`", "Used for scheduling and guarantees a proportional share of CPU under contention", "Used for scheduling and eviction ranking"],
          ["`limits`", "Hard cap enforced by CFS quota; exceeding it throttles the container", "Hard cap; exceeding it gets the container OOMKilled"],
        ],
      },
      {
        type: "p",
        text: "The asymmetry matters. CPU is compressible: going over the limit slows you down. Memory is not: going over the limit kills the process.",
      },
      { type: "h2", id: "recommendations", text: "Recommended defaults" },
      {
        type: "ul",
        items: [
          "Always set CPU and memory requests. Without them the scheduler is guessing and your pods land in the BestEffort QoS class, first in line for eviction.",
          "Set memory limit equal to memory request for most services. It makes OOM behaviour predictable and avoids overcommitting nodes.",
          "Be cautious with CPU limits on latency-sensitive services. A container can be throttled even when average usage is well under the limit, because quota is enforced every 100 ms.",
          "If policy requires CPU limits, set them generously (2–4× the request) and watch `container_cpu_cfs_throttled_periods_total`.",
          "Batch jobs are the exception: hard CPU limits keep them from starving neighbours.",
        ],
      },
      {
        type: "code",
        lang: "yaml",
        filename: "deployment.yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 3
  selector:
    matchLabels: { app: orders-api }
  template:
    metadata:
      labels: { app: orders-api }
    spec:
      containers:
        - name: app
          image: ghcr.io/acme/orders-api:1.4.2
          resources:
            requests:
              cpu: "250m"      # ≈ p95 observed CPU
              memory: "384Mi"  # peak working set + ~25% headroom
            limits:
              memory: "384Mi"  # equal to request: predictable OOM behaviour
              # no CPU limit: avoid throttling on a latency-sensitive API
          env:
            - name: NODE_OPTIONS
              value: "--max-old-space-size=288"  # ~75% of the memory limit`,
      },
      { type: "h2", id: "qos", text: "QoS classes decide who gets evicted" },
      {
        type: "table",
        head: ["Class", "When you get it", "Eviction priority"],
        rows: [
          ["Guaranteed", "Every container has requests = limits for both CPU and memory", "Last"],
          ["Burstable", "At least one request set, but not Guaranteed", "Middle, ranked by usage above request"],
          ["BestEffort", "No requests or limits at all", "First"],
        ],
      },
      { type: "h2", id: "sizing", text: "Size from data, not intuition" },
      {
        type: "p",
        text: "Run the workload under realistic traffic for at least a week. Set the CPU request near p95 usage and the memory limit at peak working set plus 20–30%. Revisit after major releases. The Vertical Pod Autoscaler in recommendation mode will do this analysis for you without changing anything.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# live usage per container
kubectl top pod -n orders --containers

# how much of each node is already promised
kubectl describe node <node-name> | grep -A 8 "Allocated resources"

# find recent OOM kills
kubectl get pods -A -o json | jq -r '.items[]
  | select(.status.containerStatuses[]?.lastState.terminated.reason == "OOMKilled")
  | .metadata.namespace + "/" + .metadata.name'`,
      },
      { type: "h2", id: "runtimes", text: "Make the runtime aware of its limits" },
      {
        type: "ul",
        items: [
          "JVM: use `-XX:MaxRAMPercentage=75` so the heap is sized from the container limit, not node memory.",
          "Node.js: set `--max-old-space-size` to about 75% of the memory limit to leave room for buffers and native memory.",
          "Go: set `GOMEMLIMIT` slightly below the memory limit. Go 1.25+ respects cgroup CPU limits for `GOMAXPROCS`; older versions need `automaxprocs`.",
          "Python workers: size the worker count from the CPU request, not `os.cpu_count()`, which reports node cores.",
        ],
      },
      { type: "h2", id: "namespace-defaults", text: "Enforce defaults per namespace" },
      {
        type: "code",
        lang: "yaml",
        filename: "limitrange.yaml",
        code: `apiVersion: v1
kind: LimitRange
metadata:
  name: defaults
  namespace: orders
spec:
  limits:
    - type: Container
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
      default:
        memory: "256Mi"`,
      },
    ],
  },
  {
    slug: "prompt-injection-design-controls",
    title: "Prompt Injection Is a Design Problem, Not a Filtering Problem",
    excerpt:
      "Why you cannot sanitize your way out of prompt injection, and the architectural controls that actually limit the blast radius of LLM features.",
    topics: ["ai-security", "ai-llm", "app-api-security"],
    format: "blog",
    readingMinutes: 9,
    publishedAt: "2026-10-20",
    cover: "orbit",
    author,
    tags: ["llm", "prompt injection", "owasp llm top 10", "agents"],
    level: "Intermediate",
    content: [
      {
        type: "p",
        text: "Prompt injection happens when text the model reads is interpreted as instructions the developer never intended. It sits at the top of the OWASP Top 10 for LLM Applications because there is no clean fix: instructions and data travel through the same channel, the context window.",
      },
      { type: "h2", id: "two-kinds", text: "Direct and indirect injection" },
      {
        type: "ul",
        items: [
          "Direct: a user types \"ignore previous instructions\" into your chatbot. Annoying, but the user can only affect their own session.",
          "Indirect: the model reads a web page, email, PDF, or support ticket that contains hidden instructions. This is the dangerous one, because the attacker is not the user and the user's permissions are what get abused.",
        ],
      },
      { type: "h2", id: "why-filters-fail", text: "Why filters are not enough" },
      {
        type: "p",
        text: "Blocklists and classifier-based detectors catch known phrasings, but natural language has unlimited ways to say the same thing, including other languages, encodings, and instructions split across documents. Treat detection as telemetry, not as a security boundary.",
      },
      {
        type: "quote",
        text: "Assume the model will eventually follow malicious instructions. Design so that when it does, nothing important happens.",
      },
      { type: "h2", id: "controls", text: "Controls that limit the blast radius" },
      {
        type: "table",
        head: ["Control", "What it prevents"],
        rows: [
          ["Least-privilege tools", "The model can only call what the current user is allowed to do, scoped to their data"],
          ["Server-side authorization on every tool call", "A hijacked model cannot escalate beyond the user's real permissions"],
          ["Human confirmation for side effects", "Payments, emails, deletions, and refunds need an explicit user click"],
          ["Treat model output as untrusted input", "No raw HTML rendering, no output piped into SQL, shell, or `eval`"],
          ["Egress restrictions", "Blocks data exfiltration through auto-loaded markdown images or arbitrary URL fetches"],
          ["Context separation", "Untrusted documents are clearly delimited and never mixed with system instructions"],
        ],
      },
      {
        type: "code",
        lang: "ts",
        filename: "tools.ts",
        code: `const tools = {
  searchOrders: { scope: "orders:read", sideEffect: false },
  refundOrder: { scope: "orders:refund", sideEffect: true },
} as const;

type ToolName = keyof typeof tools;

export async function runToolCall(call: ToolCall, user: User) {
  if (!(call.name in tools)) throw new Error("Unknown tool");
  const name = call.name as ToolName;
  const tool = tools[name];

  // authorize against the human user, never against the model
  if (!user.scopes.includes(tool.scope)) throw new ForbiddenError(name);

  // validate model-generated arguments like any untrusted request body
  const args = argSchemas[name].parse(call.arguments);

  if (tool.sideEffect) {
    return requestUserConfirmation({ tool: name, args, userId: user.id });
  }
  return handlers[name](args, user);
}`,
      },
      { type: "h2", id: "checklist", text: "Pre-launch checklist for LLM features" },
      {
        type: "ul",
        items: [
          "List every tool and data source the model can reach. Remove anything not required.",
          "Confirm that each tool call is authorized against the end user's session on the server.",
          "Render model output as text or sanitized markdown, with remote images disabled or proxied.",
          "Log prompts, retrieved documents, and tool calls with user IDs so incidents can be reconstructed.",
          "Red-team with indirect injection: plant instructions in a document your RAG pipeline indexes and see what happens.",
        ],
      },
    ],
  },
  {
    slug: "practical-coding-standard",
    title: "A Practical Coding Standard: Names, Functions, and Errors",
    excerpt:
      "Three rules that remove most review comments: name things by intent, keep functions to one level of abstraction, and make errors impossible to ignore.",
    topics: ["clean-code", "software-development"],
    format: "blog",
    readingMinutes: 7,
    publishedAt: "2026-10-10",
    cover: "signal",
    author,
    tags: ["clean code", "code review", "typescript", "error handling"],
    level: "Beginner",
    content: [
      {
        type: "p",
        text: "Coding standards fail when they are 40-page documents about brace placement. Formatters already solved that. A useful standard is short, focused on decisions a tool cannot make, and enforced in review. These three rules cover most of what makes code expensive to change.",
      },
      { type: "h2", id: "names", text: "1. Name by intent, not by type" },
      {
        type: "code",
        lang: "ts",
        code: `// before: the reader has to reverse-engineer meaning
const d = 86400000;
const list = users.filter((u) => u.s === 2 && Date.now() - u.t < d);

// after: the code explains itself
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const recentlyActiveAdmins = users.filter(
  (user) => user.role === Role.Admin && Date.now() - user.lastSeenAt < ONE_DAY_MS,
);`,
      },
      {
        type: "ul",
        items: [
          "Booleans read as questions: `isExpired`, `hasAccess`, `shouldRetry`.",
          "Functions are verbs that describe the outcome: `calculateInvoiceTotal`, not `processData`.",
          "Units belong in names when types cannot carry them: `timeoutMs`, `sizeBytes`.",
        ],
      },
      { type: "h2", id: "functions", text: "2. One level of abstraction per function" },
      {
        type: "p",
        text: "A function that validates input, builds SQL, formats an email, and logs metrics is hard to test and harder to change. Keep orchestration functions at a high level, and push details into well-named helpers.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export async function placeOrder(input: PlaceOrderInput) {
  const order = validateOrder(input);
  const priced = await applyPricing(order);
  const saved = await orderRepository.save(priced);
  await notifyCustomer(saved);
  return saved;
}`,
      },
      { type: "h2", id: "errors", text: "3. Make errors impossible to ignore" },
      {
        type: "ul",
        items: [
          "Never swallow exceptions with an empty `catch`. Handle, rethrow with context, or let it propagate.",
          "Fail at the boundary: validate input where it enters the system, then trust typed data inside.",
          "Add context when rethrowing: `new Error(\"Failed to charge order 123\", { cause: err })`.",
          "Return typed results for expected failures (not found, invalid) and throw for unexpected ones.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Put these rules in a pull request template as three checkboxes. Standards that live where reviews happen get followed.",
      },
    ],
  },
  {
    slug: "production-nginx-reverse-proxy",
    title: "Production-Ready Nginx Reverse Proxy Configuration",
    excerpt:
      "Build a hardened Nginx reverse proxy step by step: TLS, HTTP/2, correct proxy headers, timeouts, security headers, and safe reloads.",
    topics: ["linux-networking", "devops-devsecops", "app-api-security"],
    format: "tutorial",
    readingMinutes: 14,
    publishedAt: "2026-11-14",
    featured: true,
    cover: "lattice",
    author,
    tags: ["nginx", "tls", "reverse proxy", "security headers"],
    level: "Intermediate",
    duration: "45 min",
    steps: [
      { title: "Get a certificate", body: "Issue a Let's Encrypt certificate with Certbot and confirm auto-renewal works." },
      { title: "Redirect HTTP to HTTPS", body: "Serve a single permanent redirect on port 80 and nothing else." },
      { title: "Configure TLS and HTTP/2", body: "Modern protocols only, session caching on, tickets off." },
      { title: "Proxy headers and timeouts", body: "Forward the real client IP and scheme, reuse upstream connections, fail fast." },
      { title: "Add security headers", body: "HSTS, nosniff, frame protection, and a referrer policy on every response." },
      { title: "Test and reload safely", body: "Validate config before every reload and verify the result from outside." },
    ],
    content: [
      {
        type: "p",
        text: "This tutorial puts Nginx in front of an application listening on `127.0.0.1:3000`. Every directive is explained, so you can adapt the config rather than paste it blindly. Tested with Nginx 1.25+ on Ubuntu 24.04.",
      },
      { type: "h2", id: "certificate", text: "Step 1: Get a certificate" },
      {
        type: "code",
        lang: "bash",
        code: `sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
sudo certbot certonly --nginx -d example.com
sudo certbot renew --dry-run`,
      },
      { type: "h2", id: "config", text: "Steps 2–5: The complete configuration" },
      {
        type: "code",
        lang: "nginx",
        filename: "/etc/nginx/conf.d/example.com.conf",
        code: `upstream app {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    server_tokens off;
    client_max_body_size 10m;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`,
      },
      { type: "h2", id: "directives", text: "What each important directive does" },
      {
        type: "table",
        head: ["Directive", "Why it is there"],
        rows: [
          ["`keepalive 32`", "Keeps up to 32 idle connections to the app per worker, avoiding a TCP handshake per request. Requires HTTP/1.1 and an empty `Connection` header."],
          ["`http2 on`", "Enables HTTP/2 (Nginx 1.25.1+). On older versions, use `listen 443 ssl http2` instead."],
          ["`ssl_protocols TLSv1.2 TLSv1.3`", "Disables TLS 1.0 and 1.1, which are deprecated and fail compliance scans."],
          ["`ssl_prefer_server_ciphers off`", "With only modern ciphers enabled, let clients pick the one that is fastest on their hardware."],
          ["`ssl_session_tickets off`", "Session tickets weaken forward secrecy unless keys are rotated. The shared session cache gives the same speed benefit."],
          ["`server_tokens off`", "Hides the Nginx version in headers and error pages."],
          ["`client_max_body_size 10m`", "Caps upload size. The default is 1 MB; set it to what your app actually accepts."],
          ["`always` on `add_header`", "Sends headers on error responses too, not only 2xx and 3xx."],
          ["`X-Forwarded-Proto $scheme`", "Lets the app know the original request was HTTPS, for redirects and secure cookies."],
          ["`proxy_read_timeout 60s`", "How long Nginx waits for the app to respond. Raise it per location for slow endpoints, not globally."],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Only add `preload` to HSTS when every subdomain serves HTTPS. Getting removed from browser preload lists takes months.",
      },
      { type: "h3", text: "WebSockets" },
      {
        type: "p",
        text: "WebSockets need the `Upgrade` header forwarded, which conflicts with the empty `Connection` header used for keepalive. Use a `map` so each request gets the right value.",
      },
      {
        type: "code",
        lang: "nginx",
        code: `map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      '';
}

location /ws/ {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_read_timeout 1h;
}`,
      },
      { type: "h2", id: "reload", text: "Step 6: Test and reload safely" },
      {
        type: "code",
        lang: "bash",
        code: `sudo nginx -t && sudo systemctl reload nginx

# verify from outside the server
curl -sI https://example.com | grep -iE "strict-transport|x-content-type|server"
curl -sI http://example.com | head -n 3`,
      },
      {
        type: "p",
        text: "`reload` starts new workers with the new config and gracefully drains old ones, so in-flight requests are not dropped. `restart` drops them. Always run `nginx -t` first: a reload with an invalid config is rejected, but a restart with one takes the site down.",
      },
    ],
  },
  {
    slug: "docker-run-flags-explained",
    title: "Every docker run Flag You Need for Production, Explained",
    excerpt:
      "Go from a bare docker run to a hardened, resource-limited, observable container, with every flag explained and a Compose equivalent.",
    topics: ["docker-kubernetes", "app-api-security", "devops-devsecops"],
    format: "tutorial",
    readingMinutes: 12,
    publishedAt: "2026-11-01",
    cover: "key",
    author,
    tags: ["docker", "containers", "hardening", "docker compose"],
    level: "Beginner",
    duration: "30 min",
    steps: [
      { title: "Bind ports privately", body: "Publish to localhost unless the container must be reachable from outside." },
      { title: "Run as non-root", body: "Use a fixed unprivileged UID and drop all Linux capabilities." },
      { title: "Make the filesystem read-only", body: "Mount a small tmpfs for scratch space and nothing else writable." },
      { title: "Limit resources", body: "Cap memory, CPU, and process count so one container cannot take down the host." },
      { title: "Add health and logging", body: "Health checks for restarts and rotation so logs never fill the disk." },
    ],
    content: [
      {
        type: "p",
        text: "`docker run -p 3000:3000 myapp` works on a laptop. In production it runs as root, can use all host memory, exposes the port on every interface, and writes logs until the disk fills. Here is how to fix each of those, one flag at a time.",
      },
      { type: "h2", id: "hardened", text: "The hardened command" },
      {
        type: "code",
        lang: "bash",
        code: `docker run -d \\
  --name orders-api \\
  --init \\
  --restart unless-stopped \\
  -p 127.0.0.1:8080:3000 \\
  --env-file ./orders.env \\
  --user 10001:10001 \\
  --read-only \\
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \\
  --cap-drop ALL \\
  --security-opt no-new-privileges:true \\
  --memory 512m --memory-swap 512m \\
  --cpus 1.0 \\
  --pids-limit 200 \\
  --health-cmd "wget -qO- http://127.0.0.1:3000/healthz || exit 1" \\
  --health-interval 30s --health-timeout 3s --health-retries 3 \\
  --log-opt max-size=10m --log-opt max-file=3 \\
  ghcr.io/acme/orders-api:1.4.2`,
      },
      { type: "h2", id: "flags", text: "Every flag, explained" },
      {
        type: "table",
        head: ["Flag", "What it does", "Recommendation"],
        rows: [
          ["`-d`", "Runs detached in the background.", "Use for services; omit for one-off jobs."],
          ["`--init`", "Runs a tiny init (tini) as PID 1 to forward signals and reap zombie processes.", "Use unless your image already ships an init."],
          ["`--restart unless-stopped`", "Restarts on crash or daemon restart, but not after a manual stop.", "Good default for single-host services."],
          ["`-p 127.0.0.1:8080:3000`", "Publishes container port 3000 on host port 8080, localhost only.", "Always bind an address. Bare `-p 8080:3000` listens on all interfaces."],
          ["`--env-file`", "Loads environment variables from a file.", "Keeps secrets out of shell history and `ps` output. Never bake them into images."],
          ["`--user 10001:10001`", "Runs as an unprivileged UID and GID.", "Pick a fixed high UID that does not exist on the host."],
          ["`--read-only`", "Mounts the container's root filesystem read-only.", "Blocks attackers from dropping binaries or modifying code."],
          ["`--tmpfs /tmp:...`", "In-memory scratch space with `noexec` and a size cap.", "Add only the writable paths your app needs."],
          ["`--cap-drop ALL`", "Removes all Linux capabilities.", "Add back individual ones, such as `NET_BIND_SERVICE`, only if needed."],
          ["`--security-opt no-new-privileges`", "Prevents setuid binaries from gaining privileges.", "Always on."],
          ["`--memory 512m --memory-swap 512m`", "Hard memory cap; equal swap value disables swap.", "Size from measured peak plus headroom."],
          ["`--cpus 1.0`", "Limits CPU to one core's worth of time.", "Stops a busy container from starving neighbours."],
          ["`--pids-limit 200`", "Caps the number of processes.", "Defuses fork bombs and runaway thread pools."],
          ["`--health-*`", "Defines a health check and its timing.", "Lets orchestrators and `docker ps` see real health, not just \"running\"."],
          ["`--log-opt max-size / max-file`", "Rotates json-file logs.", "Without it, logs grow until the disk is full."],
          ["`image:1.4.2`", "Pins an explicit version.", "Never deploy `:latest`. Pin by digest for full reproducibility."],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Docker writes its own iptables rules. A port published as `-p 8080:3000` is reachable from the internet even if `ufw` says it is blocked. Bind to `127.0.0.1` and put a reverse proxy in front.",
      },
      { type: "h2", id: "compose", text: "The Docker Compose equivalent" },
      {
        type: "code",
        lang: "yaml",
        filename: "compose.yaml",
        code: `services:
  orders-api:
    image: ghcr.io/acme/orders-api:1.4.2
    init: true
    restart: unless-stopped
    ports: ["127.0.0.1:8080:3000"]
    env_file: ./orders.env
    user: "10001:10001"
    read_only: true
    tmpfs: ["/tmp:rw,noexec,nosuid,size=64m"]
    cap_drop: [ALL]
    security_opt: ["no-new-privileges:true"]
    mem_limit: 512m
    memswap_limit: 512m
    cpus: 1.0
    pids_limit: 200
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:3000/healthz || exit 1"]
      interval: 30s
      timeout: 3s
      retries: 3
    logging:
      driver: json-file
      options: { max-size: "10m", max-file: "3" }`,
      },
      { type: "h2", id: "verify", text: "Verify the result" },
      {
        type: "code",
        lang: "bash",
        code: `docker inspect orders-api --format '{{.Config.User}} ro={{.HostConfig.ReadonlyRootfs}} caps={{.HostConfig.CapDrop}}'
docker stats --no-stream orders-api
docker inspect orders-api --format '{{json .State.Health}}' | jq`,
      },
    ],
  },
  {
    slug: "aws-account-security-baseline",
    title: "Secure AWS Account Baseline in an Afternoon",
    excerpt:
      "Lock down the root user, centralize audit logs, block public S3 by default, turn on threat detection, and enforce guardrails that stay on.",
    topics: ["cloud", "devops-devsecops", "app-api-security"],
    format: "tutorial",
    readingMinutes: 13,
    publishedAt: "2026-10-24",
    cover: "radar",
    author,
    tags: ["aws", "iam", "cloudtrail", "guardduty", "s3"],
    level: "Intermediate",
    duration: "90 min",
    steps: [
      { title: "Lock down the root user", body: "Hardware MFA, no access keys, and a recovery process that does not depend on one person." },
      { title: "Use IAM Identity Center for people", body: "Short-lived credentials through SSO instead of long-lived IAM user keys." },
      { title: "Turn on CloudTrail everywhere", body: "A multi-region trail with log file validation, stored in a protected bucket." },
      { title: "Block public S3 access", body: "Account-level Block Public Access, so no bucket can be made public by accident." },
      { title: "Enable detection and encryption defaults", body: "GuardDuty, EBS encryption by default, and budget alerts." },
      { title: "Add guardrails with SCPs", body: "Prevent anyone from disabling the controls you just turned on." },
    ],
    content: [
      {
        type: "p",
        text: "Most AWS breaches are not sophisticated. They come from leaked long-lived access keys, a public S3 bucket, or nobody noticing unusual activity for weeks. This baseline closes those gaps. Run the commands with an administrator role in each account, or from the management account where noted.",
      },
      { type: "h2", id: "root", text: "Step 1: Lock down the root user" },
      {
        type: "ul",
        items: [
          "Enable MFA on the root user, preferably a hardware security key. Register two keys and store one offline.",
          "Delete any root access keys. Root should never be used programmatically.",
          "Use a shared, monitored email alias for the root account, not one person's inbox.",
        ],
      },
      {
        type: "code",
        lang: "bash",
        code: `# expect AccountMFAEnabled = 1 and AccountAccessKeysPresent = 0
aws iam get-account-summary \\
  --query 'SummaryMap.{mfa: AccountMFAEnabled, rootKeys: AccountAccessKeysPresent}'`,
      },
      { type: "h2", id: "identity-center", text: "Step 2: IAM Identity Center for humans" },
      {
        type: "p",
        text: "Create users or connect your identity provider in IAM Identity Center, then assign permission sets per account. Engineers get temporary credentials with `aws sso login`, and there are no long-lived keys sitting in `~/.aws/credentials` waiting to leak.",
      },
      {
        type: "code",
        lang: "bash",
        code: `aws configure sso          # one-time profile setup
aws sso login --profile prod-readonly
aws sts get-caller-identity --profile prod-readonly`,
      },
      { type: "h2", id: "cloudtrail", text: "Step 3: CloudTrail in every region" },
      {
        type: "code",
        lang: "bash",
        code: `aws cloudtrail create-trail \\
  --name org-audit \\
  --s3-bucket-name acme-cloudtrail-logs \\
  --is-multi-region-trail \\
  --enable-log-file-validation

aws cloudtrail start-logging --name org-audit`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "The destination bucket needs a bucket policy that allows CloudTrail to write. Put it in a separate log-archive account if you use AWS Organizations, so compromised workload accounts cannot delete the evidence.",
      },
      { type: "h2", id: "s3", text: "Step 4: Block public S3 access account-wide" },
      {
        type: "code",
        lang: "bash",
        code: `aws s3control put-public-access-block \\
  --account-id 123456789012 \\
  --public-access-block-configuration \\
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`,
      },
      {
        type: "p",
        text: "Serve public assets through CloudFront with Origin Access Control instead of a public bucket. That keeps the account-level block intact.",
      },
      { type: "h2", id: "detection", text: "Step 5: Detection and encryption defaults" },
      {
        type: "code",
        lang: "bash",
        code: `# threat detection (repeat per region, or delegate an admin account in Organizations)
aws guardduty create-detector --enable

# encrypt every new EBS volume in this region
aws ec2 enable-ebs-encryption-by-default --region us-east-1`,
      },
      {
        type: "p",
        text: "Also create an AWS Budget with an alert at 80% of the expected monthly spend. A sudden cost spike is often the first visible sign of compromised credentials being used for crypto mining.",
      },
      { type: "h2", id: "scp", text: "Step 6: Guardrails with service control policies" },
      {
        type: "code",
        lang: "json",
        filename: "protect-baseline.scp.json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ProtectAuditTrail",
      "Effect": "Deny",
      "Action": ["cloudtrail:StopLogging", "cloudtrail:DeleteTrail", "cloudtrail:UpdateTrail"],
      "Resource": "*"
    },
    {
      "Sid": "ProtectGuardDuty",
      "Effect": "Deny",
      "Action": ["guardduty:DeleteDetector", "guardduty:UpdateDetector"],
      "Resource": "*"
    },
    {
      "Sid": "DenyRootUser",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": { "StringLike": { "aws:PrincipalArn": "arn:aws:iam::*:root" } }
    }
  ]
}`,
      },
      {
        type: "note",
        text: "SCPs do not apply to the Organizations management account. Keep workloads out of it, and test SCPs on a sandbox OU before attaching them to production.",
      },
    ],
  },
  {
    slug: "secure-nodejs-api-baseline",
    title: "Securing a Node.js API: Headers, Validation, Authorization, and Secrets",
    excerpt:
      "A practical Express hardening pass that fixes the issues penetration tests flag most often, with code you can drop into an existing API.",
    topics: ["app-api-security", "backend-api", "software-development"],
    format: "tutorial",
    readingMinutes: 11,
    publishedAt: "2026-10-15",
    cover: "signal",
    author,
    tags: ["node.js", "express", "owasp", "zod", "helmet"],
    level: "Beginner",
    duration: "40 min",
    steps: [
      { title: "Validate configuration at startup", body: "Crash on boot if a secret is missing, not at 3 a.m. on the first request." },
      { title: "Set security headers and body limits", body: "Helmet for headers, a small JSON limit, and the right proxy trust setting." },
      { title: "Validate every request body", body: "Strict schemas reject unknown fields and oversized values." },
      { title: "Authorize at the object level", body: "Scope every query to the current user to prevent broken object-level authorization." },
      { title: "Return safe errors", body: "Log details on the server, return generic messages to clients." },
    ],
    content: [
      {
        type: "p",
        text: "Broken object-level authorization, missing input validation, and leaked stack traces show up in almost every API penetration test. Each has a small, boring fix. This tutorial applies them to an Express app; the same ideas carry over to Fastify, NestJS, and other frameworks.",
      },
      { type: "h2", id: "config", text: "Step 1: Validate configuration at startup" },
      {
        type: "code",
        lang: "ts",
        filename: "config.ts",
        code: `import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const config = Env.parse(process.env);`,
      },
      { type: "h2", id: "headers", text: "Step 2: Security headers and body limits" },
      {
        type: "code",
        lang: "ts",
        filename: "app.ts",
        code: `import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

export const app = express();

app.set("trust proxy", 1); // exactly one reverse proxy in front
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(
  "/api/",
  rateLimit({ windowMs: 60_000, limit: 100, standardHeaders: "draft-7", legacyHeaders: false }),
);`,
      },
      {
        type: "table",
        head: ["Setting", "Why"],
        rows: [
          ["`trust proxy: 1`", "Reads the client IP from `X-Forwarded-For` set by one trusted proxy. `true` trusts any spoofed header and breaks IP-based rate limits."],
          ["`helmet()`", "Sets sensible defaults for CSP, HSTS, nosniff, frame options, and removes `X-Powered-By`."],
          ["`limit: \"100kb\"`", "Stops oversized payloads from consuming memory and CPU during parsing."],
        ],
      },
      { type: "h2", id: "validation", text: "Step 3: Validate every request body" },
      {
        type: "code",
        lang: "ts",
        code: `const UpdateProfile = z
  .object({
    name: z.string().trim().min(1).max(100),
    bio: z.string().max(500).optional(),
  })
  .strict(); // rejects unknown fields such as "role": "admin"

app.patch("/api/me", requireAuth, async (req, res) => {
  const parsed = UpdateProfile.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_body", issues: parsed.error.issues });
  }
  const user = await users.update(req.user.id, parsed.data);
  res.json(user);
});`,
      },
      {
        type: "p",
        text: "`.strict()` is the important part. Without it, a client can send extra fields like `role` or `isAdmin`, and an ORM that spreads the body into an update will happily save them. That is mass assignment.",
      },
      { type: "h2", id: "authorization", text: "Step 4: Authorize at the object level" },
      {
        type: "code",
        lang: "ts",
        code: `// vulnerable: any logged-in user can read any order by guessing IDs
const order = await db.order.findUnique({ where: { id: req.params.id } });

// fixed: the ownership check is part of the query
const order = await db.order.findFirst({
  where: { id: req.params.id, ownerId: req.user.id },
});
if (!order) return res.status(404).end(); // 404, not 403: don't confirm it exists`,
      },
      { type: "h2", id: "errors", text: "Step 5: Return safe errors" },
      {
        type: "code",
        lang: "ts",
        code: `app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  req.log?.error({ err }, "unhandled error");
  res.status(500).json({ error: "internal_error" });
});`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Run `npm audit --omit=dev` in CI and fail the build on high-severity issues in production dependencies. It takes seconds and catches known-vulnerable packages before they ship.",
      },
    ],
  },
];

export function getArticle(slug: string, format?: ArticleFormat) {
  return articles.find((article) => article.slug === slug && (!format || article.format === format));
}

export function getBlogs() {
  return articles.filter((article) => article.format === "blog");
}

export function getTutorials() {
  return articles.filter((article) => article.format === "tutorial");
}

export function getArticlesByTopic(topic: TopicId) {
  return articles.filter((article) => article.topics.includes(topic));
}

export function articleHref(article: Pick<Article, "slug" | "format">) {
  return article.format === "tutorial" ? `/tutorials/${article.slug}` : `/blog/${article.slug}`;
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  const overlap = (article: Article) => article.topics.filter((topic) => current.topics.includes(topic)).length;
  return articles
    .filter((article) => article.slug !== slug)
    .sort((a, b) => overlap(b) - overlap(a))
    .slice(0, limit);
}

export function getHeadings(article: Article) {
  return article.content.flatMap((block) =>
    block.type === "h2" ? [{ id: block.id, text: block.text }] : [],
  );
}
