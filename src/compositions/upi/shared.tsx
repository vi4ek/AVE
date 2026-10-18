import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { UPI_THEME } from "./tokens";

// ─────────────────────────────────────────────────────────────
// 1. PAPER GRAIN OVERLAY (Exact SVG Turbulent Noise from Style Mock)
// ─────────────────────────────────────────────────────────────
export const PaperGrainOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.09,
        mixBlendMode: "multiply",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────
// 2. SHOT TAG PILL (Completely removed per user instruction)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 3. KINETIC TEXT WITH MARKER WIPE (Matching Style Mock)
// ─────────────────────────────────────────────────────────────
interface WordConfig {
  text: string;
  highlight?: boolean;
  color?: string;
  highlightColor?: string;
}

interface KineticTextProps {
  words: WordConfig[];
  startFrameOffset?: number;
  textColor?: string;
  fontSize?: number;
  textAlign?: "center" | "left";
  style?: React.CSSProperties;
}

export const KineticHeadline: React.FC<KineticTextProps> = ({
  words,
  startFrameOffset = 0,
  textColor = UPI_THEME.colors.ink,
  fontSize = 72,
  textAlign = "center",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : "flex-start",
        alignItems: "center",
        gap: "14px 18px",
        fontFamily: UPI_THEME.fonts.headline,
        fontSize,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        maxWidth: 960,
        margin: "0 auto",
        ...style,
      }}
    >
      {words.map((w, i) => {
        const wordDelay = startFrameOffset + i * 4;
        const localFrame = Math.max(0, frame - wordDelay);
        const pop = spring({
          frame: localFrame,
          fps,
          config: { damping: 11, stiffness: 220, mass: 0.6 },
        });

        // Highlight marker wipe
        const markerWipe = interpolate(localFrame, [3, 14], [0, 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const wordColor = w.color || textColor;
        const markerBg = w.highlightColor || "#FFD43B";

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              transform: `scale(${pop})`,
              color: wordColor,
              padding: w.highlight ? "4px 10px" : "2px 0",
              zIndex: 1,
            }}
          >
            {w.highlight && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "12%",
                  height: "55%",
                  width: `${markerWipe}%`,
                  backgroundColor: markerBg,
                  borderRadius: 4,
                  zIndex: -1,
                  transformOrigin: "left center",
                }}
              />
            )}
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 4. REAL-WORLD CUTAWAY COMPONENT
// ─────────────────────────────────────────────────────────────
interface RealWorldCutawayProps {
  imageSrc: string;
  captionTitle?: string;
  dimOpacity?: number;
  scaleRange?: [number, number];
}

export const RealWorldCutaway: React.FC<RealWorldCutawayProps> = ({
  imageSrc,
  captionTitle,
  dimOpacity = 0.28,
  scaleRange = [1.0, 1.05],
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 90], scaleRange, {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    >
      <Img
        src={staticFile(imageSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
        }}
      />
      {/* Dim overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(17, 17, 17, ${dimOpacity})`,
        }}
      />


      {captionTitle && (
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 54,
            right: 54,
            backgroundColor: "#FFFFFF",
            border: "3px solid #111111",
            boxShadow: "6px 6px 0 #111111",
            borderRadius: 24,
            padding: "20px 32px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: UPI_THEME.fonts.headline,
              fontSize: 48,
              fontWeight: 900,
              color: "#111111",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            {captionTitle}
          </span>
        </div>
      )}
    </div>
  );
};
