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

const CITIES = [
  { name: "Delhi", left: "50%", top: "21%" },
  { name: "Kolkata", left: "78%", top: "33%" },
  { name: "Mumbai", left: "22%", top: "39%" },
  { name: "Bengaluru", left: "30%", top: "63%" },
  { name: "Chennai", left: "72%", top: "66%" },
];

export const Scene3Npci: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s31, s32, s33, s34] = shots;
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFE9A8", overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 3.1: NPCI Central Switch & City Nodes (Frames 551 - 648)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s31.start_frame} durationInFrames={s31.duration_frames}>
        {(() => {
          const localFrame = frame - s31.start_frame;
          const dashOffset = (localFrame * 3) % 24;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Connecting Dashed SVG Network Lines */}
              <svg
                viewBox="0 0 100 178"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <line x1="50" y1="82" x2="50" y2="38" stroke="#111" strokeWidth="1.2" strokeDasharray="3 3" strokeDashoffset={-dashOffset} />
                <line x1="50" y1="82" x2="80" y2="59" stroke="#111" strokeWidth="1.2" strokeDasharray="3 3" strokeDashoffset={-dashOffset} />
                <line x1="50" y1="82" x2="20" y2="69" stroke="#111" strokeWidth="1.2" strokeDasharray="3 3" strokeDashoffset={-dashOffset} />
                <line x1="50" y1="82" x2="30" y2="112" stroke="#111" strokeWidth="1.2" strokeDasharray="3 3" strokeDashoffset={-dashOffset} />
                <line x1="50" y1="82" x2="72" y2="117" stroke="#111" strokeWidth="1.2" strokeDasharray="3 3" strokeDashoffset={-dashOffset} />
              </svg>

              {/* 5 City Nodes (.n) */}
              {CITIES.map((c, i) => {
                const bob = Math.sin((localFrame + i * 15) / 10) * 8;
                return (
                  <div
                    key={c.name}
                    style={{
                      position: "absolute",
                      left: c.left,
                      top: c.top,
                      transform: `translate(-50%, calc(-50% + ${bob}px))`,
                      padding: "16px 36px",
                      border: "4px solid #111111",
                      borderRadius: 999,
                      backgroundColor: "#FFFFFF",
                      fontWeight: 800,
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 36,
                      color: "#111111",
                      boxShadow: "5px 5px 0 #111111",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {c.name}
                  </div>
                );
              })}

              {/* Central Hub (.hub) */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "46%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#111111",
                  color: "#FFFFFF",
                  padding: "32px 58px",
                  borderRadius: 36,
                  fontWeight: 900,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 76,
                  border: "4px solid #111111",
                  boxShadow: "10px 10px 0 #FF5A1F",
                  letterSpacing: "0.04em",
                  zIndex: 10,
                }}
              >
                NPCI
              </div>

              {/* Bottom Caption: UPI ka central switch */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "UPI", highlight: false },
                    { text: "KA", highlight: false },
                    { text: "CENTRAL SWITCH", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={72}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.2: Super-Fast Post Office (Frames 648 - 745)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s32.start_frame} durationInFrames={s32.duration_frames}>
        {(() => {
          const localFrame = frame - s32.start_frame;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Sorter Machine Card */}
              <div
                style={{
                  position: "absolute",
                  left: "14%",
                  top: "22%",
                  width: "72%",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  borderRadius: 40,
                  boxShadow: "8px 8px 0 #111111",
                  padding: "36px 32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#111111",
                  }}
                >
                  SUPER-FAST ROUTER
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#555",
                    marginTop: 8,
                  }}
                >
                  Sorting &bull; 0.2s Dispatch
                </div>
              </div>

              {/* Two Sorting Conveyor Lanes */}
              <div
                style={{
                  position: "absolute",
                  left: "14%",
                  right: "14%",
                  top: "42%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                }}
              >
                {/* Lane 1: Sender Bank */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#FFD9D6",
                    border: "3px solid #111111",
                    boxShadow: "5px 5px 0 #111111",
                    borderRadius: 24,
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 24, fontWeight: 900, color: "#111" }}>
                    SENDER BANK
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      backgroundColor: "#FFF",
                      border: "2px solid #111",
                      borderRadius: 14,
                      padding: "10px 0",
                      fontWeight: 900,
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 28,
                    }}
                  >
                    ✉ DEBIT
                  </div>
                </div>

                {/* Lane 2: Receiver Bank */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#D6F5E0",
                    border: "3px solid #111111",
                    boxShadow: "5px 5px 0 #111111",
                    borderRadius: 24,
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 24, fontWeight: 900, color: "#111" }}>
                    RECEIVER BANK
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      backgroundColor: "#FFF",
                      border: "2px solid #111",
                      borderRadius: 14,
                      padding: "10px 0",
                      fontWeight: 900,
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 28,
                      color: "#16A34A",
                    }}
                  >
                    ✉ CREDIT
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "SUPER-FAST", highlight: false },
                    { text: "POST OFFICE", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={76}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.3: Lines to Both Banks (Frames 745 - 842)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s33.start_frame} durationInFrames={s33.duration_frames}>
        {(() => {
          const localFrame = frame - s33.start_frame;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Central Hub Top */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "22%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  boxShadow: "6px 6px 0 #111111",
                  borderRadius: 24,
                  padding: "16px 44px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 38,
                  fontWeight: 900,
                  color: "#111111",
                }}
              >
                NPCI CENTRAL SWITCH
              </div>

              {/* Two Bank Cards Below */}
              <div
                style={{
                  position: "absolute",
                  left: "10%",
                  right: "10%",
                  top: "40%",
                  display: "flex",
                  gap: 32,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#FFD9D6",
                    border: "4px solid #111111",
                    boxShadow: "8px 8px 0 #111111",
                    borderRadius: 32,
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 36, fontWeight: 900, color: "#111" }}>
                    AAPKA BANK
                  </div>
                  <div style={{ fontFamily: UPI_THEME.fonts.body, fontSize: 18, fontWeight: 700, color: "#555", marginTop: 8 }}>
                    Debit Account
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#D6F5E0",
                    border: "4px solid #111111",
                    boxShadow: "8px 8px 0 #111111",
                    borderRadius: 32,
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 36, fontWeight: 900, color: "#111" }}>
                    RECEIVER BANK
                  </div>
                  <div style={{ fontFamily: UPI_THEME.fonts.body, fontSize: 18, fontWeight: 700, color: "#555", marginTop: 8 }}>
                    Credit Account
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "AAPKA", highlight: false },
                    { text: "BANK", highlight: true, highlightColor: "#FFD43B" },
                    { text: "·", highlight: false },
                    { text: "RECEIVER", highlight: false },
                    { text: "BANK", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={66}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.4: Triangle Routing Complete (Frames 842 - 939)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s34.start_frame} durationInFrames={s34.duration_frames}>
        {(() => {
          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Triangle Nodes */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* SVG Triangle Connector */}
                <svg width="1080" height="1920" style={{ position: "absolute", inset: 0 }}>
                  <polygon
                    points="540,460 260,860 820,860"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="5"
                    strokeDasharray="10 8"
                  />
                </svg>

                {/* Top Node */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "22%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#111",
                    color: "#FFF",
                    border: "4px solid #111",
                    boxShadow: "6px 6px 0 #FF5A1F",
                    borderRadius: 28,
                    padding: "20px 48px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 44,
                    fontWeight: 900,
                  }}
                >
                  NPCI HUB
                </div>

                {/* Bottom Left Node */}
                <div
                  style={{
                    position: "absolute",
                    left: "10%",
                    top: "43%",
                    backgroundColor: "#FFD9D6",
                    border: "4px solid #111",
                    boxShadow: "6px 6px 0 #111",
                    borderRadius: 24,
                    padding: "22px 28px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  AAPKA BANK
                </div>

                {/* Bottom Right Node */}
                <div
                  style={{
                    position: "absolute",
                    right: "10%",
                    top: "43%",
                    backgroundColor: "#D6F5E0",
                    border: "4px solid #111",
                    boxShadow: "6px 6px 0 #111",
                    borderRadius: 24,
                    padding: "22px 28px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  RECEIVER BANK
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "CENTRAL", highlight: false },
                    { text: "ROUTING LOCKED", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={74}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
