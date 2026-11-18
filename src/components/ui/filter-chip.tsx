export function FilterChip({
  active,
  onClick,
  tone = "cyan",
  children,
}: {
  active: boolean;
  onClick: () => void;
  tone?: "cyan" | "yellow";
  children: React.ReactNode;
}) {
  const activeClass = tone === "yellow" ? "border-yellow bg-yellow text-on-accent" : "border-cyan bg-cyan text-on-accent";
  const hoverClass = tone === "yellow" ? "hover:border-yellow" : "hover:border-cyan";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${active ? activeClass : `border-line text-paper ${hoverClass}`}`}
    >
      {children}
    </button>
  );
}
