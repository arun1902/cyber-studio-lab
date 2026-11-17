"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || !glowRef.current) return;

    const node = glowRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currentX = x;
    let currentY = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const tick = () => {
      currentX += (x - currentX) * 0.16;
      currentY += (y - currentY) * 0.16;
      node.style.transform = `translate3d(${currentX - 140}px, ${currentY - 140}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    node.style.opacity = "1";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[280px] w-[280px] rounded-full opacity-0 mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(216,255,62,0.16) 0%, rgba(142,176,255,0.08) 36%, transparent 70%)",
      }}
    />
  );
}
