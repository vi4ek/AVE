import React from "react";
import { staticFile } from "remotion";

export interface MetaAiCoverProps {
  isSquareFeed?: boolean;
}

/**
 * MetaAiCover - Dedicated Instagram Reel & Shorts Cover Photo (1080x1920)
 *
 * Rule Standard:
 * - MANDATORY: 3D or Blurred Cinematic Background (Never plain flat solid background)
 * - Safe Zone: 1080x1080 Center Square Protection (Y: 420px - 1500px)
 * - Typography: Bold 'Poppins', sans-serif (Weight: 900 display)
 * - Visuals: 3D perspective-tilted frosted card, Apple Cupertino matte chips
 * - Branding: @vizion.std
 */
export const MetaAiCover: React.FC<MetaAiCoverProps> = ({ isSquareFeed = false }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: isSquareFeed ? 1080 : 1920,
        backgroundColor: "#08090E",
        overflow: "hidden",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Import Poppins and Roboto */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@500;700&display=swap');
      `}</style>

      {/* ========================================================= */}
      {/* 1. CINEMATIC BLURRED BACKGROUND (VIBRANT BOKEH & 3D DEPTH) */}
      {/* ========================================================= */}
      {/* Hero Visual Full-Bleed Deep Blur */}
      <div
        style={{
          position: "absolute",
          inset: -80,
          backgroundImage: `url(${staticFile("inputs/puppy_hook.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          filter: "blur(50px) brightness(0.60) saturate(1.8)",
          transform: "scale(1.3)",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />

      {/* Luminous Specular 3D Lighting Refractions */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 113, 227, 0.35) 0%, rgba(56, 189, 248, 0.15) 45%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "5%",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.12) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Soft Vignette Overlay (Leaves Bokeh Vivid at Center & Corners) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(10, 11, 16, 0.2) 20%, rgba(10, 11, 16, 0.55) 75%, rgba(10, 11, 16, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Micro-Dot Matrix for Tactile Surface Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* ========================================================= */}
      {/* 2. TOP WATERMARK BRANDING: Cupertino Standard (@vizion.std) */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: isSquareFeed ? 40 : 64,
          left: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 18px 8px 12px",
          borderRadius: 100,
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
          zIndex: 50,
        }}
      >
        <img
          src={staticFile("inputs/channel_logo.jpg")}
          alt="Channel Logo"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#1D1D1F",
            letterSpacing: "-0.01em",
          }}
        >
          @vizion.std
        </span>
      </div>

      {/* ========================================================= */}
      {/* 3. HERO CONTENT CONTAINER (1080x1080 Center Safe Zone)    */}
      {/* ========================================================= */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
          perspective: 1200,
        }}
      >
        {/* Apple Pill Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 24px",
            borderRadius: 100,
            backgroundColor: "rgba(0, 113, 227, 0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 113, 227, 0.45)",
            boxShadow: "0 6px 20px rgba(0, 113, 227, 0.2)",
            marginBottom: 26,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#0071E3",
              boxShadow: "0 0 10px #0071E3",
            }}
          />
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#38BDF8",
              textTransform: "uppercase",
            }}
          >
            META 2026 AI ANNOUNCEMENT
          </span>
        </div>

        {/* Master Cover Headline (Bold Poppins 900) */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 74,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            color: "#FFFFFF",
            margin: "0 0 32px 0",
            letterSpacing: "-0.03em",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
          }}
        >
          META KA NAYA AI: <br />
          <span
            style={{
              background: "linear-gradient(135deg, #0071E3 0%, #38BDF8 60%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 16px rgba(0, 113, 227, 0.35))",
            }}
          >
            MUSE WONDER 🧠
          </span>
        </h1>

        {/* 3D PERSPECTIVE HERO CARD (TACTILE 3D DEPTH) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 380,
            borderRadius: 28,
            overflow: "hidden",
            transform: "perspective(1200px) rotateX(4deg) scale(1.02)",
            transformOrigin: "center bottom",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 35px 80px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 113, 227, 0.2)",
            marginBottom: 36,
          }}
        >
          <img
            src={staticFile("inputs/puppy_hook.jpg")}
            alt="Hero Visual"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.08) brightness(0.96)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 40%, rgba(8, 9, 14, 0.85) 100%)",
            }}
          />

          {/* Floating Hook Badge Over 3D Image */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 28,
              right: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 100,
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#1D1D1F",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
              }}
            >
              🐕 "Kutte Ko Ulta Tangoge..."
            </div>
            <div
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                backgroundColor: "#0071E3",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                boxShadow: "0 6px 20px rgba(0, 113, 227, 0.4)",
              }}
            >
              FULL BREAKDOWN
            </div>
          </div>
        </div>

        {/* 3 Apple Feature Pill Chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            width: "100%",
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(0, 113, 227, 0.4)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#38BDF8",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span>⚡</span> Long Tasks
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(217, 119, 6, 0.4)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#F59E0B",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span>🧠</span> Persistent Memory
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#34D399",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span>🛠️</span> Multi-Step Agents
          </div>
        </div>

        {/* Warning Badge at Bottom of Safe Zone */}
        <div
          style={{
            padding: "12px 30px",
            borderRadius: 100,
            backgroundColor: "rgba(225, 29, 72, 0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(225, 29, 72, 0.4)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#FB7185",
            letterSpacing: "0.02em",
            boxShadow: "0 8px 24px rgba(225, 29, 72, 0.15)",
          }}
        >
          ✋ LEKIN RUKO ZARA: CLAIMS VS REALITY
        </div>
      </div>
    </div>
  );
};
