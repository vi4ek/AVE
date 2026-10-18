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

export const Scene2AppPin: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s21, s22, s23, s24] = shots;
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: "#DCE8FF", overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 2.1: App & PIN (Frames 232 - 321)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s21.start_frame} durationInFrames={s21.duration_frames}>
        {(() => {
          const localFrame = frame - s21.start_frame;
          const filledCount = Math.min(4, Math.max(0, Math.floor((localFrame - 6) / 14)));

          // Active keypad highlight (key 9 at frame ~35)
          const isNinePressed = localFrame >= 32 && localFrame <= 46;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Padlock Yellow Sticker (.stk) */}
              <div
                style={{
                  position: "absolute",
                  right: "8%",
                  top: "10%",
                  width: 140,
                  height: 140,
                  backgroundColor: "#FFD43B",
                  border: "4px solid #111111",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 70,
                  boxShadow: "6px 6px 0 #111111",
                  transform: "rotate(10deg)",
                  zIndex: 20,
                }}
              >
                🔒
              </div>

              {/* White Keypad Card (.bx) */}
              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  top: "16%",
                  width: "76%",
                  height: "58%",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  borderRadius: 44,
                  boxShadow: "8px 8px 0 #111111",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "36px 28px",
                  boxSizing: "border-box",
                }}
              >
                {/* 4 PIN Dots */}
                <div style={{ display: "flex", gap: 26, marginTop: 12, marginBottom: 32 }}>
                  {[0, 1, 2, 3].map((i) => {
                    const isFilled = i < filledCount;
                    return (
                      <div
                        key={i}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          border: "3px solid #111111",
                          backgroundColor: isFilled ? "#111111" : "transparent",
                          transition: "background-color 0.1s ease",
                        }}
                      />
                    );
                  })}
                </div>

                {/* 3x4 Keys Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                    width: "100%",
                    padding: "0 12px",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((num, idx) => {
                    if (num === "") return <div key={idx} />;
                    const isKeyActive = num === 9 && isNinePressed;
                    return (
                      <div
                        key={idx}
                        style={{
                          height: 84,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "3px solid #111111",
                          borderRadius: 20,
                          fontWeight: 800,
                          fontFamily: UPI_THEME.fonts.headline,
                          fontSize: 40,
                          backgroundColor: isKeyActive ? "#FFD43B" : "#F7F4EE",
                          color: "#111111",
                          transform: isKeyActive ? "scale(0.94)" : "none",
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Caption: PIN → ENCRYPTED */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "PIN", highlight: false },
                    { text: "→", highlight: false },
                    { text: "ENCRYPTED", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={76}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.2: Encryption Scramble (Frames 321 - 392)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s22.start_frame} durationInFrames={s22.duration_frames}>
        {(() => {
          const localFrame = frame - s22.start_frame;
          const chars = ["#7B92A4", "$9K!2Z8", "8&LP0Q1", "X7@5W49"][Math.floor(localFrame / 3) % 4];

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Scrambled Hex Pill */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "28%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  boxShadow: "6px 6px 0 #111111",
                  borderRadius: 24,
                  padding: "16px 40px",
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 44,
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  color: "#111111",
                }}
              >
                {chars}
              </div>

              {/* Big Neo Padlock */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "42%",
                  transform: "translateX(-50%)",
                  width: 220,
                  height: 250,
                  backgroundColor: "#FFD43B",
                  border: "4px solid #111111",
                  borderRadius: 36,
                  boxShadow: "8px 8px 0 #111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 100,
                }}
              >
                🔒
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "APP", highlight: false },
                    { text: "USSE", highlight: false },
                    { text: "ENCRYPT", highlight: true, highlightColor: "#FFD43B" },
                    { text: "KARTA HAI", highlight: false },
                  ]}
                  fontSize={72}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.3: Request Sent Packet Shooting Up (Frames 392 - 463)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s23.start_frame} durationInFrames={s23.duration_frames}>
        {(() => {
          const localFrame = frame - s23.start_frame;
          const packetY = interpolate(localFrame, [0, s23.duration_frames], [200, -900], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Packet flying upwards */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, ${packetY}px)`,
                  backgroundColor: "#FF5A1F",
                  color: "#FFFFFF",
                  border: "4px solid #111111",
                  boxShadow: "8px 8px 0 #111111",
                  borderRadius: 28,
                  padding: "24px 44px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 40,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                PAYMENT REQUEST ➔
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "REQUEST", highlight: false },
                    { text: "SENT", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={84}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.4: Shield & Crossed Out Plain Text (Frames 463 - 551)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s24.start_frame} durationInFrames={s24.duration_frames}>
        {(() => {
          const localFrame = frame - s24.start_frame;
          const strikeWidth = interpolate(localFrame, [12, 32], [0, 100], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Security Shield */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "32%",
                  transform: "translateX(-50%)",
                  width: 220,
                  height: 250,
                  backgroundColor: "#D6F5E0",
                  border: "4px solid #111111",
                  borderRadius: "36px 36px 90px 90px",
                  boxShadow: "8px 8px 0 #111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 100,
                  fontWeight: 900,
                  color: "#16A34A",
                }}
              >
                ✓
              </div>

              {/* Crossed out Plain Text Card */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "54%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  boxShadow: "6px 6px 0 #111111",
                  borderRadius: 20,
                  padding: "16px 36px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#777",
                  whiteSpace: "nowrap",
                }}
              >
                PLAIN TEXT: 4 8 2 1
                {/* Red Strike */}
                <div
                  style={{
                    position: "absolute",
                    left: "8%",
                    top: "50%",
                    width: `${strikeWidth * 0.84}%`,
                    height: 8,
                    backgroundColor: "#E5484D",
                    borderRadius: 4,
                  }}
                />
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "PIN", highlight: false },
                    { text: "KABHI NAHI", highlight: true, highlightColor: "#FFD43B" },
                    { text: "PLAIN TEXT", highlight: false },
                  ]}
                  fontSize={72}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
