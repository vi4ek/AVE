import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface PipPresenterProps {
  imageSrc?: string;
  name?: string;
  role?: string;
  startFrame?: number;
  size?: number;
  isSpeaking?: boolean;
}

export const PipPresenter: React.FC<PipPresenterProps> = ({
  imageSrc,
  name = "Presenter",
  role,
  startFrame = 0,
  size = 140,
  isSpeaking = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.snappy,
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Speaking wave pulse animation
  const pulse = isSpeaking
    ? interpolate(Math.sin((frame / 8) * Math.PI), [-1, 1], [1, 1.15])
    : 1;

  const ringOpacity = isSpeaking
    ? interpolate(Math.sin((frame / 8) * Math.PI), [-1, 1], [0.3, 0.7])
    : 0.2;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `scale(${scale})`,
        zIndex: 40,
      }}
    >
      {/* Outer Pulse Ring */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `2px solid ${THEME.colors.accentTerracotta}`,
            transform: `scale(${pulse})`,
            opacity: ringOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Circular Avatar / Webcam Container */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: THEME.colors.surfaceCard,
            border: `2px solid ${THEME.colors.accentTerracotta}`,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 24px rgba(204, 120, 92, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #181924 0%, #2A1F1D 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: THEME.colors.accentTerracotta,
                fontWeight: 700,
                fontSize: size * 0.32,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Presenter Name Badge */}
      {(name || role) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.colors.textPrimary,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {name}
          </div>
          {role && (
            <div
              style={{
                fontSize: 12,
                color: THEME.colors.textTerracotta,
                fontFamily: "'Inter', sans-serif",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                fontWeight: 500,
              }}
            >
              {role}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
