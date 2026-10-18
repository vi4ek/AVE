import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { VizionPrismMark } from "./VizionPrismMark";

export interface VizionWatermarkPillProps {
  top?: number;
  left?: number;
  opacity?: number;
}

/**
 * VizionWatermarkPill - Official Top-Left Apple Keynote Frosted Watermark
 *
 * Design Spec:
 * - High-contrast Cupertino dark glass (rgba(18, 19, 26, 0.88))
 * - Real-time 28px Prismatic "V" Monolith with Cyan Ice / Royal Iris crystalline facets
 * - White Poppins 800 display typography: "@vizion.std"
 * - Periodic animated specular shine sweep (every 6 seconds / 180 frames)
 * - Safe Zone placement: top 72px, left 56px
 */
export const VizionWatermarkPill: React.FC<VizionWatermarkPillProps> = ({
  top = 72,
  left = 56,
  opacity = 0.92,
}) => {
  const frame = useCurrentFrame();

  // Gentle periodic glint sweep every 180 frames (~6s @ 30fps)
  const cycleFrame = frame % 180;
  const glintPhase = interpolate(cycleFrame, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glintTranslateX = interpolate(glintPhase, [0, 1], [-60, 200]);
  const glintOpacity = interpolate(glintPhase, [0, 0.2, 0.8, 1], [0, 0.85, 0.85, 0]);

  // Subtle orbital light for the prism mark
  const causticAngle = (frame * 0.05) % (Math.PI * 2);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 18px 8px 10px",
        borderRadius: 100,
        backgroundColor: "rgba(18, 19, 26, 0.88)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: "0 14px 36px rgba(0, 0, 0, 0.32), 0 2px 8px rgba(0, 0, 0, 0.18)",
        opacity,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Specular Glint Sweep Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 40,
          transform: `translateX(${glintTranslateX}px) skewX(-25deg)`,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)",
          opacity: glintOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Prismatic "V" Monolith Icon Container */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.15), 0 0 16px rgba(0, 242, 254, 0.25)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <VizionPrismMark
          size={24}
          causticAngle={causticAngle}
          glintPhase={glintPhase}
          theme="dark"
        />
      </div>

      {/* Label Text */}
      <span
        style={{
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 19,
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.015em",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        @vizion.std
      </span>
    </div>
  );
};
