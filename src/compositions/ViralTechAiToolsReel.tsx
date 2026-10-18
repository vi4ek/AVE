import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AudioController } from "../audio/AudioController";

// =========================================================================
// 1. APPLE-STYLE MINIMALIST LIGHT BACKDROP
// =========================================================================
const AppleLightBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle floating ambient illumination
  const driftY = interpolate(Math.sin((frame / 60) * Math.PI), [-1, 1], [-15, 15]);
  const driftX = interpolate(Math.cos((frame / 80) * Math.PI), [-1, 1], [-12, 12]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#F5F5F7",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Soft Ambient Sky-Blue Orb */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "20%",
          width: 800,
          height: 800,
          transform: `translate(${driftX}px, ${driftY}px)`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, rgba(224, 242, 254, 0.03) 50%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Soft Warm Pearl Accent */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: 850,
          height: 850,
          transform: `translate(-${driftX}px, -${driftY}px)`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, rgba(254, 243, 199, 0.02) 60%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Ultra-subtle Apple Dot Matrix Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: 0.6,
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// =========================================================================
// 2. SCENE 1: THE HOOK (Frames 0 - 216 / 0.0s - 7.2s)
// Audio: "Stop using ChatGPT for everything. These three free AI tools feel straight-up illegal to know."
// =========================================================================
const AppleHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Second phrase entrance at frame 95 (~3.17s)
  const p2Spring = spring({ frame: frame - 95, fps, config: { damping: 15, stiffness: 200 } });
  const p2Opacity = interpolate(p2Spring, [0, 1], [0, 1]);
  const p2Y = interpolate(p2Spring, [0, 1], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Apple Minimalist Tag Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 22px",
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
          marginBottom: 36,
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
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#1D1D1F",
            textTransform: "uppercase",
          }}
        >
          2026 AI PROTOCOL
        </span>
      </div>

      {/* Main Apple Keynote Headline */}
      <h1
        style={{
          fontFamily: "'Poppins', -apple-system, sans-serif",
          fontSize: 78,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.12,
          color: "#1D1D1F",
          margin: "0 0 36px 0",
          letterSpacing: "-0.03em",
          maxWidth: 920,
        }}
      >
        Stop using{" "}
        <span
          style={{
            color: "#0071E3",
            textDecoration: "underline",
            textDecorationThickness: "4px",
            textUnderlineOffset: "8px",
          }}
        >
          ChatGPT
        </span>{" "}
        for everything.
      </h1>

      {/* Apple Frosted Glass Card for 2nd Phrase */}
      <div
        style={{
          padding: "28px 40px",
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(0, 0, 0, 0.07)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)",
          maxWidth: 880,
          opacity: p2Opacity,
          transform: `translateY(${p2Y}px)`,
        }}
      >
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 32,
            fontWeight: 500,
            color: "#424245",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          These three free AI tools feel{" "}
          <span style={{ color: "#BF4800", fontWeight: 700 }}>straight-up illegal</span> to know.
        </p>
      </div>

      {/* Minimal Footer Hint */}
      <div
        style={{
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#86868B",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
      >
        <span>TOOL 01 OF 03</span>
        <span style={{ color: "#0071E3", fontSize: 24 }}>↓</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 3. SCENE 2: TOOL 1 - DEEPSEEK R1 (Frames 216 - 540 / 7.2s - 18.0s)
// Audio: "Number one: DeepSeek R-1. It gives you OpenAI o1-level reasoning completely open-source and free, beating two hundred dollar models in code and math."
// =========================================================================
const AppleDeepSeekScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Secondary stat cards reveal at frame 80 (~2.6s in)
  const statSpring = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 200 } });
  const statOpacity = interpolate(statSpring, [0, 1], [0, 1]);
  const statY = interpolate(statSpring, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 20px",
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          marginBottom: 24,
        }}
      >
        <span style={{ color: "#0071E3", fontWeight: 700, fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>
          01
        </span>
        <span style={{ color: "#D2D2D7", fontSize: 14 }}>•</span>
        <span style={{ color: "#6E6E73", fontWeight: 600, fontSize: 16, letterSpacing: "0.08em" }}>
          REASONING & LOGIC
        </span>
      </div>

      {/* Main Apple Frosted Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.07), 0 2px 8px rgba(0, 0, 0, 0.03)",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 60,
                fontWeight: 800,
                color: "#1D1D1F",
                margin: "0 0 6px 0",
                letterSpacing: "-0.02em",
              }}
            >
              DeepSeek R1
            </h2>
            <p style={{ margin: 0, fontSize: 22, color: "#6E6E73", fontWeight: 500 }}>
              Open-Source o1-Grade Reasoning
            </p>
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 14,
              backgroundColor: "#E8F5E9",
              border: "1px solid #C8E6C9",
              color: "#1B5E20",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.04em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            100% FREE
          </div>
        </div>

        {/* Clean Apple Minimalist Terminal Widget */}
        <div
          style={{
            backgroundColor: "#F5F5F7",
            borderRadius: 20,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "24px 28px",
            fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#27C93F" }} />
            <span style={{ marginLeft: 10, color: "#86868B", fontSize: 16 }}>deepseek-r1 --inference</span>
          </div>
          <div style={{ color: "#1D1D1F", fontSize: 20, fontWeight: 500, lineHeight: 1.5 }}>
            &gt; Solving complex Rust memory architecture...
          </div>
          <div style={{ color: "#0071E3", fontSize: 18, marginTop: 8, fontWeight: 600 }}>
            ✓ Chain-of-thought completed (Zero API subscription)
          </div>
        </div>

        {/* Apple Stat Comparison Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            opacity: statOpacity,
            transform: `translateY(${statY}px)`,
          }}
        >
          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#0071E3", fontFamily: "'Poppins', sans-serif" }}>
              97.3%
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              Math & Code Benchmark
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#1B5E20", fontFamily: "'Poppins', sans-serif" }}>
              $0 / mo
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              Beats $200/mo Closed Models
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 4. SCENE 3: TOOL 2 - BOLT.NEW (Frames 540 - 786 / 18.0s - 26.2s)
// Audio: "Number two: Bolt dot new. Type any prompt and it boots a full-stack production web app right inside your browser in seconds."
// =========================================================================
const AppleBoltScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 20px",
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          marginBottom: 24,
        }}
      >
        <span style={{ color: "#D97706", fontWeight: 700, fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>
          02
        </span>
        <span style={{ color: "#D2D2D7", fontSize: 14 }}>•</span>
        <span style={{ color: "#6E6E73", fontWeight: 600, fontSize: 16, letterSpacing: "0.08em" }}>
          IN-BROWSER DEV
        </span>
      </div>

      {/* Main Apple Frosted Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.07), 0 2px 8px rgba(0, 0, 0, 0.03)",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 60,
                fontWeight: 800,
                color: "#1D1D1F",
                margin: "0 0 6px 0",
                letterSpacing: "-0.02em",
              }}
            >
              Bolt.new
            </h2>
            <p style={{ margin: 0, fontSize: 22, color: "#6E6E73", fontWeight: 500 }}>
              Prompt to Full-Stack Production App
            </p>
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 14,
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              color: "#B45309",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.04em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            ZERO SETUP
          </div>
        </div>

        {/* Clean Web Container Preview */}
        <div
          style={{
            backgroundColor: "#F5F5F7",
            borderRadius: 20,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "24px 28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#27C93F" }} />
            <span style={{ marginLeft: 10, color: "#86868B", fontSize: 16 }}>bolt.new // live container</span>
          </div>

          <div
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 22,
              color: "#1D1D1F",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            "Build full Airbnb clone with Next.js, Auth & Database"
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "12px 18px",
              borderRadius: 12,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "#1B5E20", fontWeight: 600, fontSize: 17 }}>
              ✓ WebContainer live in 4.2 seconds
            </span>
            <span style={{ color: "#0071E3", fontWeight: 700, fontSize: 17 }}>
              1-Click Deploy
            </span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#D97706", fontFamily: "'Poppins', sans-serif" }}>
              In-Browser
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              Runs Full Node.js Runtime
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#0071E3", fontFamily: "'Poppins', sans-serif" }}>
              Full-Stack
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              Frontend + Backend + Database
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 5. SCENE 4: TOOL 3 - WHISPER WEB (Frames 786 - 1044 / 26.2s - 34.8s)
// Audio: "And number three: Whisper Web. Run state-of-the-art speech transcription locally on your device with zero server uploads and complete privacy."
// =========================================================================
const AppleWhisperScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 20px",
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          marginBottom: 24,
        }}
      >
        <span style={{ color: "#7C3AED", fontWeight: 700, fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>
          03
        </span>
        <span style={{ color: "#D2D2D7", fontSize: 14 }}>•</span>
        <span style={{ color: "#6E6E73", fontWeight: 600, fontSize: 16, letterSpacing: "0.08em" }}>
          DEVICE-LOCAL AI
        </span>
      </div>

      {/* Main Apple Frosted Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 32,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.07), 0 2px 8px rgba(0, 0, 0, 0.03)",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 60,
                fontWeight: 800,
                color: "#1D1D1F",
                margin: "0 0 6px 0",
                letterSpacing: "-0.02em",
              }}
            >
              Whisper Web
            </h2>
            <p style={{ margin: 0, fontSize: 22, color: "#6E6E73", fontWeight: 500 }}>
              Device-Local WebGPU Speech AI
            </p>
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 14,
              backgroundColor: "#F3E8FF",
              border: "1px solid #DDD6FE",
              color: "#6D28D9",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.04em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            100% PRIVATE
          </div>
        </div>

        {/* Minimalist Apple Audio Waveform Visualizer */}
        <div
          style={{
            backgroundColor: "#F5F5F7",
            borderRadius: 20,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 90,
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const h = interpolate(
              Math.sin((frame / 5) + i * 0.35),
              [-1, 1],
              [12, 58]
            );
            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: h,
                  borderRadius: 3,
                  backgroundColor: i % 2 === 0 ? "#0071E3" : "#6E6E73",
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#7C3AED", fontFamily: "'Poppins', sans-serif" }}>
              0 Bytes
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              Uploaded to External Servers
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 800, color: "#0071E3", fontFamily: "'Poppins', sans-serif" }}>
              WebGPU
            </div>
            <div style={{ fontSize: 17, color: "#6E6E73", fontWeight: 500, marginTop: 4 }}>
              100% Client-Side Acceleration
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 6. SCENE 5: OUTRO & HIGH-CONVERTING CTA (Frames 1044 - 1190 / 34.8s - 39.63s)
// Audio: "Save this video right now, and comment 'AI' to get direct links to all three."
// =========================================================================
const AppleOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 16, stiffness: 180 } });
  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Subtle breathing pulse on the save icon
  const pulse = interpolate(Math.sin((frame / 12) * Math.PI), [-1, 1], [0.97, 1.03]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Apple Clean Bookmark Icon */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          backgroundColor: "#0071E3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 16px 40px rgba(0, 113, 227, 0.3)",
          transform: `scale(${pulse})`,
          marginBottom: 32,
        }}
      >
        <span style={{ fontSize: 48, color: "#FFFFFF" }}>🔖</span>
      </div>

      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 70,
          fontWeight: 800,
          textAlign: "center",
          color: "#1D1D1F",
          margin: "0 0 20px 0",
          letterSpacing: "-0.02em",
        }}
      >
        Save This Video
      </h2>

      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 30,
          fontWeight: 500,
          color: "#6E6E73",
          textAlign: "center",
          maxWidth: 820,
          margin: "0 0 44px 0",
          lineHeight: 1.45,
        }}
      >
        Comment <span style={{ color: "#0071E3", fontWeight: 700 }}>"AI"</span> below to get direct
        links to all three tools.
      </p>

      {/* Apple Subtle Action Chip */}
      <div
        style={{
          padding: "16px 34px",
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
          color: "#1D1D1F",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        FOLLOW @VIZION.STD
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// TOP-LEFT FROSTED LOGO WATERMARK (Apple aesthetic, low opacity & blur)
// =========================================================================
const TopLeftChannelLogo: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 56,
        zIndex: 95,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 16px 8px 10px",
        borderRadius: 100,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
        opacity: 0.55,
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
  );
};

