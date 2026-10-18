import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrowserFrame,
  CursorPointer,
} from "../components";
import { THEME } from "../theme/tokens";

// =========================================================================
// AMBIENT BACKDROP COMPONENT (Soft Luminous Atmospheric Slate & Orbs)
// =========================================================================
const AmbientBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  // Gentle breathing drift for ambient lighting orbs
  const driftY1 = interpolate(frame % 360, [0, 360], [0, 35], { extrapolateRight: "clamp" });
  const driftX2 = interpolate(frame % 420, [0, 420], [0, -40], { extrapolateRight: "clamp" });
  const pulseScale = interpolate(Math.sin((frame / 45) * Math.PI), [-1, 1], [0.94, 1.06]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 25%, #1C2033 0%, #131522 55%, #0D0F18 100%)",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Primary Luminous Cyan/Indigo Orb */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          width: 960,
          height: 960,
          transform: `translate(-50%, ${driftY1}px) scale(${pulseScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
          filter: "blur(75px)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary Warm Amber Accent Orb */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          right: "-10%",
          width: 800,
          height: 800,
          transform: `translateX(${driftX2}px) scale(${pulseScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(224, 122, 95, 0.08) 50%, transparent 70%)",
          filter: "blur(85px)",
          pointerEvents: "none",
        }}
      />

      {/* Tertiary Soft Emerald Glow for Local Hardware */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "10%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, transparent 60%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Micro-Grid Overlay with Specular Mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// =========================================================================
// MAIN COMPOSITION: Local AI Guide Reel (52.0s / 1,560 frames @ 30 FPS)
// =========================================================================
export const LocalAiGuideReel: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic BGM Ducking Calculation
  // Swells during hook (0-30), Wi-Fi offline break (846-930), and final CTA (1450-1560)
  // Ducked down to 0.10 during intense vocal explanation
  let bgmVolume = 0.10;
  if (frame < 30) {
    bgmVolume = interpolate(frame, [0, 15, 30], [0.35, 0.35, 0.10], { extrapolateRight: "clamp" });
  } else if (frame >= 846 && frame < 940) {
    // Wi-Fi disconnect tension surge
    bgmVolume = interpolate(frame, [846, 900, 940], [0.10, 0.28, 0.12], { extrapolateRight: "clamp" });
  } else if (frame >= 1450) {
    // Final CTA outro surge with gentle fadeout
    bgmVolume = interpolate(frame, [1450, 1500, 1560], [0.12, 0.32, 0.0], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D0F18",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Warm Ambient Atmosphere & Lighting */}
      <AmbientBackdrop />

      {/* Synchronized Voiceover Track (51.80s / 1,554 frames) */}
      <Sequence from={0} durationInFrames={1554}>
        <Audio src={staticFile("inputs/local_ai_vo.mp3")} volume={1.0} />
      </Sequence>

      {/* Warm Ambient Tech BGM Track (Stereo 122 BPM) */}
      <Sequence from={0} durationInFrames={1560}>
        <Audio src={staticFile("sfx/ambient_tech_bgm.wav")} volume={bgmVolume} />
      </Sequence>

      {/* Frame-Accurate Synchronized SFX Triggers */}
      {frame === 1 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.85} />}
      {frame === 65 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.55} />}
      {frame === 115 && <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />}
      {frame === 180 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 310 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />}
      {frame === 365 && <Audio src={staticFile("sfx/click.wav")} volume={0.7} />}
      {frame === 400 && <Audio src={staticFile("sfx/click.wav")} volume={0.85} />}
      {frame === 450 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 545 && <Audio src={staticFile("sfx/click.wav")} volume={0.5} />}
      {frame === 620 && <Audio src={staticFile("sfx/click.wav")} volume={0.9} />}
      {frame === 630 && <Audio src={staticFile("sfx/pop.wav")} volume={0.7} />}
      {frame === 720 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.85} />}
      {frame === 850 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 920 && <Audio src={staticFile("sfx/click.wav")} volume={0.85} />}
      {frame === 925 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.9} />}
      {frame === 1074 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 1140 && <Audio src={staticFile("sfx/pop.wav")} volume={0.55} />}
      {frame === 1180 && <Audio src={staticFile("sfx/pop.wav")} volume={0.55} />}
      {frame === 1220 && <Audio src={staticFile("sfx/pop.wav")} volume={0.55} />}
      {frame === 1260 && <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />}
      {frame === 1335 && <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />}
      {frame === 1450 && <Audio src={staticFile("sfx/click.wav")} volume={0.8} />}
      {frame === 1452 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.75} />}

      {/* =========================================================================
          SCENE 1: THE $20/MO VS $0 HOOK (Frames 0 - 180 | 0.0s - 6.0s)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={180} name="Scene 1: Hook">
        <SceneHook />
      </Sequence>

      {/* =========================================================================
          SCENE 2: SETUP, GOOGLE SEARCH & OLLAMA DOWNLOAD (Frames 180 - 450 | 6.0s - 15.0s)
          Audio at 11s-14.6s: "First, head to Ollama.com and download the app for your system."
          At 0:12, 0:13: Google search typing "download ollama" ➔ ollama.com Download button clicked!
          ========================================================================= */}
      <Sequence from={180} durationInFrames={270} name="Scene 2: Setup">
        <SceneSetup />
      </Sequence>

      {/* =========================================================================
          SCENE 3: TERMINAL & RUNNING OLLAMA SCRIPT (Frames 450 - 720 | 15.0s - 24.0s)
          Audio at 15s-23.5s: "Next, open your terminal and type one simple command: ollama run llama3, or deepseek-coder, and press enter."
          At 0:20, 0:21: "and press enter" ➔ Enter key press ➔ Live script execution in terminal with model progress!
          ========================================================================= */}
      <Sequence from={450} durationInFrames={270} name="Scene 3: Terminal">
        <SceneTerminal />
      </Sequence>

      {/* =========================================================================
          SCENE 4: RAM & GPU HARDWARE ALLOCATION (Frames 720 - 850 | 24.0s - 28.3s)
          ========================================================================= */}
      <Sequence from={720} durationInFrames={130} name="Scene 4: Hardware">
        <SceneHardware />
      </Sequence>

      {/* =========================================================================
          SCENE 5: THE ULTIMATE OFFLINE WI-FI TEST (Frames 850 - 1074 | 28.3s - 35.8s)
          ========================================================================= */}
      <Sequence from={850} durationInFrames={224} name="Scene 5: Offline Test">
        <SceneOfflineTest />
      </Sequence>

      {/* =========================================================================
          SCENE 6: BLAZING TOKEN STREAM & ABSOLUTE PRIVACY (Frames 1074 - 1335 | 35.8s - 44.5s)
          ========================================================================= */}
      <Sequence from={1074} durationInFrames={261} name="Scene 6: Token Stream">
        <SceneTokenStream />
      </Sequence>

      {/* =========================================================================
          SCENE 7: COMMUNITY POLL & FOLLOW CTA (Frames 1335 - 1560 | 44.5s - 52.0s)
          ========================================================================= */}
      <Sequence from={1335} durationInFrames={225} name="Scene 7: CTA">
        <SceneCTA />
      </Sequence>

      {/* =========================================================================
          UNIVERSAL KINETIC CAPTIONS OVERLAY (Burned-in High Retention)
          ========================================================================= */}
      <UniversalCaptions globalFrame={frame} />
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 1: THE $20/MO VS $0 HOOK
// =========================================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: THEME.springs.snappy,
  });

  // Laser slash animation on $20 card (frames 50 to 95)
  const slashWidth = interpolate(frame, [50, 75], [0, 100], { extrapolateRight: "clamp" });
  // Pop expansion into $0 card (frames 95+)
  const freeCardScale = spring({
    frame: frame - 95,
    fps,
    config: THEME.springs.pop,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Ambient Top Tag Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(99, 102, 241, 0.16)",
          border: "1px solid rgba(99, 102, 241, 0.45)",
          color: "#818CF8",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 36,
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#38BDF8", boxShadow: "0 0 12px #38BDF8" }} />
        LOCAL HARDWARE // ZERO CLOUD
      </div>

      {/* Dual Cards Comparison Container */}
      <div style={{ width: "100%", maxWidth: 840, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Card 1: Cloud Subscription ($20/mo) */}
        <div
          style={{
            position: "relative",
            padding: "28px 36px",
            borderRadius: 22,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(frame, [60, 95], [1, 0.95], { extrapolateRight: "clamp" })})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 44 }}>☁️</span>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.textPrimary }}>Cloud AI Subscriptions</div>
              <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>Monthly API & Cloud Lock-in</div>
            </div>
          </div>

          <div style={{ fontSize: 38, fontWeight: 900, color: "#EF4444", position: "relative" }}>
            $20 / mo
            {/* Red Laser Slash Line */}
            {slashWidth > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-10%",
                  width: `${slashWidth * 1.2}%`,
                  height: 5,
                  backgroundColor: "#EF4444",
                  boxShadow: "0 0 15px #EF4444",
                  transform: "rotate(-12deg)",
                }}
              />
            )}
          </div>
        </div>

        {/* Card 2: 100% Free Local AI Engine ($0) */}
        {frame >= 90 && (
          <div
            style={{
              padding: "32px 36px",
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(52, 211, 153, 0.16) 0%, rgba(56, 189, 248, 0.12) 100%)",
              backdropFilter: "blur(28px)",
              border: "2px solid rgba(52, 211, 153, 0.5)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(52, 211, 153, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${freeCardScale})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 48 }}>💻</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>Run On Your Own Laptop</div>
                <div style={{ fontSize: 16, color: "#34D399", marginTop: 4 }}>Private, Uncensored & Fast</div>
              </div>
            </div>

            <div
              style={{
                padding: "10px 24px",
                borderRadius: 16,
                backgroundColor: "rgba(52, 211, 153, 0.25)",
                border: "1px solid #34D399",
                color: "#FFFFFF",
                fontSize: 36,
                fontWeight: 900,
                boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)",
              }}
            >
              $0 FREE
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 2: SETUP, GOOGLE SEARCH & OLLAMA DOWNLOAD (Frames 180 - 450 | 6.0s - 15.0s)
// Audio at 11s-14.6s: "First, head to Ollama.com and download the app for your system."
// At 0:12, 0:13: Google Search typing "download ollama" -> ollama.com Download button clicked!
// =========================================================================
const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Setup Introduction Card (local frames 0 - 130 | 6.0s - 10.3s)
  // Phase 2: Google Search typing "download ollama" (local frames 130 - 195 | 10.3s - 12.5s)
  // Phase 3: Ollama.com Download Page & Button Click at 0:12 - 0:13 (local frames 195 - 270 | 12.5s - 15.0s)
  const showGoogle = frame >= 130 && frame < 195;
  const showOllamaDownload = frame >= 195;

  // Google Search live typing
  const searchInput = "download ollama";
  const typedCount = Math.min(
    searchInput.length,
    Math.floor(interpolate(frame, [140, 175], [0, searchInput.length], { extrapolateRight: "clamp" }))
  );
  const displayedSearch = searchInput.slice(0, typedCount);

  // Ollama Download Button Clicked at local frame 220 (global frame 400 = 13.3s, exactly 0:13!)
  const isDownloaded = frame >= 220;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 20,
            backgroundColor: "rgba(56, 189, 248, 0.16)",
            border: "1px solid rgba(56, 189, 248, 0.45)",
            color: "#38BDF8",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          {showGoogle ? "GOOGLE SEARCH" : showOllamaDownload ? "OLLAMA DOWNLOAD" : "STEP 1: INSTALLATION"}
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          {showGoogle
            ? "Search for Ollama"
            : showOllamaDownload
            ? "One-Click App Download"
            : "Set Up in Under 2 Minutes"}
        </div>
      </div>

      <div style={{ position: "relative", width: 940, height: 860 }}>
        {/* PHASE 1: Quick Overview Card (local frames 0 - 130) */}
        {frame < 130 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              padding: "48px 40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 26,
                  background: "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  border: "2px solid rgba(56, 189, 248, 0.5)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  boxShadow: "0 10px 30px rgba(56, 189, 248, 0.35)",
                }}
              >
                ⚡
              </div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#FFFFFF", marginTop: 20 }}>
                Zero Cloud Required
              </div>
              <div style={{ fontSize: 20, color: THEME.colors.textSecondary, marginTop: 10, maxWidth: 600, margin: "10px auto 0" }}>
                Modern open-source LLMs now install with a single native binary.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "100% Free Forever", desc: "No subscriptions or credit cards", icon: "💎" },
                { label: "Runs Completely Offline", desc: "Disconnect from internet anytime", icon: "🔒" },
                { label: "Direct GPU Acceleration", desc: "Full Apple Silicon & NVIDIA support", icon: "🚀" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "20px 24px",
                    borderRadius: 16,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>{item.label}</div>
                    <div style={{ fontSize: 15, color: THEME.colors.textSecondary, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 2: Exact Google Search Mockup (local frames 130 - 195 | global 310 - 375, 0:11 - 0:12.5) */}
        {showGoogle && (
          <BrowserFrame url="google.com" width={940} height={860} startFrame={0}>
            <div
              style={{
                height: "100%",
                padding: "36px 40px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {/* Google Brand Logo */}
              <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1, marginTop: 30, marginBottom: 28, fontFamily: "'Inter', sans-serif" }}>
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span>
              </div>

              {/* Google Search Bar Input */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 720,
                  padding: "16px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                }}
              >
                <span style={{ fontSize: 22, color: "#9CA3AF" }}>🔍</span>
                <span style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
                  {displayedSearch}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 24,
                    backgroundColor: "#38BDF8",
                    opacity: frame % 10 < 5 ? 1 : 0,
                  }}
                />
              </div>

              {/* Instant Search Results Dropdown / Card */}
              {frame >= 165 && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: 720,
                    marginTop: 24,
                    padding: "24px 28px",
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>🦙</span>
                    <span style={{ fontSize: 16, color: "#9CA3AF" }}>https://ollama.com</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#38BDF8", textDecoration: "underline", marginBottom: 8 }}>
                    Ollama — Run LLMs locally
                  </div>
                  <div style={{ fontSize: 16, color: THEME.colors.textSecondary, lineHeight: 1.5 }}>
                    Get up and running with large language models locally. Download for macOS, Windows, and Linux. Run Llama 3, DeepSeek, and more.
                  </div>
                </div>
              )}

              {/* Cursor clicking top result at local frame 185 */}
              <CursorPointer
                startX={350}
                startY={500}
                endX={480}
                endY={380}
                moveStartFrame={160}
                moveEndFrame={185}
                clickFrame={185}
              />
            </div>
          </BrowserFrame>
        )}

        {/* PHASE 3: Exact Ollama.com Download Page & Button (local frames 195 - 270 | 0:12.5 - 0:15, button clicks at 0:13!) */}
        {showOllamaDownload && (
          <BrowserFrame url="ollama.com/download" width={940} height={860} startFrame={0}>
            <div
              style={{
                height: "100%",
                padding: "36px 40px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Ollama Logo & Header */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 22,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 42,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  🦙
                </div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#FFFFFF", marginTop: 14 }}>
                  Download Ollama
                </div>
                <div style={{ fontSize: 18, color: THEME.colors.textSecondary, marginTop: 6 }}>
                  Run Llama 3, DeepSeek-Coder, and open-source AI on your laptop.
                </div>
              </div>

              {/* OS Selection Chips */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {[
                  { name: "macOS", active: false, icon: "🍎" },
                  { name: "Windows", active: true, icon: "🪟" },
                  { name: "Linux", active: false, icon: "🐧" },
                ].map((os) => (
                  <div
                    key={os.name}
                    style={{
                      padding: "16px 12px",
                      borderRadius: 14,
                      backgroundColor: os.active ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                      border: `1px solid ${os.active ? "#6366F1" : "rgba(255, 255, 255, 0.08)"}`,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 26 }}>{os.icon}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginTop: 6 }}>{os.name}</div>
                    <div style={{ fontSize: 12, color: os.active ? "#34D399" : THEME.colors.textMuted, marginTop: 2 }}>
                      {os.active ? "✓ Selected" : "Available"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download CTA Button */}
              <div style={{ width: "100%", textAlign: "center" }}>
                <div
                  style={{
                    width: "100%",
                    padding: "22px 0",
                    borderRadius: 16,
                    background: isDownloaded
                      ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                      : "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                    color: "#FFFFFF",
                    fontSize: 26,
                    fontWeight: 900,
                    textAlign: "center",
                    boxShadow: isDownloaded
                      ? "0 12px 40px rgba(16, 185, 129, 0.5)"
                      : "0 12px 40px rgba(99, 102, 241, 0.5)",
                    transform: `scale(${frame >= 220 && frame <= 235 ? 0.94 : 1})`,
                    transition: "all 0.12s ease",
                  }}
                >
                  {isDownloaded ? "✓ Downloading OllamaSetup.exe (78.4 MB)" : "⬇ Download Ollama for Windows ➔"}
                </div>

                {isDownloaded && (
                  <div
                    style={{
                      marginTop: 14,
                      width: "100%",
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(100, (frame - 220) * 3)}%`,
                        background: "linear-gradient(90deg, #34D399 0%, #38BDF8 100%)",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Cursor Clicking Download Button at local frame 220 (global 400 = 13.3s, 0:13) */}
              <CursorPointer
                startX={650}
                startY={600}
                endX={470}
                endY={740}
                moveStartFrame={200}
                moveEndFrame={220}
                clickFrame={220}
              />
            </div>
          </BrowserFrame>
        )}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 3: TERMINAL & RUNNING OLLAMA SCRIPT (Frames 450 - 720 | 15.0s - 24.0s)
// Audio: "Next, open your terminal and type one simple command: ollama run llama3, or deepseek-coder, and press enter."
// At 0:20 - 0:21: "and press enter" -> [ ↵ ENTER ] key presses -> Live script runs in terminal!
// =========================================================================
const SceneTerminal: React.FC = () => {
  const frame = useCurrentFrame();

  const isTyping = frame >= 95;
  const commandText = "ollama run deepseek-coder";
  const typedCount = Math.min(
    commandText.length,
    Math.floor(interpolate(frame, [95, 160], [0, commandText.length], { extrapolateRight: "clamp" }))
  );
  const displayedCommand = commandText.slice(0, typedCount);

  // Enter Key Pressed at local frame 170 (global 620 = 20.7s, exactly 0:20 - 0:21!)
  const isEntered = frame >= 170;

  // Running Script Output (frames 180 to 270 | global 630 - 720, 21.0s - 24.0s)
  const isRunning = frame >= 180;
  const downloadProgress = Math.min(
    100,
    Math.floor(interpolate(frame, [195, 235], [0, 100], { extrapolateRight: "clamp" }))
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 20,
            backgroundColor: "rgba(168, 85, 247, 0.16)",
            border: "1px solid rgba(168, 85, 247, 0.45)",
            color: "#C084FC",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          {isRunning ? "RUNNING LOCAL SCRIPT" : "STEP 2: CLI LAUNCH"}
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          {isRunning ? "Live Script Execution" : "One Simple Command"}
        </div>
      </div>

      {/* Terminal Mockup Container */}
      <div
        style={{
          width: 940,
          height: 860,
          borderRadius: 20,
          backgroundColor: "rgba(15, 17, 26, 0.88)",
          backdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75), 0 0 50px rgba(99, 102, 241, 0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            height: 52,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
            <span style={{ fontSize: 13, color: THEME.colors.textMuted, fontFamily: "monospace", marginLeft: 8 }}>
              user@laptop:~ (zsh)
            </span>
          </div>

          {isRunning && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px",
                borderRadius: 12,
                backgroundColor: "rgba(52, 211, 153, 0.15)",
                border: "1px solid rgba(52, 211, 153, 0.4)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#34D399", boxShadow: "0 0 8px #34D399" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#34D399" }}>RUNNING SCRIPT</span>
            </div>
          )}
        </div>

        {/* Terminal Body */}
        <div
          style={{
            flex: 1,
            padding: "32px",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 18, color: THEME.colors.textMuted }}>
              # Launch local open-source LLM engine:
            </div>

            {/* Prompt Line */}
            <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700, color: "#FFFFFF", flexWrap: "wrap", gap: 10 }}>
              <span style={{ color: "#38BDF8" }}>➜</span>
              <span style={{ color: "#34D399" }}>~</span>
              <span>{isTyping ? displayedCommand : ""}</span>
              {!isEntered && (
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 30,
                    backgroundColor: "#38BDF8",
                    opacity: frame % 12 < 6 ? 1 : 0,
                  }}
                />
              )}

              {/* Enter Key Badge at 0:20 - 0:21 */}
              {frame >= 155 && !isRunning && (
                <span
                  style={{
                    marginLeft: 12,
                    padding: "4px 14px",
                    borderRadius: 8,
                    backgroundColor: isEntered ? "#059669" : "rgba(255, 255, 255, 0.12)",
                    border: `1px solid ${isEntered ? "#34D399" : "rgba(255, 255, 255, 0.25)"}`,
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 800,
                    transform: `scale(${isEntered ? 0.9 : 1})`,
                    boxShadow: isEntered ? "0 0 15px rgba(52, 211, 153, 0.5)" : "none",
                  }}
                >
                  ↵ ENTER
                </span>
              )}
            </div>

            {/* RUNNING SCRIPT OUTPUT (Streamed in from frame 180 to 270 | 0:21 to 0:24) */}
            {isRunning && (
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12, fontSize: 17, lineHeight: 1.5 }}>
                <div style={{ color: "#9CA3AF" }}>
                  [Ollama CLI v0.5.1 Initialized]
                </div>
                {frame >= 190 && (
                  <div style={{ color: "#38BDF8" }}>
                    ⠋ Pulling manifest: deepseek-coder:6.7b... <span style={{ color: "#34D399" }}>[Done]</span>
                  </div>
                )}
                {frame >= 200 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ color: "#F59E0B" }}>
                      ⠙ Downloading model weights: {downloadProgress}% (4.1 GB / 4.1 GB) 138 MB/s
                    </div>
                    {/* Visual Progress Bar in Terminal */}
                    <div
                      style={{
                        width: "100%",
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${downloadProgress}%`,
                          background: "linear-gradient(90deg, #38BDF8 0%, #34D399 100%)",
                        }}
                      />
                    </div>
                  </div>
                )}
                {frame >= 225 && (
                  <div style={{ color: "#818CF8" }}>
                    ✓ Verifying SHA256 integrity checksums... <span style={{ color: "#34D399" }}>[Verified]</span>
                  </div>
                )}
                {frame >= 240 && (
                  <div style={{ color: "#34D399", fontWeight: 700 }}>
                    ✓ Model loaded into local GPU VRAM (Unified 8.4 GB allocated)
                  </div>
                )}
                {frame >= 252 && (
                  <div style={{ color: "#FFFFFF", fontWeight: 800, marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#34D399" }}>&gt;&gt;&gt;</span>
                    <span>Send a message (/? for help)</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 20,
                        backgroundColor: "#34D399",
                        opacity: frame % 10 < 5 ? 1 : 0,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Model Architecture Switcher Banner */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 14,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 15, color: THEME.colors.textMuted }}>SUPPORTED LOCAL ENGINES:</div>
            <div style={{ display: "flex", gap: 10 }}>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: 8,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  color: "#38BDF8",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Llama 3 (Meta)
              </span>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: 8,
                  backgroundColor: "rgba(192, 132, 252, 0.25)",
                  color: "#C084FC",
                  border: "1px solid #C084FC",
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                DeepSeek Coder ⚡
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 4: RAM & GPU HARDWARE ALLOCATION
// =========================================================================
const SceneHardware: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress surge from 0% to 100% across local frames 10 to 120
  const allocPercent = Math.min(
    100,
    Math.floor(interpolate(frame, [10, 120], [0, 100], { extrapolateRight: "clamp" }))
  );
  const memoryGB = (allocPercent * 0.084).toFixed(1);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 20,
          backgroundColor: "rgba(52, 211, 153, 0.16)",
          border: "1px solid rgba(52, 211, 153, 0.45)",
          color: "#34D399",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        HARDWARE ACCELERATION
      </div>

      <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1, textAlign: "center", marginBottom: 36 }}>
        Direct On-Device Memory
      </div>

      {/* Hardware Monitor Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* RAM Unified Memory Gauge */}
        <div
          style={{
            padding: "30px 36px",
            borderRadius: 22,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>🧠</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>Unified System RAM</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#34D399" }}>
              {memoryGB} GB / 32 GB
            </div>
          </div>

          {/* Progress Bar Container */}
          <div
            style={{
              width: "100%",
              height: 20,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${allocPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6366F1 0%, #38BDF8 60%, #34D399 100%)",
                boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)",
                borderRadius: 10,
              }}
            />
          </div>
          <div style={{ fontSize: 14, color: THEME.colors.textMuted, marginTop: 10 }}>
            Llama-3-8B 4-bit quantized weights mapped into unified bandwidth
          </div>
        </div>

        {/* GPU Metal / CUDA Gauge */}
        <div
          style={{
            padding: "30px 36px",
            borderRadius: 22,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>⚡</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>GPU Core Acceleration</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#38BDF8" }}>
              Metal / CUDA Active
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
            <div style={{ padding: "14px 18px", borderRadius: 12, backgroundColor: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.35)" }}>
              <div style={{ fontSize: 13, color: THEME.colors.textMuted }}>COMPUTE UTILIZATION</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>98% Active</div>
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 12, backgroundColor: "rgba(99, 102, 241, 0.12)", border: "1px solid rgba(99, 102, 241, 0.35)" }}>
              <div style={{ fontSize: 13, color: THEME.colors.textMuted }}>INFERENCE PIPELINE</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>Zero Network I/O</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 5: THE ULTIMATE OFFLINE WI-FI TEST
// =========================================================================
const SceneOfflineTest: React.FC = () => {
  const frame = useCurrentFrame();
  const isDisconnected = frame >= 75;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 20,
          backgroundColor: isDisconnected ? "rgba(239, 68, 68, 0.16)" : "rgba(52, 211, 153, 0.16)",
          border: `1px solid ${isDisconnected ? "#EF4444" : "#34D399"}`,
          color: isDisconnected ? "#EF4444" : "#34D399",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 20,
        }}
      >
        THE ULTIMATE TEST
      </div>

      <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1, textAlign: "center", marginBottom: 36 }}>
        Turn Off Wi-Fi & Internet
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 840 }}>
        {/* Wi-Fi Control Card */}
        <div
          style={{
            padding: "44px",
            borderRadius: 26,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(28px)",
            border: `2px solid ${isDisconnected ? "rgba(239, 68, 68, 0.5)" : "rgba(52, 211, 153, 0.4)"}`,
            boxShadow: isDisconnected
              ? "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(239, 68, 68, 0.25)"
              : "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(52, 211, 153, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            transition: "all 0.2s ease",
          }}
        >
          {/* Top Switch Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 54 }}>{isDisconnected ? "🚫" : "📶"}</span>
              <div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>Wi-Fi Connection</div>
                <div style={{ fontSize: 18, color: isDisconnected ? "#EF4444" : "#34D399", marginTop: 4 }}>
                  {isDisconnected ? "● Completely Disconnected" : "● Connected (Home Network)"}
                </div>
              </div>
            </div>

            {/* Interactive Toggle Pill Switch */}
            <div
              style={{
                width: 90,
                height: 50,
                borderRadius: 25,
                backgroundColor: isDisconnected ? "#374151" : "#10B981",
                padding: 5,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: isDisconnected ? "flex-start" : "flex-end",
                cursor: "pointer",
                boxShadow: isDisconnected ? "none" : "0 0 20px rgba(16, 185, 129, 0.5)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                }}
              />
            </div>
          </div>

          {/* Offline Security Status Pill */}
          <div
            style={{
              padding: "20px 28px",
              borderRadius: 16,
              backgroundColor: isDisconnected ? "rgba(239, 68, 68, 0.15)" : "rgba(255, 255, 255, 0.03)",
              border: `1px solid ${isDisconnected ? "rgba(239, 68, 68, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>{isDisconnected ? "🔒" : "🌐"}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
                {isDisconnected ? "Air-Gapped Private Environment" : "Connected to Remote Cloud"}
              </span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: isDisconnected ? "#EF4444" : THEME.colors.textMuted }}>
              {isDisconnected ? "100% OFFLINE ✓" : "ONLINE"}
            </span>
          </div>
        </div>

        {/* Guided Animated Cursor clicking toggle at local frame 75 */}
        <CursorPointer
          startX={640}
          startY={300}
          endX={760}
          endY={70}
          moveStartFrame={20}
          moveEndFrame={75}
          clickFrame={75}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 6: BLAZING TOKEN STREAM & ABSOLUTE PRIVACY
// =========================================================================
const SceneTokenStream: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
      }}
    >
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 20,
            backgroundColor: "rgba(52, 211, 153, 0.16)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            color: "#34D399",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          LIVE LOCAL INFERENCE
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          Blazing Fast & Zero Latency
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 880, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Real-time Streaming Terminal */}
        <div
          style={{
            padding: "28px 32px",
            borderRadius: 20,
            backgroundColor: "rgba(15, 17, 26, 0.85)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ fontSize: 18, color: "#38BDF8", marginBottom: 12 }}>
            &gt; Query: "Write an optimized Python async worker"
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: "#FFFFFF" }}>
            <span style={{ color: "#F472B6" }}>async def</span> <span style={{ color: "#60A5FA" }}>fetch_batch</span>(tasks):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;results = <span style={{ color: "#F472B6" }}>await</span> asyncio.gather(*tasks)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#F472B6" }}>return</span> [r.json() <span style={{ color: "#F472B6" }}>for</span> r <span style={{ color: "#F472B6" }}>in</span> results]<br />
            <span style={{ color: "#34D399" }}># Output verified & executed on local silicon.</span>
          </div>
        </div>

        {/* Speedometer & Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { icon: "⚡", title: "78 TOKENS / SEC", sub: "Instant Native Speed", frame: 40 },
            { icon: "🔒", title: "ZERO TELEMETRY", sub: "Data Never Leaves Device", frame: 70 },
            { icon: "💳", title: "$0 SUBSCRIPTIONS", sub: "Zero Monthly Bills", frame: 100 },
            { icon: "🌐", title: "100% OFFLINE", sub: "Works on Planes & Remote", frame: 130 },
          ].map((card) => {
            const isVisible = frame >= card.frame;
            return (
              <div
                key={card.title}
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  backgroundColor: isVisible ? "rgba(99, 102, 241, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isVisible ? "rgba(99, 102, 241, 0.45)" : "rgba(255, 255, 255, 0.08)"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transform: `scale(${isVisible ? 1 : 0.96})`,
                  boxShadow: isVisible ? "0 10px 30px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <span style={{ fontSize: 32 }}>{card.icon}</span>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: "#FFFFFF" }}>{card.title}</div>
                  <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 2 }}>{card.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 7: COMMUNITY POLL & FOLLOW CTA
// =========================================================================
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const isFollowClicked = frame >= 115;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {/* Community Poll Question Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 840,
          padding: "36px 40px",
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: "#F59E0B", letterSpacing: 2 }}>
          COMMUNITY POLL
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#FFFFFF", marginTop: 12, lineHeight: 1.2 }}>
          What Local Model Should We Test Next?
        </div>

        {/* Poll Options */}
        <div style={{ display: "flex", gap: 18, marginTop: 28 }}>
          <div
            style={{
              flex: 1,
              padding: "18px 0",
              borderRadius: 14,
              backgroundColor: "rgba(56, 189, 248, 0.18)",
              border: "2px solid #38BDF8",
              color: "#38BDF8",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 8px 25px rgba(56, 189, 248, 0.3)",
            }}
          >
            Llama 3.3 (Meta) 🔥 64%
          </div>

          <div
            style={{
              flex: 1,
              padding: "18px 0",
              borderRadius: 14,
              backgroundColor: "rgba(192, 132, 252, 0.18)",
              border: "2px solid #C084FC",
              color: "#C084FC",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 8px 25px rgba(192, 132, 252, 0.3)",
            }}
          >
            DeepSeek Coder ⚡ 36%
          </div>
        </div>
      </div>

      {/* Creator Follow Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 840,
          padding: "24px 32px",
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1 0%, #38BDF8 50%, #34D399 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.45)",
            }}
          >
            V
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF" }}>@vizion.std</div>
            <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>Daily AI Workflows & Free Tools</div>
          </div>
        </div>

        {/* Animated Follow Button */}
        <div
          style={{
            padding: "16px 36px",
            borderRadius: 14,
            backgroundColor: isFollowClicked ? "#059669" : THEME.colors.accentTerracotta,
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 800,
            transform: `scale(${frame >= 115 && frame <= 130 ? 0.92 : 1})`,
            boxShadow: isFollowClicked
              ? "0 8px 30px rgba(5, 150, 105, 0.5)"
              : "0 8px 30px rgba(204, 120, 92, 0.45)",
            transition: "all 0.12s ease",
          }}
        >
          {isFollowClicked ? "FOLLOWING ✓" : "+ FOLLOW"}
        </div>

        {/* Guided Animated Cursor clicking Follow at local frame 115 */}
        <CursorPointer
          startX={700}
          startY={150}
          endX={720}
          endY={48}
          moveStartFrame={40}
          moveEndFrame={115}
          clickFrame={115}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// UNIVERSAL KINETIC CAPTIONS COMPONENT (Instagram Reels Safe Zone)
// =========================================================================
const UniversalCaptions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const captionData = getActiveCaption(globalFrame);
  if (!captionData) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1510,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        boxSizing: "border-box",
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(13, 15, 24, 0.88)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 20,
          padding: "16px 36px",
          textAlign: "center",
          maxWidth: 960,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 40px rgba(99, 102, 241, 0.25)",
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.3,
            letterSpacing: -0.5,
          }}
        >
          {captionData.normal}
        </span>
        {captionData.highlight && (
          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: captionData.color || "#38BDF8",
              marginLeft: 10,
              textShadow: `0 0 25px ${captionData.color || "#38BDF8"}`,
            }}
          >
            {captionData.highlight}
          </span>
        )}
      </div>
    </div>
  );
};

// Caption Timestamp Mapping aligned to ElevenLabs 51.8s audio beats
function getActiveCaption(frame: number): { normal: string; highlight?: string; color?: string } | null {
  // [0.0s - 6.0s | 0 - 180]
  if (frame >= 0 && frame < 90) {
    return { normal: "Stop paying $20/month for", highlight: "CLOUD AI", color: "#EF4444" };
  }
  if (frame >= 90 && frame < 180) {
    return { normal: "Run it completely free on your", highlight: "OWN LAPTOP", color: "#34D399" };
  }

  // [6.0s - 15.0s | 180 - 450]
  if (frame >= 180 && frame < 320) {
    return { normal: "Private offline AI in", highlight: "UNDER 2 MINUTES", color: "#38BDF8" };
  }
  if (frame >= 320 && frame < 375) {
    return { normal: "Google search & head to", highlight: "OLLAMA.COM", color: "#818CF8" };
  }
  if (frame >= 375 && frame < 450) {
    return { normal: "Download one-click app for", highlight: "YOUR SYSTEM", color: "#34D399" };
  }

  // [15.0s - 24.0s | 450 - 720]
  if (frame >= 450 && frame < 545) {
    return { normal: "Open terminal & type", highlight: "ONE COMMAND", color: "#FFFFFF" };
  }
  if (frame >= 545 && frame < 615) {
    return { normal: "ollama run", highlight: "DEEPSEEK-CODER", color: "#C084FC" };
  }
  if (frame >= 615 && frame < 720) {
    return { normal: "Press enter & run", highlight: "LOCAL AI SCRIPT", color: "#34D399" };
  }

  // [24.0s - 28.3s | 720 - 850]
  if (frame >= 720 && frame < 850) {
    return { normal: "Model loads directly into", highlight: "RAM & GPU", color: "#34D399" };
  }

  // [28.3s - 35.8s | 850 - 1074]
  if (frame >= 850 && frame < 960) {
    return { normal: "Now the ultimate test:", highlight: "TURN OFF WI-FI", color: "#F59E0B" };
  }
  if (frame >= 960 && frame < 1074) {
    return { normal: "Disconnect completely from", highlight: "THE INTERNET", color: "#EF4444" };
  }

  // [35.8s - 44.5s | 1074 - 1335]
  if (frame >= 1074 && frame < 1200) {
    return { normal: "Ask anything:", highlight: "BLAZING FAST TOKENS", color: "#38BDF8" };
  }
  if (frame >= 1200 && frame < 1335) {
    return { normal: "Zero tracking //", highlight: "DATA NEVER LEAVES", color: "#34D399" };
  }

  // [44.5s - 52.0s | 1335 - 1560]
  if (frame >= 1335 && frame < 1450) {
    return { normal: "What local model should we", highlight: "TEST NEXT?", color: "#F59E0B" };
  }
  if (frame >= 1450 && frame < 1560) {
    return { normal: "SAVE FOR LATER &", highlight: "FOLLOW FOR FREE TOOLS", color: "#CC785C" };
  }

  return null;
}
