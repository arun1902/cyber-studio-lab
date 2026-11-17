import { pageMeta } from "@/lib/metadata";
import { Magnetic } from "@/components/ui/magnetic";
import Link from "next/link";

export const metadata = pageMeta(
  "Signal lost",
  "That page is not in the Cyber Studio Lab archive.",
  "/404",
);

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden px-5 pb-20 pt-36 md:px-8">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime">404 / signal lost</p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(4rem,12vw,9rem)] uppercase leading-[0.82] tracking-[-0.06em]">
          This frequency
          <span className="text-stroke"> is empty.</span>
        </h1>
        <p className="mt-6 max-w-md text-mist">The page is not in the archive. The rest of the lab is still online.</p>
        <Magnetic className="mt-8 inline-block">
          <Link href="/" className="inline-flex h-12 items-center bg-lime px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90">
            Return home
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
