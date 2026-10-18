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
    <AbsoluteFill
      style={{
        backgroundColor: UPI_THEME.colors.sceneBg.appPin,
        overflow: "hidden",
      }}
    >
      {/* Background ink grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(17, 17, 17, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 17, 17, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.1: PIN Pad & 4 Dots Filling (Frames 232 - 321)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s21.start_frame} durationInFrames={s21.duration_frames}>
        {(() => {
          const localFrame = frame - s21.start_frame;
          const camScale = interpolate(localFrame, [0, s21.duration_frames], [1.05, 1.0], {
            extrapolateRight: "clamp",
          });

          // 4 PIN dots fill at frames 14, 28, 42, 56
          const filledCount = Math.min(4, Math.max(0, Math.floor((localFrame - 8) / 14)));

          // Active keypad button highlight
          const activeKey =
            localFrame >= 8 && localFrame < 22
              ? 4
              : localFrame >= 22 && localFrame < 36
              ? 8
              : localFrame >= 36 && localFrame < 50
              ? 2
              : localFrame >= 50 && localFrame < 64
              ? 1
              : null;

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${camScale})`,
              }}
            >
              {/* Step Badge */}
              <div
                style={{
                  position: "absolute",
                  top: UPI_THEME.safeZone.top,
                  padding: "10px 24px",
                  borderRadius: 16,
                  backgroundColor: UPI_THEME.colors.yellowHighlight,
                  border: UPI_THEME.borders.neo,
                  boxShadow: UPI_THEME.shadows.neoSm,
                  color: UPI_THEME.colors.ink,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                }}
              >
                STEP 1 · ENTER UPI PIN
              </div>

              {/* Pad Container Card */}
              <div
                style={{
                  width: 520,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 36,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Bank / Flow subtitle */}
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                    marginBottom: 24,
                    letterSpacing: "0.02em",
                  }}
                >
                  ENTER 4-DIGIT PIN
                </div>

                {/* 4 Neo Dots */}
                <div style={{ display: "flex", gap: 28, marginBottom: 36 }}>
                  {[0, 1, 2, 3].map((i) => {
                    const isFilled = i < filledCount;
                    const dotSpring = spring({
                      frame: Math.max(0, localFrame - (8 + i * 14)),
                      fps,
                      config: { damping: 12, stiffness: 280 },
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          border: UPI_THEME.borders.neoThick,
                          backgroundColor: isFilled
                            ? UPI_THEME.colors.ink
                            : "#FFF",
                          boxShadow: isFilled
                            ? "2px 2px 0 #111"
                            : "none",
                          transform: isFilled
                            ? `scale(${interpolate(dotSpring, [0, 1], [0.6, 1.15])})`
                            : "scale(1.0)",
                        }}
                      />
                    );
                  })}
                </div>

                {/* Neo Keypad Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 96px)",
                    gap: 16,
                    justifyContent: "center",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((num, idx) => {
                    if (num === "") return <div key={idx} />;
                    const isPressed = activeKey === num;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 96,
                          height: 80,
                          borderRadius: 20,
                          backgroundColor: isPressed
                            ? UPI_THEME.colors.yellowHighlight
                            : num === "✓"
                            ? UPI_THEME.colors.greenLight
                            : "#FFFFFF",
                          border: UPI_THEME.borders.neo,
                          boxShadow: isPressed ? "1px 1px 0 #111" : UPI_THEME.shadows.neoSm,
                          transform: isPressed ? "translate(2px, 2px)" : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: UPI_THEME.fonts.headline,
                          fontSize: 36,
                          fontWeight: 900,
                          color: UPI_THEME.colors.ink,
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kinetic Caption at Bottom */}
              <div style={{ position: "absolute", bottom: UPI_THEME.safeZone.bottom + 30 }}>
                <KineticHeadline
                  words={[
                    { text: "PIN", highlight: false },
                    { text: "DAALTE", highlight: false },
                    { text: "HAIN", highlight: true, highlightColor: UPI_THEME.colors.yellowHighlight },
                  ]}
                  fontSize={68}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.2: Scrambled Encryption & Neo Padlock (Frames 321 - 392)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s22.start_frame} durationInFrames={s22.duration_frames}>
        {(() => {
          const localFrame = frame - s22.start_frame;

          // Shackle closing animation
          const lockSpring = spring({
            frame: localFrame - 15,
            fps,
            config: { damping: 11, stiffness: 260 },
          });
          const shackleY = interpolate(lockSpring, [0, 1], [-34, 0]);

          const chars = ["#7B92A4", "$9K!2Z8", "8&LP0Q1", "X7@5W49"][Math.floor(localFrame / 3) % 4];

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Scrambled Hex Pill */}
              <div
                style={{
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neo,
                  boxShadow: UPI_THEME.shadows.neo,
                  borderRadius: 18,
                  padding: "12px 32px",
                  fontFamily: "monospace",
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: 4,
                  color: UPI_THEME.colors.ink,
                  marginBottom: 36,
                }}
              >
                {chars}
              </div>

              {/* Neo Padlock with Hard Shadow */}
              <div
                style={{
                  width: 240,
                  height: 280,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Padlock Shackle */}
                <div
                  style={{
                    width: 120,
                    height: 110,
                    borderRadius: "60px 60px 0 0",
                    border: "18px solid #111111",
                    borderBottom: "none",
                    transform: `translateY(${shackleY}px)`,
                  }}
                />

                {/* Padlock Body */}
                <div
                  style={{
                    width: 220,
                    height: 170,
                    borderRadius: 32,
                    backgroundColor: UPI_THEME.colors.yellowHighlight,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Keyhole */}
                  <div
                    style={{
                      width: 22,
                      height: 42,
                      borderRadius: 11,
                      backgroundColor: UPI_THEME.colors.ink,
                    }}
                  />
                </div>
              </div>

              {/* Headline: "ENCRYPTED" with Marker wipe */}
              <div style={{ position: "absolute", bottom: UPI_THEME.safeZone.bottom + 40 }}>
                <KineticHeadline
                  words={[
                    { text: "APP", highlight: false },
                    { text: "KARTA", highlight: false },
                    { text: "HAI", highlight: false },
                    {
                      text: "ENCRYPT",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  fontSize={72}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.3: Data Packet Shooting Up (Frames 392 - 463)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s23.start_frame} durationInFrames={s23.duration_frames}>
        {(() => {
          const localFrame = frame - s23.start_frame;

          // Packet flies up fast
          const packetY = interpolate(
            localFrame,
            [0, s23.duration_frames],
            [120, -960],
            { extrapolateRight: "clamp" }
          );

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Neo Data Packet Pill */}
              <div
                style={{
                  position: "absolute",
                  transform: `translateY(${packetY}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: UPI_THEME.colors.orange,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    borderRadius: 24,
                    padding: "20px 36px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "#FFF",
                      border: "2px solid #111",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 34,
                      fontWeight: 900,
                      color: "#FFFFFF",
                      letterSpacing: "0.04em",
                    }}
                  >
                    PAYMENT REQUEST · ₹500
                  </div>
                </div>

                {/* Packet Trail Line with Neo Dashes */}
                <div
                  style={{
                    width: 6,
                    height: 220,
                    backgroundColor: UPI_THEME.colors.ink,
                    marginTop: 8,
                  }}
                />
              </div>

              {/* Headline: "REQUEST SENT" */}
              <div style={{ position: "absolute", bottom: UPI_THEME.safeZone.bottom + 40 }}>
                <KineticHeadline
                  words={[
                    { text: "REQUEST", highlight: false },
                    {
                      text: "SENT",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  fontSize={80}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.4: Shield & "PIN kabhi plain text nahi" (Frames 463 - 551)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s24.start_frame} durationInFrames={s24.duration_frames}>
        {(() => {
          const localFrame = frame - s24.start_frame;

          const shieldSpring = spring({
            frame: localFrame - 5,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          const strikeProgress = interpolate(localFrame, [16, 36], [0, 100], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Security Shield Card */}
              <div
                style={{
                  width: 220,
                  height: 250,
                  backgroundColor: UPI_THEME.colors.greenLight,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: "36px 36px 90px 90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${interpolate(shieldSpring, [0, 1], [0.6, 1.0])})`,
                  marginBottom: 36,
                }}
              >
                {/* Neo Checkmark */}
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#111111"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Crossed-out "PLAIN TEXT" Card */}
              <div
                style={{
                  position: "relative",
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neo,
                  boxShadow: UPI_THEME.shadows.neo,
                  borderRadius: 18,
                  padding: "16px 36px",
                  marginBottom: 30,
                }}
              >
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 42,
                    fontWeight: 900,
                    color: "#777",
                    letterSpacing: 2,
                  }}
                >
                  PLAIN TEXT: PIN 4 8 2 1
                </span>
                {/* Thick Red Strike Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: "48%",
                    left: 12,
                    width: `${strikeProgress}%`,
                    maxWidth: "calc(100% - 24px)",
                    height: 8,
                    backgroundColor: UPI_THEME.colors.coralDark,
                    borderRadius: 4,
                  }}
                />
              </div>

              {/* Kinetic On-Screen Text with Marker Highlight */}
              <div style={{ position: "absolute", bottom: UPI_THEME.safeZone.bottom + 40, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "PIN", highlight: false },
                    {
                      text: "KABHI NAHI",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
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
