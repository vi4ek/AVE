import React from "react";
import { interpolate } from "remotion";

export interface VizionPrismMarkProps {
  size?: number;
  rotX?: number; // degrees
  rotY?: number; // degrees
  rotZ?: number; // degrees
  causticAngle?: number; // radians (0 to 2π)
  glintPhase?: number; // 0 to 1
  coreScale?: number;
  theme?: "dark" | "light";
}

/**
 * VizionPrismMark - Elite Handcrafted Prismatic Glass Monogram
 *
 * Dark Luxury & Prismatic Glass (Tendril / Apple Pro / Sony):
 * - Majestic Aerodynamic Refractive "V" Monolith
 * - Dual-Faceted Crystalline Wings (Cyan Ice & Royal Iris)
 * - Suspended Optical Diamond Core with Pulsing Refraction
 * - Micro Titanium Chamfers with Specular Highlights
 */
export const VizionPrismMark: React.FC<VizionPrismMarkProps> = ({
  size = 380,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  causticAngle = 0,
  glintPhase = 0,
  coreScale = 1.0,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  // Dynamic light calculations based on caustic angle
  const lightX = Math.cos(causticAngle);
  const lightY = Math.sin(causticAngle);

  // Dynamic facet opacities reacting to orbital light
  const facetLeftSheen = 0.8 + lightX * 0.2;
  const facetRightSheen = 0.8 - lightX * 0.2;
  const coreSheen = 0.9 + lightY * 0.1;

  // Specular glint offset (-140 to 260)
  const glintOffset = interpolate(glintPhase, [0, 1], [-140, 260]);
  const glintOpacity = interpolate(
    glintPhase,
    [0, 0.15, 0.85, 1],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1400,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
          transition: "transform 0.05s ease-out",
        }}
      >
        {/* Soft Ambient Chromatic Glow under the Crystal */}
        <div
          style={{
            position: "absolute",
            inset: "10%",
            borderRadius: "50%",
            background: isLight
              ? "radial-gradient(circle, rgba(0, 113, 227, 0.18) 0%, rgba(245, 158, 11, 0.10) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(0, 240, 255, 0.26) 0%, rgba(129, 140, 248, 0.18) 35%, rgba(245, 158, 11, 0.12) 60%, transparent 80%)",
            filter: "blur(40px)",
            transform: `translateZ(-35px) scale(${1.0 + Math.sin(causticAngle) * 0.08})`,
            pointerEvents: "none",
          }}
        />

        {/* Master Precision SVG Monogram */}
        <svg
          viewBox="-180 -160 360 320"
          width={size}
          height={size}
          style={{
            overflow: "visible",
            filter: isLight
              ? "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.09))"
              : "drop-shadow(0 28px 56px rgba(0, 0, 0, 0.75)) drop-shadow(0 10px 30px rgba(0, 240, 255, 0.22))",
          }}
        >
          <defs>
            {/* 1. Gradient for Left Wing Top Facet (Cyan Ice Refraction) */}
            <linearGradient id="prismLeftTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.98" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.88" />
              <stop offset="85%" stopColor="#0284C7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="1" />
            </linearGradient>

            {/* 2. Gradient for Left Wing Outer Chamfer (Deep Obsidian Glass) */}
            <linearGradient id="prismLeftChamfer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#0F172A" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
            </linearGradient>

            {/* 3. Gradient for Right Wing Top Facet (Royal Iris / Amethyst Refraction) */}
            <linearGradient id="prismRightTop" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F3FF" stopOpacity="0.98" />
              <stop offset="40%" stopColor="#818CF8" stopOpacity="0.88" />
              <stop offset="85%" stopColor="#4F46E5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3730A3" stopOpacity="1" />
            </linearGradient>

            {/* 4. Gradient for Right Wing Outer Chamfer (Deep Indigo Glass) */}
            <linearGradient id="prismRightChamfer" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312E81" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#0F172A" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
            </linearGradient>

            {/* 5. Center Diamond Core (Golden Amber Refraction) */}
            <linearGradient id="prismCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="1" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#D97706" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#92400E" stopOpacity="1" />
            </linearGradient>

            {/* 6. Titanium Base Cradle */}
            <linearGradient id="titaniumCradle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="45%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* 7. Traveling Specular Glint Gradient */}
            <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* 8. Master Monogram Silhouette Clip Path (For Specular Glint Sweep) */}
            <clipPath id="monogramSilhouetteClip">
              <polygon points="-118,-115  -42,-124  -16,-20  0,110  -52,48  -118,-25" />
              <polygon points="118,-115  42,-124  16,-20  0,110  52,48  118,-25" />
              <polygon points="0,-82  34,-26  0,28  -34,-26" />
            </clipPath>
          </defs>

          {/* ========================================================= */}
          {/* GEOMETRIC FACET LAYERS (Sculpted Dynamic Monolith)        */}
          {/* ========================================================= */}

          {/* FACET A1: Left Wing Outer Chamfer (Deep Glass Shadow) */}
          <polygon
            points="-118,-115  -54,-122  -32,-26  0,110  -14,114  -52,48  -118,-25"
            fill="url(#prismLeftChamfer)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
          />

          {/* FACET A2: Left Wing Top Polished Glass Face */}
          <polygon
            points="-108,-110  -46,-118  -14,-20  0,100  -44,42  -108,-20"
            fill="url(#prismLeftTop)"
            opacity={facetLeftSheen}
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
          />

          {/* FACET B1: Right Wing Outer Chamfer (Deep Glass Shadow) */}
          <polygon
            points="118,-115  54,-122  32,-26  0,110  14,114  52,48  118,-25"
            fill="url(#prismRightChamfer)"
            stroke="rgba(129, 140, 248, 0.3)"
            strokeWidth="1"
          />

          {/* FACET B2: Right Wing Top Polished Glass Face */}
          <polygon
            points="108,-110  46,-118  14,-20  0,100  44,42  108,-20"
            fill="url(#prismRightTop)"
            opacity={facetRightSheen}
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
          />

          {/* FACET C: Sharp Titanium Apex Shoe (Bottom Cradle) */}
          <polygon
            points="-22,80  22,80  0,126"
            fill="url(#titaniumCradle)"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />

          {/* Internal Optical Transmission Ribbons */}
          <line
            x1="-108"
            y1="-110"
            x2="0"
            y2="100"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="0.8"
            strokeDasharray="5 3"
            opacity={0.45}
          />
          <line
            x1="108"
            y1="-110"
            x2="0"
            y2="100"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="0.8"
            strokeDasharray="5 3"
            opacity={0.45}
          />

          {/* ========================================================= */}
          {/* FACET D: SUSPENDED FLOATING DIAMOND OPTICAL CORE          */}
          {/* ========================================================= */}
          <g transform={`scale(${coreScale})`}>
            {/* Diamond Ambient Glow */}
            <circle
              cx="0"
              cy="-26"
              r="34"
              fill="rgba(245, 158, 11, 0.28)"
              filter="blur(10px)"
            />

            {/* Diamond Top Pyramid Facet */}
            <polygon
              points="0,-86  -30,-26  0,-14"
              fill="#FEF3C7"
              opacity={coreSheen}
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="0.9"
            />
            <polygon
              points="0,-86  30,-26  0,-14"
              fill="#F59E0B"
              opacity={coreSheen}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="0.9"
            />

            {/* Diamond Bottom Pyramid Facet */}
            <polygon
              points="0,30  -30,-26  0,-14"
              fill="#D97706"
              opacity={coreSheen}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.9"
            />
            <polygon
              points="0,30  30,-26  0,-14"
              fill="#B45309"
              opacity={coreSheen}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.9"
            />

            {/* Diamond Center Focal Star Highlight */}
            <circle
              cx="0"
              cy="-26"
              r="4"
              fill="#FFFFFF"
              filter="drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 16px #F59E0B)"
            />
          </g>

          {/* ========================================================= */}
          {/* SPECULAR CAUSTIC GLINT SWEEP (Strictly Silhouette Clipped) */}
          {/* ========================================================= */}
          {glintOpacity > 0.01 && (
            <g clipPath="url(#monogramSilhouetteClip)" opacity={glintOpacity}>
              <rect
                x={glintOffset - 70}
                y="-160"
                width="140"
                height="340"
                fill="url(#specularGlint)"
                transform="rotate(32 0 0)"
                style={{ mixBlendMode: "overlay" }}
              />
              <rect
                x={glintOffset - 18}
                y="-160"
                width="36"
                height="340"
                fill="#FFFFFF"
                opacity={0.85}
                transform="rotate(32 0 0)"
              />
            </g>
          )}

          {/* Razor Titanium Chamfer Edge Accents */}
          <polygon
            points="-118,-115  -108,-110  -46,-118  -54,-122"
            fill="rgba(255, 255, 255, 0.7)"
          />
          <polygon
            points="118,-115  108,-110  46,-118  54,-122"
            fill="rgba(255, 255, 255, 0.7)"
          />
        </svg>
      </div>
    </div>
  );
};
