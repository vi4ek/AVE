import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrowserFrame,
  CursorPointer,
  ParticleBackdrop,
} from "../components";
import { THEME } from "../theme/tokens";

// =========================================================================
// MAIN COMPOSITION: Google Playground AI Game Creation Reel (31.32s @ 30 FPS)
// =========================================================================
export const GooglePlaygroundReel: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic BGM Ducking Calculation
  // Swells during hook (0-15), drop/reveal (516-560), and ending (915-940)
  // Ducked down to 0.09 during intense spoken explanation
  let bgmVolume = 0.09;
  if (frame < 25) {
    bgmVolume = interpolate(frame, [0, 15, 25], [0.35, 0.35, 0.09], { extrapolateRight: "clamp" });
  } else if (frame >= 360 && frame < 516) {
    // Rising during AI synthesis riser
    bgmVolume = interpolate(frame, [360, 510], [0.09, 0.22], { extrapolateRight: "clamp" });
  } else if (frame >= 516 && frame < 570) {
    // Grand reveal drop surge
    bgmVolume = interpolate(frame, [516, 530, 570], [0.38, 0.35, 0.11], { extrapolateRight: "clamp" });
  } else if (frame >= 885) {
    // Final CTA surge
  } else if (frame >= 885) {
    // Final CTA surge with smooth fadeout
    bgmVolume = interpolate(frame, [885, 915, 960], [0.11, 0.30, 0.0], { extrapolateRight: "clamp" });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.canvas,
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Ambient Radial Lighting & Cyber Grid Backdrop */}
      <ParticleBackdrop showGrid={true} glowPosition="center" />

      {/* Synchronized Voiceover Track (Bounded Sequence) */}
      <Sequence from={0} durationInFrames={940}>
        <Audio src={staticFile("inputs/google_playground_vo.mp3")} volume={1.0} />
      </Sequence>

      {/* Energetic Electronic Tech BGM Track with Smooth Outro Fade */}
      <Sequence from={0} durationInFrames={960}>
        <Audio src={staticFile("sfx/tech_bgm.wav")} volume={bgmVolume} />
      </Sequence>

      {/* Frame-Accurate Synchronized SFX Triggers */}
      {frame === 1 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.85} />}
      {frame === 45 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />}
      {frame === 96 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 176 && <Audio src={staticFile("sfx/click.wav")} volume={0.75} />}
      {frame === 185 && <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />}
      {frame === 213 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 245 && <Audio src={staticFile("sfx/click.wav")} volume={0.5} />}
      {frame === 328 && <Audio src={staticFile("sfx/click.wav")} volume={0.75} />}
      {frame === 360 && <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />}
      {frame === 390 && <Audio src={staticFile("sfx/riser.wav")} volume={0.75} />}
      {frame === 516 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.9} />}
      {frame === 520 && <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />}
      {frame === 545 && <Audio src={staticFile("sfx/click.wav")} volume={0.7} />}
      {frame === 744 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 790 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 835 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />}
      {frame === 885 && <Audio src={staticFile("sfx/pop.wav")} volume={0.65} />}
      {frame === 920 && <Audio src={staticFile("sfx/click.wav")} volume={0.8} />}
      {frame === 922 && <Audio src={staticFile("sfx/sub_hit.wav")} volume={0.7} />}

      {/* =========================================================================
          SCENE 1: THE PATTERN-BREAKING HOOK (Frames 0 - 96 | 0.0s - 3.2s)
          "Google AI is making game creation seriously interesting."
          ========================================================================= */}
      <Sequence from={0} durationInFrames={96} name="Scene 1: Hook">
        <SceneHook />
      </Sequence>

      {/* =========================================================================
          SCENE 2: BROWSER FRAME & ACCESS CHECK (Frames 96 - 213 | 3.2s - 7.1s)
          "Imagine turning a simple idea into a playable game. First, open Google Playground and check whether you have access."
          ========================================================================= */}
      <Sequence from={96} durationInFrames={117} name="Scene 2: Access Check">
        <SceneAccessCheck />
      </Sequence>

      {/* =========================================================================
          SCENE 3: GAME IDEA PROMPT & WORKFLOW (Frames 213 - 360 | 7.1s - 12.0s)
          "Enter your game idea, follow the available creation workflow..."
          ========================================================================= */}
      <Sequence from={213} durationInFrames={147} name="Scene 3: Prompt Workflow">
        <ScenePromptWorkflow />
      </Sequence>

      {/* =========================================================================
          SCENE 4: AI GENERATION PIPELINE & RISER (Frames 360 - 516 | 12.0s - 17.2s)
          "...and let the AI generate your experience."
          ========================================================================= */}
      <Sequence from={360} durationInFrames={156} name="Scene 4: AI Synthesis">
        <SceneAISynthesis />
      </Sequence>

      {/* =========================================================================
          SCENE 5: THE HERO PLAYABLE REVEAL (Frames 516 - 744 | 17.2s - 24.8s)
          "Now watch this: your idea is becoming a game you can actually explore."
          ========================================================================= */}
      <Sequence from={516} durationInFrames={228} name="Scene 5: Playable Reveal">
        <ScenePlayableReveal />
      </Sequence>

      {/* =========================================================================
          SCENE 6: EXPERIMENTATION & ITERATION (Frames 744 - 885 | 24.8s - 29.5s)
          "And the best part? You can experiment with different ideas and see what you can create."
          ========================================================================= */}
      <Sequence from={744} durationInFrames={141} name="Scene 6: Experimentation">
        <SceneExperimentation />
      </Sequence>

      {/* =========================================================================
          SCENE 7: QUESTION & FOLLOW CTA (Frames 885 - 940 | 29.5s - 31.32s)
          "Would you try this? Follow for more crazy AI tools and tutorials."
          ========================================================================= */}
      <Sequence from={885} durationInFrames={75} name="Scene 7: CTA">
        <SceneCallToAction />
      </Sequence>

      {/* =========================================================================
          UNIVERSAL KINETIC CAPTIONS OVERLAY (Burned-in High Retention)
          ========================================================================= */}
      <UniversalCaptions globalFrame={frame} />
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 1: THE HOOK
// =========================================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: THEME.springs.snappy,
  });

  const punchInScale = interpolate(frame, [0, 15, 96], [1.18, 1.0, 1.05]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        transform: `scale(${punchInScale})`,
      }}
    >
      {/* Top Tag Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(66, 133, 244, 0.12)",
          border: "1px solid rgba(66, 133, 244, 0.4)",
          color: THEME.colors.googleBlue,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 36,
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: THEME.colors.googleGreen, boxShadow: "0 0 10px #34A853" }} />
        GOOGLE LABS // PLAYGROUND
      </div>

      {/* Hero Visual: Glowing Controller AI Emblem */}
      <div
        style={{
          position: "relative",
          width: 220,
          height: 220,
          borderRadius: 48,
          background: "linear-gradient(135deg, rgba(66, 133, 244, 0.25) 0%, rgba(234, 67, 53, 0.2) 50%, rgba(251, 188, 5, 0.25) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 20px 60px rgba(66, 133, 244, 0.35), inset 0 0 40px rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 44,
          transform: `scale(${interpolate(entrance, [0, 1], [0.85, 1])}) rotate(${interpolate(frame, [0, 96], [-3, 3])}deg)`,
        }}
      >
        <span style={{ fontSize: 96, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}>🎮</span>
        <div
          style={{
            position: "absolute",
            bottom: -16,
            right: -16,
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: THEME.colors.surfaceCard,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
          }}
        >
          ✨
        </div>
      </div>

      {/* Headline Text */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: THEME.colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.2,
          opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Google AI Just Made
      </div>

      <div
        style={{
          fontSize: 74,
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: -1.5,
          marginTop: 10,
          background: "linear-gradient(135deg, #FFFFFF 15%, #4285F4 60%, #38BDF8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 35px rgba(66, 133, 244, 0.6))",
          transform: `scale(${interpolate(frame, [15, 35], [0.94, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        GAME CREATION
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          marginTop: 12,
          letterSpacing: -0.5,
          opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Seriously Interesting.
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 2: ACCESS CHECK & ELIGIBILITY
// =========================================================================
const SceneAccessCheck: React.FC = () => {
  const frame = useCurrentFrame();
  const isClicked = frame >= 80;

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
      <div style={{ marginBottom: 30, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 20,
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: `1px solid ${THEME.colors.accentWarmGlow}`,
            color: THEME.colors.accentWarmGlow,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 12,
          }}
        >
          STEP 1: ACCESS CHECK
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          Open Google Playground
        </div>
      </div>

      <div style={{ position: "relative", width: 940, height: 860 }}>
        <BrowserFrame url="playground.google" width={940} height={860} startFrame={0}>
          <div
            style={{
              height: "100%",
              padding: "36px 44px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Playground App Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  P
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.textPrimary }}>Google Playground</div>
                  <div style={{ fontSize: 13, color: THEME.colors.textSecondary }}>Labs Experimental Tool</div>
                </div>
              </div>

              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  backgroundColor: "rgba(52, 168, 83, 0.15)",
                  border: "1px solid rgba(52, 168, 83, 0.4)",
                  color: "#34A853",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ● Live Service
              </div>
            </div>

            {/* Access Criteria Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Google Account Sign-In", sub: "Verified Creator Profile", status: "VERIFIED", icon: "👤", frame: 15 },
                { title: "Geographic Eligibility", sub: "Currently Rolling Out (US 18+)", status: "ELIGIBLE", icon: "🌐", frame: 35 },
                { title: "Creation Access Status", sub: "Tier 1 Instant Generation Enabled", status: "UNLOCKED", icon: "⚡", frame: 55 },
              ].map((item) => {
                const isItemActive = frame >= item.frame;
                return (
                  <div
                    key={item.title}
                    style={{
                      padding: "18px 24px",
                      borderRadius: 14,
                      backgroundColor: isItemActive ? "rgba(66, 133, 244, 0.08)" : "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${isItemActive ? "rgba(66, 133, 244, 0.4)" : "rgba(255, 255, 255, 0.06)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transform: `scale(${isItemActive ? 1 : 0.98})`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 28 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary }}>{item.title}</div>
                        <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 2 }}>{item.sub}</div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        backgroundColor: isItemActive ? "rgba(52, 168, 83, 0.2)" : "rgba(255, 255, 255, 0.05)",
                        color: isItemActive ? "#34A853" : THEME.colors.textMuted,
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: 1,
                      }}
                    >
                      {item.status} ✓
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Launch Studio Button */}
            <div
              style={{
                width: "100%",
                padding: "20px 0",
                borderRadius: 14,
                background: isClicked
                  ? "linear-gradient(135deg, #3367D6 0%, #2A75D3 100%)"
                  : "linear-gradient(135deg, #4285F4 0%, #1A73E8 100%)",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 800,
                textAlign: "center",
                boxShadow: "0 12px 30px rgba(66, 133, 244, 0.45)",
                transform: `scale(${frame >= 80 && frame <= 95 ? 0.94 : 1})`,
                transition: "transform 0.1s ease",
              }}
            >
              Launch Game Creator Studio ➔
            </div>
          </div>
        </BrowserFrame>

        {/* Guided Animated Cursor gliding to button and clicking at frame 80 */}
        <CursorPointer
          startX={780}
          startY={720}
          endX={470}
          endY={770}
          moveStartFrame={20}
          moveEndFrame={80}
          clickFrame={80}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 3: PROMPT INPUT & CREATION WORKFLOW
// =========================================================================
const ScenePromptWorkflow: React.FC = () => {
  const frame = useCurrentFrame();

  const fullPromptText = "Make a neon cyberpunk dodge runner: speed ramps, score multiplier & jumping physics";
  // Typing animation across local frames 15 to 90
  const typedChars = Math.min(
    fullPromptText.length,
    Math.floor(interpolate(frame, [15, 90], [0, fullPromptText.length], { extrapolateRight: "clamp" }))
  );
  const displayedPrompt = fullPromptText.slice(0, typedChars);

  const isGenerating = frame >= 115;

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
            backgroundColor: "rgba(129, 140, 248, 0.15)",
            border: `1px solid ${THEME.colors.accentIris}`,
            color: THEME.colors.accentIris,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          STEP 2: CREATION WORKFLOW
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          Prompt Your Game Idea
        </div>
      </div>

      <div style={{ position: "relative", width: 940, height: 860 }}>
        <BrowserFrame url="playground.google/studio" width={940} height={860} startFrame={0}>
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
            {/* Top Prompt Label */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textSecondary }}>
                  Describe your game mechanics & theme:
                </span>
                <span style={{ fontSize: 14, color: THEME.colors.googleBlue, fontWeight: 600 }}>
                  Model: Gemini 2.5 Flash
                </span>
              </div>

              {/* Chat Input Container */}
              <div
                style={{
                  minHeight: 180,
                  padding: "24px",
                  borderRadius: 16,
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: `2px solid ${frame >= 15 ? THEME.colors.googleBlue : "rgba(255, 255, 255, 0.1)"}`,
                  boxShadow: frame >= 15 ? "0 0 30px rgba(66, 133, 244, 0.25)" : "none",
                  fontSize: 26,
                  lineHeight: 1.45,
                  fontWeight: 600,
                  color: THEME.colors.textPrimary,
                  fontFamily: "'Inter', monospace",
                  position: "relative",
                }}
              >
                <span>{displayedPrompt}</span>
                {frame < 95 && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 3,
                      height: 28,
                      backgroundColor: THEME.colors.googleBlue,
                      marginLeft: 4,
                      verticalAlign: "middle",
                      opacity: frame % 10 < 5 ? 1 : 0,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Workflow Modifier Chips */}
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.textMuted, marginBottom: 12 }}>
                ENGINE PARAMETERS & PRESETS:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Genre", val: "3D Endless Runner", active: true },
                  { label: "Physics", val: "Smooth Jump & Dodge", active: true },
                  { label: "Aesthetics", val: "Cyberpunk Neon Grid", active: frame >= 60 },
                  { label: "Controls", val: "Keyboard & Touch", active: frame >= 75 },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      backgroundColor: chip.active ? "rgba(66, 133, 244, 0.12)" : "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${chip.active ? "rgba(66, 133, 244, 0.45)" : "rgba(255, 255, 255, 0.06)"}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 12, color: THEME.colors.textMuted, textTransform: "uppercase" }}>
                      {chip.label}
                    </span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: THEME.colors.textPrimary }}>
                      {chip.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div
              style={{
                width: "100%",
                padding: "20px 0",
                borderRadius: 14,
                background: isGenerating
                  ? "linear-gradient(135deg, #0F9D58 0%, #34A853 100%)"
                  : "linear-gradient(135deg, #4285F4 0%, #818CF8 100%)",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 800,
                textAlign: "center",
                boxShadow: isGenerating
                  ? "0 12px 35px rgba(52, 168, 83, 0.5)"
                  : "0 12px 35px rgba(66, 133, 244, 0.4)",
                transform: `scale(${frame >= 115 && frame <= 128 ? 0.94 : 1})`,
                transition: "all 0.15s ease",
              }}
            >
              {isGenerating ? "Compiling Experience... ⚡" : "Generate Playable Experience ✨"}
            </div>
          </div>
        </BrowserFrame>

        {/* Cursor moving to Generate button at frame 115 */}
        <CursorPointer
          startX={720}
          startY={360}
          endX={470}
          endY={770}
          moveStartFrame={75}
          moveEndFrame={115}
          clickFrame={115}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 4: AI GENERATION ENGINE & RISER
// =========================================================================
const SceneAISynthesis: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress surges from 0% to 100% across 156 frames
  const progressPercent = Math.min(
    100,
    Math.floor(interpolate(frame, [0, 40, 95, 140], [0, 42, 85, 100], { extrapolateRight: "clamp" }))
  );

  const stageText =
    progressPercent < 35
      ? "Parsing Game Logic & Mechanics..."
      : progressPercent < 75
      ? "Synthesizing 3D Shaders & Procedural Assets..."
      : progressPercent < 100
      ? "Assembling Browser Physics & Canvas..."
      : "100% Experience Ready!";

  // Camera pushes in as tension rises
  const zoomScale = interpolate(frame, [0, 150], [1.0, 1.15], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        transform: `scale(${zoomScale})`,
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(129, 140, 248, 0.15)",
          border: `1px solid ${THEME.colors.accentIris}`,
          color: THEME.colors.accentIris,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 36,
        }}
      >
        AI ENGINE AT WORK
      </div>

      {/* Central Circular Progress Dial */}
      <div
        style={{
          position: "relative",
          width: 320,
          height: 320,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
        }}
      >
        {/* Glowing Pulsing Outer Ring */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "3px solid rgba(66, 133, 244, 0.2)",
            boxShadow: "0 0 60px rgba(66, 133, 244, 0.4)",
          }}
        />

        {/* SVG Progress Circle */}
        <svg width="320" height="320" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="160"
            cy="160"
            r="135"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="16"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="135"
            stroke="url(#progressGrad)"
            strokeWidth="16"
            fill="none"
            strokeDasharray={2 * Math.PI * 135}
            strokeDashoffset={2 * Math.PI * 135 * (1 - progressPercent / 100)}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Percentage Display */}
        <div style={{ position: "absolute", textAlign: "center" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              color: THEME.colors.textPrimary,
              letterSpacing: -2,
            }}
          >
            {progressPercent}%
          </div>
          <div style={{ fontSize: 18, color: THEME.colors.accentCyan, fontWeight: 700, letterSpacing: 1 }}>
            GENERATING
          </div>
        </div>
      </div>

      {/* Synthesis Stage Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          padding: "24px 32px",
          borderRadius: 18,
          backgroundColor: THEME.colors.surfaceCard,
          border: `1px solid ${THEME.colors.borderGlass}`,
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: THEME.colors.textPrimary }}>
          {stageText}
        </div>
        <div style={{ fontSize: 16, color: THEME.colors.textMuted, marginTop: 8 }}>
          Compiling game loop @ 60 FPS in WebGL
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 5: THE HERO PLAYABLE REVEAL (3D SYNTHWAVE RUNNER GAMEPLAY)
// =========================================================================
const ScenePlayableReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Simulated live gameplay variables
  // Score accumulates smoothly
  const score = Math.floor(12400 + frame * 92);
  const multiplier = frame > 110 ? "x6" : "x4";
  const speed = Math.floor(260 + (frame % 40));

  // Player ship horizontal dodge animation (X axis position)
  // Dodging obstacles smoothly
  const shipOffset = Math.sin(frame * 0.1) * 110;

  // Grid vertical scrolling offset
  const gridOffset = (frame * 18) % 60;

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
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 20,
            backgroundColor: "rgba(52, 168, 83, 0.15)",
            border: "1px solid rgba(52, 168, 83, 0.45)",
            color: "#34A853",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#34A853", boxShadow: "0 0 10px #34A853" }} />
          LIVE PLAYABLE GENERATION
        </div>
      </div>

      <div style={{ position: "relative", width: 980, height: 960 }}>
        <BrowserFrame url="playground.google/play/neon-runner" width={980} height={960} startFrame={0}>
          {/* Real Animated Gameplay Canvas */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "#06070B",
              overflow: "hidden",
            }}
          >
            {/* Horizon Glow & Retro Synthwave Sun */}
            <div
              style={{
                position: "absolute",
                top: 80,
                left: "50%",
                transform: "translateX(-50%)",
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "linear-gradient(180deg, #F59E0B 0%, #EA4335 60%, #818CF8 100%)",
                boxShadow: "0 0 80px rgba(245, 158, 11, 0.6)",
                opacity: 0.85,
              }}
            />

            {/* Neon Mountains Silhouette */}
            <svg
              style={{
                position: "absolute",
                top: 220,
                left: 0,
                width: "100%",
                height: 120,
                zIndex: 1,
              }}
              viewBox="0 0 980 120"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,120 120,30 260,90 420,15 580,75 740,25 900,85 980,40 980,120"
                fill="#0A0B14"
                stroke="rgba(66, 133, 244, 0.4)"
                strokeWidth="2"
              />
            </svg>

            {/* 3D Perspective Scrolling Wireframe Floor */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 580,
                perspective: "400px",
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-20%",
                  width: "140%",
                  height: "100%",
                  transform: "rotateX(62deg)",
                  backgroundImage: `
                    linear-gradient(to right, rgba(56, 189, 248, 0.35) 2px, transparent 2px),
                    linear-gradient(to bottom, rgba(56, 189, 248, 0.35) 2px, transparent 2px)
                  `,
                  backgroundSize: "70px 70px",
                  backgroundPosition: `0px ${gridOffset}px`,
                  boxShadow: "inset 0 100px 100px #06070B",
                }}
              />
            </div>

            {/* Approaching Glowing 3D Obstacles */}
            {[
              { id: 1, startOffset: 0, lane: -120 },
              { id: 2, startOffset: 45, lane: 100 },
              { id: 3, startOffset: 90, lane: 0 },
            ].map((obs) => {
              const obsProg = ((frame + obs.startOffset) % 70) / 70;
              const obsScale = interpolate(obsProg, [0, 1], [0.2, 1.4]);
              const obsY = interpolate(obsProg, [0, 1], [300, 680]);
              const obsOpacity = interpolate(obsProg, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

              return (
                <div
                  key={obs.id}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${obs.lane * obsScale}px)`,
                    top: obsY,
                    transform: `translate(-50%, -50%) scale(${obsScale})`,
                    opacity: obsOpacity,
                    zIndex: 5,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: "rgba(234, 67, 53, 0.8)",
                      border: "2px solid #FF5F56",
                      boxShadow: "0 0 25px #EA4335",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    ⚠️
                  </div>
                </div>
              );
            })}

            {/* Player Character: Neon Cyber Jet */}
            <div
              style={{
                position: "absolute",
                bottom: 110,
                left: `calc(50% + ${shipOffset}px)`,
                transform: `translateX(-50%) rotate(${shipOffset * 0.15}deg)`,
                zIndex: 10,
                filter: "drop-shadow(0 0 25px rgba(56, 189, 248, 0.8))",
              }}
            >
              {/* Jet Thruster Glow */}
              <div
                style={{
                  position: "absolute",
                  bottom: -15,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 22,
                  height: 35,
                  borderRadius: "50%",
                  background: "linear-gradient(180deg, #38BDF8 0%, transparent 100%)",
                  filter: "blur(4px)",
                }}
              />
              {/* Jet Polygon SVG */}
              <svg width="84" height="84" viewBox="0 0 100 100">
                <polygon
                  points="50,10 85,85 50,70 15,85"
                  fill="#12131A"
                  stroke="#38BDF8"
                  strokeWidth="4"
                />
                <polygon
                  points="50,25 70,75 50,65 30,75"
                  fill="#4285F4"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* In-Game HUD Overlays */}
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 28,
                right: 28,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              {/* Score HUD */}
              <div
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  backgroundColor: "rgba(10, 11, 14, 0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ fontSize: 12, color: THEME.colors.textMuted }}>SCORE</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: THEME.colors.textPrimary }}>
                  {score.toLocaleString()}
                </div>
              </div>

              {/* Multiplier & Speed HUD */}
              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    border: "1px solid rgba(245, 158, 11, 0.5)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, color: THEME.colors.accentWarmGlow }}>MULT</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.accentWarmGlow }}>
                    {multiplier}
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    backgroundColor: "rgba(66, 133, 244, 0.2)",
                    border: "1px solid rgba(66, 133, 244, 0.5)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, color: THEME.colors.googleBlue }}>SPEED</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.textPrimary }}>
                    {speed} <span style={{ fontSize: 12 }}>KM/H</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Zero Code Floating Banner */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "8px 24px",
                borderRadius: 20,
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.5)",
                color: THEME.colors.accentCyan,
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
                zIndex: 20,
                whiteSpace: "nowrap",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
              }}
            >
              100% RUNNING IN BROWSER // ZERO CODE
            </div>
          </div>
        </BrowserFrame>

        {/* Cursor steering movement indicator */}
        <CursorPointer
          startX={490}
          startY={650}
          endX={620}
          endY={620}
          moveStartFrame={20}
          moveEndFrame={90}
          showRipple={false}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 6: EXPERIMENTATION & ITERATION (FAST CUTS)
