import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticHeadline } from "./shared";
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
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UPI_THEME.colors.sceneBg.cta,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid on dark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(247, 244, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247, 244, 238, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 6.1: Kinetic Text Slam (Frames 1413 - 1504)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s61.start_frame} durationInFrames={s61.duration_frames}>
        {(() => {
          const localFrame = frame - s61.start_frame;

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
              {/* Neo Pill Tag */}
              <div
                style={{
                  backgroundColor: UPI_THEME.colors.yellowHighlight,
                  border: "2px solid #FFF",
                  boxShadow: "3px 3px 0 #FFF",
                  borderRadius: 12,
                  padding: "8px 24px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 24,
                  fontWeight: 900,
                  color: UPI_THEME.colors.ink,
                  letterSpacing: "0.08em",
                  marginBottom: 48,
                }}
              >
                TECH SIMPLIFIED
              </div>

              {/* Kinetic Headlines with off-white text and marker wipe */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "center" }}>
                <KineticHeadline
                  words={[
                    { text: "AISI", highlight: false },
                    { text: "HI", highlight: false },
                    {
                      text: "TECH",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.orange,
                    },
                  ]}
                  textColor={UPI_THEME.colors.offWhite}
                  fontSize={88}
                />
                <KineticHeadline
                  words={[
                    {
                      text: "AASAN BHASHA MEIN",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  textColor={UPI_THEME.colors.ink}
                  fontSize={84}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 6.2: Follow Button Pulse & Tap (Frames 1504 - 1564)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s62.start_frame} durationInFrames={s62.duration_frames}>
        {(() => {
          const localFrame = frame - s62.start_frame;

          const isTapped = localFrame >= 24;

          const buttonSpring = spring({
            frame: localFrame - 4,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          const cursorX = interpolate(localFrame, [4, 24], [80, 0], {
            extrapolateRight: "clamp",
          });
          const cursorY = interpolate(localFrame, [4, 24], [100, 0], {
            extrapolateRight: "clamp",
          });

          // Tail fade
          const tailFade = interpolate(
            localFrame,
            [s62.duration_frames - 16, s62.duration_frames],
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
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#999",
                  letterSpacing: "0.1em",
                  marginBottom: 36,
                }}
              >
                DAILY TECH EXPLAINED
              </div>

              {/* Follow Button */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    padding: "26px 72px",
                    borderRadius: 32,
                    backgroundColor: isTapped
                      ? UPI_THEME.colors.offWhite
                      : UPI_THEME.colors.orange,
                    border: "3px solid #FFFFFF",
                    boxShadow: isTapped
                      ? "2px 2px 0 #FFFFFF"
                      : "6px 6px 0 #FFFFFF",
                    transform: isTapped
                      ? "translate(4px, 4px)"
                      : `scale(${interpolate(buttonSpring, [0, 1], [0.7, 1.0])})`,
                    color: isTapped
                      ? UPI_THEME.colors.ink
                      : "#FFFFFF",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 48,
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    transition: "transform 0.1s ease, background-color 0.1s ease",
                  }}
                >
                  {isTapped ? "FOLLOWING ✓" : "FOLLOW KIJIYE"}
                </div>

                {/* Animated Cursor Arrow */}
                {!isTapped && localFrame >= 4 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -30,
                      right: 10,
                      transform: `translate(${cursorX}px, ${cursorY}px)`,
                      pointerEvents: "none",
                    }}
                  >
                    <svg width="54" height="54" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M4 2l16 8-7 2-2 7z" stroke="#111" strokeWidth="1.5" />
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
