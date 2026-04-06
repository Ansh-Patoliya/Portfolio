import { useMediaQuery } from "./useMediaQuery";

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

