import { execFileSync } from "node:child_process";

const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

function listeningPids() {
  if (process.platform === "win32") {
    const pids = new Set();
    for (const line of run("netstat", ["-ano", "-p", "tcp"]).split(/\r?\n/)) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5 && parts[3] === "LISTENING" && parts[1].endsWith(`:${port}`)) {
        pids.add(parts[4]);
      }
    }
    return [...pids];
  }
  return run("lsof", ["-ti", `tcp:${port}`, "-sTCP:LISTEN"]).split(/\s+/).filter(Boolean);
}

function isNode(pid) {
  if (process.platform === "win32") {
    return /node\.exe/i.test(run("tasklist", ["/FI", `PID eq ${pid}`, "/NH"]));
  }
  return /node/i.test(run("ps", ["-p", pid, "-o", "comm="]));
}

function kill(pid) {
  if (process.platform === "win32") {
    run("taskkill", ["/PID", pid, "/T", "/F"]);
  } else {
    run("kill", ["-9", pid]);
  }
}

for (const pid of listeningPids()) {
  if (Number(pid) === process.pid) continue;
  if (!isNode(pid)) {
    console.warn(`Port ${port} is held by a non-Node process (PID ${pid}); leaving it alone.`);
    continue;
  }
  kill(pid);
  console.log(`Stopped stale Node server on port ${port} (PID ${pid}).`);
}
