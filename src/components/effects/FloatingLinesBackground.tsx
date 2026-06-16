import FloatingLines from "./FloatingLines";

export function FloatingLinesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <FloatingLines
        linesGradient={[
          "rgba(255,255,255,0.18)",
          "rgba(255,255,255,0.08)",
          "rgba(37,99,235,0.12)"
        ]}
        animationSpeed={0.6}
        interactive
        bendRadius={6}
        bendStrength={-0.35}
        mouseDamping={0.08}
        parallax
        parallaxStrength={0.12}
      />
    </div>
  );
}
