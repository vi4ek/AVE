import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { UPI_THEME } from "./tokens";

interface SceneProps {
  shots: Array<{
    id: string;
    start_frame: number;
    end_frame: number;
    duration_frames: number;
    on_screen_text: string;
  }>;
}

export const Scene6Cta: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s61, s62] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 6.1: Kinetic Text Slam (Frames 1413 - 1503)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s61.start_frame} durationInFrames={s61.duration_frames}>
        {(() => {
          const localFrame = frame - s61.start_frame;

          const w1 = spring({ frame: localFrame - 5, fps, config: { damping: 11, stiffness: 260 } });
          const w2 = spring({ frame: localFrame - 16, fps, config: { damping: 11, stiffness: 260 } });
          const w3 = spring({ frame: localFrame - 27, fps, config: { damping: 11, stiffness: 260 } });
          const w4 = spring({ frame: localFrame - 38, fps, config: { damping: 11, stiffness: 260 } });

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 60px",
              }}
            >
              {/* Mini Phone Icon Top */}
              <div
                style={{
                  width: 50,
                  height: 80,
                  borderRadius: 14,
                  border: `2px solid ${UPI_THEME.colors.surfaceBorder}`,
                  marginBottom: 60,
                  opacity: 0.6,
                }}
              />

              {/* Word-by-word kinetic text slam */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 84,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    transform: `scale(${interpolate(w1, [0, 1], [1.8, 1.0])})`,
                    opacity: w1,
                    letterSpacing: -0.5,
                  }}
                >
                  AISI HI TECH
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 76,
                    fontWeight: 900,
                    color: UPI_THEME.colors.orange,
                    transform: `scale(${interpolate(w2, [0, 1], [1.8, 1.0])})`,
                    opacity: w2,
                    letterSpacing: -0.5,
                  }}
                >
                  AASAN BHASHA
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 84,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    transform: `scale(${interpolate(w3, [0, 1], [1.8, 1.0])})`,
                    opacity: w3,
                    letterSpacing: -0.5,
                  }}
                >
                  MEIN SAMJHO
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 6.2: Follow Button Pulse & Tap (Frames 1503 - 1564)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s62.start_frame} durationInFrames={s62.duration_frames}>
        {(() => {
          const localFrame = frame - s62.start_frame;

          // Tap triggers at frame 24
          const isTapped = localFrame >= 24;

          const buttonSpring = spring({
            frame: localFrame - 5,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          // Continuous gentle pulse before tap
          const pulseScale = isTapped
            ? 1.0
            : 1.0 + Math.sin(localFrame / 5) * 0.04;

          // Animated pointer cursor
          const cursorX = interpolate(localFrame, [5, 24], [100, 0], { extrapolateRight: "clamp" });
          const cursorY = interpolate(localFrame, [5, 24], [120, 0], { extrapolateRight: "clamp" });

          // 1s tail fade out
          const tailFade = interpolate(
            localFrame,
            [s62.duration_frames - 20, s62.duration_frames],
            [1, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: tailFade,
              }}
            >
              {/* Channel Tag */}
              <div
                style={{
                  fontFamily: UPI_THEME.fonts.body,
                  fontSize: 22,
                  fontWeight: 600,
                  color: UPI_THEME.colors.textMuted,
                  letterSpacing: 3,
                  marginBottom: 36,
                }}
              >
                DAILY TECH EXPLAINED
              </div>

              {/* Follow Button */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    padding: "24px 64px",
                    borderRadius: 36,
                    backgroundColor: isTapped ? UPI_THEME.colors.bgElevated : UPI_THEME.colors.orange,
                    border: isTapped ? `3px solid ${UPI_THEME.colors.surfaceBorder}` : "none",
                    color: isTapped ? UPI_THEME.colors.textPrimary : "#FFFFFF",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 44,
                    fontWeight: 900,
                    letterSpacing: 2,
                    boxShadow: isTapped
                      ? "none"
                      : `0 16px 40px ${UPI_THEME.colors.orangeGlow}`,
                    transform: `scale(${interpolate(buttonSpring, [0, 1], [0.6, 1.0]) * pulseScale})`,
                    transition: "all 0.2s ease",
                  }}
                >
                  {isTapped ? "FOLLOWING ✓" : "FOLLOW KAR LO"}
                </div>

                {/* Animated Cursor Arrow */}
                {!isTapped && localFrame >= 5 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -40,
                      right: 20,
                      transform: `translate(${cursorX}px, ${cursorY}px)`,
                      pointerEvents: "none",
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M4 2l16 8-7 2-2 7z" />
                    </svg>
                  </div>
                )}
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
