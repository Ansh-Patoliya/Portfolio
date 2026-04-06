import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type TypewriterProps = {
  prefix?: string;
  words: string[];
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
};

export function Typewriter({
  prefix = "I am a",
  words,
  className,
  typingMs = 55,
  deletingMs = 32,
  pauseMs = 900,
}: TypewriterProps) {
  const reduceMotion = usePrefersReducedMotion();

  const fallback = useMemo(() => `${prefix} ${words.join(" | ")}`, [prefix, words]);

  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const current = words[wordIndex] ?? "";
    const doneTyping = subIndex >= current.length;

    const ms = deleting ? deletingMs : typingMs;
    const timeout = window.setTimeout(() => {
      if (!deleting) {
        if (!doneTyping) {
          setSubIndex((v) => v + 1);
          return;
        }
        // pause at end
        window.setTimeout(() => setDeleting(true), pauseMs);
        return;
      }

      if (subIndex > 0) {
        setSubIndex((v) => v - 1);
        return;
      }

      setDeleting(false);
      setWordIndex((v) => (v + 1) % words.length);
    }, ms);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion, words, wordIndex, subIndex, deleting, typingMs, deletingMs, pauseMs]);

  if (reduceMotion) {
    return <span className={className}>{fallback}</span>;
  }

  const active = words[wordIndex] ?? "";
  const typed = active.slice(0, subIndex);

  return (
    <span className={className}>
      {prefix}{" "}
      <span className="text-transparent bg-gradient-to-r from-chart-1 via-chart-2 to-chart-1 bg-clip-text">
        {typed}
      </span>
      <span className="type-caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}

