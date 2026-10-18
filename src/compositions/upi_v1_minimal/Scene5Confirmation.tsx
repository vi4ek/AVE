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

export const Scene5Confirmation: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s51, s52] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 5.1: Confirmation Beam Splits to Two Phones (Frames 1237 - 1325)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s51.start_frame} durationInFrames={s51.duration_frames}>
        {(() => {
          const localFrame = frame - s51.start_frame;

          // Beams traveling downward from top center
          const beamProg = interpolate(localFrame, [5, 30], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Notification slide-in on phones
          const notifSpring = spring({
            frame: localFrame - 28,
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
              {/* Top Source Node */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `3px solid ${UPI_THEME.colors.orange}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: UPI_THEME.colors.orange,
                  fontWeight: 900,
                  fontSize: 22,
                  fontFamily: UPI_THEME.fonts.headline,
                  marginBottom: 40,
                }}
              >
                NPCI
              </div>

              {/* Two Branching Beams */}
              <svg width="600" height="180">
                <line
                  x1="300"
                  y1="0"
                  x2="150"
                  y2="160"
                  stroke={UPI_THEME.colors.orange}
                  strokeWidth="4"
                  strokeDasharray="250"
                  strokeDashoffset={250 * (1 - beamProg)}
                />
                <line
                  x1="300"
                  y1="0"
                  x2="450"
                  y2="160"
                  stroke={UPI_THEME.colors.orange}
                  strokeWidth="4"
                  strokeDasharray="250"
                  strokeDashoffset={250 * (1 - beamProg)}
                />
              </svg>

              {/* Two Phones with Notifications */}
              <div style={{ display: "flex", gap: 120, marginTop: 20 }}>
                {/* Phone 1: Payer */}
                <div
                  style={{
                    width: 260,
                    height: 420,
                    borderRadius: 36,
                    backgroundColor: UPI_THEME.colors.bgElevated,
                    border: `3px solid ${UPI_THEME.colors.surfaceBorder}`,
                    padding: 16,
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: 13, color: UPI_THEME.colors.textMuted, textAlign: "center", marginBottom: 20 }}>
                    YOUR PHONE
                  </div>

                  {localFrame >= 28 && (
                    <div
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        backgroundColor: UPI_THEME.colors.bgCard,
                        border: `1.5px solid ${UPI_THEME.colors.surfaceBorder}`,
                        transform: `translateY(${interpolate(notifSpring, [0, 1], [-20, 0])}px)`,
                        opacity: notifSpring,
                      }}
                    >
                      <div style={{ fontSize: 13, color: UPI_THEME.colors.textSecondary, fontWeight: 700 }}>
                        Debited: ₹500
                      </div>
                      <div style={{ fontSize: 11, color: UPI_THEME.colors.textMuted, marginTop: 4 }}>
                        UPI Ref #839201
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone 2: Receiver */}
                <div
                  style={{
                    width: 260,
                    height: 420,
                    borderRadius: 36,
                    backgroundColor: UPI_THEME.colors.bgElevated,
                    border: `3px solid ${UPI_THEME.colors.surfaceBorder}`,
                    padding: 16,
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: 13, color: UPI_THEME.colors.orange, textAlign: "center", marginBottom: 20 }}>
                    SHOP PHONE
                  </div>

                  {localFrame >= 28 && (
                    <div
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        backgroundColor: UPI_THEME.colors.bgCard,
                        border: `1.5px solid ${UPI_THEME.colors.orange}`,
                        transform: `translateY(${interpolate(notifSpring, [0, 1], [-20, 0])}px)`,
                        opacity: notifSpring,
                      }}
                    >
                      <div style={{ fontSize: 13, color: UPI_THEME.colors.green, fontWeight: 700 }}>
                        Credited: ₹500
                      </div>
                      <div style={{ fontSize: 11, color: UPI_THEME.colors.textMuted, marginTop: 4 }}>
                        Instant Soundbox alert
                      </div>
                    </div>
                  )}
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
                    fontSize: 66,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                  }}
                >
                  CONFIRMATION <span style={{ color: UPI_THEME.colors.green }}>✓</span>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 5.2: Giant Checkmark, Confetti & Success Card (Frames 1325 - 1413)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s52.start_frame} durationInFrames={s52.duration_frames}>
        {(() => {
          const localFrame = frame - s52.start_frame;

          // Checkmark stroke draw
          const checkLen = 140;
          const strokeProg = interpolate(localFrame, [5, 25], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Success card entrance
          const cardSpring = spring({
            frame: localFrame - 20,
            fps,
            config: { damping: 11, stiffness: 220 },
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
              {/* Confetti Particles Burst */}
              {localFrame >= 15 &&
                Array.from({ length: 24 }).map((_, idx) => {
                  const angle = (idx / 24) * 2 * Math.PI;
                  const dist = interpolate(localFrame - 15, [0, 40], [0, 360 + (idx % 5) * 40]);
                  const op = interpolate(localFrame - 15, [0, 40], [1, 0], { extrapolateRight: "clamp" });
                  const size = (idx % 3) * 4 + 8;
                  const isOrange = idx % 2 === 0;

                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: idx % 3 === 0 ? "50%" : 3,
                        backgroundColor: isOrange ? UPI_THEME.colors.orange : UPI_THEME.colors.green,
                        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${idx * 40}deg)`,
                        opacity: op,
                      }}
                    />
                  );
                })}

              {/* Success Card with Giant Animated Checkmark */}
              <div
                style={{
                  width: 540,
                  borderRadius: 48,
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `3px solid ${UPI_THEME.colors.orange}`,
                  padding: "54px 40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 50px ${UPI_THEME.colors.orangeGlow}`,
                  transform: `scale(${interpolate(cardSpring, [0, 1], [0.6, 1.0])})`,
                }}
              >
                {/* SVG Checkmark Circle */}
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    backgroundColor: "rgba(34, 197, 94, 0.12)",
                    border: `4px solid ${UPI_THEME.colors.green}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 32,
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 48 48">
                    <path
                      d="M10 24 L20 34 L38 14"
                      fill="none"
                      stroke={UPI_THEME.colors.green}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={checkLen}
                      strokeDashoffset={checkLen * (1 - strokeProg)}
                    />
                  </svg>
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 44,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    letterSpacing: 0.5,
                  }}
                >
                  PAYMENT SUCCESSFUL
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 76,
                    fontWeight: 900,
                    color: UPI_THEME.colors.orange,
                    margin: "16px 0",
                  }}
                >
                  ₹500
                </div>

                {/* ~2s Speed Badge */}
                <div
                  style={{
                    padding: "8px 24px",
                    borderRadius: 20,
                    backgroundColor: UPI_THEME.colors.bgCard,
                    border: `1.5px solid ${UPI_THEME.colors.surfaceBorder}`,
                    color: UPI_THEME.colors.textSecondary,
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  TOTAL TIME: ~2 SEC
                </div>
              </div>

              {/* On-screen text bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  textAlign: "center",
                  maxWidth: 880,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 52,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                  }}
                >
                  Payment Successful &bull; ₹500 &bull; <span style={{ color: UPI_THEME.colors.orange }}>~2 sec</span>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
