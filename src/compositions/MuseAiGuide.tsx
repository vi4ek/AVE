import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import {
  BrowserFrame,
  ClaudeCard,
  CursorPointer,
  ParticleBackdrop,
} from "../components";
import { THEME } from "../theme/tokens";

export const MuseAiGuide: React.FC = () => {
  const globalFrame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.canvas,
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Ambient Lighting & Particles */}
      <ParticleBackdrop showGrid={true} glowPosition="center" />

      {/* Synchronized Voiceover Audio Track (43.47 seconds) */}
      <Audio src={staticFile("inputs/voiceover.mp3")} volume={1.0} />

      {/* Frame-Accurate Synchronized Sound Effects */}
      {globalFrame === 1 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.8} />}
      {globalFrame === 45 && <Audio src={staticFile("sfx/riser.wav")} volume={0.6} />}
      {globalFrame === 116 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />}
      {globalFrame === 180 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {globalFrame === 235 && <Audio src={staticFile("sfx/click.wav")} volume={0.7} />}
      {globalFrame === 330 && <Audio src={staticFile("sfx/click.wav")} volume={0.6} />}
      {globalFrame === 440 && <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />}
      {globalFrame === 470 && <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />}
      {globalFrame === 540 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.7} />}
      {globalFrame === 705 && <Audio src={staticFile("sfx/click.wav")} volume={0.65} />}
      {globalFrame === 765 && <Audio src={staticFile("sfx/click.wav")} volume={0.65} />}
      {globalFrame === 825 && <Audio src={staticFile("sfx/click.wav")} volume={0.75} />}
      {globalFrame === 910 && <Audio src={staticFile("sfx/pop.wav")} volume={0.7} />}
      {globalFrame === 960 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.85} />}
      {globalFrame === 1080 && <Audio src={staticFile("sfx/click.wav")} volume={0.5} />}
      {globalFrame === 1150 && <Audio src={staticFile("sfx/click.wav")} volume={0.8} />}
      {globalFrame === 1152 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.85} />}
      {globalFrame === 1220 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />}

      {/* =========================================================================
          BEAT 1 & 2: THE HOOK (Frames 0 - 180 | 0.0s - 6.0s)
          "Wait… Muse AI is giving users one BILLION tokens?! Let me show you how to get started."
          ========================================================================= */}
      <Sequence from={0} durationInFrames={180} name="Beat 1 & 2: Hook">
        <SceneHook />
      </Sequence>

      {/* =========================================================================
          BEAT 3: STEP 1 — OPEN MUSE AI & SIGN UP (Frames 180 - 270 | 6.0s - 9.0s)
          "First, open Muse AI and click Sign Up."
          ========================================================================= */}
      <Sequence from={180} durationInFrames={90} name="Beat 3: Step 1 Sign Up">
        <SceneSignUp />
      </Sequence>

      {/* =========================================================================
          BEAT 4 & 5: EXPLORE DASHBOARD TOOLS (Frames 270 - 540 | 9.0s - 18.0s)
          "Create your account using the available sign-in option... explore AI tools..."
          ========================================================================= */}
      <Sequence from={270} durationInFrames={270} name="Beat 4 & 5: Dashboard">
        <SceneDashboard />
      </Sequence>

      {/* =========================================================================
          BEAT 6: THE PIVOT (Frames 540 - 680 | 18.0s - 22.7s)
          "But here’s the interesting part… You can claim the one-billion-token reward."
          ========================================================================= */}
      <Sequence from={540} durationInFrames={140} name="Beat 6: The Pivot">
        <ScenePivot />
      </Sequence>

      {/* =========================================================================
          BEAT 7: STEP 2 — SETTINGS NAVIGATION (Frames 680 - 890 | 22.7s - 29.7s)
          "Look for the token or reward section in settings, Go to Referral code claim..."
          ========================================================================= */}
      <Sequence from={680} durationInFrames={210} name="Beat 7: Step 2 Settings">
        <SceneSettingsPath />
      </Sequence>

      {/* =========================================================================
          BEAT 8: STEP 3 — BALANCE UPDATE (Frames 890 - 1020 | 29.7s - 34.0s)
          "Once your claim is completed, your token balance should update. And that’s it!"
          ========================================================================= */}
      <Sequence from={890} durationInFrames={130} name="Beat 8: Balance Surge">
        <SceneBalanceSurge />
      </Sequence>

      {/* =========================================================================
          BEAT 9: HERO REFERRAL CODE (Frames 1020 - 1220 | 34.0s - 40.7s)
          "But wait — use my referral code, NKGW5B, to claim the one-billion-token reward."
          ========================================================================= */}
      <Sequence from={1020} durationInFrames={200} name="Beat 9: Code Hero">
        <SceneReferralCode />
      </Sequence>

      {/* =========================================================================
          BEAT 10: OUTRO / FOLLOW CTA (Frames 1220 - 1305 | 40.7s - 43.5s)
          "Follow for more AI tools and tricks like this!"
          ========================================================================= */}
      <Sequence from={1220} durationInFrames={85} name="Beat 10: Outro">
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

