import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex flex-col leading-none ${className}`} aria-label="Cyber Studio Lab, home">
      <span className="font-display text-[1.15rem] font-semibold tracking-[-0.06em]">CYBER</span>
      <span className="mt-1 font-mono text-[0.62rem] tracking-[0.22em] text-lime transition-colors group-hover:text-paper">
        STUDIO LAB
      </span>
    </Link>
  );
}
