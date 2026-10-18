import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DrSnehalBrandPillProps {
  /** Start frame within the composition (default: 0) */
  startFrame?: number;
  /** Duration in frames to remain visible (default: 2304 frames for 60fps) */
  durationInFrames?: number;
}

/**
 * Exact Doctor Branding Pill matching user's reference image:
 * - NO icon / circle (removed (◉))
 * - Light white frosted glass backdrop with subtle outline and soft shadow
 * - Line 1: Dr. Snehal Navande (#0F172A, Bold Poppins)
 * - Line 2: | MBBS | MD | Dermatologist (#334155, Medium Poppins)
 */
export const DrSnehalBrandPill: React.FC<DrSnehalBrandPillProps> = ({
  startFrame = 0,
  durationInFrames = 2304,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Smooth spring entrance (0–15 frames)
  const enterSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.6 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [-16, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 56,
        zIndex: 95,
        display: "inline-flex",
        flexDirection: "column",
        gap: 3,
        padding: "9px 22px 10px 18px",
        borderRadius: 14,
        backgroundColor: "rgba(255, 255, 255, 0.94)", // Crisp white frosted pill matching reference
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.85)",
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.08)",
        transform: `translateY(${translateY}px)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Line 1: Name */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 21,
          fontWeight: 800,
          color: "#0F172A", // Deep charcoal dark slate
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        Dr. Snehal Navande
      </span>

      {/* Line 2: Occupation & Qualifications */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          color: "#475569", // Slate gray
          lineHeight: 1.2,
          letterSpacing: "0.02em",
        }}
      >
        | MBBS | MD | Dermatologist
      </span>
    </div>
  );
};
