import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface CodeLine {
  tokens: Array<{ text: string; color?: string; bold?: boolean }>;
  isHighlighted?: boolean;
}

interface CodeWalkthroughProps {
  filename?: string;
  lines: CodeLine[];
  startFrame?: number;
  width?: number | string;
  activeLineIndex?: number;
}

export const CodeWalkthrough: React.FC<CodeWalkthroughProps> = ({
  filename = "engine.ts",
  lines,
  startFrame = 0,
  width = 720,
  activeLineIndex = -1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowSpring = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.smooth,
  });

  const translateY = interpolate(windowSpring, [0, 1], [30, 0]);
  const opacity = interpolate(windowSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width,
        opacity,
        transform: `translateY(${translateY}px)`,
        backgroundColor: "#0E1017",
        borderRadius: 16,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(204, 120, 92, 0.12)",
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          backgroundColor: "#13151F",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Tab / Filename */}
        <div
          style={{
            fontSize: 13,
            color: THEME.colors.textSecondary,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: THEME.colors.accentTerracotta }}>●</span> {filename}
        </div>

        <div style={{ width: 40 }} />
      </div>

      {/* Code Area */}
      <div style={{ padding: "24px 20px", fontSize: 15, lineHeight: 1.7 }}>
        {lines.map((line, idx) => {
          const lineStart = startFrame + 10 + idx * 4;
          const lineSpring = spring({
            frame: frame - lineStart,
            fps,
            config: THEME.springs.snappy,
          });

          const isCurrentActive = activeLineIndex === idx;

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                opacity: lineSpring,
                transform: `translateX(${interpolate(lineSpring, [0, 1], [-12, 0])}px)`,
                backgroundColor: isCurrentActive ? "rgba(204, 120, 92, 0.12)" : "transparent",
                borderRadius: 6,
                padding: "2px 8px",
                position: "relative",
              }}
            >
              {/* Line Number */}
              <span
                style={{
                  width: 36,
                  color: "#4B5563",
                  fontSize: 13,
                  userSelect: "none",
                  textAlign: "right",
                  marginRight: 16,
                }}
              >
                {idx + 1}
              </span>

              {/* Tokens */}
              <div style={{ display: "flex", flexWrap: "wrap", whiteSpace: "pre" }}>
                {line.tokens.map((token, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      color: token.color || THEME.colors.textPrimary,
                      fontWeight: token.bold ? 600 : 400,
                    }}
                  >
                    {token.text}
                  </span>
                ))}
              </div>

              {/* Blinking Cursor on active line */}
              {isCurrentActive && (
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 18,
                    backgroundColor: THEME.colors.accentTerracotta,
                    marginLeft: 4,
                    opacity: Math.floor((frame / 15) % 2) ? 1 : 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
