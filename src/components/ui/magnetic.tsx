"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.35 });

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.2);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