// =========================================================================
// MAIN COMPOSITION: ViralTechAiToolsReel (39.67s / 1,190 frames @ 30 FPS)
// =========================================================================
export const ViralTechAiToolsReel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F5F7",
        fontFamily: "'Poppins', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 1. Master Apple Light Backdrop */}
      <AppleLightBackdrop />

      {/* 2. Top-Left Low-Opacity Frosted Glass Channel Watermark */}
      <TopLeftChannelLogo />

      {/* 3. ELEVENLABS MASTER VOICE TRACK (Full Duration, Crystal Clear) */}
      <Audio
        src={staticFile("inputs/viral_voice.mp3")}
        volume={1.0}
      />

      {/* 4. SUBTLE AMBIENT BGM (Ducked to 0.04 so voice is 100% upfront) */}
      <Audio
        src={staticFile("sfx/ambient_tech_bgm.wav")}
        volume={0.04}
        loop
      />

      {/* 5. APPLE PRECISION SOUND EFFECTS */}
      <AudioController
        sfxCues={[
          // Hook Entrance
          { frame: 1, sound: "pop", volume: 0.5 },
          { frame: 95, sound: "whoosh", volume: 0.4 },
          // Tool 1: DeepSeek R1 (frame 216)
          { frame: 216, sound: "whoosh", volume: 0.5 },
          { frame: 240, sound: "click", volume: 0.4 },
          { frame: 295, sound: "pop", volume: 0.4 },
          // Tool 2: Bolt.new (frame 540)
          { frame: 540, sound: "whoosh", volume: 0.5 },
          { frame: 565, sound: "click", volume: 0.4 },
          { frame: 620, sound: "pop", volume: 0.4 },
          // Tool 3: Whisper Web (frame 786)
          { frame: 786, sound: "whoosh", volume: 0.5 },
          { frame: 820, sound: "click", volume: 0.4 },
          { frame: 870, sound: "pop", volume: 0.4 },
          // Outro & CTA (frame 1044)
          { frame: 1044, sound: "pop", volume: 0.6 },
          { frame: 1060, sound: "click", volume: 0.5 },
        ]}
      />

      {/* 6. PRECISE TIMED SCENE SEQUENCES MATCHING ELEVENLABS AUDIO */}
      {/* Scene 1: The Hook (0 - 216 frames / 0.0s - 7.2s) */}
      <Sequence from={0} durationInFrames={216} name="Scene 1: Hook">
        <AppleHookScene />
      </Sequence>

      {/* Scene 2: Tool 1 - DeepSeek R1 (216 - 540 frames / 7.2s - 18.0s) */}
      <Sequence from={216} durationInFrames={324} name="Scene 2: Tool 1 - DeepSeek R1">
        <AppleDeepSeekScene />
      </Sequence>

      {/* Scene 3: Tool 2 - Bolt.new (540 - 786 frames / 18.0s - 26.2s) */}
      <Sequence from={540} durationInFrames={246} name="Scene 3: Tool 2 - Bolt.new">
        <AppleBoltScene />
      </Sequence>

      {/* Scene 4: Tool 3 - Whisper Web (786 - 1044 frames / 26.2s - 34.8s) */}
      <Sequence from={786} durationInFrames={258} name="Scene 4: Tool 3 - Whisper Web">
        <AppleWhisperScene />
      </Sequence>

      {/* Scene 5: Outro & CTA (1044 - 1190 frames / 34.8s - 39.67s) */}
      <Sequence from={1044} durationInFrames={146} name="Scene 5: Outro & CTA">
        <AppleOutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
