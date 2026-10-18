import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface DermatologyDesignerHookProps {
  /** Start frame within the parent sequence/timeline */
  startFrame?: number;
  /** Duration of the hook in frames (default: 174 frames = ~5.8s @ 30fps) */
  durationInFrames?: number;
  /** Optional clinic or client name for corner attribution (default: undefined when BrandPill is used) */
  clinicName?: string;
  /** Whether to show raw text corner label (default: false when BrandPill is active) */
  showCornerName?: boolean;
}

/**
 * Clean Minimal Client Hook Frame (Strict Hard Rules Standard)
 *
 * Enforcing Executive Mandates:
 * - ONE image + ONE line. Nothing else.
 * - The image shows the problem (fallen hair).
 * - The line is the client's own exact words (never rewritten).
 * - ZERO pills, ZERO badges, ZERO labels, ZERO fake-medical cards, ZERO bento boxes.
 * - ONE accent color only.
 * - Smooth fade/scale-pop typography with subtle shadow.
 */
export const DermatologyDesignerHook: React.FC<DermatologyDesignerHookProps> = ({
  startFrame = 0,
  durationInFrames = 174,
  clinicName,
  showCornerName = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Smooth entrance spring for the line (0–12 frames)
  const lineSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.6 },
  });

  // Smooth exit transition at end of hook (frames 155–174)
  const exitProgress = interpolate(
    relFrame,
    [durationInFrames - 18, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(lineSpring, [0, 1], [24, 0]);
  const opacity = interpolate(lineSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  // Subtle image slow Ken Burns drift (1.0 -> 1.05)
  const imageScale = interpolate(relFrame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        backgroundColor: "#07090E",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 1. THE PROBLEM IMAGE (ONE image, fullscreen background with clean subtle scrim) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${imageScale})`,
          transformOrigin: "center center",
          opacity: 1 - exitProgress,
        }}
      >
        <img
          src={staticFile("inputs/broll_hairbrush.jpg")}
          alt="Hair loss problem"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.72) contrast(1.05)",
          }}
        />
        {/* Subtle cinematic gradient so the line is 100% crisp */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7, 9, 14, 0.90) 0%, rgba(7, 9, 14, 0.35) 45%, rgba(7, 9, 14, 0.40) 100%)",
          }}
        />
      </div>

      {/* 2. OPTIONAL CORNER NAME (Only rendered if showCornerName is true) */}
      {showCornerName && clinicName && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 60,
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "rgba(255, 255, 255, 0.60)",
            textTransform: "uppercase",
            opacity: 1 - exitProgress,
          }}
        >
          {clinicName}
        </div>
      )}

      {/* 3. THE ONE LINE (Client's exact words, bold Poppins 800/900, ONE accent color) */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 50,
          right: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.22,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            margin: 0,
            padding: 0,
            textShadow:
              "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.95), 0 8px 30px rgba(0, 0, 0, 0.85)",
          }}
        >
          {relFrame < 82 ? (
            <span>You rushed into my clinic</span>
          ) : (
            <span>
              holding a{" "}
              <span style={{ color: "#FDE68A", fontWeight: 900 }}>
                fistful of hair
              </span>{" "}
              and zero patience.
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};
