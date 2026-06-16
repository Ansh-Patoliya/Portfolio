import { useEffect, useMemo, useRef, useState } from "react";
import { useIsCoarsePointer, usePrefersReducedMotion } from "./usePrefersReducedMotion";

type CursorGlowProps = {
  className?: string;
};

export function CursorGlow({ className }: CursorGlowProps) {
  const reduceMotion = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const enabled = useMemo(() => !reduceMotion && !coarse && isDesktop, [reduceMotion, coarse, isDesktop]);

  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    // target = pointer, current = lerped for smoothness
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      const k = 0.12; // lerp factor
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;

      el.style.transform = `translate3d(${(cx - 160).toFixed(2)}px, ${(cy - 160).toFixed(
        2,
      )}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={["cursor-glow pointer-events-none fixed left-0 top-0", className]
        .filter(Boolean)
        .join(" ")}
      style={{ zIndex: 1, pointerEvents: "none" }}
    />
  );
}

