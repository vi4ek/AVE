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

export const Scene1Hook: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s11, s12, s13, s14] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* Background ambient grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.1: Phone Screen & Button Tap (Frames 0 - 52)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={0} durationInFrames={s11.duration_frames}>
        {(() => {
          // Push-in 100% -> 108%
          const camScale = interpolate(frame, [0, s11.duration_frames], [1.0, 1.08]);

          // Tap triggers at frame 16
          const tapFrame = Math.max(0, frame - 16);
          const tapSpring = spring({
            frame: tapFrame,
            fps,
            config: { damping: 12, stiffness: 260 },
          });

          const buttonScale =
            frame < 16
              ? 1.0
              : interpolate(tapSpring, [0, 0.5, 1], [1.0, 0.92, 1.0]);

          const rippleScale = interpolate(tapFrame, [0, 24], [0.8, 2.4], {
            extrapolateRight: "clamp",
          });
          const rippleOpacity = interpolate(tapFrame, [0, 24], [0.7, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${camScale})`,
              }}
            >
              {/* Phone Mockup Frame (SVG/CSS) */}
              <div
                style={{
                  width: 520,
                  height: 980,
                  borderRadius: 48,
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `4px solid ${UPI_THEME.colors.surfaceBorder}`,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "48px 36px",
                  overflow: "hidden",
                }}
              >
                {/* Status Bar */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    color: UPI_THEME.colors.textMuted,
                    fontSize: 20,
                    fontFamily: UPI_THEME.fonts.body,
                    marginBottom: 40,
                  }}
                >
                  <span>9:41</span>
                  <span>UPI 5G</span>
                </div>

                {/* Receiver Info */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: UPI_THEME.colors.bgCard,
                    border: `2px solid ${UPI_THEME.colors.surfaceBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: UPI_THEME.colors.orange,
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: UPI_THEME.fonts.headline,
                    marginBottom: 16,
                  }}
                >
                  K
                </div>

                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 24,
                    color: UPI_THEME.colors.textPrimary,
                    fontWeight: 600,
                  }}
                >
                  Kirana Store
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 16,
                    color: UPI_THEME.colors.textMuted,
                    marginTop: 4,
                  }}
                >
                  paying via UPI
                </div>

                {/* Amount display */}
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 84,
                    fontWeight: 800,
                    color: UPI_THEME.colors.textPrimary,
                    margin: "60px 0 80px",
                    letterSpacing: -1,
                  }}
                >
                  ₹500
                </div>

                {/* Tap Button with Ripple */}
                <div style={{ position: "relative", width: "100%", marginTop: "auto" }}>
                  {frame >= 16 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: -10,
                        borderRadius: 36,
                        border: `2px solid ${UPI_THEME.colors.orange}`,
                        transform: `scale(${rippleScale})`,
                        opacity: rippleOpacity,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  <div
                    style={{
                      width: "100%",
                      height: 76,
                      borderRadius: 24,
                      backgroundColor: UPI_THEME.colors.orange,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 32,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      transform: `scale(${buttonScale})`,
                      boxShadow: `0 12px 30px ${UPI_THEME.colors.orangeGlow}`,
                    }}
                  >
                    PAY ₹500
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.2: Money Flies Off & "₹500 > GONE" Slam (Frames 52 - 110)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s12.start_frame} durationInFrames={s12.duration_frames}>
        {(() => {
          const localFrame = frame - s12.start_frame;

          // Camera push continues + subtle shake on slam
          const shake =
            localFrame > 20 && localFrame < 32
              ? Math.sin(localFrame * 4) * 4
              : 0;

          // Floating ₹ particles
          const flyProgress = interpolate(localFrame, [0, 40], [0, -320], {
            extrapolateRight: "clamp",
          });
          const flyOpacity = interpolate(localFrame, [0, 35], [1, 0], {
            extrapolateRight: "clamp",
          });

          // Text Slam Springs
          const s1 = spring({ frame: localFrame - 15, fps, config: { damping: 10, stiffness: 280 } });
          const s2 = spring({ frame: localFrame - 22, fps, config: { damping: 10, stiffness: 280 } });
          const s3 = spring({ frame: localFrame - 29, fps, config: { damping: 10, stiffness: 280 } });

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
              {/* Flying currency value */}
              <div
                style={{
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 120,
                  fontWeight: 900,
                  color: UPI_THEME.colors.orange,
                  transform: `translateY(${flyProgress}px) scale(${1 - flyProgress * -0.001})`,
                  opacity: flyOpacity,
                  letterSpacing: -1,
                }}
              >
                ₹500
              </div>

              {/* Kinetic On-Screen Text: "₹500 > GONE" */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 60,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 72,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    transform: `scale(${interpolate(s1, [0, 1], [2.2, 1.0])})`,
                    opacity: s1,
                  }}
                >
                  ₹500
                </span>
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 64,
                    fontWeight: 800,
                    color: UPI_THEME.colors.orange,
                    transform: `scale(${interpolate(s2, [0, 1], [2.2, 1.0])})`,
                    opacity: s2,
                  }}
                >
                  &gt;
                </span>
                <span
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 76,
                    fontWeight: 900,
                    color: UPI_THEME.colors.orange,
                    transform: `scale(${interpolate(s3, [0, 1], [2.5, 1.0])})`,
                    opacity: s3,
                    letterSpacing: 2,
                  }}
                >
                  GONE
                </span>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 1.3: Smash Cut to Black · 2 SECONDS Countdown Ring (Frames 110 - 159)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s13.start_frame} durationInFrames={s13.duration_frames}>
        {(() => {
          const localFrame = frame - s13.start_frame;

          // Ring draws 360 degrees
          const ringProgress = interpolate(
            localFrame,
            [0, s13.duration_frames],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const circumference = 2 * Math.PI * 180;
          const strokeDashoffset = circumference * (1 - ringProgress);

          // Numeral "2" scale pop
          const popSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 11, stiffness: 220 },
          });

          return (
            <AbsoluteFill
              style={{
                backgroundColor: "#050608",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "relative", width: 440, height: 440 }}>
                {/* SVG Countdown Ring */}
                <svg width="440" height="440" style={{ transform: "rotate(-90deg)" }}>
                  <circle
                    cx="220"
                    cy="220"
                    r="180"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="220"
                    cy="220"
                    r="180"
                    stroke={UPI_THEME.colors.orange}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Big Numeral inside ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${interpolate(popSpring, [0, 1], [0.6, 1.0])})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 160,
                      fontWeight: 900,
                      color: UPI_THEME.colors.textPrimary,
                      lineHeight: 0.9,
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 34,
                      fontWeight: 700,
                      color: UPI_THEME.colors.orange,
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

          // Camera zooms through ring (100% -> 320%)
          const zoomThrough = interpolate(
            localFrame,
            [0, s14.duration_frames - 10],
            [1.0, 3.2],
            { extrapolateRight: "clamp" }
          );
          const ringFade = interpolate(localFrame, [15, 35], [1, 0], {
            extrapolateRight: "clamp",
          });

          // Question mark spring
          const textSpring = spring({
            frame: localFrame - 10,
            fps,
            config: { damping: 14, stiffness: 220 },
          });

          return (
            <AbsoluteFill
              style={{
                backgroundColor: UPI_THEME.colors.bg,
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
                  border: `8px solid ${UPI_THEME.colors.orange}`,
                  transform: `scale(${zoomThrough})`,
                  opacity: ringFade,
                }}
              />

              {/* Orbiting question marks */}
              {[0, 1, 2].map((i) => {
                const angle = (localFrame * 5 + i * 120) * (Math.PI / 180);
                const rx = Math.cos(angle) * 220;
                const ry = Math.sin(angle) * 120;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      transform: `translate(${rx}px, ${ry}px)`,
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 60,
                      fontWeight: 800,
                      color: UPI_THEME.colors.orange,
                      opacity: 0.85,
                    }}
                  >
                    ?
                  </div>
                );
              })}

              {/* Headline Text */}
              <div
                style={{
                  position: "absolute",
                  bottom: UPI_THEME.safeZone.bottom + 40,
                  maxWidth: 880,
                  textAlign: "center",
                  padding: "0 40px",
                  transform: `scale(${interpolate(textSpring, [0, 1], [0.85, 1.0])})`,
                  opacity: textSpring,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 68,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    letterSpacing: -0.5,
                    lineHeight: 1.1,
                  }}
                >
                  Asal mein kya <span style={{ color: UPI_THEME.colors.orange }}>hota hai?</span>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
