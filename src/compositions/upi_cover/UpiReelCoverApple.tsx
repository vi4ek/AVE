import React from "react";
import { staticFile } from "remotion";

export interface UpiCoverProps {
  isSquareFeed?: boolean;
}

/**
 * UpiReelCoverApple - High-Conversion Apple Keynote 3D Cover Photo (1080x1920 / 1080x1080)
 *
 * Design Tokens & Architecture (Codified from apple-keynote-motion):
 * - Canvas Background: Apple Cupertino `#F5F5F7` with full-bleed depth blur of real-world macro bokeh
 * - 3D Perspective Phone Mockup: Tilted 3D device with titanium bezel, speaker notch, specular shine, and hard drop shadow
 * - On-Screen UI: Generic clean UPI payment flow (₹500, verified merchant, emerald green check badge)
 * - 3D Floating Frosted Glass Chips: 2-sec settlement, NPCI central switch, 256-bit encryption
 * - Instagram Safe Zone: Everything strictly centered within the 1080x1080 profile crop (Y: 420px - 1500px)
 * - Branding: Official @vizion.std frosted pill in top-left
 */
export const UpiReelCoverApple: React.FC<UpiCoverProps> = ({ isSquareFeed = false }) => {
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
      {/* Real-World Macro Note Bokeh Layer */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          backgroundImage: `url(${staticFile("broll/inr_500_note_macro.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "blur(60px) brightness(1.05) saturate(1.5)",
          transform: "scale(1.25)",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      {/* Hand QR Scan Soft Glow Layer */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          backgroundImage: `url(${staticFile("broll/hand_scan_qr.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          filter: "blur(75px) brightness(1.1) saturate(1.3)",
          opacity: 0.35,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Specular Radial Light Accents */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(0, 113, 227, 0.14) 0%, rgba(22, 163, 74, 0.08) 45%, transparent 75%)",
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
          marginTop: isSquareFeed ? 0 : 30,
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
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 24,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <span style={{ color: "#FF5A1F" }}>●</span>
          <span>TECH EXPLAINER · UPI</span>
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
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          WHAT HAPPENS WHEN YOU{" "}
          <span
            style={{
              color: "#0071E3",
              background: "linear-gradient(135deg, #0071E3 0%, #16A34A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TAP PAY?
          </span>
        </h1>

        {/* Subhead Metric */}
        <p
          style={{
            margin: "0 0 36px 0",
            fontSize: 24,
            fontWeight: 600,
            color: "#6E6E73",
            textAlign: "center",
            letterSpacing: "-0.01em",
            maxWidth: 780,
          }}
        >
          The hidden 2-second engineering marvel that moves ₹500 across 3 servers.
        </p>

        {/* ========================================================= */}
        {/* 4. 3D PERSPECTIVE DEVICE & FLOATING GLASS CARDS           */}
        {/* ========================================================= */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isSquareFeed ? 560 : 780,
            perspective: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Ambient Device Shadow */}
          <div
            style={{
              position: "absolute",
              width: 440,
              height: 700,
              borderRadius: 60,
              backgroundColor: "rgba(0, 0, 0, 0.18)",
              filter: "blur(40px)",
              transform: "translateY(50px) scale(0.92)",
              zIndex: 1,
            }}
          />

          {/* 3D Tilted Smartphone Mockup */}
          <div
            style={{
              position: "relative",
              width: 440,
              height: 720,
              borderRadius: 56,
              backgroundColor: "#FFFFFF",
              border: "6px solid #1D1D1F",
              boxShadow: "0 40px 100px rgba(0, 0, 0, 0.16), 0 15px 35px rgba(0, 0, 0, 0.08)",
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
            {/* Dynamic Speaker Notch */}
            <div
              style={{
                width: 120,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#1D1D1F",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#16A34A" }} />
              <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: "#333" }} />
            </div>

            {/* In-App Status Bar */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 700,
                color: "#6E6E73",
                marginBottom: 28,
              }}
            >
              <span>09:41</span>
              <span>UPI · 5G</span>
            </div>

            {/* Merchant Payment Card */}
            <div
              style={{
                width: "100%",
                padding: "20px",
                borderRadius: 24,
                backgroundColor: "#F7F4EE",
                border: "2px solid #111111",
                boxShadow: "4px 4px 0 #111111",
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "#FF5A1F",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                }}
              >
                K
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#111111" }}>Chai & Kirana</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#16A34A" }}>Verified Merchant ✓</div>
              </div>
            </div>

            {/* Big Amount */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: "#111111",
                letterSpacing: "-0.04em",
                marginBottom: 36,
              }}
            >
              ₹500
            </div>

            {/* Pay Button / Success Checkmark */}
            <div
              style={{
                width: "100%",
                padding: "18px 0",
                borderRadius: 20,
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                fontSize: 24,
                fontWeight: 900,
                boxShadow: "0 12px 30px rgba(22, 163, 74, 0.35)",
              }}
            >
              <span style={{ fontSize: 28 }}>✓</span>
              <span>PAID INSTANTLY</span>
            </div>

            {/* Specular Screen Reflection Sweep */}
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
          {/* FLOATING 3D GLASS CHIP 1: NPCI CENTRAL SWITCH (Top Right) */}
          {/* ========================================================= */}
          <div
            style={{
              position: "absolute",
              top: isSquareFeed ? 20 : 60,
              right: 20,
              zIndex: 20,
              padding: "18px 26px",
              borderRadius: 24,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateZ(60px) rotate(-6deg)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#111111",
                color: "#FFE9A8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                Switch Engine
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1D1D1F" }}>NPCI ROUTER</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FLOATING 3D GLASS CHIP 2: 256-BIT ENCRYPTION (Bottom Left)*/}
          {/* ========================================================= */}
          <div
            style={{
              position: "absolute",
              bottom: isSquareFeed ? 20 : 60,
              left: 20,
              zIndex: 20,
              padding: "18px 26px",
              borderRadius: 24,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateZ(80px) rotate(5deg)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#FFDF00",
                color: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                border: "2px solid #111111",
              }}
            >
              🔒
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#6E6E73", textTransform: "uppercase" }}>
                Zero Plaintext
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1D1D1F" }}>256-BIT PIN</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FLOATING 3D GLASS CHIP 3: SPEED BADGE (Bottom Right)      */}
          {/* ========================================================= */}
          <div
            style={{
              position: "absolute",
              bottom: isSquareFeed ? 30 : 100,
              right: 40,
              zIndex: 18,
              padding: "14px 22px",
              borderRadius: 20,
              backgroundColor: "#16A34A",
              color: "#FFFFFF",
              boxShadow: "0 18px 45px rgba(22, 163, 74, 0.35)",
              transform: "translateZ(50px) rotate(-3deg)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            <span>⏱️</span>
            <span>~2 SECONDS</span>
          </div>
        </div>

        {/* Footer Pill: Watch Full Breakdown */}
        {!isSquareFeed && (
          <div
            style={{
              marginTop: 40,
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
            <span>WATCH FULL BREAKDOWN</span>
            <span style={{ fontSize: 24 }}>▶</span>
          </div>
        )}
      </div>
    </div>
  );
};
