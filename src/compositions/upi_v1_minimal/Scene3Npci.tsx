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

export const Scene3Npci: React.FC<SceneProps> = ({ shots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s31, s32, s33, s34] = shots;

  return (
    <AbsoluteFill style={{ backgroundColor: UPI_THEME.colors.bg, overflow: "hidden" }}>
      {/* Abstract Dot-Grid Map Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.1: Packet flies into central NPCI hub (Frames 551 - 648)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s31.start_frame} durationInFrames={s31.duration_frames}>
        {(() => {
          const localFrame = frame - s31.start_frame;

          // Packet flies from left to center
          const packetX = interpolate(
            localFrame,
            [0, 36],
            [-380, 0],
            { extrapolateRight: "clamp" }
          );

          // Hub pulse on arrival
          const pulseSpring = spring({
            frame: localFrame - 32,
            fps,
            config: { damping: 10, stiffness: 220 },
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
              {/* Traveling Packet (before arrival) */}
              {localFrame < 38 && (
                <div
                  style={{
                    position: "absolute",
                    transform: `translateX(${packetX}px)`,
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: UPI_THEME.colors.orange,
                    boxShadow: `0 0 30px ${UPI_THEME.colors.orange}`,
                  }}
                />
              )}

              {/* Central NPCI Hub */}
              <div
                style={{
                  position: "relative",
                  width: 260,
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${interpolate(pulseSpring, [0, 1], [0.85, 1.05])})`,
                }}
              >
                {/* Outer Pulse Ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -15,
                    borderRadius: "50%",
                    border: `2px dashed ${UPI_THEME.colors.orange}`,
                    opacity: interpolate(localFrame, [32, 60], [0.8, 0.2]),
                    transform: `rotate(${localFrame * 1.5}deg)`,
                  }}
                />

                {/* Hub Node Circle */}
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    backgroundColor: UPI_THEME.colors.bgElevated,
                    border: `4px solid ${UPI_THEME.colors.orange}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 60px ${UPI_THEME.colors.orangeGlow}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 48,
                      fontWeight: 900,
                      color: UPI_THEME.colors.textPrimary,
                      letterSpacing: 2,
                    }}
                  >
                    NPCI
                  </div>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.body,
                      fontSize: 16,
                      color: UPI_THEME.colors.orange,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    CENTRAL SWITCH
                  </div>
                </div>
              </div>

              {/* On-screen text: "NPCI = UPI ka central switch" */}
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
                    fontSize: 64,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    lineHeight: 1.15,
                  }}
                >
                  NPCI = UPI ka <span style={{ color: UPI_THEME.colors.orange }}>central switch</span>
                </div>
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
              {/* Central Sorter Box */}
              <div
                style={{
                  width: 320,
                  height: 180,
                  borderRadius: 32,
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `3px solid ${UPI_THEME.colors.orange}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.8)`,
                  position: "relative",
                  marginBottom: 60,
                }}
              >
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.headline,
                    fontSize: 32,
                    fontWeight: 800,
                    color: UPI_THEME.colors.orange,
                    letterSpacing: 2,
                  }}
                >
                  SORTING HUB
                </div>
                <div
                  style={{
                    fontFamily: UPI_THEME.fonts.body,
                    fontSize: 16,
                    color: UPI_THEME.colors.textMuted,
                    marginTop: 4,
                  }}
                >
                  routing routing...
                </div>
              </div>

              {/* Two Sorting Lanes with Envelopes */}
              <div style={{ display: "flex", gap: 140, position: "relative" }}>
                {/* Lane 1: Left */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 22,
                      color: UPI_THEME.colors.textSecondary,
                    }}
                  >
                    SENDER BANK
                  </div>
                  {[0, 1].map((idx) => {
                    const envY = interpolate((localFrame * 4 + idx * 40) % 120, [0, 120], [-60, 60]);
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 80,
                          height: 52,
                          borderRadius: 12,
                          backgroundColor: UPI_THEME.colors.bgCard,
                          border: `2px solid ${UPI_THEME.colors.surfaceBorder}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: UPI_THEME.colors.textPrimary,
                          fontSize: 24,
                          transform: `translateY(${envY}px)`,
                        }}
                      >
                        ✉
                      </div>
                    );
                  })}
                </div>

                {/* Lane 2: Right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                  <div
                    style={{
                      fontFamily: UPI_THEME.fonts.headline,
                      fontSize: 22,
                      color: UPI_THEME.colors.orange,
                    }}
                  >
                    RECEIVER BANK
                  </div>
                  {[0, 1].map((idx) => {
                    const envY = interpolate((localFrame * 4 + idx * 40 + 20) % 120, [0, 120], [-60, 60]);
                    return (
                      <div
                        key={idx}
                        style={{
                          width: 80,
                          height: 52,
                          borderRadius: 12,
                          backgroundColor: UPI_THEME.colors.bgCard,
                          border: `2px solid ${UPI_THEME.colors.orange}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: UPI_THEME.colors.orange,
                          fontSize: 24,
                          transform: `translateY(${envY}px)`,
                        }}
                      >
                        ✉
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* On-screen text: "SUPER-FAST POST OFFICE" */}
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
                    letterSpacing: 2,
                  }}
                >
                  SUPER-FAST <span style={{ color: UPI_THEME.colors.orange }}>POST OFFICE</span>
                </div>
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

          // Animated connector line draw
          const lineProg = interpolate(localFrame, [10, 35], [0, 100], {
            extrapolateRight: "clamp",
          });

          const bankSpring = spring({
            frame: localFrame - 25,
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
              {/* Central Hub Mini */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  backgroundColor: UPI_THEME.colors.bgElevated,
                  border: `3px solid ${UPI_THEME.colors.orange}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: UPI_THEME.fonts.headline,
                  fontSize: 28,
                  fontWeight: 800,
                  color: UPI_THEME.colors.textPrimary,
                  marginBottom: 60,
                  boxShadow: `0 0 40px ${UPI_THEME.colors.orangeGlow}`,
                }}
              >
                NPCI
              </div>

              {/* SVG Connecting Branch Lines */}
              <svg width="700" height="120" style={{ marginBottom: 40 }}>
                {/* Left Branch to Bank A */}
                <line
                  x1="350"
                  y1="10"
                  x2="150"
                  y2="100"
                  stroke={UPI_THEME.colors.surfaceBorder}
                  strokeWidth="4"
                  strokeDasharray="300"
                  strokeDashoffset={300 - 3 * lineProg}
                />
                {/* Right Branch to Bank B */}
                <line
                  x1="350"
                  y1="10"
                  x2="550"
                  y2="100"
                  stroke={UPI_THEME.colors.orange}
                  strokeWidth="4"
                  strokeDasharray="300"
                  strokeDashoffset={300 - 3 * lineProg}
                />
              </svg>

              {/* Two Bank Buildings */}
              <div
                style={{
                  display: "flex",
                  gap: 160,
                  transform: `scale(${interpolate(bankSpring, [0, 1], [0.8, 1.0])})`,
                }}
              >
                {/* Bank 1: Aapka Bank */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <GenericBankIcon label="AAPKA BANK" isSender={true} />
                </div>

                {/* Bank 2: Receiver Bank */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <GenericBankIcon label="RECEIVER BANK" isSender={false} />
                </div>
              </div>

              {/* On-screen text: "AAPKA BANK / RECEIVER KA BANK" */}
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
                    fontSize: 56,
                    fontWeight: 900,
                    color: UPI_THEME.colors.textPrimary,
                    letterSpacing: 1.5,
                  }}
                >
                  AAPKA BANK <span style={{ color: UPI_THEME.colors.orange }}>&bull;</span> RECEIVER BANK
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ────────────────────────────────────────────────────────────
          SHOT 3.4: Full Triangle Layout Locks (Frames 842 - 939)
         ──────────────────────────────────────────────────────────── */}
      <Sequence from={s34.start_frame} durationInFrames={s34.duration_frames}>
        {(() => {
          const localFrame = frame - s34.start_frame;

          // Pull back 110% > 95%
          const camScale = interpolate(
            localFrame,
            [0, s34.duration_frames],
            [1.08, 0.96],
            { extrapolateRight: "clamp" }
          );

          // Active glowing pulses traveling along triangle
          const pulseOffset = (localFrame * 6) % 360;

          return (
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${camScale})`,
              }}
            >
              {/* Full Network Triangle System */}
              <div style={{ position: "relative", width: 680, height: 540 }}>
                {/* SVG Triangle Connector with Glowing Dots */}
                <svg width="680" height="540" style={{ position: "absolute", inset: 0 }}>
                  {/* Triangle lines */}
                  <polygon
                    points="340,70 120,440 560,440"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="4"
                  />
                  {/* Glowing active path (Aapka -> NPCI -> Receiver) */}
                  <polyline
                    points="120,440 340,70 560,440"
                    fill="none"
                    stroke={UPI_THEME.colors.orange}
                    strokeWidth="4"
                    strokeDasharray="24 12"
                    strokeDashoffset={-pulseOffset}
                  />
                </svg>

                {/* Top Node: NPCI */}
                <div style={{ position: "absolute", top: 10, left: 270 }}>
                  <div
                    style={{
                      width: 140,
                      height: 120,
                      borderRadius: 24,
                      backgroundColor: UPI_THEME.colors.bgElevated,
                      border: `3px solid ${UPI_THEME.colors.orange}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 40px ${UPI_THEME.colors.orangeGlow}`,
                    }}
                  >
                    <span style={{ fontFamily: UPI_THEME.fonts.headline, fontSize: 32, fontWeight: 900, color: "#FFF" }}>
                      NPCI
                    </span>
                  </div>
                </div>

                {/* Bottom Left Node: Aapka Bank */}
                <div style={{ position: "absolute", bottom: 20, left: 30 }}>
                  <GenericBankIcon label="AAPKA BANK" isSender={true} compact />
                </div>

                {/* Bottom Right Node: Receiver Bank */}
                <div style={{ position: "absolute", bottom: 20, right: 30 }}>
                  <GenericBankIcon label="RECEIVER BANK" isSender={false} compact />
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};

