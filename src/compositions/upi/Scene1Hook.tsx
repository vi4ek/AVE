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

export const Scene1Hook: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s11, s12, s13, s14] = shots;
  const sceneStart = shots[0].start_frame;
  const sceneEnd = shots[shots.length - 1].end_frame;
  if (frame < sceneStart || frame >= sceneEnd) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor:
          frame >= s13.start_frame && frame < s13.end_frame
            ? "#FF5A1F"
            : "#F7F4EE",
        overflow: "hidden",
      }}
    >
      {/* ────────────────────────────────────────────────────────────
          SHOT 1.1: Hook · Tap (Frames 0 - 52)
          Sub-beat 1 (0-30): Style Mock Phone Card + Ripple + Tap
          Sub-beat 2 (30-52): Chai Stall QR Cutaway
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={s11.duration_frames}>
        {(() => {
          if (frame < 30) {
            const isPressed = frame >= 14 && frame <= 24;
            const tapSpring = spring({
              frame: Math.max(0, frame - 14),
              fps,
              config: { damping: 12, stiffness: 260 },
            });

            const ripScale = interpolate(Math.max(0, frame - 14), [0, 16], [0.3, 2.2], {
              extrapolateRight: "clamp",
            });
            const ripOpacity = interpolate(Math.max(0, frame - 14), [0, 16], [1, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <AbsoluteFill style={{ overflow: "hidden" }}>

                {/* White Container Box (.bx) */}
                <div
                  style={{
                    position: "absolute",
                    left: "14%",
                    top: "18%",
                    width: "72%",
                    height: "52%",
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #111111",
                    borderRadius: 44,
                    boxShadow: "8px 8px 0 #111111",
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#666666",
                      alignSelf: "flex-start",
                    }}
                  >
                    Pay to Chai & Kirana
                  </div>

                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 130,
                      fontWeight: 900,
                      color: "#111111",
                      lineHeight: 1,
                      margin: "20px 0",
                    }}
                  >
                    ₹500
                  </div>

                  {/* Green Pay Button with Ripple */}
                  <div style={{ position: "relative", width: "100%" }}>
                    {frame >= 14 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: 80,
                          height: 80,
                          marginLeft: -40,
                          marginTop: -40,
                          border: "4px solid #FF5A1F",
                          borderRadius: "50%",
                          transform: `scale(${ripScale})`,
                          opacity: ripOpacity,
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#16A34A",
                        color: "#FFFFFF",
                        border: "4px solid #111111",
                        borderRadius: 999,
                        textAlign: "center",
                        padding: "20px 0",
                        fontWeight: 900,
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 42,
                        letterSpacing: "0.04em",
                        boxShadow: isPressed ? "1px 1px 0 #111" : "5px 5px 0 #111111",
                        transform: isPressed ? "translate(3px, 3px)" : "none",
                        transition: "transform 0.08s ease",
                      }}
                    >
                      Pay ₹500
                    </div>
                  </div>
                </div>

                {/* Caption at bottom */}
                <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                  <KineticHeadline
                    words={[
                      { text: "AAPNE", highlight: false },
                      { text: "PAY", highlight: true, highlightColor: "#FFD43B" },
                      { text: "DABAYA...", highlight: false },
                    ]}
                    fontSize={72}
                  />
                </div>
              </AbsoluteFill>
            );
          }

          // Sub-beat 2 (30-52): Real-world chai stall QR cutaway
          return (
            <RealWorldCutaway
              imageSrc="broll/qr_chai_stall.jpg"
              captionTitle="Aapne Pay Dabaya..."
            />
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.2: Freeze, Flying Currency & "₹500 → GONE" (Frames 52 - 110)
          Sub-beat 1 (52-78): Hand scan QR cutaway
          Sub-beat 2 (78-110): Flying ₹500 + "₹500 → GONE" with marker wipe
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s12.start_frame} durationInFrames={s12.duration_frames}>
        {(() => {
          const localFrame = frame - s12.start_frame;

          if (localFrame < 26) {
            return (
              <RealWorldCutaway
                imageSrc="broll/hand_scan_qr.jpg"
                captionTitle="Aur do second mein..."
              />
            );
          }

          const flyY = interpolate(localFrame, [26, 56], [0, -320], {
            extrapolateRight: "clamp",
          });
          const flyOpacity = interpolate(localFrame, [26, 50], [1, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Flying currency in red */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "38%",
                  transform: `translate(-50%, ${flyY}px)`,
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 140,
                  fontWeight: 900,
                  color: "#E5484D",
                  opacity: flyOpacity,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                ₹500
              </div>

              {/* Caption: "₹500 → GONE" */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "₹500", highlight: true, highlightColor: "#FFD43B" },
                    { text: "→", highlight: false, color: "#111" },
                    { text: "GONE", highlight: false, color: "#E5484D" },
                  ]}
                  fontSize={84}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.3: Smash cut to Full Orange #FF5A1F · Big 2 & Dashed Ring (Frames 110 - 159)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s13.start_frame} durationInFrames={s13.duration_frames}>
        {(() => {
          const localFrame = frame - s13.start_frame;
          const spin = (localFrame * 6) % 360;

          const popSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Dashed Spinning Ring */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "44%",
                  width: 540,
                  height: 540,
                  marginLeft: -270,
                  marginTop: -270,
                  border: "5px dashed #111111",
                  borderRadius: "50%",
                  transform: `rotate(${spin}deg)`,
                }}
              />

              {/* Massive Number "2" */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 380,
                  fontWeight: 900,
                  color: "#111111",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  transform: `scale(${interpolate(popSpring, [0, 1], [0.6, 1.0])})`,
                }}
              >
                2
              </div>

              {/* Bottom Caption: SECONDS */}
              <div
                style={{
                  position: "absolute",
                  bottom: 180,
                  width: "100%",
                  textAlign: "center",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 88,
                  fontWeight: 900,
                  color: "#111111",
                  letterSpacing: "0.04em",
                }}
              >
                SECONDS
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.4: Question Mark Glyph (Frames 159 - 232)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s14.start_frame} durationInFrames={s14.duration_frames}>
        {(() => {
          const localFrame = frame - s14.start_frame;

          return (
            <AbsoluteFill style={{ overflow: "hidden" }}>

              {/* Orbiting question mark badges */}
              {[0, 1, 2, 3].map((i) => {
                const angle = (localFrame * 4 + i * 90) * (Math.PI / 180);
                const rx = Math.cos(angle) * 260;
                const ry = Math.sin(angle) * 160;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "40%",
                      transform: `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px))`,
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      backgroundColor: "#FFD43B",
                      border: "3px solid #111111",
                      boxShadow: "3px 3px 0 #111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 44,
                      fontWeight: 900,
                      color: "#111111",
                    }}
                  >
                    ?
                  </div>
                );
              })}

              {/* Caption with Marker wipe on "HOTA HAI?" */}
              <div style={{ position: "absolute", bottom: 180, width: "100%" }}>
                <KineticHeadline
                  words={[
                    { text: "ASAL", highlight: false },
                    { text: "MEIN", highlight: false },
                    {
                      text: "KYA HOTA HAI?",
                      highlight: true,
                      highlightColor: "#FFD43B",
                    },
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
