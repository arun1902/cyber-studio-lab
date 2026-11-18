export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-mist">
      <span className="text-yellow">{index}</span>
      <span className="h-px w-10 bg-cyan/70" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
