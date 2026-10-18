import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticHeadline, RealWorldCutaway } from "./shared";
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
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UPI_THEME.colors.sceneBg.confirmation,
        overflow: "hidden",
      }}
    >
      {/* Background ink grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(17, 17, 17, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 17, 17, 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 5.1: Confirmation Beam Splits to Two Phones (Frames 1237 - 1325)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s51.start_frame} durationInFrames={s51.duration_frames}>
        {(() => {
          const localFrame = frame - s51.start_frame;

          const beamProg = interpolate(localFrame, [4, 28], [0, 1], {
            extrapolateRight: "clamp",
          });

          const notifSpring = spring({
            frame: localFrame - 24,
            fps,
            config: { damping: 11, stiffness: 240 },
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
                  padding: "12px 32px",
                  borderRadius: 20,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neo,
                  color: UPI_THEME.colors.ink,
                  fontWeight: 900,
                  fontSize: 26,
                  fontFamily: UPI_THEME.fonts.headline,
                  marginBottom: 20,
                }}
              >
                NPCI CENTRAL SWITCH
              </div>

              {/* Two Branching Beams */}
              <svg width="600" height="140">
                <line
                  x1="300"
                  y1="0"
                  x2="150"
                  y2="130"
                  stroke="#111"
                  strokeWidth="5"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - beamProg)}
                />
                <line
                  x1="300"
                  y1="0"
                  x2="450"
                  y2="130"
                  stroke="#111"
                  strokeWidth="5"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - beamProg)}
                />
              </svg>

              {/* Two Phones with Notification Cards */}
              <div style={{ display: "flex", gap: 60, marginTop: 10 }}>
                {/* Phone 1: Payer */}
                <div
                  style={{
                    width: 250,
                    height: 380,
                    borderRadius: 36,
                    backgroundColor: UPI_THEME.colors.offWhite,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    padding: 16,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: UPI_THEME.colors.ink,
                      textAlign: "center",
                      marginBottom: 16,
                    }}
                  >
                    YOUR PHONE
                  </div>

                  {localFrame >= 24 && (
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        backgroundColor: UPI_THEME.colors.coral,
                        border: UPI_THEME.borders.neo,
                        boxShadow: UPI_THEME.shadows.neoSm,
                        transform: `translateY(${interpolate(notifSpring, [0, 1], [-20, 0])}px)`,
                        opacity: notifSpring,
                      }}
                    >
                      <div style={{ fontSize: 18, color: UPI_THEME.colors.ink, fontWeight: 900 }}>
                        Debited: ₹500
                      </div>
                      <div style={{ fontSize: 13, color: "#444", marginTop: 4, fontWeight: 700 }}>
                        UPI Ref #839201
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone 2: Receiver */}
                <div
                  style={{
                    width: 250,
                    height: 380,
                    borderRadius: 36,
                    backgroundColor: UPI_THEME.colors.offWhite,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    padding: 16,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: UPI_THEME.colors.ink,
                      textAlign: "center",
                      marginBottom: 16,
                    }}
                  >
                    SHOP PHONE
                  </div>

                  {localFrame >= 24 && (
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        backgroundColor: UPI_THEME.colors.greenLight,
                        border: UPI_THEME.borders.neo,
                        boxShadow: UPI_THEME.shadows.neoSm,
                        transform: `translateY(${interpolate(notifSpring, [0, 1], [-20, 0])}px)`,
                        opacity: notifSpring,
                      }}
                    >
                      <div style={{ fontSize: 18, color: UPI_THEME.colors.green, fontWeight: 900 }}>
                        Credited: ₹500
                      </div>
                      <div style={{ fontSize: 13, color: "#444", marginTop: 4, fontWeight: 700 }}>
                        Soundbox Alert Active
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Kinetic On-Screen Text with Marker Highlight */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                }}
              >
                <KineticHeadline
                  words={[
                    { text: "CONFIRMATION", highlight: false },
                    {
                      text: "DONO PHONES PAR",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  textColor={UPI_THEME.colors.offWhite}
                  fontSize={68}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 5.2: Soundbox Cutaway & Giant Checkmark / Confetti (Frames 1325 - 1413)
          Sub-beat 1 (0-30): Real-World Soundbox Cutaway
          Sub-beat 2 (30-88): Giant Drawing Checkmark + Neo Confetti + Success Card
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s52.start_frame} durationInFrames={s52.duration_frames}>
        {(() => {
          const localFrame = frame - s52.start_frame;

          // Sub-beat 1: Real-world Cutaway to Countertop UPI Soundbox
          if (localFrame < 30) {
            return (
              <RealWorldCutaway
                imageSrc="broll/upi_soundbox.jpg"
                captionTag="AUDIO NOTIFICATION · SOUNDBOX"
                captionTitle="PAYMENT RECEIVED: ₹500"
                scaleRange={[1.0, 1.06]}
              />
            );
          }

          // Sub-beat 2: Local frames 30 to 88
          const subFrame = localFrame - 30;

          // Checkmark stroke draw
          const checkLen = 160;
          const strokeProg = interpolate(subFrame, [4, 22], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Success card entrance
          const cardSpring = spring({
            frame: subFrame - 15,
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
              {/* Neo Confetti Particles Burst */}
              {subFrame >= 12 &&
                Array.from({ length: 28 }).map((_, idx) => {
                  const angle = (idx / 28) * 2 * Math.PI;
                  const dist = interpolate(subFrame - 12, [0, 36], [0, 420 + (idx % 6) * 40]);
                  const op = interpolate(subFrame - 12, [0, 36], [1, 0], { extrapolateRight: "clamp" });
                  const size = (idx % 3) * 6 + 12;
                  const colors = [UPI_THEME.colors.yellowHighlight, UPI_THEME.colors.orange, "#FFF", UPI_THEME.colors.coral];

                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: idx % 2 === 0 ? 4 : "50%",
                        backgroundColor: colors[idx % colors.length],
                        border: "2px solid #111",
                        boxShadow: "2px 2px 0 #111",
                        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${idx * 45}deg)`,
                        opacity: op,
                        zIndex: 10,
                      }}
                    />
                  );
                })}

              {/* Success Card with Giant Drawing Checkmark */}
              <div
                style={{
                  width: 560,
                  borderRadius: 44,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  padding: "48px 36px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `scale(${interpolate(cardSpring, [0, 1], [0.65, 1.0])})`,
                }}
              >
                {/* Checkmark Circle with 3px #111 border */}
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    backgroundColor: UPI_THEME.colors.greenLight,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neo,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <svg width="84" height="84" viewBox="0 0 48 48">
                    <path
                      d="M10 24 L20 34 L38 14"
                      fill="none"
                      stroke={UPI_THEME.colors.green}
                      strokeWidth="6"
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
                    color: UPI_THEME.colors.ink,
                    letterSpacing: "0.02em",
                  }}
                >
                  PAYMENT SUCCESSFUL
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 84,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                    margin: "12px 0",
                  }}
                >
                  ₹500
                </div>

                {/* ~2s Badge */}
                <div
                  style={{
                    padding: "10px 28px",
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
                  TOTAL TIME: ~2 SECONDS
                </div>
              </div>

              {/* Kinetic On-Screen Text at Bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                }}
              >
                <KineticHeadline
                  words={[
                    { text: "HO GAYA!", highlight: false },
                    {
                      text: "SIRF 2 SECONDS",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  textColor={UPI_THEME.colors.offWhite}
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
