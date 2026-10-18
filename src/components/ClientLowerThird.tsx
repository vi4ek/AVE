import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ClientNiche, NICHE_PROFILES } from "../presets/niches";

export interface ClientLowerThirdProps {
  niche?: ClientNiche;
  name: string;
  title: string;
  affiliation?: string;
  startFrame?: number;
  durationFrames?: number;
}

export const ClientLowerThird: React.FC<ClientLowerThirdProps> = ({
  niche = "dermatology",
  name,
  title,
  affiliation,
  startFrame = 15,
  durationFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const profile = NICHE_PROFILES[niche];

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Spring entrance
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  // Smooth exit fade
  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 20, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateX = interpolate(enterSpring, [0, 1], [-80, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  const getBadgeIcon = () => {
    switch (profile.badgeIcon) {
      case "medical":
        return "✚";
      case "legal":
        return "⚖";
      case "code":
        return "⚡";
      case "documentary":
        return "●";
      default:
        return "✓";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 340,
        left: 60,
        transform: `translateX(${translateX}px)`,
        opacity,
        zIndex: 80,
        pointerEvents: "none",
        fontFamily: profile.typography.fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: profile.colors.cardBg,
          backdropFilter: "blur(24px)",
          border: `1.5px solid ${profile.colors.cardBorder}`,
          borderRadius: 20,
          padding: "16px 28px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
          maxWidth: 960,
        }}
      >
        {/* Verified Niche Badge Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: profile.colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: 900,
            boxShadow: `0 0 20px ${profile.colors.primary}66`,
            flexShrink: 0,
          }}
        >
          {getBadgeIcon()}
        </div>

        {/* Name and Title Text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: profile.typography.headingWeight,
              color: profile.colors.textPrimary,
              lineHeight: 1.15,
              letterSpacing: profile.typography.letterSpacing,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: profile.colors.textSecondary,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: profile.colors.primary, fontWeight: 800 }}>
              {title}
            </span>
            {affiliation && (
              <>
                <span style={{ opacity: 0.4 }}>//</span>
                <span>{affiliation}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
