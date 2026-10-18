import React from "react";
import { AbsoluteFill } from "remotion";

export const PaperGrain: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 900,
        mixBlendMode: "multiply",
        opacity: 0.05,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>
    </AbsoluteFill>
  );
};