// Generic Bank SVG Building Icon (Clean, no real logos)
const GenericBankIcon: React.FC<{ label: string; isSender: boolean; compact?: boolean }> = ({
  label,
  isSender,
  compact = false,
}) => {
  const size = compact ? 140 : 180;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 28,
          backgroundColor: UPI_THEME.colors.bgElevated,
          border: `3px solid ${isSender ? UPI_THEME.colors.surfaceBorder : UPI_THEME.colors.orange}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isSender ? "none" : `0 0 30px ${UPI_THEME.colors.orangeGlow}`,
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          {/* Bank Roof */}
          <path d="M2 9L12 3L22 9V10H2V9Z" fill={isSender ? UPI_THEME.colors.textSecondary : UPI_THEME.colors.orange} />
          {/* Columns */}
          <rect x="4" y="11" width="3" height="7" rx="1" fill={UPI_THEME.colors.textPrimary} />
          <rect x="10.5" y="11" width="3" height="7" rx="1" fill={UPI_THEME.colors.textPrimary} />
          <rect x="17" y="11" width="3" height="7" rx="1" fill={UPI_THEME.colors.textPrimary} />
          {/* Base */}
          <rect x="2" y="19" width="20" height="2" rx="1" fill={isSender ? UPI_THEME.colors.textSecondary : UPI_THEME.colors.orange} />
        </svg>
      </div>

      <div
        style={{
          fontFamily: UPI_THEME.fonts.headline,
          fontSize: compact ? 20 : 24,
          fontWeight: 800,
          color: isSender ? UPI_THEME.colors.textSecondary : UPI_THEME.colors.orange,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
};
