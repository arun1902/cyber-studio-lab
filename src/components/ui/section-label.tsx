export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
      <span className="rounded-md bg-yellow/15 px-2 py-0.5 text-yellow">{index}</span>
      <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
