import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  startFrame?: number;
  width?: number | string;
  height?: number | string;
  tiltAngleX?: number;
  tiltAngleY?: number;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = "claude.ai",
  children,
  startFrame = 0,
  width = 960,
  height = 560,
  tiltAngleX = 2,
  tiltAngleY = -3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.smooth,
  });

  const translateY = interpolate(entrance, [0, 1], [50, 0]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width,
        height,
        opacity,
        transform: `perspective(1200px) rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg) translateY(${translateY}px) scale(${scale})`,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: THEME.colors.surfaceDark,
        border: `1px solid ${THEME.colors.borderGlass}`,
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(204, 120, 92, 0.12)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser Title Bar / Chrome */}
      <div
        style={{
          height: 44,
          backgroundColor: THEME.colors.surfaceCard,
          borderBottom: `1px solid ${THEME.colors.borderGlass}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 420,
            margin: "0 auto",
            height: 26,
            borderRadius: 6,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${THEME.colors.borderGlass}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: THEME.colors.textSecondary,
            letterSpacing: 0.3,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ opacity: 0.5, marginRight: 4 }}>🔒</span>
          <span>{url}</span>
        </div>
      </div>

      {/* Frame Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
