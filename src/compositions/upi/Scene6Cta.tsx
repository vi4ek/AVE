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
    <AbsoluteFill style={{ backgroundColor: "#111111", color: "#F7F4EE", overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 6.1: CTA Headline (Frames 1413 - 1504)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s61.start_frame} durationInFrames={s61.duration_frames}>
        {(() => {
          const localFrame = frame - s61.start_frame;
          const wipeProg = interpolate(localFrame, [8, 28], [0, 100], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden", padding: "0 64px" }}>

              {/* Big Text: Aisi hi tech */}
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  top: "22%",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 150,
                  lineHeight: 0.95,
                  fontWeight: 900,
                  color: "#F7F4EE",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                }}
              >
                Aisi hi<br />tech
              </div>

              {/* Aasan bhasha mein with yellow marker highlight */}
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  top: "52%",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 74,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    padding: "4px 16px",
                    color: "#111111",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: `${wipeProg}%`,
                      height: "100%",
                      backgroundColor: "#FFD43B",
                      borderRadius: 6,
                      zIndex: -1,
                    }}
                  />
                  Aasan bhasha mein
                </span>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 6.2: Follow Button & Cursor Tap (Frames 1504 - 1564)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s62.start_frame} durationInFrames={s62.duration_frames}>
        {(() => {
          const localFrame = frame - s62.start_frame;
          const isTapped = localFrame >= 22;

          const buttonSpring = spring({
            frame: localFrame - 4,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          const cursorX = interpolate(localFrame, [4, 22], [80, 0], {
            extrapolateRight: "clamp",
          });
          const cursorY = interpolate(localFrame, [4, 22], [90, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden", padding: "0 64px" }}>

              {/* Channel Label */}
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  top: "24%",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 100,
                  lineHeight: 1,
                  fontWeight: 900,
                  color: "#F7F4EE",
                  textTransform: "uppercase",
                }}
              >
                DAILY TECH<br />EXPLAINED
              </div>

              {/* Orange Follow Button (.btn) from HTML style preview */}
              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  right: "12%",
                  bottom: "32%",
                  backgroundColor: isTapped ? "#F7F4EE" : "#FF5A1F",
                  color: "#111111",
                  border: "4px solid #F7F4EE",
                  borderRadius: 999,
                  textAlign: "center",
                  padding: "28px 0",
                  fontWeight: 900,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 54,
                  letterSpacing: "0.04em",
                  boxShadow: isTapped ? "2px 2px 0 #F7F4EE" : "8px 8px 0 #F7F4EE",
                  transform: isTapped
                    ? "translate(4px, 4px)"
                    : `scale(${interpolate(buttonSpring, [0, 1], [0.8, 1.0])})`,
                  transition: "transform 0.08s ease",
                }}
              >
                {isTapped ? "FOLLOWING ✓" : "FOLLOW"}
              </div>

              {/* Cursor Tap Emoji (.cur) from HTML style preview */}
              {!isTapped && localFrame >= 4 && (
                <div
                  style={{
                    position: "absolute",
                    right: "18%",
                    bottom: "22%",
                    fontSize: 90,
                    transform: `translate(${cursorX}px, ${cursorY}px)`,
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                >
                  👆
                </div>
              )}
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
