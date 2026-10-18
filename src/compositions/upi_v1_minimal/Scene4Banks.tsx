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

export const Scene4Banks: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s41, s42, s43] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 4.1: Split Screen Left: Balance Countdown & Checks (Frames 939 - 1043)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s41.start_frame} durationInFrames={s41.duration_frames}>
        {(() => {
          const localFrame = frame - s41.start_frame;

          // Split wipe from center
          const wipeWidth = interpolate(localFrame, [0, 20], [0, 540], {
            extrapolateRight: "clamp",
          });

          // Countdown ₹5,000 -> ₹4,500
          const countdownProgress = interpolate(localFrame, [20, 60], [5000, 4500], {
            extrapolateRight: "clamp",
          });
          const displayBalance = Math.round(countdownProgress);

          // Checks tick in
          const check1 = spring({ frame: localFrame - 15, fps, config: { damping: 12, stiffness: 240 } });
          const check2 = spring({ frame: localFrame - 28, fps, config: { damping: 12, stiffness: 240 } });

          // Debit popup "-₹500"
          const debitSpring = spring({ frame: localFrame - 45, fps, config: { damping: 10, stiffness: 220 } });

          return (
            <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
              {/* Left Panel: Your Bank */}
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: `2px solid ${UPI_THEME.colors.orange}`,
                  padding: "0 40px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 800,
                    color: UPI_THEME.colors.textSecondary,
                    marginBottom: 20,
                  }}
                >
                  AAPKA BANK
                </div>

                {/* Balance display */}
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 64,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    marginBottom: 10,
                  }}
                >
                  ₹{displayBalance.toLocaleString()}
                </div>

                {/* Floating Debit Badge */}
                {localFrame >= 45 && (
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 44,
                      fontWeight: 800,
                      color: UPI_THEME.colors.red,
                      transform: `scale(${interpolate(debitSpring, [0, 1], [0.6, 1.0])}) translateY(${interpolate(localFrame, [45, 80], [0, -20])}px)`,
                      opacity: debitSpring,
                      marginBottom: 24,
                    }}
                  >
                    -₹500
                  </div>
                )}

                {/* Verification Ticks */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 22,
                      fontWeight: 600,
                      color: UPI_THEME.colors.textPrimary,
                      opacity: check1,
                      transform: `scale(${interpolate(check1, [0, 1], [0.8, 1])})`,
                    }}
                  >
                    <span style={{ color: UPI_THEME.colors.green, fontSize: 26 }}>✓</span> PIN Verified
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 22,
                      fontWeight: 600,
                      color: UPI_THEME.colors.textPrimary,
                      opacity: check2,
                      transform: `scale(${interpolate(check2, [0, 1], [0.8, 1])})`,
                    }}
                  >
                    <span style={{ color: UPI_THEME.colors.green, fontSize: 26 }}>✓</span> Balance Available
                  </div>
                </div>
              </div>

              {/* Right Panel Placeholder */}
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: UPI_THEME.colors.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.3,
                }}
              >
                <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 28, color: UPI_THEME.colors.textMuted }}>
                  RECEIVER BANK
                </div>
              </div>

              {/* On-screen text bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 56,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                  }}
                >
                  PIN <span style={{ color: UPI_THEME.colors.green }}>✓</span> &bull; BALANCE <span style={{ color: UPI_THEME.colors.green }}>✓</span> &bull; <span style={{ color: UPI_THEME.colors.red }}>-₹500</span>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.2: Coin Flies Across Divider to Receiver (Frames 1043 - 1132)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s42.start_frame} durationInFrames={s42.duration_frames}>
        {(() => {
          const localFrame = frame - s42.start_frame;

          // Parabolic Coin Arc from left (x=300) to right (x=780)
          const coinProg = interpolate(localFrame, [10, 48], [0, 1], {
            extrapolateRight: "clamp",
          });
          const coinX = interpolate(coinProg, [0, 1], [-220, 240]);
          const coinY = -Math.sin(coinProg * Math.PI) * 160;
          const coinRotate = coinProg * 720; // 3D spin

          // Receiver balance counts up ₹2,000 -> ₹2,500
          const recBalance = Math.round(
            interpolate(localFrame, [35, 65], [2000, 2500], { extrapolateRight: "clamp" })
          );

          // Credit badge "+₹500"
          const creditSpring = spring({ frame: localFrame - 42, fps, config: { damping: 10, stiffness: 240 } });

          return (
            <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
              {/* Left Panel */}
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: `2px solid ${UPI_THEME.colors.orange}`,
                  opacity: 0.7,
                }}
              >
                <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 52, color: UPI_THEME.colors.textMuted }}>
                  ₹4,500
                </div>
              </div>

              {/* Right Panel: Receiver's Bank */}
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `inset 0 0 80px rgba(34, 197, 94, 0.08)`,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 800,
                    color: UPI_THEME.colors.orange,
                    marginBottom: 20,
                  }}
                >
                  RECEIVER BANK
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 68,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    marginBottom: 12,
                  }}
                >
                  ₹{recBalance.toLocaleString()}
                </div>

                {localFrame >= 42 && (
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 48,
                      fontWeight: 800,
                      color: UPI_THEME.colors.green,
                      transform: `scale(${interpolate(creditSpring, [0, 1], [0.6, 1.0])})`,
                    }}
                  >
                    +₹500
                  </div>
                )}
              </div>

              {/* Flying Gold/Orange Coin in Arc */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "45%",
                  transform: `translate(${coinX}px, ${coinY}px) rotateY(${coinRotate}deg)`,
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  border: "4px solid #FDE68A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 30px rgba(245, 158, 11, 0.8)",
                  zIndex: 40,
                }}
              >
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 42,
                    fontWeight: 900,
                    color: "#FFFFFF",
                  }}
                >
                  ₹
                </span>
              </div>

              {/* On-screen text bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 68,
                    fontWeight: 900,
                    color: UPI_THEME.colors.green,
                  }}
                >
                  +₹500 RECEIVED
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.3: Split Closes & Confirmation Pulses to NPCI (Frames 1132 - 1237)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s43.start_frame} durationInFrames={s43.duration_frames}>
        {(() => {
          const localFrame = frame - s43.start_frame;

          // Two checkmark pulses travel from sides to center
          const pulseProg = interpolate(localFrame, [10, 45], [0, 1], {
            extrapolateRight: "clamp",
          });
          const pulseLeftX = interpolate(pulseProg, [0, 1], [-280, 0]);
          const pulseRightX = interpolate(pulseProg, [0, 1], [280, 0]);

          const centerNodeScale = spring({
            frame: localFrame - 40,
            fps,
            config: { damping: 12, stiffness: 240 },
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
              {/* Converging Checkmark Pulses */}
              <div style={{ position: "relative", width: 600, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {localFrame < 46 && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        transform: `translateX(${pulseLeftX}px)`,
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: UPI_THEME.colors.green,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 26,
                      }}
                    >
                      ✓
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        transform: `translateX(${pulseRightX}px)`,
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: UPI_THEME.colors.green,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontWeight: 900,
                        fontSize: 26,
                      }}
                    >
                      ✓
                    </div>
                  </>
                )}

                {/* Central Verified NPCI Node */}
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    backgroundColor: UPI_THEME.colors.bgElevated,
                    border: `4px solid ${UPI_THEME.colors.orange}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${interpolate(centerNodeScale, [0, 1], [0.7, 1.05])})`,
                    boxShadow: `0 0 60px ${UPI_THEME.colors.orangeGlow}`,
                  }}
                >
                  <span style={{ fontSize: 44, color: UPI_THEME.colors.green }}>✓</span>
                  <span
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 28,
                      fontWeight: 900,
                      color: UPI_THEME.colors.textPrimary,
                      marginTop: 4,
                    }}
                  >
                    CONFIRMED
                  </span>
                </div>
              </div>

              {/* On-screen text bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 64,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    letterSpacing: 2,
                  }}
                >
                  DONO BANKS <span style={{ color: UPI_THEME.colors.orange }}>&gt;</span> CONFIRM
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