// -----------------------------------------------------------------------------
// Sub-components with local frame awareness
// -----------------------------------------------------------------------------

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(204, 120, 92, 0.15)",
          border: `1px solid ${THEME.colors.accentTerracotta}`,
          color: THEME.colors.accentAmber,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 32,
          transform: `scale(${interpolate(frame, [0, 15], [0.8, 1], { extrapolateRight: "clamp" })})`,
          opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        ⚡ FREE REWARD ALERT
      </div>

      <div
        style={{
          fontSize: 66,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          lineHeight: 1.15,
          opacity: interpolate(frame, [8, 22], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [8, 22], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        Wait… Muse AI is giving away
      </div>

      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          background: "linear-gradient(135deg, #F3F3EE 20%, #CC785C 70%, #E07A5F 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginTop: 18,
          letterSpacing: -1.5,
          filter: "drop-shadow(0 0 35px rgba(204, 120, 92, 0.5))",
          transform: `scale(${interpolate(frame, [35, 55], [0.88, 1], { extrapolateRight: "clamp" })})`,
          opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        1 BILLION TOKENS?!
      </div>

      <div
        style={{
          fontSize: 34,
          color: THEME.colors.textSecondary,
          marginTop: 40,
          fontFamily: "'Newsreader', Georgia, serif",
          fontStyle: "italic",
          opacity: interpolate(frame, [116, 135], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [116, 135], [20, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        Let me show you how to get started ➔
      </div>
    </AbsoluteFill>
  );
};

const SceneSignUp: React.FC = () => {
  const frame = useCurrentFrame();
  const isClicked = frame >= 55;

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
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: THEME.colors.accentTerracotta, fontWeight: 700, letterSpacing: 1.5 }}>
          STEP 1
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 8 }}>
          Open Muse.ai & Click Sign Up
        </div>
      </div>

      <div style={{ position: "relative", width: 920, height: 760 }}>
        <BrowserFrame url="muse.ai" width={920} height={760} startFrame={0}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              boxSizing: "border-box",
              gap: 30,
            }}
          >
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: 22,
                background: "linear-gradient(135deg, #CC785C 0%, #1A1B23 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 900,
                color: "#fff",
                boxShadow: "0 10px 30px rgba(204, 120, 92, 0.4)",
              }}
            >
              M
            </div>

            <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary }}>
              Next-Gen AI Video Platform
            </div>

            {/* Interactive Sign Up Button */}
            <div
              style={{
                width: "100%",
                maxWidth: 440,
                padding: "22px 32px",
                borderRadius: 14,
                backgroundColor: isClicked ? "#9B4E37" : THEME.colors.accentTerracotta,
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                textAlign: "center",
                transform: `scale(${frame >= 55 && frame <= 67 ? 0.93 : 1})`,
                boxShadow: "0 12px 35px rgba(204, 120, 92, 0.4)",
                transition: "transform 0.1s ease",
              }}
            >
              Sign Up Free ➔
            </div>
          </div>
        </BrowserFrame>

        {/* Cursor gliding from bottom-right (X:760, Y:620) to button center (X:430, Y:450) and clicking at frame 55 */}
        <CursorPointer
          startX={760}
          startY={620}
          endX={430}
          endY={450}
          moveStartFrame={10}
          moveEndFrame={55}
          clickFrame={55}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();

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
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: THEME.colors.accentIris, fontWeight: 700, letterSpacing: 1.5 }}>
          INSIDE MUSE.AI
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 8 }}>
          Explore AI Creation Tools
        </div>
      </div>

      <div style={{ position: "relative", width: 920, height: 820 }}>
        <BrowserFrame url="muse.ai/dashboard" width={920} height={820} startFrame={0}>
          <div style={{ padding: 36, height: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: THEME.colors.accentTerracotta, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>U</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary }}>Creator Account</div>
                  <div style={{ fontSize: 14, color: "#27C93F" }}>● Online & Verified</div>
                </div>
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 8, backgroundColor: "rgba(255, 255, 255, 0.08)", fontSize: 15, color: THEME.colors.textSecondary }}>
                ⚙️ Settings
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { icon: "🎬", name: "AI Video Generation", desc: "Text-to-video, inpainting & 4K upscaling", showFrame: 30 },
                { icon: "🎙️", name: "Voice & Audio Synthesizer", desc: "Studio narration & automatic sound design", showFrame: 90 },
                { icon: "🔍", name: "Semantic Video Search", desc: "Instant clip discovery across media vault", showFrame: 150 },
              ].map((tool) => {
                const isActive = frame >= tool.showFrame;
                return (
                  <div
                    key={tool.name}
                    style={{
                      padding: "20px 24px",
                      borderRadius: 16,
                      backgroundColor: isActive ? "rgba(204, 120, 92, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      border: `1px solid ${isActive ? "rgba(204, 120, 92, 0.45)" : "rgba(255, 255, 255, 0.08)"}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      transform: `scale(${isActive ? 1 : 0.96})`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ fontSize: 36 }}>{tool.icon}</div>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: THEME.colors.textPrimary }}>{tool.name}</div>
                      <div style={{ fontSize: 17, color: THEME.colors.textSecondary, marginTop: 4 }}>{tool.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BrowserFrame>

        {/* Guided cursor hovering over tools */}
        <CursorPointer
          startX={600}
          startY={650}
          endX={420}
          endY={310}
          moveStartFrame={40}
          moveEndFrame={90}
          clickFrame={90}
        />
      </div>
    </AbsoluteFill>
  );
};

const ScenePivot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          border: `1px solid ${THEME.colors.accentWarmGlow}`,
          color: THEME.colors.accentWarmGlow,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 28,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        ⭐ HERE IS THE SECRET
      </div>

      <div style={{ fontSize: 60, fontWeight: 800, color: THEME.colors.textPrimary, lineHeight: 1.2 }}>
        You Can Claim The
      </div>

      <div
        style={{
          fontSize: 78,
          fontWeight: 900,
          color: THEME.colors.accentAmber,
          letterSpacing: -1,
          marginTop: 16,
          filter: "drop-shadow(0 0 30px rgba(224, 122, 95, 0.5))",
          transform: `scale(${interpolate(frame, [15, 35], [0.92, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        1-BILLION-TOKEN
      </div>

      <div style={{ fontSize: 60, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 12 }}>
        Reward Right Now.
      </div>
    </AbsoluteFill>
  );
};

const SceneSettingsPath: React.FC = () => {
  const frame = useCurrentFrame();

  // Local frame activations:
  // Step 1 clicks at local frame 25
  // Step 2 clicks at local frame 85
  // Step 3 clicks at local frame 145
  const activeStep = frame < 85 ? 1 : frame < 145 ? 2 : 3;

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
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: THEME.colors.accentTerracotta, fontWeight: 700, letterSpacing: 1.5 }}>
          STEP 2: THE CLAIM PATH
        </div>
        <div style={{ fontSize: 50, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 8 }}>
          Settings ➔ General ➔ Usage
        </div>
      </div>

      <div style={{ position: "relative", width: 920 }}>
        <ClaudeCard title="Redemption Navigation" badge="3 CLICKS" width={920} glowColor="terracotta">
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "16px 0" }}>
            {[
              { id: "s1", num: "1", title: "Open Settings", desc: "Click the gear icon in your account", stepNum: 1 },
              { id: "s2", num: "2", title: "General → Usage", desc: "Select the usage & tokens tab", stepNum: 2 },
              { id: "s3", num: "3", title: "Redeem Invite Code", desc: "Click the referral code claim button", stepNum: 3 },
            ].map((item) => {
              const isSelected = activeStep >= item.stepNum;
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    padding: "22px 28px",
                    borderRadius: 16,
                    backgroundColor: isSelected ? "rgba(204, 120, 92, 0.18)" : "rgba(255, 255, 255, 0.03)",
                    border: `2px solid ${isSelected ? THEME.colors.accentTerracotta : "rgba(255, 255, 255, 0.07)"}`,
                    transform: `scale(${isSelected ? 1.02 : 1})`,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      backgroundColor: isSelected ? THEME.colors.accentTerracotta : "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: THEME.colors.textPrimary }}>{item.title}</div>
                    <div style={{ fontSize: 20, color: THEME.colors.textSecondary, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ClaudeCard>

        {/* Cursor guiding sequentially through the 3 steps */}
        <CursorPointer
          startX={frame < 80 ? 250 : frame < 140 ? 460 : 460}
          startY={frame < 80 ? 120 : frame < 140 ? 250 : 380}
          endX={frame < 80 ? 460 : frame < 140 ? 460 : 460}
          endY={frame < 80 ? 120 : frame < 140 ? 250 : 380}
          moveStartFrame={frame < 80 ? 5 : frame < 140 ? 70 : 130}
          moveEndFrame={frame < 80 ? 25 : frame < 140 ? 85 : 145}
          clickFrame={frame < 80 ? 25 : frame < 140 ? 85 : 145}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneBalanceSurge: React.FC = () => {
  const frame = useCurrentFrame();

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
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: "#27C93F", fontWeight: 700, letterSpacing: 1.5 }}>
          ✓ CLAIM COMPLETED
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 8 }}>
          Token Balance Updated!
        </div>
      </div>

      <ClaudeCard badge="ACTIVE BALANCE" title="Muse AI Vault" width={920} glowColor="amber">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "36px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              backgroundColor: "rgba(39, 201, 63, 0.15)",
              border: "2px solid #27C93F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              color: "#27C93F",
              marginBottom: 20,
              transform: `scale(${interpolate(frame, [0, 15], [0.5, 1], { extrapolateRight: "clamp" })})`,
            }}
          >
            ✓
          </div>

          {/* Number counter dynamically spinning up */}
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: THEME.colors.accentAmber,
              letterSpacing: -1,
              filter: "drop-shadow(0 0 30px rgba(245, 158, 11, 0.5))",
            }}
          >
            {frame < 15
              ? "10,000"
              : frame < 30
              ? "250,000,000"
              : frame < 50
              ? "750,000,000"
              : "1,000,000,000"}
          </div>

          <div style={{ fontSize: 26, color: THEME.colors.textSecondary, marginTop: 12 }}>
            FREE CREATION TOKENS
          </div>

          <div
            style={{
              marginTop: 32,
              padding: "12px 28px",
              borderRadius: 30,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: THEME.colors.textPrimary,
              fontSize: 22,
              fontWeight: 700,
              opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            🎉 And that’s it!
          </div>
        </div>
      </ClaudeCard>
    </AbsoluteFill>
  );
};

const SceneReferralCode: React.FC = () => {
  const frame = useCurrentFrame();
  const isCodeRedeemed = frame >= 130;

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
          padding: "10px 26px",
          borderRadius: 30,
          backgroundColor: "rgba(204, 120, 92, 0.2)",
          border: `1.5px solid ${THEME.colors.accentTerracotta}`,
          color: THEME.colors.accentAmber,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 24,
        }}
      >
        🔥 USE THIS REFERRAL CODE
      </div>

      <div style={{ fontSize: 50, fontWeight: 800, color: THEME.colors.textPrimary, textAlign: "center", marginBottom: 36 }}>
        Claim Your 1 Billion Reward
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 880 }}>
        <div
          style={{
            width: "100%",
            padding: "44px 32px",
            borderRadius: 24,
            backgroundColor: THEME.colors.surfaceCard,
            border: "2px solid rgba(204, 120, 92, 0.6)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(204, 120, 92, 0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 22, color: THEME.colors.textMuted, letterSpacing: 1.5 }}>
            ENTER REFERRAL / INVITE CODE
          </div>

          {/* Animated Typewriter Effect */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              letterSpacing: 8,
              color: "#F3F3EE",
              fontFamily: "'JetBrains Mono', monospace",
              margin: "20px 0",
              padding: "16px 40px",
              borderRadius: 18,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              border: "1.5px dashed rgba(204, 120, 92, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {frame < 15 ? "N" : frame < 28 ? "NK" : frame < 42 ? "NKG" : frame < 55 ? "NKGW" : frame < 68 ? "NKGW5" : "NKGW5B"}
            <span style={{ opacity: frame % 14 < 7 ? 1 : 0, color: THEME.colors.accentTerracotta, marginLeft: 4 }}>|</span>
          </div>

          {/* Redeem Code Button */}
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              padding: "18px 24px",
              borderRadius: 14,
              backgroundColor: isCodeRedeemed ? "#9B4E37" : THEME.colors.accentTerracotta,
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
              transform: `scale(${frame >= 130 && frame <= 142 ? 0.93 : 1})`,
              boxShadow: "0 10px 30px rgba(204, 120, 92, 0.4)",
              marginBottom: 20,
              transition: "transform 0.1s ease",
            }}
          >
            {isCodeRedeemed ? "✓ Code Redeemed!" : "Redeem Code ➔"}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 30,
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: THEME.colors.accentWarmGlow,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            <span>⏱️</span>
            <span>Must redeem within 48 hours of signup</span>
          </div>
        </div>

        {/* Cursor gliding and clicking Redeem button at frame 130 */}
        <CursorPointer
          startX={640}
          startY={580}
          endX={440}
          endY={380}
          moveStartFrame={85}
          moveEndFrame={130}
          clickFrame={130}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #CC785C 0%, #E07A5F 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 54,
          boxShadow: "0 15px 45px rgba(204, 120, 92, 0.45)",
          marginBottom: 32,
          transform: `scale(${interpolate(frame, [0, 15], [0.6, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        ★
      </div>

      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          lineHeight: 1.2,
        }}
      >
        Follow For More AI Tools & Tricks
      </div>

      <div
        style={{
          fontSize: 32,
          color: THEME.colors.textTerracotta,
          marginTop: 20,
          fontFamily: "'Newsreader', Georgia, serif",
          fontStyle: "italic",
        }}
      >
        New AI drops & free rewards every week
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "16px 36px",
          borderRadius: 30,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: THEME.colors.textPrimary,
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        Code: NKGW5B
      </div>
    </AbsoluteFill>
  );
};
