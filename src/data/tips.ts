import type { TopicId } from "@/data/topics";

export type TipKind = "Command" | "Config" | "Code" | "Practice";

export type Tip = {
  id: string;
  title: string;
  detail: string;
  topic: TopicId;
  kind: TipKind;
  code?: { lang: string; code: string };
};

export const tips: Tip[] = [
  {
    id: "explain-analyze-buffers",
    title: "Use EXPLAIN (ANALYZE, BUFFERS), not plain EXPLAIN",
    detail:
      "Plain EXPLAIN shows estimates. ANALYZE runs the query and shows real row counts and timings; BUFFERS shows how much came from cache versus disk. Large gaps between estimated and actual rows usually mean stale statistics.",
    topic: "database-system-design",
    kind: "Command",
    code: {
      lang: "sql",
      code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;`,
    },
  },
  {
    id: "create-index-concurrently",
    title: "Create indexes on live tables with CONCURRENTLY",
    detail:
      "A normal CREATE INDEX blocks writes for the whole build. CONCURRENTLY takes longer but lets traffic continue. It cannot run inside a transaction, so disable your migration tool's transaction wrapper for that step.",
    topic: "database-system-design",
    kind: "Command",
    code: {
      lang: "sql",
      code: `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_customer_created
  ON orders (customer_id, created_at DESC);`,
    },
  },
  {
    id: "nginx-dump-config",
    title: "Print the full effective Nginx config with nginx -T",
    detail:
      "Capital -T validates the config and prints every included file in order. It is the fastest way to find which server block is actually handling a request, or a stray include that overrides your settings.",
    topic: "linux-networking",
    kind: "Command",
    code: { lang: "bash", code: `sudo nginx -T | less` },
  },
  {
    id: "ss-listening-ports",
    title: "Find what is listening on a port with ss",
    detail:
      "ss replaces netstat on modern Linux. -t TCP, -u UDP, -l listening, -p process, -n numeric. If a service is bound to 0.0.0.0 when it should be on 127.0.0.1, this is where you will see it.",
    topic: "linux-networking",
    kind: "Command",
    code: { lang: "bash", code: `sudo ss -tulpn | grep -E ':(80|443|5432|6379)\\b'` },
  },
  {
    id: "curl-timing",
    title: "Break down request latency with curl -w",
    detail:
      "Before blaming the app, check where the time goes: DNS, TCP connect, TLS handshake, or time to first byte. A slow TLS stage points at the proxy or certificate chain, not your code.",
    topic: "linux-networking",
    kind: "Command",
    code: {
      lang: "bash",
      code: `curl -o /dev/null -s -w 'dns:%{time_namelookup} tcp:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\\n' https://example.com`,
    },
  },
  {
    id: "docker-disk-usage",
    title: "Reclaim Docker disk space safely",
    detail:
      "docker system df shows what is using space. Pruning images older than a week keeps recent rollback targets while clearing build leftovers. Avoid volume prune on servers unless you are sure; it deletes data.",
    topic: "docker-kubernetes",
    kind: "Command",
    code: {
      lang: "bash",
      code: `docker system df
docker image prune -a --filter "until=168h"
docker builder prune --filter "until=168h"`,
    },
  },
  {
    id: "kubectl-events-sorted",
    title: "Read Kubernetes events in time order",
    detail:
      "kubectl get events is unsorted by default, which makes incidents confusing. Sorting by timestamp shows the real sequence: scheduling failures, image pull errors, probe failures, and OOM kills.",
    topic: "docker-kubernetes",
    kind: "Command",
    code: { lang: "bash", code: `kubectl get events -n orders --sort-by=.lastTimestamp | tail -n 30` },
  },
  {
    id: "kubectl-debug",
    title: "Debug distroless pods with an ephemeral container",
    detail:
      "Minimal images have no shell, which is good for security and bad for debugging. kubectl debug attaches a temporary container that shares the target's process namespace, so you can inspect it without rebuilding the image.",
    topic: "docker-kubernetes",
    kind: "Command",
    code: { lang: "bash", code: `kubectl debug -it pod/orders-api-7d9f -n orders --image=busybox:1.36 --target=app` },
  },
  {
    id: "sts-whoami",
    title: "Always check which AWS identity you are using",
    detail:
      "Before running anything destructive, confirm the account and role. Most \"I deleted prod\" stories start with the wrong profile exported in a terminal.",
    topic: "cloud",
    kind: "Command",
    code: { lang: "bash", code: `aws sts get-caller-identity --query '[Account, Arn]' --output text` },
  },
  {
    id: "ssh-control-master",
    title: "Make repeated SSH connections instant",
    detail:
      "ControlMaster reuses one authenticated connection for later sessions, scp, and git operations. ServerAliveInterval stops idle sessions from dropping behind NAT.",
    topic: "developer-tools",
    kind: "Config",
    code: {
      lang: "ssh-config",
      code: `# ~/.ssh/config
Host *
  ControlMaster auto
  ControlPath ~/.ssh/cm-%r@%h:%p
  ControlPersist 10m
  ServerAliveInterval 30
  IdentitiesOnly yes`,
    },
  },
  {
    id: "git-fixup-autosquash",
    title: "Clean up pull requests with fixup commits",
    detail:
      "Instead of a trail of \"fix typo\" commits, mark fixes against the commit they belong to, then let an interactive rebase fold them in automatically before merge.",
    topic: "developer-tools",
    kind: "Command",
    code: {
      lang: "bash",
      code: `git commit --fixup=<sha>
git rebase -i --autosquash main`,
    },
  },
  {
    id: "gitleaks-precommit",
    title: "Catch secrets before they reach the repository",
    detail:
      "Once a key is pushed, assume it is compromised, even if you force-push it away. A secret scanner in a pre-commit hook and in CI stops most leaks at the source.",
    topic: "devops-devsecops",
    kind: "Command",
    code: { lang: "bash", code: `gitleaks git --verbose        # scan history (gitleaks v8.19+)\ngitleaks git --staged         # pre-commit: scan staged changes only` },
  },
  {
    id: "node-env-file-watch",
    title: "Drop dotenv and nodemon in Node.js 22+",
    detail:
      "Node 22 can load .env files and restart on change natively. Fewer dependencies means a smaller supply-chain surface and faster installs.",
    topic: "software-development",
    kind: "Command",
    code: { lang: "bash", code: `node --env-file=.env --watch src/server.js` },
  },
  {
    id: "timeouts-everywhere",
    title: "Every outbound call needs a timeout",
    detail:
      "Default HTTP clients often wait forever. One slow dependency then holds connections and threads until your whole service stalls. Set connect and total timeouts on every HTTP, database, and queue client.",
    topic: "backend-api",
    kind: "Code",
    code: {
      lang: "ts",
      code: `const res = await fetch(url, { signal: AbortSignal.timeout(5_000) });`,
    },
  },
  {
    id: "pin-llm-versions",
    title: "Pin LLM model versions and keep an eval set",
    detail:
      "Model aliases can change behaviour without warning. Pin a dated model version in production, and run a small evaluation set of real prompts before every model upgrade, just like regression tests.",
    topic: "ai-llm",
    kind: "Practice",
  },
  {
    id: "no-markdown-images-llm",
    title: "Disable remote images in LLM chat output",
    detail:
      "A prompt-injected model can leak data by emitting a markdown image whose URL contains secrets; the browser fetches it automatically. Strip or proxy remote images in rendered model output.",
    topic: "ai-security",
    kind: "Practice",
  },
  {
    id: "early-return",
    title: "Prefer early returns over nested conditionals",
    detail:
      "Guard clauses handle invalid cases first and leave the main path unindented. The result is shorter functions that read top to bottom.",
    topic: "clean-code",
    kind: "Code",
    code: {
      lang: "ts",
      code: `function shippingCost(order: Order) {
  if (!order.items.length) return 0;
  if (order.total >= FREE_SHIPPING_THRESHOLD) return 0;
  return calculateRate(order.destination, order.weightKg);
}`,
    },
  },
];
