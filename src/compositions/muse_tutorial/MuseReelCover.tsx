import React from "react";
import { staticFile } from "remotion";

export interface MuseCoverProps {
  isSquareFeed?: boolean;
}

/**
 * MuseReelCover - High-Conversion Apple Keynote 3D Cover Photo (1080x1920 / 1080x1080)
 *
 * Design Architecture (Codified from apple-keynote-motion):
 * - Canvas Background: Apple Cupertino #F5F5F7 with full-bleed depth blur of neural AI bokeh
 * - Single 3D Hero Element: 3D perspective smartphone tilted in 3D space with deep soft shadow
 * - On-Screen UI: Muse AI Agent (+1,000,000,000 Tokens Claimed, Code NKGW5B)
 * - Instagram Safe Zone: Everything strictly centered within the 1080x1080 profile crop (Y: 420px - 1500px)
 * - Branding: Official @vizion.std frosted pill in top-left
 */
export const MuseReelCover: React.FC<MuseCoverProps> = ({ isSquareFeed = false }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: isSquareFeed ? 1080 : 1920,
        backgroundColor: "#F5F5F7",
        overflow: "hidden",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Import Poppins and Roboto */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Roboto:wght@500;700;900&display=swap');
      `}</style>

      {/* ========================================================= */}
      {/* 1. CINEMATIC BLURRED BACKGROUND (VIBRANT DEPTH OF FIELD)  */}
      {/* ========================================================= */}
      {/* Neural AI Future Bokeh Layer */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          backgroundImage: `url(${staticFile("inputs/human_ai_future.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "blur(65px) brightness(1.05) saturate(1.4)",
          transform: "scale(1.25)",
          opacity: 0.40,
          pointerEvents: "none",
        }}
      />

      {/* Ambient Specular Radial Light Accents */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(0, 113, 227, 0.16) 0%, rgba(124, 58, 237, 0.10) 45%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Fine Paper Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {/* ========================================================= */}
      {/* 2. BRANDING WATERMARK (@vizion.std Apple Frosted Pill)    */}
      {/* ========================================================= */}
      {!isSquareFeed && (
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 56,
            zIndex: 95,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px 10px 12px",
            borderRadius: 100,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <img
            src={staticFile("inputs/channel_logo.jpg")}
            style={{ width: 36, height: 36, borderRadius: "50%" }}
            alt="Logo"
          />
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#1D1D1F",
              letterSpacing: "-0.01em",
            }}
          >
            @vizion.std
          </span>
        </div>
      )}

      {/* Top Right Urgent Pill */}
      {!isSquareFeed && (
        <div
          style={{
            position: "absolute",
            top: 72,
            right: 56,
            zIndex: 95,
            padding: "10px 22px",
            borderRadius: 100,
            backgroundColor: "#FF5A1F",
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 8px 24px rgba(255, 90, 31, 0.25)",
          }}
        >
          48-HOUR EXPIRY ⏳
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. HERO CONTENT CONTAINER (1080x1080 Instagram Safe Zone) */}
      {/* ========================================================= */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          marginTop: isSquareFeed ? 0 : 20,
        }}
      >
        {/* Apple Keynote Kicker Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 100,
            backgroundColor: "#1D1D1F",
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            fontSize: isSquareFeed ? 18 : 20,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: isSquareFeed ? 14 : 20,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <span style={{ color: "#0071E3" }}>●</span>
          <span>META AI · MUSE AGENT</span>
        </div>

        {/* Big Display Headline */}
        <h1
          style={{
            margin: 0,
            fontSize: isSquareFeed ? 56 : 64,
            fontWeight: 900,
            color: "#1D1D1F",
            textAlign: "center",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: isSquareFeed ? 10 : 14,
            maxWidth: 900,
          }}
        >
          CLAIM 1 BILLION{" "}
          <span
            style={{
              color: "#0071E3",
              background: "linear-gradient(135deg, #0071E3 0%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FREE TOKENS
          </span>
        </h1>

        {/* Subhead Metric */}
        <p
          style={{
            margin: isSquareFeed ? "0 0 20px 0" : "0 0 32px 0",
            fontSize: isSquareFeed ? 20 : 23,
            fontWeight: 600,
            color: "#6E6E73",
            textAlign: "center",
            letterSpacing: "-0.01em",
            maxWidth: 780,
          }}
        >
          Complete step-by-step setup guide with referral code redeem.
        </p>

        {/* ========================================================= */}
        {/* 4. SINGLE 3D HERO PERSPECTIVE DEVICE WITH SHADOW          */}
        {/* ========================================================= */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isSquareFeed ? 540 : 720,
            perspective: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Ambient Realistic Drop Shadow */}
          <div
            style={{
              position: "absolute",
              width: 440,
              height: isSquareFeed ? 480 : 660,
              borderRadius: 60,
              backgroundColor: "rgba(0, 0, 0, 0.20)",
              filter: "blur(45px)",
              transform: "translateY(55px) scale(0.92)",
              zIndex: 1,
            }}
          />

          {/* 3D Tilted Smartphone Mockup (Single Hero Element) */}
          <div
            style={{
              position: "relative",
              width: 440,
              height: isSquareFeed ? 500 : 680,
              borderRadius: 56,
              backgroundColor: "#FFFFFF",
              border: "6px solid #1D1D1F",
              boxShadow: "0 40px 100px rgba(0, 0, 0, 0.18), 0 15px 35px rgba(0, 0, 0, 0.08)",
              transform: "rotateX(10deg) rotateY(-14deg) rotateZ(3deg)",
              transformStyle: "preserve-3d",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 28px",
              zIndex: 5,
              overflow: "hidden",
            }}
          >
            {/* Dynamic Island / Speaker Notch */}
            <div
              style={{
                width: 120,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#1D1D1F",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#0071E3" }} />
              <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: "#333" }} />
            </div>

            {/* In-App Status Bar */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
                fontWeight: 700,
                color: "#6E6E73",
                marginBottom: 20,
              }}
            >
              <span>09:41</span>
              <span>muse.ai · US VPN</span>
            </div>

            {/* Muse Agent Identity Tile */}
            <div
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 22,
                backgroundColor: "#F8FAFC",
                border: "1.5px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
              }}
            >
              {/* Meta Muse Gradient Icon */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #0071E3 0%, #7C3AED 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(0, 113, 227, 0.35)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#111111" }}>Muse AI Agent</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#16A34A" }}>Official Meta Beta · Active ✓</div>
              </div>
            </div>

            {/* Huge 1 Billion Display */}
            <div style={{ fontSize: 13, fontWeight: 800, color: "#6E6E73", textTransform: "uppercase", letterSpacing: "1px" }}>
              Allocated Balance
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: "#111111",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                margin: "4px 0 20px 0",
              }}
            >
              1B
              <span style={{ fontSize: 32, fontWeight: 800, color: "#0071E3", marginLeft: 6 }}>TOKENS</span>
            </div>

            {/* Invite Code Pill */}
            <div
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 16,
                backgroundColor: "#F1F5F9",
                border: "1.5px solid rgba(0, 0, 0, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#64748B" }}>REFERRAL CODE</span>
                <span style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 900, letterSpacing: "2px", color: "#0F172A" }}>
                  NKGW5B
                </span>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 10,
                  backgroundColor: "#0071E3",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                REDEEM
              </div>
            </div>

            {/* Claimed Status Pill */}
            <div
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 18,
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontSize: 20,
                fontWeight: 900,
                boxShadow: "0 10px 25px rgba(22, 163, 74, 0.35)",
              }}
            >
              <span style={{ fontSize: 22 }}>✓</span>
              <span>1B CREDITED INSTANTLY</span>
            </div>

            {/* Specular Screen Sweep Reflection */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, transparent 45%, rgba(255, 255, 255, 0.15) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ========================================================= */}
          {/* FLOATING 3D GLASS CHIP: 48-HOUR TIMER (Top Right)        */}
          {/* ========================================================= */}
          <div
            style={{
              position: "absolute",
              top: isSquareFeed ? 10 : 40,
              right: 15,
              zIndex: 20,
              padding: "16px 24px",
              borderRadius: 22,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateZ(60px) rotate(-6deg)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: "#FF5A1F",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 900,
              }}
            >
              ⚠️
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                Referral Window
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#1D1D1F" }}>48 HOURS ONLY</div>
            </div>
          </div>
        </div>

        {/* Footer Pill: Watch Full Breakdown */}
        {!isSquareFeed && (
          <div
            style={{
              marginTop: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.90)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: "#1D1D1F",
            }}
          >
            <span>WATCH FULL TUTORIAL</span>
            <span style={{ fontSize: 24, color: "#0071E3" }}>▶</span>
          </div>
        )}
      </div>
    </div>
  );
};
