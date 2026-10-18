import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticHeadline, RealWorldCutaway, RealisticPhone } from "./shared";
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
            ? UPI_THEME.colors.sceneBg.hookS13
            : UPI_THEME.colors.sceneBg.hook,
        overflow: "hidden",
      }}
    >
      {/* Neo-brutalist Grid Lines (subtle hard ink grid) */}
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
          SHOT 1.1: Phone Screen & Button Tap (Frames 0 - 52)
          Sub-beat 1 (0-30): Realistic Phone Mockup with Thumb Tap
          Sub-beat 2 (30-52): 0.73s Real-World Cutaway (Chai Stall QR)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={s11.duration_frames}>
        {(() => {
          // Sub-beat 1: Frames 0 to 30
          if (frame < 30) {
            const camScale = interpolate(frame, [0, 30], [0.98, 1.04]);
            const tapFrame = Math.max(0, frame - 16);
            const isPressed = frame >= 16 && frame <= 24;

            return (
              <AbsoluteFill
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${camScale})`,
                }}
              >
                <RealisticPhone
                  showThumb={true}
                  thumbPressed={isPressed}
                  scale={0.92}
                >
                  {/* Status Bar */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      color: UPI_THEME.colors.ink,
                      fontSize: 18,
                      fontWeight: 800,
                      fontFamily: UPI_THEME.fonts.body,
                      marginBottom: 28,
                    }}
                  >
                    <span>09:41</span>
                    <span>UPI · 5G</span>
                  </div>

                  {/* Merchant Card */}
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: UPI_THEME.colors.yellowLight,
                      border: UPI_THEME.borders.neo,
                      boxShadow: UPI_THEME.shadows.neo,
                      borderRadius: 20,
                      padding: "20px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 32,
                    }}
                  >
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 14,
                        backgroundColor: UPI_THEME.colors.orange,
                        border: "2px solid #111",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 28,
                        fontWeight: 900,
                      }}
                    >
                      K
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: UPI_THEME.fonts.headline,
                          fontSize: 26,
                          fontWeight: 800,
                          color: UPI_THEME.colors.ink,
                        }}
                      >
                        Chai & Kirana Store
                      </div>
                      <div
                        style={{
                          fontFamily: UPI_THEME.fonts.body,
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#555",
                        }}
                      >
                        verified merchant
                      </div>
                    </div>
                  </div>

                  {/* Amount Display with Neo badge */}
                  <div
                    style={{
                      backgroundColor: UPI_THEME.colors.offWhite,
                      border: UPI_THEME.borders.neoThick,
                      boxShadow: UPI_THEME.shadows.neo,
                      borderRadius: 24,
                      padding: "28px 48px",
                      margin: "20px 0 36px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: UPI_THEME.fonts.body,
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#777",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Paying Amount
                    </div>
                    <div
                      style={{
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 84,
                        fontWeight: 900,
                        color: UPI_THEME.colors.ink,
                        lineHeight: 1.1,
                      }}
                    >
                      ₹500
                    </div>
                  </div>

                  {/* Neo-Brutalist Tap Button */}
                  <div style={{ width: "100%", marginTop: "auto", marginBottom: 16 }}>
                    <div
                      style={{
                        width: "100%",
                        height: 72,
                        borderRadius: 20,
                        backgroundColor: isPressed
                          ? UPI_THEME.colors.yellowHighlight
                          : UPI_THEME.colors.orange,
                        border: UPI_THEME.borders.neoThick,
                        boxShadow: isPressed
                          ? "1px 1px 0 #111"
                          : UPI_THEME.shadows.neo,
                        transform: isPressed ? "translate(3px, 3px)" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isPressed ? UPI_THEME.colors.ink : "#FFFFFF",
                        fontFamily: UPI_THEME.fonts.headline,
                        fontSize: 34,
                        fontWeight: 900,
                        letterSpacing: "0.04em",
                      }}
                    >
                      PAY ₹500
                    </div>
                  </div>
                </RealisticPhone>
              </AbsoluteFill>
            );
          }

          // Sub-beat 2: Frames 30 to 52 (Real-world cutaway to chai stall QR)
          return (
            <RealWorldCutaway
              imageSrc="broll/qr_chai_stall.jpg"
              captionTag="REALITY CHECK · CHAI STALL"
              captionTitle="Aapne Pay Dabaya..."
              scaleRange={[1.0, 1.05]}
            />
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.2: Screen Freeze, QR Scan Cutaway & "₹500 > GONE" (Frames 52 - 110)
          Sub-beat 1 (52-80): Hand scanning QR Real-world Cutaway
          Sub-beat 2 (80-110): ₹500 Flies off + Kinetic Headline with marker wipe
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s12.start_frame} durationInFrames={s12.duration_frames}>
        {(() => {
          const localFrame = frame - s12.start_frame;

          // Sub-beat 1: Real-world cutaway (hand scan QR)
          if (localFrame < 28) {
            return (
              <RealWorldCutaway
                imageSrc="broll/hand_scan_qr.jpg"
                captionTag="INSTANT TAP"
                captionTitle="AUR DO SECOND MEIN..."
                scaleRange={[1.02, 1.07]}
              />
            );
          }

          // Sub-beat 2: Local frames 28 to 58
          const shake =
            localFrame > 30 && localFrame < 44
              ? Math.sin(localFrame * 5) * 5
              : 0;

          const flyY = interpolate(localFrame, [28, 55], [0, -320], {
            extrapolateRight: "clamp",
          });
          const flyOpacity = interpolate(localFrame, [28, 50], [1, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${shake}px)`,
              }}
            >
              {/* Fly away currency pill */}
              <div
                style={{
                  backgroundColor: UPI_THEME.colors.coral,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 30,
                  padding: "16px 44px",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 90,
                  fontWeight: 900,
                  color: UPI_THEME.colors.ink,
                  transform: `translateY(${flyY}px) scale(${1 - flyY * -0.0008})`,
                  opacity: flyOpacity,
                  marginBottom: 80,
                }}
              >
                -₹500
              </div>

              {/* Kinetic On-Screen Text with Marker Highlight */}
              <div style={{ position: "absolute", bottom: UPI_THEME.safeZone.bottom + 40 }}>
                <KineticHeadline
                  words={[
                    { text: "₹500", highlight: false },
                    { text: ">", highlight: false, color: UPI_THEME.colors.orange },
                    {
                      text: "GONE",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  startFrameOffset={0}
                  fontSize={84}
                />
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.3: Full Orange Smash Cut · 2 SECONDS Countdown Ring (Frames 110 - 159)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s13.start_frame} durationInFrames={s13.duration_frames}>
        {(() => {
          const localFrame = frame - s13.start_frame;

          const ringProgress = interpolate(
            localFrame,
            [0, s13.duration_frames],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const circumference = 2 * Math.PI * 180;
          const strokeDashoffset = circumference * (1 - ringProgress);

          const popSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          return (
            <AbsoluteFill
              style={{
                backgroundColor: UPI_THEME.colors.sceneBg.hookS13,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Card Container with Hard Shadow */}
              <div
                style={{
                  position: "relative",
                  width: 460,
                  height: 460,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* SVG Countdown Ring */}
                <svg
                  width="440"
                  height="440"
                  style={{
                    position: "absolute",
                    inset: 10,
                    transform: "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="220"
                    cy="220"
                    r="180"
                    stroke="#E5E0D5"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="220"
                    cy="220"
                    r="180"
                    stroke={UPI_THEME.colors.ink}
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Big Black Numeral inside ring */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${interpolate(popSpring, [0, 1], [0.7, 1.0])})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 160,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                      lineHeight: 0.9,
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 34,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                      letterSpacing: 4,
                      marginTop: 8,
                    }}
                  >
                    SECONDS
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.4: Zoom-Through & "Asal mein kya hota hai?" (Frames 159 - 232)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s14.start_frame} durationInFrames={s14.duration_frames}>
        {(() => {
          const localFrame = frame - s14.start_frame;

          const zoomThrough = interpolate(
            localFrame,
            [0, s14.duration_frames - 10],
            [1.0, 3.4],
            { extrapolateRight: "clamp" }
          );
          const ringFade = interpolate(localFrame, [12, 32], [1, 0], {
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
              {/* Expanding tunnel ring */}
              <div
                style={{
                  position: "absolute",
                  width: 440,
                  height: 440,
                  borderRadius: "50%",
                  border: `10px solid ${UPI_THEME.colors.orange}`,
                  transform: `scale(${zoomThrough})`,
                  opacity: ringFade,
                }}
              />

              {/* Orbiting Neo Question Marks */}
              {[0, 1, 2, 3].map((i) => {
                const angle = (localFrame * 4 + i * 90) * (Math.PI / 180);
                const rx = Math.cos(angle) * 260;
                const ry = Math.sin(angle) * 160;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      transform: `translate(${rx}px, ${ry}px)`,
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      backgroundColor: UPI_THEME.colors.yellowHighlight,
                      border: UPI_THEME.borders.neo,
                      boxShadow: UPI_THEME.shadows.neoSm,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 40,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                    }}
                  >
                    ?
                  </div>
                );
              })}

              {/* Kinetic Headline with Marker Wipe on "HOTA HAI?" */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  width: "100%",
                }}
              >
                <KineticHeadline
                  words={[
                    { text: "ASAL", highlight: false },
                    { text: "MEIN", highlight: false },
                    {
                      text: "KYA HOTA HAI?",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.yellowHighlight,
                    },
                  ]}
                  startFrameOffset={6}
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
