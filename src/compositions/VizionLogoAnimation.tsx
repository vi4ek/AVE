import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { VizionPrismMark } from "../components/VizionPrismMark";

export interface VizionLogoProps {
  theme?: "dark" | "light";
  aspectRatio?: "16:9" | "9:16" | "1:1";
  subtitle?: string;
  showSound?: boolean;
}

/**
 * VizionLogoAnimation - Version 1: Cinematic Stinger & Entrance Bumper
 *
 * Dark Luxury & Prismatic Glass (Tendril / Apple Pro / Sony):
 * - Interlocking Multi-Faceted Crystal "V" Monogram
 * - Refractive Glass Facets with Precision Chamfers & Amber Core
 * - 4-Act Motion Narrative: Emergence -> 3D Tilt Lock -> Caustic Glint -> Watermark Resolve
 * - Precision Editorial Typography (Syne / Montserrat) with Frosted Obsidian Pill
 */
export const VizionLogoAnimation: React.FC<VizionLogoProps> = ({
  theme = "dark",
  aspectRatio = "16:9",
  subtitle = "PROGRAMMATIC MOTION & VIDEO SYSTEMS",
  showSound = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isLight = theme === "light";
  const isVertical = aspectRatio === "9:16";
  const isSquare = aspectRatio === "1:1";

  // --- 1. CHOREOGRAPHY TIMELINE (Frames 0 - 300 @ 60 FPS = 5.0s) ---
  // Act 1: The Emergence (Frames 0 - 70)
  // Act 2: 3D Perspective Lock (Frames 70 - 150)
  // Act 3: Typographic Cascade (Frames 115 - 220)
  // Act 4: Outro Settle & Stinger Watermark (Frames 240 - 300)

  // Overall Master Opacity
  const masterFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Outro resolve dissolve into resting sting
  const outroFade = interpolate(frame, [270, 300], [1, 0.96], {
    extrapolateLeft: "clamp",
  });

  // Monogram Spring Entrance (Act 1: Frames 0 - 75)
  const markSpring = spring({
    frame,
    fps,
    config: { damping: 20, mass: 0.9, stiffness: 100 },
  });

  const markScale = interpolate(markSpring, [0, 1], [0.35, 1.0]);
  const markRotX = interpolate(frame, [0, 75, 180, 300], [24, -3, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markRotY = interpolate(frame, [0, 75, 180, 300], [-36, 4, -2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markRotZ = interpolate(frame, [0, 75, 300], [8, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Core Diamond Ignition (Act 1 -> 2)
  const coreScale = interpolate(frame, [25, 75], [0.2, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caustic Light Angle (Continuous rotation)
  const causticAngle = (frame / fps) * 1.5;

  // Specular Glint Sweep (Act 2: Hits at Frame 85 - 145)
  const glintPhase = interpolate(frame, [85, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Anamorphic Flare Streak on Glint Impact (Frames 95 - 135)
  const flareOpacity = interpolate(frame, [95, 112, 135], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flareX = interpolate(frame, [95, 135], [-120, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typography Spring Entrance (Act 3: Starts at Frame 115)
  const textSpring = spring({
    frame: frame - 115,
    fps,
    config: { damping: 26, mass: 0.9, stiffness: 120 },
  });

  const textOpacity = interpolate(frame, [115, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textSpring, [0, 1], [32, 0]);
  const textTracking = interpolate(frame, [115, 190], [0.42, 0.24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle Delayed Entrance (Starts at Frame 150)
  const subtitleOpacity = interpolate(frame, [150, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [150, 185], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sizing by aspect ratio
  const prismSize = isVertical ? 360 : isSquare ? 330 : 280;
  const logoFontSize = isVertical ? 68 : isSquare ? 62 : 54;
  const layoutGap = isVertical ? 24 : 18;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isLight ? "#F8F9FA" : "#050608",
        opacity: masterFade * outroFade,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Syne', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* 1. LAYER 3: DEEP OBSIDIAN PRISMATIC ATMOSPHERE */}
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
          top: "42%",
          left: "50%",
          width: "900px",
          height: "450px",
          transform: "translate(-50%, -50%)",
          background: isLight
            ? "radial-gradient(ellipse, rgba(0, 113, 227, 0.08) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(0, 240, 255, 0.12) 0%, rgba(129, 140, 248, 0.08) 35%, rgba(245, 158, 11, 0.05) 60%, transparent 80%)",
          filter: "blur(75px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Micro Film Grain Mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: isLight ? 0.2 : 0.45,
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* 2. LAYER 1 & 2: HERO STACK (Prismatic Monogram + Typography) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: layoutGap,
        }}
      >
        {/* Monogram Wrapper with Scale & Tilt */}
        <div
          style={{
            position: "relative",
            transform: `scale(${markScale})`,
            transformOrigin: "center center",
          }}
        >
          <VizionPrismMark
            size={prismSize}
            rotX={markRotX}
            rotY={markRotY}
            rotZ={markRotZ}
            causticAngle={causticAngle}
            glintPhase={glintPhase}
            coreScale={coreScale}
            theme={theme}
          />

          {/* Anamorphic Horizontal Specular Flare on Crystal Lock */}
          {flareOpacity > 0.01 && (
            <div
              style={{
                position: "absolute",
                top: "52%",
                left: `calc(50% + ${flareX}px)`,
                transform: "translate(-50%, -50%)",
                width: 320,
                height: 4,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.9) 30%, #FFFFFF 50%, rgba(245, 158, 11, 0.9) 70%, transparent 100%)",
                filter: "drop-shadow(0 0 12px #00F0FF) drop-shadow(0 0 24px #FFFFFF)",
                opacity: flareOpacity,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Brand Typographic Lockup */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          {/* Primary Wordmark + Frosted .STD Pill */}
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
                letterSpacing: `${textTracking}em`,
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
                  boxShadow: "0 0 10px #F59E0B, 0 0 20px #F59E0B",
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

          {/* Precision Tagline with Optical Separation Rules */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
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

      {/* 3. SYNCHRONIZED SOUND DESIGN */}
      {showSound && (
        <>
          <Audio
            src={staticFile("sfx/sub_hit.wav")}
            startFrom={0}
            volume={interpolate(frame, [0, 5, 60], [0, 0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <Audio
            src={staticFile("sfx/whoosh.wav")}
            startFrom={0}
            volume={interpolate(frame, [85, 105, 140], [0, 0.55, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
