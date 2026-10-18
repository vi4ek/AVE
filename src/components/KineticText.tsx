import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface KineticTextProps {
  headline: string;
  subline?: string;
  tag?: string;
  accentWords?: string[];
  editorialWords?: string[];
  startFrame?: number;
  align?: "center" | "left" | "right";
  fontSize?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  headline,
  subline,
  tag,
  accentWords = [],
  editorialWords = [],
  startFrame = 0,
  align = "center",
  fontSize = 64,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tag Entrance Animation
  const tagSpring = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.snappy,
  });

  const words = headline.split(" ");

  // Subtitle Entrance Animation
  const sublineSpring = spring({
    frame: frame - startFrame - 14,
    fps,
    config: THEME.springs.smooth,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        textAlign: align,
        width: "100%",
        maxWidth: 1200,
        zIndex: 10,
      }}
    >
      {/* Category / Pill Badge */}
      {tag && (
        <div
          style={{
            opacity: tagSpring,
            transform: `translateY(${interpolate(tagSpring, [0, 1], [16, 0])}px) scale(${interpolate(
              tagSpring,
              [0, 1],
              [0.9, 1]
            )})`,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 9999,
            backgroundColor: "rgba(204, 120, 92, 0.12)",
            border: "1px solid rgba(204, 120, 92, 0.3)",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: THEME.colors.accentTerracotta,
              boxShadow: "0 0 8px #CC785C",
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: THEME.colors.accentTerracotta,
            }}
          >
            {tag}
          </span>
        </div>
      )}

      {/* Main Headline (Word-by-word Kinetic Spring) */}
      <h1
        style={{
          margin: 0,
          fontSize,
          lineHeight: 1.15,
          fontWeight: 700,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
          gap: "12px 18px",
          color: THEME.colors.textPrimary,
        }}
      >
        {words.map((word, i) => {
          // Stagger each word by 3 frames for cinematic rhythm
          const wordStart = startFrame + 6 + i * 3.5;
          const wordSpring = spring({
            frame: frame - wordStart,
            fps,
            config: THEME.springs.cinematic,
          });

          const translateY = interpolate(wordSpring, [0, 1], [32, 0]);
          const opacity = interpolate(wordSpring, [0, 0.8, 1], [0, 0.9, 1]);
          const blur = interpolate(wordSpring, [0, 1], [10, 0]);
          const letterSpacing = interpolate(wordSpring, [0, 1], [4, -0.5]);

          const cleanWord = word.replace(/[^\w]/g, "");
          const isAccent = accentWords.some((w) => cleanWord.toLowerCase().includes(w.toLowerCase()));
          const isEditorial = editorialWords.some((w) => cleanWord.toLowerCase().includes(w.toLowerCase()));

          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                opacity,
                transform: `translateY(${translateY}px)`,
                filter: `blur(${blur}px)`,
                letterSpacing: `${letterSpacing}px`,
                color: isAccent ? THEME.colors.accentTerracotta : THEME.colors.textPrimary,
                fontFamily: isEditorial ? "'Newsreader', Georgia, serif" : "inherit",
                fontStyle: isEditorial ? "italic" : "normal",
                textShadow: isAccent
                  ? "0 0 40px rgba(204, 120, 92, 0.45)"
                  : "0 2px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {/* Subline */}
      {subline && (
        <p
          style={{
            margin: "24px 0 0 0",
            fontSize: Math.round(fontSize * 0.38),
            lineHeight: 1.5,
            fontWeight: 400,
            color: THEME.colors.textSecondary,
            maxWidth: 780,
            opacity: sublineSpring,
            transform: `translateY(${interpolate(sublineSpring, [0, 1], [20, 0])}px)`,
            filter: `blur(${interpolate(sublineSpring, [0, 1], [6, 0])}px)`,
          }}
        >
          {subline}
        </p>
      )}
    </div>
  );
};
