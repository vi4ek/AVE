import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface InstagramReelCoverProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  metrics?: { label: string; value: string }[];
  showGridGuide?: boolean;
}

export const InstagramReelCover: React.FC<InstagramReelCoverProps> = ({
  title = "RUN LOCAL AI",
  subtitle = "100% PRIVATE // $0 PER MONTH",
  badge = "OLLAMA + DEEPSEEK CODER",
  metrics = [
    { label: "WI-FI", value: "OFFLINE" },
    { label: "RAM", value: "6.6 GB" },
    { label: "TOKEN/S", value: "38.4" },
  ],
  showGridGuide = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse for still poster or short animation loop
  const orbScale = interpolate(Math.sin((frame / 45) * Math.PI), [-1, 1], [0.96, 1.04]);

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        background: "radial-gradient(ellipse at 50% 30%, #1E2238 0%, #131522 60%, #0A0C14 100%)",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Background Specular Micro-Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
        }}
      />

      {/* Luminous Ambient Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: 900,
          height: 900,
          transform: `translate(-50%, -50%) scale(${orbScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(56, 189, 248, 0.16) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "-5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      {/* Optional Instagram 1:1 Profile Grid Guide (420px from top, 1080px tall) */}
      {showGridGuide && (
        <div
          style={{
            position: "absolute",
            top: 420,
            left: 0,
            width: 1080,
            height: 1080,
            border: "3px dashed rgba(239, 68, 68, 0.6)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 14,
              color: "#EF4444",
              fontSize: 20,
              fontWeight: 800,
              background: "rgba(0,0,0,0.8)",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            INSTAGRAM 1:1 PROFILE GRID SAFE ZONE (1080x1080)
          </div>
        </div>
      )}

      {/* Center 1:1 Content Container (420px to 1500px) */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Top Hook Pill Badge */}
        <div
          style={{
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            borderRadius: 100,
            padding: "10px 28px",
            color: "#38BDF8",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 28,
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.2)",
          }}
        >
          {badge}
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: -2,
            margin: "0 0 16px 0",
            textShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
          }}
        >
          {title}
        </h1>

        {/* Glowing Subtitle Hook */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#34D399",
            letterSpacing: 0.5,
            marginBottom: 44,
            textShadow: "0 0 30px rgba(52, 211, 153, 0.4)",
          }}
        >
          {subtitle}
        </div>

        {/* Frosted Tech HUD Card with Terminal Simulation */}
        <div
          style={{
            width: "100%",
            maxWidth: 820,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 24,
            padding: "24px 32px",
            boxShadow: "0 30px 70px rgba(0, 0, 0, 0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: 12,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 16, marginLeft: 12, fontFamily: "monospace" }}>
              bash — ollama run deepseek-coder
            </span>
          </div>

          {/* Metric Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 16,
            }}
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 14,
                  padding: "12px 20px",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
                  {m.label}
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 900, marginTop: 4 }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reel Safe Zone Bottom Branding (Shown on Stories/Reels view) */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        VIZION STUDIO // LOCAL AI WORKFLOWS
      </div>
    </div>
  );
};
