import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme/tokens";

export const ParticleBackdrop: React.FC<{
  showGrid?: boolean;
  glowPosition?: "center" | "top" | "bottom" | "split";
}> = ({ showGrid = true, glowPosition = "center" }) => {
  const frame = useCurrentFrame();

  // Subtle breathing rotation & drift for ambient radial gradients
  const driftY = interpolate(frame % 300, [0, 300], [0, 40], {
    extrapolateRight: "clamp",
  });
  const glowScale = interpolate(
    Math.sin((frame / 60) * Math.PI * 0.5),
    [-1, 1],
    [0.92, 1.08]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: THEME.colors.canvas,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Primary Warm Terracotta Glow */}
      <div
        style={{
          position: "absolute",
          top: glowPosition === "top" ? "-20%" : glowPosition === "bottom" ? "60%" : "20%",
          left: "50%",
          width: 900,
          height: 900,
          transform: `translate(-50%, ${driftY}px) scale(${glowScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(204, 120, 92, 0.16) 0%, rgba(204, 120, 92, 0.04) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary Iris/Slate Ambient Accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129, 140, 248, 0.10) 0%, transparent 60%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Modern Perspective Grid Overlay */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
