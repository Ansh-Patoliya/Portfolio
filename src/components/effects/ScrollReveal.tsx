import type { PropsWithChildren } from "react";
import { motion, type MotionProps } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type ScrollRevealProps = PropsWithChildren<
  {
    className?: string;
    delay?: number;
    y?: number;
    once?: boolean;
    amount?: number;
  } & Pick<MotionProps, "style">
>;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  amount = 0.25,
  style,
}: ScrollRevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

