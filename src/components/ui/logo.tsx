import Link from "next/link";

/** Square brand mark. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#4F46E5" />
      <path
        d="M11 14.5 L7 20 L11 25.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 14.5 L33 20 L29 25.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12.2c2.4 1.6 4.4 2.1 6.2 2.1v5.1c0 3.7-2.4 6.2-6.2 8.1-3.8-1.9-6.2-4.4-6.2-8.1v-5.1c1.8 0 3.8-.5 6.2-2.1z"
        fill="#F97316"
      />
    </svg>
  );
}

/**
 * Stable navbar/footer logo — crisp icon + wordmark on the nav background.
 * (Full logo-merge video stays in the hero only.)
 */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 bg-transparent leading-none ${className}`}
      aria-label="cyberstudiolab, home"
    >
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col">
        <span className="font-display text-[1.1rem] font-semibold lowercase tracking-[-0.03em] text-paper">
          cyberstudio<span className="text-cyan">lab</span>
        </span>
        {!compact && (
          <span className="mt-0.5 whitespace-nowrap font-sans text-[0.7rem] tracking-[-0.01em] text-mist transition-colors group-hover:text-paper">
            Learn. Build. <span className="font-medium text-yellow">Secure.</span>
          </span>
        )}
      </span>
    </Link>
  );
}
