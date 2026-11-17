const items = [
  "PHISHING",
  "MFA",
  "PATCHING",
  "PRIVACY",
  "PASSWORDS",
  "AWARENESS",
  "HEADERS",
  "PERMISSIONS",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-track font-mono text-xs uppercase tracking-[0.28em] text-mist">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            {item}
            <span className="text-lime">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