// =========================================================================
const SceneExperimentation: React.FC = () => {
  const frame = useCurrentFrame();

  // Rapid Cuts:
  // Cut A (0 - 45f): "Prompt: Add Night Rain & Neon Shaders"
  // Cut B (45 - 90f): "Prompt: Switch to 3D Space Defense"
  // Cut C (90 - 141f): Gallery of Community Games
  const activeCut = frame < 45 ? "A" : frame < 90 ? "B" : "C";

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
      <div style={{ marginBottom: 26, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 20,
            backgroundColor: "rgba(234, 67, 53, 0.15)",
            border: `1px solid ${THEME.colors.googleRed}`,
            color: THEME.colors.googleRed,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          EXPERIMENT & ITERATE
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.textPrimary, letterSpacing: -1 }}>
          Tweak Rules, Physics & Themes
        </div>
      </div>

      <div style={{ position: "relative", width: 940, height: 860 }}>
        <BrowserFrame url="playground.google/iterate" width={940} height={860} startFrame={0}>
          {activeCut === "A" && (
            <div
              style={{
                height: "100%",
                padding: "36px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "radial-gradient(circle at 50% 50%, rgba(66, 133, 244, 0.15), transparent 70%)",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderRadius: 14,
                  backgroundColor: "rgba(66, 133, 244, 0.15)",
                  border: "1px solid rgba(66, 133, 244, 0.5)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                💬 Prompt: <span style={{ color: THEME.colors.accentCyan }}>"Add heavy night rain, wet reflections & inverted gravity"</span>
              </div>

              <div
                style={{
                  flex: 1,
                  margin: "24px 0",
                  borderRadius: 16,
                  backgroundColor: "#0A0D18",
                  border: "2px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 72 }}>🌧️⚡</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 12 }}>
                    PHYSICS OVERHAUL APPLIED
                  </div>
                  <div style={{ fontSize: 18, color: THEME.colors.accentCyan, marginTop: 6 }}>
                    Inverted Gravity & Dynamic Weather Active
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 16, color: THEME.colors.textMuted, textAlign: "center" }}>
                AI recompiles code and physics instantly without breaking progress
              </div>
            </div>
          )}

          {activeCut === "B" && (
            <div
              style={{
                height: "100%",
                padding: "36px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15), transparent 70%)",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderRadius: 14,
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.5)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                💬 Prompt: <span style={{ color: THEME.colors.accentWarmGlow }}>"Switch to 3D Space Fleet Defense with asteroid storms"</span>
              </div>

              <div
                style={{
                  flex: 1,
                  margin: "24px 0",
                  borderRadius: 16,
                  backgroundColor: "#0D0A14",
                  border: "2px solid rgba(245, 158, 11, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 72 }}>🛸💥</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: THEME.colors.textPrimary, marginTop: 12 }}>
                    GENRE REMIX: SPACE DEFENSE
                  </div>
                  <div style={{ fontSize: 18, color: THEME.colors.accentWarmGlow, marginTop: 6 }}>
                    Procedural Asteroids & Laser Turrets
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 16, color: THEME.colors.textMuted, textAlign: "center" }}>
                Switch genres or mechanics in seconds with pure natural language
              </div>
            </div>
          )}

          {activeCut === "C" && (
            <div
              style={{
                height: "100%",
                padding: "32px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.textPrimary }}>
                Community Creations on Playground Explore:
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "🏎️", title: "Cyber Drift 2099", tag: "Racing", plays: "42.8k plays" },
                  { icon: "🏰", title: "Tower Siege AI", tag: "Strategy", plays: "31.2k plays" },
                  { icon: "⚔️", title: "Pixel Dungeon", tag: "Roguelike", plays: "58.4k plays" },
                  { icon: "🧩", title: "Quantum Puzzle", tag: "Physics", plays: "19.6k plays" },
                ].map((game) => (
                  <div
                    key={game.title}
                    style={{
                      padding: "20px",
                      borderRadius: 14,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 36 }}>{game.icon}</span>
                    <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary }}>{game.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: THEME.colors.textMuted }}>
                      <span style={{ color: THEME.colors.googleBlue, fontWeight: 600 }}>{game.tag}</span>
                      <span>{game.plays}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 15, color: THEME.colors.textSecondary, textAlign: "center" }}>
                Publish, share via link, or compete on community leaderboards
              </div>
            </div>
          )}
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SCENE 7: CALL TO ACTION (INTERACTIVE POLL & FOLLOW)
// =========================================================================
const SceneCallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const isFollowClicked = frame >= 35;

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
      {/* Interactive Poll Question Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          padding: "36px 40px",
          borderRadius: 24,
          backgroundColor: THEME.colors.surfaceCard,
          border: `1px solid ${THEME.colors.borderGlass}`,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          marginBottom: 44,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.accentAmber, letterSpacing: 2 }}>
          COMMUNITY POLL
        </div>
        <div style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.textPrimary, marginTop: 12, lineHeight: 1.2 }}>
          Would You Try Building A Game With AI?
        </div>

        {/* Poll Options */}
        <div style={{ display: "flex", gap: 18, marginTop: 28 }}>
          <div
            style={{
              flex: 1,
              padding: "18px 0",
              borderRadius: 14,
              backgroundColor: "rgba(52, 168, 83, 0.18)",
              border: "2px solid #34A853",
              color: "#34A853",
              fontSize: 24,
              fontWeight: 800,
              boxShadow: "0 8px 25px rgba(52, 168, 83, 0.3)",
            }}
          >
            YES! 94% 🔥
          </div>

          <div
            style={{
              flex: 1,
              padding: "18px 0",
              borderRadius: 14,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: THEME.colors.textMuted,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            NO 6% 🤔
          </div>
        </div>
      </div>

      {/* Creator Follow Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          padding: "24px 32px",
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: `1px solid ${THEME.colors.borderGlass}`,
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
              background: "linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC05 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
              boxShadow: "0 8px 25px rgba(66, 133, 244, 0.4)",
            }}
          >
            V
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.textPrimary }}>@vizion.std</div>
            <div style={{ fontSize: 16, color: THEME.colors.textSecondary, marginTop: 4 }}>Daily AI Tools & Breakdowns</div>
          </div>
        </div>

        {/* Animated Follow Button */}
        <div
          style={{
            padding: "16px 36px",
            borderRadius: 14,
            backgroundColor: isFollowClicked ? "#1E7E34" : THEME.colors.accentTerracotta,
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 800,
            transform: `scale(${frame >= 35 && frame <= 48 ? 0.92 : 1})`,
            boxShadow: isFollowClicked
              ? "0 8px 30px rgba(52, 168, 83, 0.5)"
              : "0 8px 30px rgba(204, 120, 92, 0.45)",
            transition: "all 0.12s ease",
          }}
        >
          {isFollowClicked ? "FOLLOWING ✓" : "+ FOLLOW"}
        </div>

        {/* Guided cursor clicking Follow at frame 35 */}
        <CursorPointer
          startX={680}
          startY={140}
          endX={710}
          endY={48}
          moveStartFrame={5}
          moveEndFrame={35}
          clickFrame={35}
        />
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// UNIVERSAL KINETIC CAPTIONS COMPONENT (High-Retention Word Highlighter)
// =========================================================================
const UniversalCaptions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  // Safe zone placement for Instagram Reels: 1480px from top
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
          backgroundColor: "rgba(10, 11, 14, 0.88)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 20,
          padding: "16px 36px",
          textAlign: "center",
          maxWidth: 960,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 40px rgba(66, 133, 244, 0.2)",
        }}
      >
        <span
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            lineHeight: 1.3,
            letterSpacing: -0.5,
          }}
        >
          {captionData.normal}
        </span>
        {captionData.highlight && (
          <span
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: captionData.color || THEME.colors.accentCyan,
              marginLeft: 10,
              textShadow: `0 0 30px ${captionData.color || THEME.colors.accentCyan}`,
            }}
          >
            {captionData.highlight}
          </span>
        )}
      </div>
    </div>
  );
};

