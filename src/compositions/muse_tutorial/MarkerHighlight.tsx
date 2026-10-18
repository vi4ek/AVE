import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MUSE_THEME } from "./tokens";

interface MarkerHighlightProps {
  children: React.ReactNode;
  color?: string;
  delayFrames?: number;
  heightPercent?: number;
  bottomPercent?: number;
}

export const MarkerHighlight: React.FC<MarkerHighlightProps> = ({
  children,
  color = MUSE_THEME.colors.yellow,
  delayFrames = 0,
  heightPercent = 42,
  bottomPercent = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      mass: 0.4,
      damping: 14,
      stiffness: 140,
    },
  });

  const width = Math.min(100, Math.max(0, progress * 100));

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        zIndex: 1,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: -4,
          bottom: `${bottomPercent}%`,
          width: `${width}%`,
          height: `${heightPercent}%`,
          backgroundColor: color,
          zIndex: -1,
          borderRadius: 4,
          transform: "rotate(-0.8deg)",
          transformOrigin: "left center",
        }}
      />
      {children}
    </span>
  );
};
