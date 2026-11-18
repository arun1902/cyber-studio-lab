import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 leading-none ${className}`} aria-label="CyberStudioLab, home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" fill="none" stroke="var(--cyan)" strokeWidth="1.5" />
        <path d="M13 10 L7 16 L13 22" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="square" />
        <path d="M19 10 L25 16 L19 22" fill="none" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="square" />
      </svg>
      <span className="flex flex-col">
        <span className="font-display text-[1.05rem] font-semibold tracking-[-0.04em]">
          Cyber<span className="text-cyan">Studio</span>Lab
        </span>
        <span className="mt-1 whitespace-nowrap font-mono text-[0.56rem] uppercase tracking-[0.2em] text-mist transition-colors group-hover:text-yellow">
          Learn. Build. Secure.
        </span>
      </span>
    </Link>
  );
}
