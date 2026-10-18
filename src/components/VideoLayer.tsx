import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Video } from "remotion";
import { THEME } from "../theme/tokens";

interface VideoLayerProps {
  src?: string;
  posterImage?: string;
  zoomStart?: number;
  zoomEnd?: number;
  panStartX?: number; // in percentage, e.g. 0
  panEndX?: number;   // in percentage, e.g. -10
  panStartY?: number;
  panEndY?: number;
  borderRadius?: number;
  tiltAngle?: number;
  width?: number | string;
  height?: number | string;
  glow?: boolean;
}

export const VideoLayer: React.FC<VideoLayerProps> = ({
  src,
  posterImage,
  zoomStart = 1.0,
  zoomEnd = 1.15,
  panStartX = 0,
  panEndX = -20,
  panStartY = 0,
  panEndY = -10,
  borderRadius = 16,
  tiltAngle = 0,
  width = "100%",
  height = "100%",
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Smooth cinematic camera motion curve
  const cameraSpring = spring({
    frame,
    fps,
    config: THEME.springs.cinematic,
    durationInFrames,
  });

  const scale = interpolate(cameraSpring, [0, 1], [zoomStart, zoomEnd]);
  const panX = interpolate(cameraSpring, [0, 1], [panStartX, panEndX]);
  const panY = interpolate(cameraSpring, [0, 1], [panStartY, panEndY]);

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius,
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: glow
          ? "0 24px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(204, 120, 92, 0.15)"
          : "0 20px 40px rgba(0, 0, 0, 0.6)",
        transform: `perspective(1200px) rotateX(${tiltAngle}deg)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {src ? (
          <Video
            src={src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : posterImage ? (
          <img
            src={posterImage}
            alt="B-Roll"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          /* High-end animated placeholder when no footage is supplied */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #181A24 0%, #0F1017 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "rgba(204, 120, 92, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(204, 120, 92, 0.3)",
                color: THEME.colors.accentTerracotta,
              }}
            >
              ▶
            </div>
            <span style={{ fontSize: 14, color: THEME.colors.textSecondary }}>Footage / B-Roll Slot</span>
          </div>
        )}
      </div>

      {/* Subtle Glass Glare Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
