import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  accentColor?: string;
  startFrame?: number;
  durationFrames?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeLabel = "BEFORE TREATMENT",
  afterLabel = "AFTER (WEEK 4)",
  beforeContent,
  afterContent,
  accentColor = "#0284C7",
  startFrame = 0,
  durationFrames = 180,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 160 },
  });

  // Animated slider position: glides from 25% across to 75%, then settles at 50%
  const sliderPosition = interpolate(
    localFrame,
    [10, 45, 90, 130],
    [25, 75, 45, 50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const containerScale = interpolate(enterSpring, [0, 1], [0.92, 1]);
  const containerOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 960,
        height: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65)",
        transform: `scale(${containerScale})`,
        opacity: containerOpacity,
      }}
    >
      {/* 1. Base Layer: "Before" Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: beforeContent ? "transparent" : "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {beforeContent || (
          <div style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.6)" }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>🔬</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Untreated Skin Barrier // High Erythema</div>
          </div>
        )}
      </div>

      {/* 2. Top Clipped Layer: "After" Content (Clipped at sliderPosition %) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          background: afterContent ? "transparent" : "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {afterContent || (
          <div style={{ textAlign: "center", color: "#FFFFFF" }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>✨</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>Repaired Lipid Layer // 94% Smoothness</div>
          </div>
        )}
      </div>

      {/* 3. Glowing Divider Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: 4,
          background: "#FFFFFF",
          boxShadow: `0 0 20px ${accentColor}, 0 0 40px #FFFFFF`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Center Drag Handle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#FFFFFF",
            boxShadow: `0 0 25px ${accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0F172A",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          ⬌
        </div>
      </div>

      {/* 4. "Before" Pill Badge (Bottom Right) */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 100,
          padding: "8px 20px",
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        {beforeLabel}
      </div>

      {/* 5. "After" Pill Badge (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "rgba(2, 132, 199, 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: 100,
          padding: "8px 20px",
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 1,
          boxShadow: `0 0 20px ${accentColor}88`,
        }}
      >
        {afterLabel}
      </div>
    </div>
  );
};
