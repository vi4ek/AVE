import React from "react";
import { ClientNiche, NICHE_PROFILES } from "../presets/niches";

export interface CinematicFinishingLayerProps {
  niche?: ClientNiche;
  showLetterbox?: boolean;
}

export const CinematicFinishingLayer: React.FC<CinematicFinishingLayerProps> = ({
  niche = "tech",
  showLetterbox = false,
}) => {
  const profile = NICHE_PROFILES[niche];
  const { grainOpacity, vignetteIntensity } = profile.cinematic;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99,
        overflow: "hidden",
      }}
    >
      {/* 1. Procedural 35mm Organic Film Grain Overlay */}
      {grainOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: grainOpacity,
            mixBlendMode: "overlay",
          }}
        >
          <filter id="cinematicGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematicGrain)" />
        </svg>
      )}

      {/* 2. Soft Radial Vignette (Draws Viewer Eyes to Center Face) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0, 0, 0, ${vignetteIntensity}) 100%)`,
        }}
      />

      {/* 3. Optional Cinematic 2.39:1 Letterbox Bars */}
      {showLetterbox && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "#000000",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "#000000",
            }}
          />
        </>
      )}
    </div>
  );
};
