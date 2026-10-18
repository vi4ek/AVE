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

// 5 Abstract City Nodes across India (Mumbai, Delhi, Bengaluru, Chennai, Kolkata)
const CITY_NODES = [
  { name: "DELHI", x: 420, y: 360 },
  { name: "MUMBAI", x: 260, y: 640 },
  { name: "KOLKATA", x: 740, y: 520 },
  { name: "BENGALURU", x: 400, y: 880 },
  { name: "CHENNAI", x: 620, y: 920 },
];

export const Scene3Npci: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s31, s32, s33, s34] = shots;
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UPI_THEME.colors.sceneBg.npci,
        overflow: "hidden",
      }}
    >
      {/* Background Ink Dot Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(17, 17, 17, 0.12) 2px, transparent 2px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.1: Abstract City Nodes & NPCI Central Switch (Frames 551 - 648)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s31.start_frame} durationInFrames={s31.duration_frames}>
        {(() => {
          const localFrame = frame - s31.start_frame;

          const hubSpring = spring({
            frame: localFrame - 8,
            fps,
            config: { damping: 11, stiffness: 240 },
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>
              {/* SVG Connecting Geometric Mesh Lines */}
              <svg
                width="1080"
                height="1920"
                style={{ position: "absolute", inset: 0 }}
              >
                {/* Lines between city nodes */}
                <line x1="420" y1="360" x2="540" y2="620" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="260" y1="640" x2="540" y2="620" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="740" y1="520" x2="540" y2="620" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="400" y1="880" x2="540" y2="620" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="620" y1="920" x2="540" y2="620" stroke="#111" strokeWidth="3" strokeDasharray="6 6" />

                {/* City interconnects */}
                <line x1="420" y1="360" x2="260" y2="640" stroke="rgba(17,17,17,0.25)" strokeWidth="2" />
                <line x1="420" y1="360" x2="740" y2="520" stroke="rgba(17,17,17,0.25)" strokeWidth="2" />
                <line x1="260" y1="640" x2="400" y2="880" stroke="rgba(17,17,17,0.25)" strokeWidth="2" />
                <line x1="400" y1="880" x2="620" y2="920" stroke="rgba(17,17,17,0.25)" strokeWidth="2" />
              </svg>

              {/* 5 City Node Badges */}
              {CITY_NODES.map((city, idx) => {
                const nodeDelay = idx * 4;
                const nodeSpring = spring({
                  frame: Math.max(0, localFrame - nodeDelay),
                  fps,
                  config: { damping: 12, stiffness: 220 },
                });

                return (
                  <div
                    key={city.name}
                    style={{
                      position: "absolute",
                      left: city.x - 70,
                      top: city.y - 25,
                      backgroundColor: UPI_THEME.colors.offWhite,
                      border: UPI_THEME.borders.neo,
                      boxShadow: UPI_THEME.shadows.neoSm,
                      borderRadius: 14,
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transform: `scale(${interpolate(nodeSpring, [0, 1], [0.5, 1.0])})`,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: UPI_THEME.colors.orange,
                        border: "1.5px solid #111",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 20,
                        fontWeight: 900,
                        color: UPI_THEME.colors.ink,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {city.name}
                    </span>
                  </div>
                );
              })}

              {/* Central NPCI Switch Hub Card */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 620,
                  transform: `translate(-50%, -50%) scale(${interpolate(hubSpring, [0, 1], [0.6, 1.0])})`,
                  width: 320,
                  height: 200,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 32,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    backgroundColor: UPI_THEME.colors.yellowHighlight,
                    border: UPI_THEME.borders.neoThin,
                    borderRadius: 8,
                    padding: "4px 14px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 18,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                    marginBottom: 10,
                  }}
                >
                  CENTRAL SWITCH
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 64,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                  }}
                >
                  NPCI
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#555",
                    marginTop: 6,
                  }}
                >
                  National Payments Switch
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
                    { text: "NPCI =", highlight: false },
                    { text: "UPI KA", highlight: false },
                    {
                      text: "CENTRAL SWITCH",
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
          SHOT 3.2: Super-Fast Post Office & Sorting Envelopes (Frames 648 - 745)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s32.start_frame} durationInFrames={s32.duration_frames}>
        {(() => {
          const localFrame = frame - s32.start_frame;

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Central Sorter Card */}
              <div
                style={{
                  width: 440,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 32,
                  padding: "28px 36px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 60,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 40,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                    letterSpacing: "0.04em",
                  }}
                >
                  SORTING MACHINE
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#666",
                    marginTop: 4,
                  }}
                >
                  Lightning Router &bull; 0.2s dispatch
                </div>
              </div>

              {/* Two Sorting Conveyor Lanes with Neo Envelopes */}
              <div style={{ display: "flex", gap: 80 }}>
                {/* Lane 1: Sender Bank */}
                <div
                  style={{
                    width: 220,
                    backgroundColor: UPI_THEME.colors.coral,
                    border: UPI_THEME.borders.neo,
                    boxShadow: UPI_THEME.shadows.neo,
                    borderRadius: 24,
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 22,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                    }}
                  >
                    SENDER BANK
                  </div>
                  {[0, 1].map((idx) => {
                    const envY = interpolate(
                      (localFrame * 5 + idx * 45) % 110,
                      [0, 110],
                      [-40, 50]
                    );
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 140,
                          height: 58,
                          backgroundColor: UPI_THEME.colors.offWhite,
                          border: UPI_THEME.borders.neo,
                          boxShadow: UPI_THEME.shadows.neoSm,
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: UPI_THEME.fonts.headline,
                          fontSize: 26,
                          fontWeight: 900,
                          color: UPI_THEME.colors.ink,
                          transform: `translateY(${envY}px)`,
                        }}
                      >
                        ✉ DEBIT
                      </div>
                    );
                  })}
                </div>

                {/* Lane 2: Receiver Bank */}
                <div
                  style={{
                    width: 220,
                    backgroundColor: UPI_THEME.colors.greenLight,
                    border: UPI_THEME.borders.neo,
                    boxShadow: UPI_THEME.shadows.neo,
                    borderRadius: 24,
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 22,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                    }}
                  >
                    RECEIVER BANK
                  </div>
                  {[0, 1].map((idx) => {
                    const envY = interpolate(
                      (localFrame * 5 + idx * 45 + 25) % 110,
                      [0, 110],
                      [-40, 50]
                    );
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 140,
                          height: 58,
                          backgroundColor: UPI_THEME.colors.offWhite,
                          border: UPI_THEME.borders.neo,
                          boxShadow: UPI_THEME.shadows.neoSm,
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: UPI_THEME.fonts.headline,
                          fontSize: 26,
                          fontWeight: 900,
                          color: UPI_THEME.colors.green,
                          transform: `translateY(${envY}px)`,
                        }}
                      >
                        ✉ CREDIT
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kinetic Text with Marker Highlight */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                }}
              >
                <KineticHeadline
                  words={[
                    { text: "SUPER-FAST", highlight: false },
                    {
                      text: "POST OFFICE",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  fontSize={76}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.3: Lines Draw to Two Generic Banks (Frames 745 - 842)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s33.start_frame} durationInFrames={s33.duration_frames}>
        {(() => {
          const localFrame = frame - s33.start_frame;

          const lineProg = interpolate(localFrame, [8, 32], [0, 100], {
            extrapolateRight: "clamp",
          });

          const bankSpring = spring({
            frame: localFrame - 20,
            fps,
            config: { damping: 12, stiffness: 220 },
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
              {/* Central NPCI Hub Pill */}
              <div
                style={{
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neo,
                  borderRadius: 24,
                  padding: "16px 40px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 36,
                  fontWeight: 900,
                  color: UPI_THEME.colors.ink,
                  marginBottom: 40,
                }}
              >
                NPCI CENTRAL SWITCH
              </div>

              {/* SVG Connecting Branches */}
              <svg width="740" height="110" style={{ marginBottom: 30 }}>
                {/* Left Branch */}
                <line
                  x1="370"
                  y1="10"
                  x2="170"
                  y2="95"
                  stroke="#111"
                  strokeWidth="5"
                  strokeDasharray="320"
                  strokeDashoffset={320 - 3.2 * lineProg}
                />
                {/* Right Branch */}
                <line
                  x1="370"
                  y1="10"
                  x2="570"
                  y2="95"
                  stroke="#111"
                  strokeWidth="5"
                  strokeDasharray="320"
                  strokeDashoffset={320 - 3.2 * lineProg}
                />
              </svg>

              {/* Two Generic Bank Cards */}
              <div
                style={{
                  display: "flex",
                  gap: 80,
                  transform: `scale(${interpolate(bankSpring, [0, 1], [0.8, 1.0])})`,
                }}
              >
                {/* Left Bank: Aapka Bank */}
                <div
                  style={{
                    width: 250,
                    backgroundColor: UPI_THEME.colors.coral,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    borderRadius: 28,
                    padding: "24px 20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 34,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                    }}
                  >
                    AAPKA BANK
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#444",
                      marginTop: 6,
                    }}
                  >
                    Debit Account
                  </div>
                </div>

                {/* Right Bank: Receiver Bank */}
                <div
                  style={{
                    width: 250,
                    backgroundColor: UPI_THEME.colors.greenLight,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    borderRadius: 28,
                    padding: "24px 20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 34,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                    }}
                  >
                    RECEIVER BANK
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#444",
                      marginTop: 6,
                    }}
                  >
                    Credit Account
                  </div>
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
                    { text: "AAPKA", highlight: false },
                    {
                      text: "BANK",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                    { text: "&bull;", highlight: false },
                    { text: "RECEIVER", highlight: false },
                    {
                      text: "BANK",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  fontSize={64}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.4: Triangle Layout Locks (Frames 842 - 939)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s34.start_frame} durationInFrames={s34.duration_frames}>
        {(() => {
          const localFrame = frame - s34.start_frame;

          const lockSpring = spring({
            frame: localFrame - 6,
            fps,
            config: { damping: 11, stiffness: 240 },
          });

          // Circulating data pulses
          const pulseOffset = (localFrame * 4) % 100;

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 680,
                  height: 480,
                  transform: `scale(${interpolate(lockSpring, [0, 1], [0.85, 1.0])})`,
                }}
              >
                {/* SVG Triangle Connector Lines */}
                <svg width="680" height="480" style={{ position: "absolute", inset: 0 }}>
                  <polygon
                    points="340,60 120,380 560,380"
                    fill="none"
                    stroke="#111"
                    strokeWidth="4"
                    strokeDasharray="8 6"
                  />
                </svg>

                {/* Top Node: NPCI */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: UPI_THEME.colors.offWhite,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neo,
                    borderRadius: 20,
                    padding: "14px 32px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  NPCI HUB
                </div>

                {/* Bottom Left Node: Aapka Bank */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 40,
                    left: 20,
                    backgroundColor: UPI_THEME.colors.coral,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neo,
                    borderRadius: 20,
                    padding: "16px 24px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 28,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  AAPKA BANK
                </div>

                {/* Bottom Right Node: Receiver Bank */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 40,
                    right: 20,
                    backgroundColor: UPI_THEME.colors.greenLight,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neo,
                    borderRadius: 20,
                    padding: "16px 24px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 28,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  RECEIVER BANK
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
                    { text: "CENTRAL", highlight: false },
                    {
                      text: "ROUTING LOCKED",
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
    </AbsoluteFill>
  );
};
