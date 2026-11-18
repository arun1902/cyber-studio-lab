import type { Article } from "@/data/articles";

export function CoverArt({
  variant,
  className = "",
  showLabel = true,
}: {
  variant: Article["cover"];
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="520" fill="var(--surface-strong)" />
      <g opacity="0.35" stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, index) => (
          <line key={`v-${index}`} x1={index * 72} y1="0" x2={index * 72} y2="520" />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={index * 72} x2="800" y2={index * 72} />
        ))}
      </g>
      {variant === "radar" && (
        <g fill="none" stroke="var(--cyan)" strokeWidth="1.5">
          <circle cx="430" cy="260" r="70" />
          <circle cx="430" cy="260" r="130" opacity="0.7" />
          <circle cx="430" cy="260" r="190" opacity="0.4" />
          <path className="dash" d="M430 260 L600 140" stroke="var(--blue)" />
        </g>
      )}
      {variant === "lattice" && (
        <g fill="none" stroke="var(--yellow)" strokeWidth="1.4">
          <path className="dash" d="M80 400 L220 140 L420 320 L640 80 L740 240" />
          <path d="M220 140 L300 420 L560 360" stroke="var(--cyan)" opacity="0.8" />
          {[
            [220, 140],
            [420, 320],
            [640, 80],
            [300, 420],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="var(--yellow)" stroke="none" />
          ))}
        </g>
      )}
      {variant === "signal" && (
        <g fill="none" stroke="var(--blue)" strokeWidth="2">
          <path className="dash" d="M40 280 C140 280 160 120 240 120 S340 400 430 400 540 160 640 160 760 300 780 300" />
          <path d="M40 320 C160 320 180 200 280 200 S400 360 520 360 680 220 780 220" stroke="var(--paper)" opacity="0.45" />
        </g>
      )}
      {variant === "key" && (
        <g fill="none" stroke="var(--cyan)" strokeWidth="2">
          <circle cx="250" cy="250" r="78" />
          <path d="M328 250 H690" />
          <path d="M560 250 V330 M630 250 V310 M690 250 V350" />
          <circle cx="250" cy="250" r="18" fill="var(--blue)" stroke="none" />
        </g>
      )}
      {variant === "mesh" && (
        <g stroke="var(--blue)" strokeWidth="1.2" fill="var(--cyan)">
          <path className="dash" d="M120 140 L280 360 L520 120 L700 390" fill="none" />
          <path d="M120 140 L520 120 M280 360 L700 390 M280 360 L520 120" fill="none" opacity="0.7" />
          <circle cx="120" cy="140" r="6" />
          <circle cx="280" cy="360" r="6" />
          <circle cx="520" cy="120" r="6" />
          <circle cx="700" cy="390" r="6" />
        </g>
      )}
      {variant === "orbit" && (
        <g fill="none" stroke="var(--yellow)" strokeWidth="1.5">
          <ellipse cx="400" cy="260" rx="230" ry="90" />
          <ellipse cx="400" cy="260" rx="160" ry="180" stroke="var(--blue)" opacity="0.75" />
          <circle cx="620" cy="230" r="7" fill="var(--yellow)" stroke="none" />
          <circle cx="300" cy="120" r="5" fill="var(--blue)" stroke="none" />
        </g>
      )}
      {showLabel && (
        <text x="36" y="478" fill="var(--mist)" fontFamily="ui-monospace, monospace" fontSize="14" letterSpacing="3">
          CYBERSTUDIOLAB
        </text>
      )}
    </svg>
  );
}
