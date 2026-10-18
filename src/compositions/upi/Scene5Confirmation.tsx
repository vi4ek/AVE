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
    <AbsoluteFill style={{ backgroundColor: "#16A34A", overflow: "hidden" }}>
      {/* ────────────────────────────────────────────────────────────
          SHOT 5.1: Confirmation Beam to Both Phones (Frames 1237 - 1325)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s51.start_frame} durationInFrames={s51.duration_frames}>
        {(() => {
          const localFrame = frame - s51.start_frame;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Source Hub */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "20%",
                  transform: "translateX(-50%)",
                  padding: "16px 48px",
                  borderRadius: 999,
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  boxShadow: "6px 6px 0 #111111",
                  color: "#111111",
                  fontWeight: 900,
                  fontSize: 36,
                  fontFamily: UPI_THEME.fonts.headline,
                }}
              >
                NPCI CENTRAL SWITCH
              </div>

              {/* Dual Phones Below */}
              <div
                style={{
                  position: "absolute",
                  left: "10%",
                  right: "10%",
                  top: "38%",
                  display: "flex",
                  gap: 36,
                }}
              >
                {/* Phone 1: Payer */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: 36,
                    boxShadow: "8px 8px 0 #111111",
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 26, fontWeight: 800, color: "#666" }}>
                    YOUR PHONE
                  </div>
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 44, fontWeight: 900, color: "#111", marginTop: 16 }}>
                    Debited ₹500
                  </div>
                </div>

                {/* Phone 2: Merchant */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: 36,
                    boxShadow: "8px 8px 0 #111111",
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 26, fontWeight: 800, color: "#666" }}>
                    SHOP PHONE
                  </div>
                  <div style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 44, fontWeight: 900, color: "#16A34A", marginTop: 16 }}>
                    Credited ₹500
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "CONFIRMATION", highlight: false },
                    { text: "DONO PHONES PAR", highlight: true, highlightColor: "#FFD43B" },
                  ]}
                  textColor="#FFFFFF"
                  fontSize={72}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 5.2: Success · Confetti & White Card with Checkmark (Frames 1325 - 1413)
          Sub-beat 1 (0-28): Real-world countertop soundbox cutaway
          Sub-beat 2 (28-88): Exact Style Mock Card with Checkmark + Falling Confetti
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s52.start_frame} durationInFrames={s52.duration_frames}>
        {(() => {
          const localFrame = frame - s52.start_frame;

          // Sub-beat 1: Soundbox cutaway
          if (localFrame < 28) {
            return (
              <RealWorldCutaway
                imageSrc="broll/upi_soundbox.jpg"
                captionTitle="PAYMENT RECEIVED: ₹500"
              />
            );
          }

          // Sub-beat 2: Exact Style Mock Confirmation Screen
          const subFrame = localFrame - 28;
          const popSpring = spring({
            frame: subFrame - 6,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          // 5 Columns of Falling Confetti (.cf) from HTML mock
          const confettiList = [
            { left: "12%", bg: "#FFD43B", delay: 0 },
            { left: "30%", bg: "#FFFFFF", delay: 8 },
            { left: "52%", bg: "#FF5A1F", delay: 16 },
            { left: "72%", bg: "#FFD43B", delay: 5 },
            { left: "88%", bg: "#FFFFFF", delay: 12 },
            { left: "22%", bg: "#FF5A1F", delay: 10 },
            { left: "42%", bg: "#FFD43B", delay: 4 },
            { left: "64%", bg: "#FFFFFF", delay: 14 },
          ];

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Falling Confetti (.cf) */}
              {confettiList.map((cf, idx) => {
                const cfProgress = (Math.max(0, subFrame - cf.delay) * 8) % 1800;
                const cfRotate = cfProgress * 0.8;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: cf.left,
                      top: cfProgress - 120,
                      width: 28,
                      height: 28,
                      backgroundColor: cf.bg,
                      border: "3px solid #111111",
                      transform: `rotate(${cfRotate}deg)`,
                      boxShadow: "2px 2px 0 #111111",
                      zIndex: 10,
                    }}
                  />
                );
              })}

              {/* White Success Card (.bx) */}
              <div
                style={{
                  position: "absolute",
                  left: "13%",
                  top: "32%",
                  width: "74%",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #111111",
                  borderRadius: 44,
                  boxShadow: "8px 8px 0 #111111",
                  padding: "80px 32px 48px",
                  textAlign: "center",
                  boxSizing: "border-box",
                  transform: `scale(${interpolate(popSpring, [0, 1], [0.7, 1.0])})`,
                }}
              >
                {/* Circular Green Checkmark Badge (.ok) popping over top */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -70,
                    transform: "translateX(-50%)",
                    width: 140,
                    height: 140,
                    backgroundColor: "#16A34A",
                    color: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 84,
                    fontWeight: 900,
                    boxShadow: "6px 6px 0 #111111",
                  }}
                >
                  ✓
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#111111",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Payment Successful
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 72,
                    fontWeight: 900,
                    color: "#16A34A",
                    marginTop: 14,
                  }}
                >
                  ₹500 &bull; ~2 sec
                </div>
              </div>

              {/* Bottom Caption: Ho gaya! */}
              <div
                style={{
                  position: "absolute",
                  bottom: 180,
                  width: "100%",
                  textAlign: "center",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 84,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                }}
              >
                HO GAYA!
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
