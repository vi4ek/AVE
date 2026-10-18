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

export const Scene2AppPin: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s21, s22, s23, s24] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 2.1: PIN Pad & 4 Dots Filling (Frames 232 - 321)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s21.start_frame} durationInFrames={s21.duration_frames}>
        {(() => {
          const localFrame = frame - s21.start_frame;

          // Camera pull-back 110% > 100%
          const camScale = interpolate(localFrame, [0, s21.duration_frames], [1.1, 1.0], {
            extrapolateRight: "clamp",
          });

          // Badge entrance
          const badgeSpring = spring({
            frame: localFrame - 5,
            fps,
            config: { damping: 14, stiffness: 220 },
          });

          // 4 PIN dots fill progressively at frames 12, 24, 36, 48
          const filledCount = Math.min(4, Math.max(0, Math.floor((localFrame - 10) / 14)));

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
                  top: UPI_THEME.safeZone.top + 40,
                  padding: "12px 28px",
                  borderRadius: 30,
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `1.5px solid ${UPI_THEME.colors.orange}`,
                  color: UPI_THEME.colors.orange,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: 2,
                  transform: `translateY(${interpolate(badgeSpring, [0, 1], [-40, 0])}px)`,
                  opacity: badgeSpring,
                }}
              >
                STEP 1 · PIN DAALO
              </div>

              {/* Title Prompt */}
              <div
                style={{
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 48,
                  fontWeight: 800,
                  color: UPI_THEME.colors.textPrimary,
                  marginBottom: 40,
                  letterSpacing: 0.5,
                }}
              >
                ENTER UPI PIN
              </div>

              {/* 4 PIN Dots */}
              <div style={{ display: "flex", gap: 32, marginBottom: 60 }}>
                {[0, 1, 2, 3].map((i) => {
                  const isFilled = i < filledCount;
                  const dotSpring = spring({
                    frame: Math.max(0, localFrame - (10 + i * 14)),
                    fps,
                    config: { damping: 12, stiffness: 280 },
                  });

                  return (
                    <div
                      key={i}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: `3px solid ${isFilled ? UPI_THEME.colors.orange : UPI_THEME.colors.surfaceBorder}`,
                        backgroundColor: isFilled ? UPI_THEME.colors.orange : "transparent",
                        boxShadow: isFilled
                          ? `0 0 20px ${UPI_THEME.colors.orangeGlow}`
                          : "none",
                        transform: isFilled
                          ? `scale(${interpolate(dotSpring, [0, 1], [0.6, 1.2])})`
                          : "scale(1.0)",
                        transition: "all 0.15s ease",
                      }}
                    />
                  );
                })}
              </div>

              {/* Numpad Grid (SVG/CSS) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 110px)",
                  gap: 24,
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((num, idx) => {
                  if (num === "") return <div key={idx} />;
                  return (
                    <div
                      key={idx}
                      style={{
                        width: 110,
                        height: 110,
                        borderRadius: 36,
                        backgroundColor: UPI_THEME.colors.bgElevated,
                        border: `2px solid ${UPI_THEME.colors.surfaceBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 40,
                        fontWeight: 700,
                        color: num === "✓" ? UPI_THEME.colors.orange : UPI_THEME.colors.textPrimary,
                      }}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 2.2: Scrambled Encryption & Lock Clunk (Frames 321 - 392)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s22.start_frame} durationInFrames={s22.duration_frames}>
        {(() => {
          const localFrame = frame - s22.start_frame;

          // Shackle closing animation (frames 30 - 45)
          const lockSpring = spring({
            frame: localFrame - 25,
            fps,
            config: { damping: 12, stiffness: 240 },
          });
          const shackleY = interpolate(lockSpring, [0, 1], [-28, 0]);

          const lockScale = spring({
            frame: localFrame - 20,
            fps,
            config: { damping: 10, stiffness: 220 },
          });

          // Text Scramble characters
          const chars = ["a7F#9x", "$9K!2z", "8&Lp0q", "xM@5w4"][Math.floor(localFrame / 3) % 4];

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Scramble Text Code Matrix */}
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 44,
                  letterSpacing: 8,
                  color: UPI_THEME.colors.textMuted,
                  marginBottom: 50,
                  opacity: interpolate(localFrame, [18, 28], [1, 0], { extrapolateRight: "clamp" }),
                }}
              >
                {chars}
              </div>

              {/* Minimal SVG Padlock */}
              <div
                style={{
                  width: 220,
                  height: 260,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `scale(${interpolate(lockScale, [0, 1], [0.6, 1.0])})`,
                }}
              >
                {/* Padlock Shackle */}
                <div
                  style={{
                    width: 110,
                    height: 100,
                    borderRadius: "55px 55px 0 0",
                    border: `16px solid ${UPI_THEME.colors.orange}`,
                    borderBottom: "none",
                    transform: `translateY(${shackleY}px)`,
                    boxShadow: `0 -4px 20px ${UPI_THEME.colors.orangeGlow}`,
                  }}
                />

                {/* Padlock Body */}
                <div
                  style={{
                    width: 200,
                    height: 160,
                    borderRadius: 36,
                    backgroundColor: UPI_THEME.colors.bgElevated,
                    border: `4px solid ${UPI_THEME.colors.surfaceBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* Keyhole */}
                  <div
                    style={{
                      width: 20,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: UPI_THEME.colors.orange,
                    }}
                  />
                </div>
              </div>

              {/* Headline: "ENCRYPTED" */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 60,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 76,
                  fontWeight: 900,
                  color: UPI_THEME.colors.orange,
                  letterSpacing: 4,
                  opacity: interpolate(localFrame, [15, 25], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                ENCRYPTED
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

          // Packet flies from center to top of screen
          const packetY = interpolate(
            localFrame,
            [0, s23.duration_frames],
            [100, -900],
            { extrapolateRight: "clamp" }
          );

          // Phone shrinks and slides down
          const phoneY = interpolate(localFrame, [0, 30], [0, 400], {
            extrapolateRight: "clamp",
          });
          const phoneOpacity = interpolate(localFrame, [0, 30], [1, 0.2], {
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
              {/* Ghosted Phone sliding down */}
              <div
                style={{
                  width: 440,
                  height: 800,
                  borderRadius: 44,
                  border: `3px solid ${UPI_THEME.colors.surfaceBorder}`,
                  transform: `translateY(${phoneY}px) scale(0.85)`,
                  opacity: phoneOpacity,
                  position: "absolute",
                }}
              />

              {/* Glowing Data Packet */}
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
                    width: 72,
                    height: 72,
                    borderRadius: 24,
                    backgroundColor: UPI_THEME.colors.orange,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 40px ${UPI_THEME.colors.orange}, 0 0 80px ${UPI_THEME.colors.orangeGlow}`,
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Packet Trail line */}
                <div
                  style={{
                    width: 6,
                    height: 180,
                    background: `linear-gradient(to bottom, ${UPI_THEME.colors.orange}, transparent)`,
                    opacity: 0.8,
                  }}
                />
              </div>

              {/* On-Screen Text: "REQUEST SENT" */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 60,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 72,
                  fontWeight: 900,
                  color: UPI_THEME.colors.textPrimary,
                  letterSpacing: 2,
                }}
              >
                REQUEST <span style={{ color: UPI_THEME.colors.orange }}>SENT</span>
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
            config: { damping: 12, stiffness: 200 },
          });

          // Strike line across "PLAIN TEXT"
          const strikeProgress = interpolate(localFrame, [20, 42], [0, 100], {
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
              {/* SVG Security Shield */}
              <div
                style={{
                  position: "relative",
                  width: 220,
                  height: 260,
                  transform: `scale(${interpolate(shieldSpring, [0, 1], [0.5, 1.0])})`,
                  marginBottom: 40,
                }}
              >
                <svg width="220" height="260" viewBox="0 0 100 120" fill="none">
                  {/* Shield outline */}
                  <path
                    d="M50 10 L85 25 V65 C85 90 50 110 50 110 C50 110 15 90 15 65 V25 Z"
                    fill={UPI_THEME.colors.bgElevated}
                    stroke={UPI_THEME.colors.orange}
                    strokeWidth="4"
                  />
                  {/* Inner Checkmark */}
                  <path
                    d="M34 60 L45 72 L66 48"
                    stroke={UPI_THEME.colors.orange}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Crossed-out "PLAIN TEXT" label */}
              <div style={{ position: "relative", marginBottom: 30 }}>
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 48,
                    fontWeight: 700,
                    color: UPI_THEME.colors.textMuted,
                    letterSpacing: 2,
                  }}
                >
                  PLAIN TEXT
                </span>
                {/* Red Strike Line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: `${strikeProgress}%`,
                    height: 5,
                    backgroundColor: UPI_THEME.colors.red,
                    borderRadius: 3,
                  }}
                />
              </div>

              {/* On-screen text: "PIN kabhi plain text nahi" */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  textAlign: "center",
                  maxWidth: 820,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 64,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    lineHeight: 1.15,
                  }}
                >
                  PIN kabhi <span style={{ color: UPI_THEME.colors.orange }}>plain text</span> nahi
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
