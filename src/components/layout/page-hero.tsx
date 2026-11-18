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
      <div className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionLabel index={index}>{kicker}</SectionLabel>
        <h1 className="max-w-5xl font-display text-[clamp(2.6rem,6vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.045em]">
          {title}
        </h1>
        {children && <div className="mt-8 max-w-2xl text-lg leading-8 text-mist">{children}</div>}
      </div>
    </header>
  );
}
