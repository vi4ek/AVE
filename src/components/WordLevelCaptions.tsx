import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export interface WordData {
  word: string;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
}

export interface PhraseData {
  id: number;
  text: string;
  startFrame: number;
  endFrame: number;
  words: WordData[];
}

export interface CaptionFile {
  phrases: PhraseData[];
  words: WordData[];
}

interface WordLevelCaptionsProps {
  captions: CaptionFile;
  activeColor?: string;
  inactiveColor?: string;
  punchColor?: string;
  bottomOffset?: number;
  fontFamily?: string;
  fontSize?: number;
  noBox?: boolean;
  uppercase?: boolean;
}

export const WordLevelCaptions: React.FC<WordLevelCaptionsProps> = ({
  captions,
  activeColor = "#FDE68A", // Master Matte Warm Gold (Validated winning caption style)
  inactiveColor = "rgba(255, 255, 255, 0.75)",
  punchColor = "#F87171", // Coral Red punch accent
  bottomOffset = 250,
  fontFamily = "'Poppins', sans-serif", // Master Font Standard
  fontSize = 46,
  noBox = true,
  uppercase = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find active phrase
  const activePhrase = captions.phrases.find(
    (p) => frame >= p.startFrame && frame <= p.endFrame
  );

  if (!activePhrase) return null;

  // Subtle clean fade-up for each phrase (editorial, not cartoonish)
  const enterSpring = spring({
    frame: frame - activePhrase.startFrame,
    fps,
    config: { damping: 16, mass: 0.5, stiffness: 200 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [12, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 90,
        pointerEvents: "none",
        padding: "0 60px",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          background: noBox ? "transparent" : "rgba(13, 15, 24, 0.85)",
          backdropFilter: noBox ? "none" : "blur(20px)",
          border: noBox ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: noBox ? 0 : 24,
          padding: noBox ? 0 : "16px 36px",
          boxShadow: "none",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 14px",
          maxWidth: 940,
        }}
      >
        {activePhrase.words.map((w, idx) => {
          const isWordActive = frame >= w.startFrame && frame <= w.endFrame;
          const isWordPassed = frame > w.endFrame;
          const cleanWord = w.word.replace(/[.,:;!?]/g, "").toUpperCase();
          const isPunch = [
            "CLINIC", "HAIR", "PATIENCE", "MISTAKE", "STOP",
            "SECRET", "SCALP", "ZERO", "CRITICAL", "LOSS",
            "FISTFUL", "BIOTIN", "NEVER", "ONLY"
          ].includes(cleanWord);

          const wordSpring = spring({
            frame: frame - w.startFrame,
            fps,
            config: { damping: 14, mass: 0.45, stiffness: 240 },
          });

          const wordScale = isWordActive
            ? interpolate(wordSpring, [0, 1], [1, isPunch ? 1.15 : 1.08])
            : 1;

          const wordColor = isWordActive
            ? (isPunch ? punchColor : activeColor)
            : isWordPassed
            ? "#FFFFFF"
            : inactiveColor;

          return (
            <span
              key={idx}
              style={{
                fontFamily,
                fontSize: isPunch ? fontSize * 1.06 : fontSize,
                fontWeight: isWordActive || isPunch ? 900 : 700,
                color: wordColor,
                transform: `scale(${wordScale})`,
                transition: "color 0.08s ease, transform 0.08s ease",
                // Crisp multi-layered cinematic drop shadow (zero neon glow, 100% readable on any background)
                textShadow:
                  "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.95), 0 8px 30px rgba(0, 0, 0, 0.85)",
                display: "inline-block",
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
                textTransform: uppercase ? "uppercase" : "none",
              }}
            >
              {w.word}
            </span>
          );
        })}

      </div>
    </div>
  );
};
