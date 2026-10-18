import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { VizionPrismMark } from "../components/VizionPrismMark";

export interface VizionLogoLoopProps {
  theme?: "dark" | "light" | "transparent";
  aspectRatio?: "16:9" | "9:16" | "1:1";
  subtitle?: string;
}

/**
 * VizionLogoLoop - Version 2: Mathematically 100% Seamless Infinite Looping Logo
 *
 * Dark Luxury & Prismatic Glass (Tendril / Apple Pro / Sony):
 * - Continuous 3D Precession & Floating of the Prismatic Crystal Monolith
 * - 360° Rotating Caustic Specular Glint (Zero Drift, Periodic Cosine Window)
 * - Layered Floating: Monolith, Typography, and Background Layers
 * - Mathematical Sinusoidal Phase Harmonization (Frame 0 == Frame durationInFrames)
 */
export const VizionLogoLoop: React.FC<VizionLogoLoopProps> = ({
  theme = "dark",
  aspectRatio = "16:9",
  subtitle = "PROGRAMMATIC MOTION & VIDEO SYSTEMS",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Normalize frame progress strictly to [0, 1)
  const progress = (frame % durationInFrames) / durationInFrames;
  const loopAngle = progress * Math.PI * 2; // 0 to 2π radians

  const isLight = theme === "light";
  const isTransparent = theme === "transparent";
  const isVertical = aspectRatio === "9:16";
  const isSquare = aspectRatio === "1:1";

  // -------------------------------------------------------------
  // CONTINUOUS MATHEMATICAL LOOP OSCILLATORS (0 Drift)
  // -------------------------------------------------------------
  // 1. Monolith 3D Precession & Floating
  const markRotY = Math.sin(loopAngle) * 14; // ±14 deg smooth yaw
  const markRotX = Math.cos(loopAngle) * 7;  // ±7 deg smooth pitch
  const markRotZ = Math.sin(loopAngle * 2) * 2; // Subtle 2nd harmonic roll
  const markFloatY = Math.sin(loopAngle) * 10; // ±10px float

  // 2. Layer 2: Typography Float with 60 deg phase offset (π/3)
  const textFloatY = Math.sin(loopAngle + Math.PI / 3) * 4;

  // 3. Optical Diamond Core Pulse (2 beats per 4s cycle)
  const pulseHarmonic = Math.sin(loopAngle * 2);
  const coreScale = 1.0 + pulseHarmonic * 0.08;
  const amberGlowSpread = 12 + pulseHarmonic * 6;

  // 4. Rotating Caustic Light Angle
  const causticAngle = loopAngle;

  // 5. Specular Glint Sweep (Occurs smoothly once per 4s loop between progress 0.25 and 0.65)
  let glintPhase = 0;
  if (progress >= 0.25 && progress <= 0.65) {
    glintPhase = (progress - 0.25) / 0.40; // 0 to 1
  }

  // 6. Layer 3: Ambient Lighting Breathing
  const ambientScale = 1.0 + Math.sin(loopAngle) * 0.05;
  const ambientOpacity = isLight
    ? 0.75 + Math.sin(loopAngle) * 0.12
    : 0.85 + Math.sin(loopAngle) * 0.15;

  // Sizing by Aspect Ratio
  const prismSize = isVertical ? 400 : isSquare ? 360 : 320;
  const logoFontSize = isVertical ? 68 : isSquare ? 62 : 54;
  const layoutGap = isVertical ? 22 : 16;

  // Ambient floating stardust particles (Mathematically looping closed ellipses)
  const ambientParticles = [
    { xBase: 24, yBase: 30, radX: 18, radY: 10, speed: 1, size: 2.5, phase: 0 },
    { xBase: 76, yBase: 26, radX: 15, radY: 12, speed: 1, size: 2.0, phase: 0.25 },
    { xBase: 20, yBase: 72, radX: 20, radY: 8,  speed: 1, size: 3.0, phase: 0.5 },
    { xBase: 80, yBase: 74, radX: 14, radY: 14, speed: 1, size: 2.2, phase: 0.75 },
    { xBase: 50, yBase: 18, radX: 12, radY: 6,  speed: 2, size: 1.8, phase: 0.1 },
    { xBase: 50, yBase: 82, radX: 16, radY: 8,  speed: 2, size: 2.0, phase: 0.6 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isTransparent
          ? "transparent"
          : isLight
            ? "#F8F9FA"
            : "#050608",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Syne', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* 1. LAYER 3: AMBIENT LIFE & PRISMATIC CAUSTIC BACKDROP */}
      {!isTransparent && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isLight
                ? "radial-gradient(circle at 50% 45%, #FFFFFF 0%, #EEF2F6 60%, #E2E8F0 100%)"
                : "radial-gradient(circle at 50% 46%, #0D111A 0%, #07090E 45%, #050608 100%)",
            }}
          />

          {/* Breathing Prismatic Aura */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              width: "880px",
              height: "440px",
              transform: `translate(-50%, -50%) scale(${ambientScale})`,
              opacity: ambientOpacity,
              background: isLight
                ? "radial-gradient(ellipse, rgba(0, 113, 227, 0.08) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(0, 240, 255, 0.12) 0%, rgba(129, 140, 248, 0.08) 35%, rgba(245, 158, 11, 0.05) 60%, transparent 80%)",
              filter: "blur(75px)",
              pointerEvents: "none",
            }}
          />

          {/* Micro Geometric Matrix Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: isLight ? 0.2 : 0.45,
              maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
              pointerEvents: "none",
            }}
          />

          {/* Seamless Looping Stardust Particles */}
          {ambientParticles.map((pt, i) => {
            const pAngle = loopAngle * pt.speed + pt.phase * Math.PI * 2;
            const px = pt.xBase + (Math.cos(pAngle) * pt.radX) / 10;
            const py = pt.yBase + (Math.sin(pAngle) * pt.radY) / 10;
            const pAlpha = 0.35 + Math.sin(pAngle) * 0.25;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${px}%`,
                  top: `${py}%`,
                  width: pt.size,
                  height: pt.size,
                  borderRadius: "50%",
                  backgroundColor: i % 2 === 0 ? "#38BDF8" : "#F59E0B",
                  opacity: pAlpha,
                  filter: `blur(${pt.size > 2.5 ? 0.8 : 0}px)`,
                  pointerEvents: "none",
                }}
              />
            );
          })}
        </>
      )}

      {/* 2. LAYER 1 & 2: HERO STACK (Prismatic Monogram + Floating Typography) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: layoutGap,
          transform: `translateY(${markFloatY}px)`,
        }}
      >
        {/* Prismatic Crystal Monogram (Continuous 3D Orbit & Precession) */}
        <VizionPrismMark
          size={prismSize}
          rotX={markRotX}
          rotY={markRotY}
          rotZ={markRotZ}
          causticAngle={causticAngle}
          glintPhase={glintPhase}
          coreScale={coreScale}
          theme={theme === "light" ? "light" : "dark"}
        />

        {/* Phase-Shifted Kinetic Typography Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            transform: `translateY(${textFloatY}px)`,
          }}
        >
          {/* Primary Wordmark + Frosted Obsidian .STD Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: logoFontSize,
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                background: isLight
                  ? "linear-gradient(180deg, #0F172A 0%, #334155 100%)"
                  : "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 55%, #94A3B8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: isLight
                  ? "none"
                  : "drop-shadow(0 4px 18px rgba(255, 255, 255, 0.15))",
              }}
            >
              VIZION
            </h1>

            {/* Frosted Obsidian Studio Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: isLight
                  ? "rgba(15, 23, 42, 0.05)"
                  : "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(20px)",
                border: isLight
                  ? "1px solid rgba(15, 23, 42, 0.10)"
                  : "1px solid rgba(255, 255, 255, 0.14)",
                boxShadow: isLight
                  ? "0 4px 12px rgba(0, 0, 0, 0.04)"
                  : "0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  boxShadow: `0 0 ${amberGlowSpread}px #F59E0B, 0 0 ${amberGlowSpread * 2}px #F59E0B`,
                }}
              />
              <span
                style={{
                  fontSize: Math.round(logoFontSize * 0.32),
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: isLight ? "#1E293B" : "#F8FAFC",
                }}
              >
                .STD
              </span>
            </div>
          </div>

          {/* Precision Tagline with Optical Accent Rules */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: "linear-gradient(90deg, transparent, #38BDF8)",
              }}
            />
            <span
              style={{
                fontSize: Math.round(logoFontSize * 0.22),
                fontWeight: 600,
                letterSpacing: "0.32em",
                color: isLight ? "#64748B" : "#94A3B8",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </span>
            <div
              style={{
                width: 32,
                height: 1,
                background: "linear-gradient(90deg, #F59E0B, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
