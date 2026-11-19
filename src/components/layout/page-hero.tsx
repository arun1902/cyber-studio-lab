import { SectionLabel } from "@/components/ui/section-label";

export function PageHero({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_360px_at_10%_0%,rgba(79,70,229,0.1),transparent_55%),radial-gradient(600px_300px_at_90%_20%,rgba(249,115,22,0.08),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel index={index}>{kicker}</SectionLabel>
        <h1 className="max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.04em]">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-8 text-mist">{children}</div>}
      </div>
    </header>
  );
}
