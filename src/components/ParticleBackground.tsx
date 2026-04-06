import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { useTheme } from "./ThemeProvider";
import { useMediaQuery } from "./effects/useMediaQuery";

function cssVar(name: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || undefined;
}

export function ParticleBackground() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [engineReady, setEngineReady] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    let cancelled = false;

    initParticlesEngine(async engine => {
      await loadFull(engine);
    }).then(() => {
      if (cancelled) return;
      setEngineReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!engineReady) return;
    const t = window.setTimeout(() => setFadeIn(true), 50);
    return () => window.clearTimeout(t);
  }, [engineReady]);

  const options: ISourceOptions = useMemo(() => {
    const darkMode = theme === "dark";

    // Use theme tokens as a fallback for light mode.
    const primary = cssVar("--primary");
    const foreground = cssVar("--foreground");

    // “Floating neon orb” palette for dark mode.
    const neon = ["#22d3ee", "#60a5fa", "#a78bfa"]; // cyan / blue / purple
    const orbColors = darkMode ? neon : [primary ?? "#334155", foreground ?? "#64748b"];

    const density = reduceMotion ? 18 : (isMobile ? 22 : 60);
    const speed = reduceMotion ? 0 : (isMobile ? 0.18 : 0.32);

    const enableLinks = !isMobile && !reduceMotion;
    const enableHover = !reduceMotion;
    const enableClick = isMobile && !reduceMotion;

    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: "transparent" },
      particles: {
        number: {
          value: density,
          density: { enable: true, area: isMobile ? 900 : 1200 },
        },
        color: { value: orbColors },
        shape: { type: "circle" },

        // Ring + glass feel: mostly transparent fill, visible stroke.
        opacity: {
          value: { min: 0.12, max: 0.32 },
          animation: reduceMotion
            ? { enable: false }
            : {
                enable: true,
                speed: 0.35,
                sync: false,
                startValue: "random",
              },
        },
        stroke: {
          width: darkMode ? 1.4 : 1.2,
          color: { value: orbColors },
          opacity: darkMode ? 0.75 : 0.55,
        },
        size: {
          value: { min: 3, max: darkMode ? 7 : 6 },
          animation: reduceMotion
            ? { enable: false }
            : {
                enable: true,
                speed: 1.1, // slow “breathing”
                minimumValue: 2.5,
                sync: false,
              },
        },

        // Soft glow.
        shadow: {
          enable: darkMode,
          color: { value: orbColors },
          blur: 14,
          offset: { x: 0, y: 0 },
        },

        links: enableLinks
          ? {
              enable: true,
              distance: 150,
              color: { value: orbColors },
              opacity: 0.12,
              width: 1,
            }
          : { enable: false },

        move: {
          enable: !reduceMotion,
          speed,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
          parallax: reduceMotion
            ? { enable: false, force: 0, smooth: 0 }
            : { enable: true, force: 8, smooth: 12 },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: enableHover
            ? { enable: true, mode: enableLinks ? ["repulse", "bubble"] : ["repulse"] }
            : { enable: false, mode: [] },
          onClick: enableClick ? { enable: true, mode: ["repulse"] } : { enable: false, mode: [] },
          resize: { enable: true },
        },
        modes: {
          repulse: {
            distance: isMobile ? 90 : 160,
            duration: 0.35,
          },
          // Bubble gives that premium “intensify glow + scale” near cursor without being noisy.
          bubble: {
            distance: 140,
            size: 9,
            duration: 0.25,
            opacity: 0.55,
          },
        },
      },
    };
  }, [isMobile, reduceMotion, theme]);

  if (!engineReady) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "fixed inset-0 pointer-events-none",
        "transition-opacity duration-700 ease-out",
        fadeIn ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{ zIndex: 0 }}
    >
      <Particles
        id="tsparticles"
        options={options}
        className="h-full w-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

