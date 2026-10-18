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

export const Scene4Banks: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s41, s42, s43] = shots;
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          VERTICAL STACKED SPLIT: Coral Debit Top & Mint Credit Bottom
         ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        {/* Top Half: Coral Debit */}
        <div
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "#FFD9D6",
            borderBottom: "4px solid #111111",
            position: "relative",
            overflow: "hidden",
          }}
        />

        {/* Bottom Half: Mint Credit */}
        <div
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "#D6F5E0",
            position: "relative",
            overflow: "hidden",
          }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.1: Banks · Debit on Top Half (Frames 939 - 1043)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s41.start_frame} durationInFrames={s41.duration_frames}>
        {(() => {
          const localFrame = frame - s41.start_frame;

          const smsSlide = spring({
            frame: localFrame - 8,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* TOP HALF: DEBIT */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: "50%",
                  padding: "130px 48px 24px",
                  boxSizing: "border-box",
                }}
              >
                {/* Balance change: <s>₹5,000</s> ₹4,500 */}
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 100,
                    fontWeight: 900,
                    color: "#111111",
                    lineHeight: 1,
                  }}
                >
                  <s style={{ opacity: 0.45, fontSize: 72, marginRight: 20 }}>₹5,000</s>
                  ₹4,500
                </div>

                {/* Chip: -₹500 */}
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    backgroundColor: "#E5484D",
                    color: "#FFFFFF",
                    border: "3px solid #111111",
                    borderRadius: 999,
                    padding: "8px 32px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 44,
                    fontWeight: 900,
                    boxShadow: "3px 3px 0 #111111",
                  }}
                >
                  −₹500
                </span>

                {/* Realistic Slide-in SMS Banner */}
                <div
                  style={{
                    position: "absolute",
                    left: 48,
                    right: 48,
                    bottom: 36,
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: 24,
                    padding: "20px 28px",
                    boxShadow: "5px 5px 0 #111111",
                    transform: `translateX(${interpolate(smsSlide, [0, 1], [400, 0])}px)`,
                    opacity: smsSlide,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "ui-monospace, Menlo, monospace",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#777777",
                      letterSpacing: "0.08em",
                      marginBottom: 6,
                    }}
                  >
                    SMS &bull; BANK
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#111111",
                      lineHeight: 1.3,
                    }}
                  >
                    Rs.500.00 debited from A/c XX1234 via UPI
                  </div>
                </div>
              </div>

              {/* BOTTOM HALF: INACTIVE/WAITING */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: "50%",
                  padding: "48px",
                  opacity: 0.5,
                }}
              >
                <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 44, color: "#444" }}>
                  RECEIVER BANK (CONNECTING...)
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "PIN ✓", highlight: false },
                    { text: "BALANCE ✓", highlight: false },
                    { text: "-₹500", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={68}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.2: Cutaway & Credit on Bottom Half (Frames 1043 - 1132)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s42.start_frame} durationInFrames={s42.duration_frames}>
        {(() => {
          const localFrame = frame - s42.start_frame;

          // Sub-beat 1: Real-world ₹500 note macro cutaway
          if (localFrame < 26) {
            return (
              <RealWorldCutaway
                imageSrc="broll/inr_500_note_macro.jpg"
                captionTitle="Samne wale ka bank..."
              />
            );
          }

          // Sub-beat 2: Credit SMS slides in on bottom half
          const subFrame = localFrame - 26;
          const smsSlide = spring({
            frame: subFrame - 6,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* TOP HALF: Settled Debit */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: "50%",
                  padding: "130px 48px 24px",
                  boxSizing: "border-box",
                  opacity: 0.75,
                }}
              >
                <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 80, fontWeight: 900, color: "#111" }}>
                  ₹4,500
                </div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    backgroundColor: "#E5484D",
                    color: "#FFFFFF",
                    border: "3px solid #111111",
                    borderRadius: 999,
                    padding: "6px 24px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 34,
                    fontWeight: 900,
                  }}
                >
                  −₹500
                </span>
              </div>

              {/* BOTTOM HALF: ACTIVE CREDIT */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: "50%",
                  padding: "36px 48px 24px",
                  boxSizing: "border-box",
                }}
              >
                {/* Balance: <s>₹2,000</s> ₹2,500 */}
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 100,
                    fontWeight: 900,
                    color: "#111111",
                    lineHeight: 1,
                  }}
                >
                  <s style={{ opacity: 0.45, fontSize: 72, marginRight: 20 }}>₹2,000</s>
                  ₹2,500
                </div>

                {/* Chip: +₹500 */}
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 20,
                    backgroundColor: "#16A34A",
                    color: "#FFFFFF",
                    border: "3px solid #111111",
                    borderRadius: 999,
                    padding: "8px 32px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 44,
                    fontWeight: 900,
                    boxShadow: "3px 3px 0 #111111",
                  }}
                >
                  +₹500
                </span>

                {/* Realistic Slide-in Credit SMS Banner */}
                <div
                  style={{
                    position: "absolute",
                    left: 48,
                    right: 48,
                    bottom: 36,
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: 24,
                    padding: "20px 28px",
                    boxShadow: "5px 5px 0 #111111",
                    transform: `translateX(${interpolate(smsSlide, [0, 1], [400, 0])}px)`,
                    opacity: smsSlide,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "ui-monospace, Menlo, monospace",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#777777",
                      letterSpacing: "0.08em",
                      marginBottom: 6,
                    }}
                  >
                    SMS &bull; BANK
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#111111",
                      lineHeight: 1.3,
                    }}
                  >
                    Rs.500.00 credited to A/c XX5678 via UPI
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "PAISE", highlight: false },
                    { text: "JAMA", highlight: false },
                    { text: "+₹500", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={76}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.3: Confirmation Pulses to NPCI (Frames 1132 - 1237)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s43.start_frame} durationInFrames={s43.duration_frames}>
        {(() => {
          const localFrame = frame - s43.start_frame;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Center Confirmed Hub */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "5px solid #111111",
                  boxShadow: "8px 8px 0 #111111",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    backgroundColor: "#16A34A",
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 54,
                    fontWeight: 900,
                    marginBottom: 12,
                    border: "3px solid #111",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 40,
                    fontWeight: 900,
                    color: "#111111",
                  }}
                >
                  CONFIRMED
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "DONO", highlight: false },
                    { text: "BANKS", highlight: false },
                    { text: "→", highlight: false },
                    { text: "CONFIRM", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  fontSize={76}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
