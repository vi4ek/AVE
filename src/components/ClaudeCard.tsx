import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface ClaudeCardProps {
  title?: string;
  badge?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  startFrame?: number;
  width?: number | string;
  glowColor?: "terracotta" | "amber" | "iris" | "none";
  tiltAngleX?: number;
  tiltAngleY?: number;
}

export const ClaudeCard: React.FC<ClaudeCardProps> = ({
  title,
  badge,
  icon,
  children,
  startFrame = 0,
  width = 680,
  glowColor = "terracotta",
  tiltAngleX = 0,
  tiltAngleY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.smooth,
  });

  const translateY = interpolate(cardSpring, [0, 1], [40, 0]);
  const scale = interpolate(cardSpring, [0, 1], [0.93, 1]);
  const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Subtle breathing glow animation
  const glowIntensity = interpolate(
    Math.sin((frame / 45) * Math.PI),
    [-1, 1],
    [0.15, 0.28]
  );

  const glowShadow =
    glowColor === "terracotta"
      ? `0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(204, 120, 92, ${glowIntensity})`
      : glowColor === "amber"
      ? `0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(245, 158, 11, ${glowIntensity})`
      : glowColor === "iris"
      ? `0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(129, 140, 248, ${glowIntensity})`
      : "0 24px 64px -12px rgba(0, 0, 0, 0.7)";

  return (
    <div
      style={{
        width,
        opacity,
        transform: `perspective(1000px) translateY(${translateY}px) scale(${scale}) rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg)`,
        backgroundColor: "rgba(22, 24, 34, 0.75)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: glowShadow,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Border Accent Highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 1,
          background:
            glowColor === "terracotta"
              ? "linear-gradient(90deg, transparent, rgba(204, 120, 92, 0.8), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
        }}
      />

      {/* Card Header */}
      {(title || badge || icon) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {icon && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "rgba(204, 120, 92, 0.15)",
                  color: THEME.colors.accentTerracotta,
                }}
              >
                {icon}
              </span>
            )}
            {title && (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </span>
            )}
          </div>

          {badge && (
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 9999,
                backgroundColor: "rgba(204, 120, 92, 0.14)",
                color: THEME.colors.accentTerracotta,
                border: "1px solid rgba(204, 120, 92, 0.25)",
              }}
            >
              {badge}
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div style={{ padding: 28 }}>{children}</div>
    </div>
  );
};
