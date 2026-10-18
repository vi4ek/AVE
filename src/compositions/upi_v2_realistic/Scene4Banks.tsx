import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BankSmsBanner, KineticHeadline, RealWorldCutaway } from "./shared";
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
          SPLIT SCREEN BACKGROUND: Coral (Left) & Mint (Right)
         ──────────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {/* Left half: Coral */}
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: UPI_THEME.colors.sceneBg.banksLeft,
            borderRight: UPI_THEME.borders.neoThick,
            position: "relative",
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(17, 17, 17, 0.08) 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Right half: Mint */}
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: UPI_THEME.colors.sceneBg.banksRight,
            position: "relative",
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(17, 17, 17, 0.08) 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          SHOT 4.1: Split Screen Left - Debit SMS & Balance Countdown (Frames 939 - 1043)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s41.start_frame} durationInFrames={s41.duration_frames}>
        {(() => {
          const localFrame = frame - s41.start_frame;

          const smsSlide = spring({
            frame: localFrame - 8,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          // Countdown ₹5,000 -> ₹4,500
          const countdown = Math.round(
            interpolate(localFrame, [20, 60], [5000, 4500], {
              extrapolateRight: "clamp",
            })
          );

          // Verification checks
          const check1 = spring({ frame: localFrame - 22, fps, config: { damping: 12, stiffness: 240 } });
          const check2 = spring({ frame: localFrame - 36, fps, config: { damping: 12, stiffness: 240 } });

          return (
            <AbsoluteFill>
              {/* Realistic Bank Debit SMS Banner */}
              <BankSmsBanner
                type="debit"
                bankName="HDFC-BANK"
                amount={500}
                account="XX1234"
                balance={countdown}
                slideProgress={smsSlide}
              />

              {/* Main Left Content: Aapka Bank */}
              <div
                style={{
                  position: "absolute",
                  left: 40,
                  top: "38%",
                  width: 460,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 28,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: UPI_THEME.colors.coralDark,
                    color: "#FFF",
                    border: "2px solid #111",
                    borderRadius: 10,
                    padding: "4px 16px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 20,
                    fontWeight: 900,
                    marginBottom: 12,
                  }}
                >
                  AAPKA BANK
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 68,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  ₹{countdown.toLocaleString("en-IN")}
                </div>

                {/* Status Badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16, width: "100%" }}>
                  <div
                    style={{
                      backgroundColor: UPI_THEME.colors.greenLight,
                      border: UPI_THEME.borders.neo,
                      boxShadow: UPI_THEME.shadows.neoSm,
                      borderRadius: 12,
                      padding: "8px 14px",
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 20,
                      fontWeight: 800,
                      color: UPI_THEME.colors.ink,
                      opacity: check1,
                      transform: `scale(${interpolate(check1, [0, 1], [0.8, 1])})`,
                    }}
                  >
                    ✓ PIN VERIFIED
                  </div>
                  <div
                    style={{
                      backgroundColor: UPI_THEME.colors.greenLight,
                      border: UPI_THEME.borders.neo,
                      boxShadow: UPI_THEME.shadows.neoSm,
                      borderRadius: 12,
                      padding: "8px 14px",
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 20,
                      fontWeight: 800,
                      color: UPI_THEME.colors.ink,
                      opacity: check2,
                      transform: `scale(${interpolate(check2, [0, 1], [0.8, 1])})`,
                    }}
                  >
                    ✓ BALANCE CHECKED
                  </div>
                </div>
              </div>

              {/* Right Side Inactive Card */}
              <div
                style={{
                  position: "absolute",
                  right: 40,
                  top: "42%",
                  width: 460,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  border: UPI_THEME.borders.neo,
                  borderRadius: 28,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: 0.6,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 24,
                    fontWeight: 800,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  RECEIVER BANK (WAITING)
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
                    { text: "PIN ✓", highlight: false },
                    { text: "BALANCE ✓", highlight: false },
                    {
                      text: "-₹500",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.coral,
                      color: UPI_THEME.colors.coralDark,
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
          SHOT 4.2: Cutaway to ₹500 Note Macro & Receiver Credit (Frames 1043 - 1132)
          Sub-beat 1 (0-28): Real ₹500 note macro cutaway
          Sub-beat 2 (28-89): Parabolic coin arc & credit SMS
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s42.start_frame} durationInFrames={s42.duration_frames}>
        {(() => {
          const localFrame = frame - s42.start_frame;

          // Sub-beat 1: Real-world cutaway of ₹500 Note Macro
          if (localFrame < 28) {
            return (
              <RealWorldCutaway
                imageSrc="broll/inr_500_note_macro.jpg"
                captionTag="MONEY IN MOTION · ₹500"
                captionTitle="SAMNE WALE KA BANK..."
                scaleRange={[1.0, 1.05]}
              />
            );
          }

          // Sub-beat 2: Local frames 28 to 89
          const subFrame = localFrame - 28;
          const smsSlide = spring({
            frame: subFrame - 6,
            fps,
            config: { damping: 12, stiffness: 220 },
          });

          // Parabolic coin flight across divider
          const coinProg = interpolate(subFrame, [4, 40], [0, 1], {
            extrapolateRight: "clamp",
          });
          const coinX = interpolate(coinProg, [0, 1], [300, 780]);
          const coinY = interpolate(coinProg, [0, 0.5, 1], [900, 680, 920]);

          // Receiver balance counts up ₹2,000 -> ₹2,500
          const recBalance = Math.round(
            interpolate(subFrame, [20, 50], [2000, 2500], {
              extrapolateRight: "clamp",
            })
          );

          return (
            <AbsoluteFill>
              {/* Realistic Bank Credit SMS Banner */}
              <BankSmsBanner
                type="credit"
                bankName="SBI-IN"
                amount={500}
                account="XX9876"
                balance={recBalance}
                slideProgress={smsSlide}
              />

              {/* Right Panel: Receiver's Bank Card */}
              <div
                style={{
                  position: "absolute",
                  right: 40,
                  top: "38%",
                  width: 460,
                  backgroundColor: UPI_THEME.colors.offWhite,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neoLg,
                  borderRadius: 28,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: UPI_THEME.colors.green,
                    color: "#FFF",
                    border: "2px solid #111",
                    borderRadius: 10,
                    padding: "4px 16px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 20,
                    fontWeight: 900,
                    marginBottom: 12,
                  }}
                >
                  RECEIVER BANK
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 68,
                    fontWeight: 900,
                    color: UPI_THEME.colors.ink,
                  }}
                >
                  ₹{recBalance.toLocaleString("en-IN")}
                </div>

                <div
                  style={{
                    marginTop: 16,
                    backgroundColor: UPI_THEME.colors.greenLight,
                    border: UPI_THEME.borders.neo,
                    borderRadius: 14,
                    padding: "8px 24px",
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 26,
                    fontWeight: 900,
                    color: UPI_THEME.colors.green,
                  }}
                >
                  +₹500 CREDITED
                </div>
              </div>

              {/* Parabolic Neo ₹ Coin */}
              <div
                style={{
                  position: "absolute",
                  left: coinX - 40,
                  top: coinY - 40,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: UPI_THEME.colors.yellowHighlight,
                  border: UPI_THEME.borders.neoThick,
                  boxShadow: UPI_THEME.shadows.neo,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 44,
                  fontWeight: 900,
                  color: UPI_THEME.colors.ink,
                  zIndex: 40,
                }}
              >
                ₹
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
                    { text: "PAISE", highlight: false },
                    { text: "JAMA", highlight: false },
                    {
                      text: "+₹500",
                      highlight: true,
                      highlightColor: UPI_THEME.colors.greenLight,
                      color: UPI_THEME.colors.green,
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
          SHOT 4.3: Confirmation Pulses Converging to NPCI Node (Frames 1132 - 1237)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s43.start_frame} durationInFrames={s43.duration_frames}>
        {(() => {
          const localFrame = frame - s43.start_frame;

          const pulseProg = interpolate(localFrame, [6, 42], [0, 1], {
            extrapolateRight: "clamp",
          });
          const pulseLeftX = interpolate(pulseProg, [0, 1], [-260, 0]);
          const pulseRightX = interpolate(pulseProg, [0, 1], [260, 0]);

          const centerNodeScale = spring({
            frame: localFrame - 38,
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
              {/* Converging Pulse Elements */}
              <div
                style={{
                  position: "relative",
                  width: 600,
                  height: 240,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {localFrame < 42 && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        transform: `translateX(${pulseLeftX}px)`,
                        width: 58,
                        height: 58,
                        borderRadius: 18,
                        backgroundColor: UPI_THEME.colors.offWhite,
                        border: UPI_THEME.borders.neo,
                        boxShadow: UPI_THEME.shadows.neoSm,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        fontWeight: 900,
                        color: UPI_THEME.colors.green,
                      }}
                    >
                      ✓
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        transform: `translateX(${pulseRightX}px)`,
                        width: 58,
                        height: 58,
                        borderRadius: 18,
                        backgroundColor: UPI_THEME.colors.offWhite,
                        border: UPI_THEME.borders.neo,
                        boxShadow: UPI_THEME.shadows.neoSm,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        fontWeight: 900,
                        color: UPI_THEME.colors.green,
                      }}
                    >
                      ✓
                    </div>
                  </>
                )}

                {/* Central Verified NPCI Node */}
                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    backgroundColor: UPI_THEME.colors.offWhite,
                    border: UPI_THEME.borders.neoThick,
                    boxShadow: UPI_THEME.shadows.neoLg,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${interpolate(centerNodeScale, [0, 1], [0.6, 1.0])})`,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      backgroundColor: UPI_THEME.colors.greenLight,
                      border: UPI_THEME.borders.neo,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                      fontWeight: 900,
                      color: UPI_THEME.colors.green,
                      marginBottom: 8,
                    }}
                  >
                    ✓
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 32,
                      fontWeight: 900,
                      color: UPI_THEME.colors.ink,
                      letterSpacing: "0.04em",
                    }}
                  >
                    CONFIRMED
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
                    { text: "DONO", highlight: false },
                    { text: "BANKS", highlight: false },
                    { text: ">", highlight: false, color: UPI_THEME.colors.orange },
                    {
                      text: "CONFIRM",
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
