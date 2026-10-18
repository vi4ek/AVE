import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface CursorPointerProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  moveStartFrame: number;
  moveEndFrame: number;
  clickFrame?: number;
  showRipple?: boolean;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  startX,
  startY,
  endX,
  endY,
  moveStartFrame,
  moveEndFrame,
  clickFrame,
  showRipple = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth easing for cursor glide

  // Smooth easing for cursor glide
  const easedProgress = spring({
    frame: frame - moveStartFrame,
    fps,
    config: THEME.springs.smooth,
    durationInFrames: moveEndFrame - moveStartFrame,
  });

  const posX = interpolate(easedProgress, [0, 1], [startX, endX]);
  const posY = interpolate(easedProgress, [0, 1], [startY, endY]);

  // Click bounce
  const isClicking = clickFrame !== undefined && frame >= clickFrame && frame <= clickFrame + 12;
  const clickScale = isClicking
    ? interpolate(frame - clickFrame, [0, 4, 12], [1, 0.82, 1], { extrapolateRight: "clamp" })
    : 1;

  // Click ripple expansion
  const rippleProgress = clickFrame !== undefined && frame >= clickFrame
    ? interpolate(frame - clickFrame, [0, 18], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const rippleScale = interpolate(rippleProgress, [0, 1], [0.5, 2.4]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.8, 0.5, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        top: posY,
        pointerEvents: "none",
        zIndex: 100,
        transform: `scale(${clickScale})`,
        transition: "transform 0.1s ease",
      }}
    >
      {/* Click ripple animation */}
      {showRipple && clickFrame !== undefined && frame >= clickFrame && frame <= clickFrame + 20 && (
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `2px solid ${THEME.colors.accentAmber}`,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Modern macOS Cursor Pointer */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))",
        }}
      >
        <path
          d="M5.5 3.5L18.5 13.5L12.5 14.5L10 20.5L7.5 19.5L10 13.5L5.5 3.5Z"
          fill="#FFFFFF"
          stroke="#0A0B0E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
