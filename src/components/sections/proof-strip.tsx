import { BookOpen, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { icon: Sparkles, label: "Beginner-friendly lessons" },
  { icon: PlayCircle, label: "Animated video tutorials" },
  { icon: BookOpen, label: "Step-by-step guides" },
  { icon: ShieldCheck, label: "Practical security skills" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-line bg-surface-strong/70 px-5 py-5 md:px-8" aria-label="What you get">
      <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="inline-flex items-center gap-2.5 text-sm text-paper/80">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/10 text-cyan">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
