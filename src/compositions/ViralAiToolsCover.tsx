import React from "react";
import { staticFile } from "remotion";

export interface ViralAiToolsCoverProps {
  isSquareFeed?: boolean;
}

export const ViralAiToolsCover: React.FC<ViralAiToolsCoverProps> = ({
  isSquareFeed = false,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: isSquareFeed ? 1080 : 1920,
        backgroundColor: "#F5F5F7",
        overflow: "hidden",
        fontFamily: "'Poppins', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* 1. Ambient Apple Lighting Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 113, 227, 0.09) 0%, rgba(224, 242, 254, 0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "-5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, rgba(254, 243, 199, 0.02) 60%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Apple Micro-Dot Matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.6,
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          pointerEvents: "none",
        }}
      />

      {/* 2. Top-Left Watermark */}
      <div
        style={{
          position: "absolute",
          top: isSquareFeed ? 40 : 64,
          left: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 16px 8px 10px",
          borderRadius: 100,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
          opacity: 0.7,
        }}
      >
        <img
          src={staticFile("inputs/channel_logo.jpg")}
          alt="Channel Logo"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        />
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#1D1D1F",
            letterSpacing: "0.04em",
          }}
        >
          @vizion.std
        </span>
      </div>

      {/* 3. Center Instagram Feed Safe Box (Ensures 100% visibility in 1:1 grid) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 960,
          zIndex: 10,
        }}
      >
        {/* Top Tag Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 24px",
            borderRadius: 100,
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#0071E3",
            }}
          />
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#1D1D1F",
              textTransform: "uppercase",
            }}
          >
            2026 AI PROTOCOL
          </span>
        </div>

        {/* Big Bold Curiosity Hook Headline */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: isSquareFeed ? 68 : 78,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            color: "#1D1D1F",
            margin: "0 0 32px 0",
            letterSpacing: "-0.03em",
          }}
        >
          STOP USING{" "}
          <span
            style={{
              color: "#0071E3",
              textDecoration: "underline",
              textDecorationThickness: "5px",
              textUnderlineOffset: "8px",
            }}
          >
            CHATGPT
          </span>{" "}
          FOR EVERYTHING.
        </h1>

        {/* Apple Frosted Hero Card */}
        <div
          style={{
            width: "100%",
            borderRadius: 32,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 32,
              fontWeight: 800,
              color: "#BF4800",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            3 FREE TOOLS THAT FEEL ILLEGAL
          </div>

          {/* 3 Tool Badges Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              width: "100%",
            }}
          >
            {/* Tool 1 */}
            <div
              style={{
                padding: "16px 12px",
                borderRadius: 18,
                backgroundColor: "#F5F5F7",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 26, marginBottom: 4 }}>🧠</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: "#1D1D1F" }}>
                DeepSeek R1
              </span>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#0071E3", fontWeight: 600, marginTop: 2 }}>
                Open o1 Logic
              </span>
            </div>

            {/* Tool 2 */}
            <div
              style={{
                padding: "16px 12px",
                borderRadius: 18,
                backgroundColor: "#F5F5F7",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 26, marginBottom: 4 }}>⚡</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: "#1D1D1F" }}>
                Bolt.new
              </span>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#D97706", fontWeight: 600, marginTop: 2 }}>
                Instant Full-Stack
              </span>
            </div>

            {/* Tool 3 */}
            <div
              style={{
                padding: "16px 12px",
                borderRadius: 18,
                backgroundColor: "#F5F5F7",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 26, marginBottom: 4 }}>🎙️</span>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: "#1D1D1F" }}>
                Whisper Web
              </span>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#7C3AED", fontWeight: 600, marginTop: 2 }}>
                100% Private
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Pill */}
        <div
          style={{
            marginTop: 36,
            padding: "14px 32px",
            borderRadius: 100,
            backgroundColor: "#0071E3",
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.08em",
            boxShadow: "0 10px 30px rgba(0, 113, 227, 0.3)",
          }}
        >
          SWIPE FOR DIRECT LINKS →
        </div>
      </div>
    </div>
  );
};