// Caption Timestamp Mapping aligned to ElevenLabs audio beats
function getActiveCaption(frame: number): { normal: string; highlight?: string; color?: string } | null {
  // [0.0s - 3.2s | 0 - 96] "Google AI is making game creation seriously interesting."
  if (frame >= 0 && frame < 96) {
    if (frame < 45) return { normal: "Google AI is making", highlight: "GAME CREATION", color: "#38BDF8" };
    return { normal: "Seriously", highlight: "INTERESTING.", color: "#4285F4" };
  }

  // [3.2s - 7.1s | 96 - 213] "Imagine turning a simple idea into a playable game. First, open Google Playground and check whether you have access."
  if (frame >= 96 && frame < 155) {
    return { normal: "Turn a simple idea into a", highlight: "PLAYABLE GAME", color: "#FBBC05" };
  }
  if (frame >= 155 && frame < 213) {
    return { normal: "Open Google Playground &", highlight: "CHECK ACCESS", color: "#34A853" };
  }

  // [7.1s - 12.0s | 213 - 360] "Enter your game idea, follow the available creation workflow..."
  if (frame >= 213 && frame < 290) {
    return { normal: "Enter your", highlight: "GAME IDEA", color: "#FFFFFF" };
  }
  if (frame >= 290 && frame < 360) {
    return { normal: "Follow the available", highlight: "WORKFLOW", color: "#818CF8" };
  }

  // [12.0s - 17.2s | 360 - 516] "...and let the AI generate your experience."
  if (frame >= 360 && frame < 516) {
    return { normal: "Let AI generate your", highlight: "EXPERIENCE", color: "#CC785C" };
  }

  // [17.2s - 24.8s | 516 - 744] "Now watch this: your idea is becoming a game you can actually explore."
  if (frame >= 516 && frame < 630) {
    return { normal: "NOW WATCH THIS:", highlight: "EXPLORE YOUR GAME", color: "#38BDF8" };
  }
  if (frame >= 630 && frame < 744) {
    return { normal: "100% In-Browser //", highlight: "ZERO CODE", color: "#34A853" };
  }

  // [24.8s - 29.5s | 744 - 885] "And the best part? You can experiment with different ideas and see what you can create."
  if (frame >= 744 && frame < 815) {
    return { normal: "Experiment with", highlight: "DIFFERENT IDEAS", color: "#EA4335" };
  }
  if (frame >= 815 && frame < 885) {
    return { normal: "See what you can", highlight: "CREATE", color: "#FBBC05" };
  }

  // [29.5s - 31.32s | 885 - 940] "Would you try this? Follow for more crazy AI tools and tutorials."
  if (frame >= 885 && frame < 915) {
    return { normal: "Would you", highlight: "TRY THIS?", color: "#F59E0B" };
  }
  if (frame >= 915 && frame < 940) {
    return { normal: "FOLLOW FOR MORE", highlight: "AI TOOLS & TRICKS", color: "#CC785C" };
  }

  return null;
}
