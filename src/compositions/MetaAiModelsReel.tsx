import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface MetaAiModelsReelProps {
  showWatermark?: boolean;
}

/**
 * MetaAiModelsReel - 50.2-second Cinematic Reel (1,506 frames @ 30 FPS)
 *
 * Style Standard:
 * - Master Typography: 'Poppins', sans-serif (800/900 display, 700 captions, 500/600 pills)
 * - Secondary Typography: 'Roboto', sans-serif
 * - Apple Keynote Cupertino Aesthetic: Frosted glassmorphism (blur: 40px), matte non-neon color chips,
 *   subtle borders, titanium black (#1D1D1F), off-white (#F5F5F7), and @vizion.std watermark pill.
 * - Master audio ducking curve: VO at 1.0, ducked BGM at 0.04, hard silence cut during Scene 7.
 *
 * 9-Scene Master Narrative:
 * 1. Scene 1 (0-135): Puppy Hook with punch zoom & -180° inversion
 * 2. Scene 2 (135-330): Mysterious AI reveal with Apple keynote halo & Poppins typography
 * 3. Scene 3 (330-525): Meta Announcement (Muse Wonder & Muse Wonderful Apple glass cards)
 * 4. Scene 4 (525-645): "Inki khaas baat kya hai?" punch-in & animated question mark
 * 5. Scene 5 (645-885): 3-Capability Apple card progression (Long Tasks, Memory, Complex Work)
 * 6. Scene 6 (885-1095): Connected multi-step workflow pipeline with Apple frosted rows
 * 7. Scene 7 (1095-1290): "Lekin ruko zara!" hard audio mute, glitch & Claims vs Benchmarks
 * 8. Scene 8 (1290-1425): Human-AI future visual push-in & big question
 * 9. Scene 9 (1425-1506): High-energy return & Apple-styled FOLLOW CTA card
 */
export const MetaAiModelsReel: React.FC<MetaAiModelsReelProps> = ({
  showWatermark = true,
}) => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------
  // MASTER AUDIO DUCKING (Apple Keynote Standard: 0.04 ducking)
  // -------------------------------------------------------------
  // Hard mute at Frame 1095 - 1205 for dramatic comedic punch ("Lekin ruko zara!")
  const bgmVolume = interpolate(
    frame,
    [0, 60, 1090, 1095, 1205, 1210, 1420, 1425, 1506],
    [0.05, 0.04, 0.04, 0.0, 0.0, 0.04, 0.04, 0.12, 0.12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        overflow: "hidden",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Import Poppins and Roboto Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap');
      `}</style>

      {/* ========================================================= */}
      {/* TOP SAFE ZONE WATERMARK (@VIZION.STD - CUPERTINO PILL)    */}
      {/* ========================================================= */}
      {showWatermark && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 56,
            zIndex: 95,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px 8px 12px",
            borderRadius: 100,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
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
      )}

      {/* ========================================================= */}
      {/* SCENE 1: THE PUPPY HOOK (Frames 0 - 135 / 0.0s - 4.5s)    */}
      {/* ========================================================= */}
      <Sequence from={0} durationInFrames={135} name="Scene 1: Puppy Hook">
        <PuppyHookScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 2: MYSTERIOUS AI REVEAL (Frames 135 - 330)          */}
      {/* ========================================================= */}
      <Sequence from={135} durationInFrames={195} name="Scene 2: Mysterious AI">
        <MysteriousAiScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 3: META MODELS CARDS (Frames 330 - 525)             */}
      {/* ========================================================= */}
      <Sequence from={330} durationInFrames={195} name="Scene 3: Meta Models">
        <MetaModelsScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 4: THE CORE QUESTION (Frames 525 - 645)             */}
      {/* ========================================================= */}
      <Sequence from={525} durationInFrames={120} name="Scene 4: Core Question">
        <CoreQuestionScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 5: LONG TASKS & MEMORY (Frames 645 - 885)           */}
      {/* ========================================================= */}
      <Sequence from={645} durationInFrames={240} name="Scene 5: Capabilities">
        <CapabilitiesSequence />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 6: MULTI-STEP WORKFLOW (Frames 885 - 1095)          */}
      {/* ========================================================= */}
      <Sequence from={885} durationInFrames={210} name="Scene 6: Workflow Pipeline">
        <WorkflowPipelineScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 7: LEKIN RUKO ZARA (Frames 1095 - 1290)             */}
      {/* ========================================================= */}
      <Sequence from={1095} durationInFrames={195} name="Scene 7: Reality Check">
        <RealityCheckScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 8: HUMAN-AI BIG QUESTION (Frames 1290 - 1425)       */}
      {/* ========================================================= */}
      <Sequence from={1290} durationInFrames={135} name="Scene 8: Human-AI Future">
        <HumanAiFutureScene />
      </Sequence>

      {/* ========================================================= */}
      {/* SCENE 9: THE HIGH-ENERGY CTA (Frames 1425 - 1506)         */}
      {/* ========================================================= */}
      <Sequence from={1425} durationInFrames={81} name="Scene 9: Call To Action">
        <CtaScene />
      </Sequence>

      {/* ========================================================= */}
      {/* MASTER AUDIO CONTROLLER (VOICEOVER + DUCKED BGM + SFX)    */}
      {/* ========================================================= */}
      <Audio
        src={staticFile("inputs/meta_ai_models_vo.mp3")}
        startFrom={0}
        volume={1.0}
      />

      <Audio
        src={staticFile("sfx/ambient_tech_bgm.wav")}
        startFrom={0}
        volume={bgmVolume}
      />

      {/* Precision Synchronized Apple-style SFX Cues */}
      <Audio src={staticFile("sfx/sub_hit.wav")} startFrom={0} volume={0.7} />

      <Sequence from={42} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} startFrom={0} volume={0.6} />
      </Sequence>
      <Sequence from={54} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} startFrom={0} volume={0.65} />
      </Sequence>

      <Sequence from={145} durationInFrames={60}>
        <Audio src={staticFile("sfx/riser.wav")} startFrom={0} volume={0.35} />
      </Sequence>

      <Sequence from={350} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} startFrom={0} volume={0.5} />
      </Sequence>
      <Sequence from={420} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} startFrom={0} volume={0.5} />
      </Sequence>

      <Sequence from={530} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} startFrom={0} volume={0.7} />
      </Sequence>

      <Sequence from={660} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.wav")} startFrom={0} volume={0.75} />
      </Sequence>
      <Sequence from={740} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.wav")} startFrom={0} volume={0.75} />
      </Sequence>
      <Sequence from={820} durationInFrames={15}>
        <Audio src={staticFile("sfx/click.wav")} startFrom={0} volume={0.75} />
      </Sequence>

      <Sequence from={1095} durationInFrames={40}>
        <Audio src={staticFile("sfx/sub_hit.wav")} startFrom={0} volume={0.85} />
      </Sequence>

      <Sequence from={1300} durationInFrames={60}>
        <Audio src={staticFile("sfx/riser.wav")} startFrom={0} volume={0.45} />
      </Sequence>

      <Sequence from={1425} durationInFrames={30}>
        <Audio src={staticFile("sfx/sub_hit.wav")} startFrom={0} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
};

// =========================================================================
// 1. SCENE 1: PUPPY HOOK (Frames 0 - 135)
// =========================================================================
const PuppyHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseZoom = interpolate(frame, [0, 50, 110], [1.0, 1.12, 1.22], {
    extrapolateRight: "clamp",
  });

  const flipSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });
  const rotationZ = interpolate(flipSpring, [0, 1], [0, -180]);
  const flipScale = interpolate(flipSpring, [0, 0.5, 1], [1.0, 0.88, 1.05]);

  const shakeX = frame >= 50 && frame <= 62 ? Math.sin((frame - 50) * 2.8) * 12 : 0;

  const p1Opacity = interpolate(frame, [0, 8, 42, 48], [0, 1, 1, 0]);
  const p2Opacity = interpolate(frame, [45, 50, 85, 90], [0, 1, 1, 0]);
  const p3Opacity = interpolate(frame, [88, 94, 130, 135], [0, 1, 1, 0.2]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${baseZoom * flipScale}) rotate(${rotationZ}deg) translateX(${shakeX}px)`,
          transformOrigin: "center 45%",
        }}
      >
        <Img
          src={staticFile("inputs/puppy_hook.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 38%, rgba(10, 11, 16, 0.6) 75%, rgba(10, 11, 16, 0.94) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 310,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 30,
        }}
      >
        {p1Opacity > 0.01 && (
          <div
            style={{
              opacity: p1Opacity,
              padding: "14px 32px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18)",
              fontSize: 34,
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: "#1D1D1F",
              letterSpacing: "-0.02em",
            }}
          >
            Agar Tum <span style={{ color: "#0071E3" }}>Kutte Ke Bachhe</span> Ko
          </div>
        )}

        {p2Opacity > 0.01 && (
          <div
            style={{
              opacity: p2Opacity,
              padding: "18px 40px",
              borderRadius: 100,
              backgroundColor: "#1D1D1F",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
              transform: "rotate(-3deg)",
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'Poppins', sans-serif",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            ULTA TANGOGE! 🙃
          </div>
        )}

        {p3Opacity > 0.01 && (
          <div
            style={{
              opacity: p3Opacity,
              padding: "16px 36px",
              borderRadius: 100,
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18)",
              fontSize: 36,
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: "#1D1D1F",
              letterSpacing: "-0.02em",
            }}
          >
            Tab Bhi Wo <span style={{ color: "#E11D48" }}>Nahi Batayega!</span> 🤫
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 2. SCENE 2: MYSTERIOUS AI REVEAL (Frames 135 - 330)
// =========================================================================
const MysteriousAiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 195], [1.0, 1.14]);
  const glowPulse = 0.85 + Math.sin((frame / fps) * 2.8) * 0.15;

  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const textY = interpolate(titleSpring, [0, 1], [35, 0]);
  const textOpacity = interpolate(frame, [0, 24], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Apple Subtle Ambient Lighting */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 113, 227, 0.16) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%)",
          filter: "blur(70px)",
          transform: `scale(${scale})`,
        }}
      />

      {/* Concentric Cupertino Halo Orbits */}
      <div
        style={{
          position: "absolute",
          width: 580,
          height: 580,
          borderRadius: "50%",
          border: "1px solid rgba(0, 113, 227, 0.25)",
          transform: `scale(${glowPulse}) rotate(${frame * 0.4}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "1px dashed rgba(255, 255, 255, 0.16)",
          transform: `scale(${1.15 - glowPulse * 0.15}) rotate(-${frame * 0.6}deg)`,
        }}
      />

      {/* Apple Keynote Text Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 100,
            backgroundColor: "rgba(0, 113, 227, 0.14)",
            border: "1px solid rgba(0, 113, 227, 0.35)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#0071E3",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}
        >
          HMM... LEKIN YE AI
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#F5F5F7",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Aisi Baatein Bata Sakta Hai Jo Tumne{" "}
          <span
            style={{
              color: "#0071E3",
              fontWeight: 900,
            }}
          >
            IMAGINE
          </span>{" "}
          Bhi Nahi Ki Hongi!
        </h2>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 3. SCENE 3: META MODELS ANNOUNCEMENT (Frames 330 - 525)
// =========================================================================
const MetaModelsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const c1Spring = spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 180 } });
  const c1X = interpolate(c1Spring, [0, 1], [-180, 0]);
  const c1Opacity = interpolate(c1Spring, [0, 1], [0, 1]);

  const c2Spring = spring({ frame: frame - 55, fps, config: { damping: 16, stiffness: 180 } });
  const c2X = interpolate(c2Spring, [0, 1], [180, 0]);
  const c2Opacity = interpolate(c2Spring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        gap: 32,
      }}
    >
      {/* Header Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 24px",
          borderRadius: 100,
          backgroundColor: "rgba(0, 113, 227, 0.12)",
          border: "1px solid rgba(0, 113, 227, 0.3)",
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
            fontSize: 18,
            fontWeight: 700,
            color: "#0071E3",
            letterSpacing: "0.14em",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}
        >
          META ANNOUNCEMENT
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 46,
          fontWeight: 800,
          color: "#F5F5F7",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        2 New Frontier Models
      </h3>

      {/* Model Cards Stack (Apple Cupertino Frosted Cards) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
        {/* Card 1: MUSE WONDER */}
        <div
          style={{
            transform: `translateX(${c1X}px)`,
            opacity: c1Opacity,
            padding: "26px 32px",
            borderRadius: 24,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            border: "1px solid rgba(0, 113, 227, 0.35)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0071E3",
                letterSpacing: "0.12em",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "uppercase",
              }}
            >
              FAST AGENTIC REASONER
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop: 4,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Muse Wonder
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              backgroundColor: "rgba(0, 113, 227, 0.18)",
              color: "#0071E3",
              fontWeight: 700,
              fontSize: 16,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            ACTIVE
          </div>
        </div>

        {/* Card 2: MUSE WONDERFUL */}
        <div
          style={{
            transform: `translateX(${c2X}px)`,
            opacity: c2Opacity,
            padding: "26px 32px",
            borderRadius: 24,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            border: "1px solid rgba(180, 83, 9, 0.35)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#D97706",
                letterSpacing: "0.12em",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "uppercase",
              }}
            >
              HEAVYWEIGHT MULTI-STEP
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop: 4,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Muse Wonderful
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              backgroundColor: "rgba(217, 119, 6, 0.18)",
              color: "#D97706",
              fontWeight: 700,
              fontSize: 16,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            PRO
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 4. SCENE 4: THE CORE QUESTION (Frames 525 - 645)
// =========================================================================
const CoreQuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const punchSpring = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });
  const zoom = interpolate(punchSpring, [0, 1], [0.85, 1.12]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        transform: `scale(${zoom})`,
      }}
    >
      {/* Apple Frosted Circular Question Badge */}
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "2px solid rgba(0, 113, 227, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 50px rgba(0, 113, 227, 0.2)",
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "#0071E3",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          ?
        </span>
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: 54,
          fontWeight: 900,
          color: "#F5F5F7",
          textAlign: "center",
          padding: "0 60px",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}
      >
        Inki <span style={{ color: "#0071E3" }}>Khaas Baat</span> Kya Hai?
      </h2>
    </AbsoluteFill>
  );
};

// =========================================================================
// 5. SCENE 5: CAPABILITIES (Frames 645 - 885)
// =========================================================================
const CapabilitiesSequence: React.FC = () => {
  const frame = useCurrentFrame();

  const activeIndex = Math.min(Math.floor(frame / 80), 2);

  const capabilities = [
    {
      badge: "CAPABILITY 01",
      title: "Long-Horizon Tasks",
      desc: "Understands hours-long continuous instructions without drifting.",
      color: "#0071E3",
      icon: "⏳",
    },
    {
      badge: "CAPABILITY 02",
      title: "Persistent Context Memory",
      desc: "Remembers past conversation context and earlier execution steps.",
      color: "#7C3AED",
      icon: "🧠",
    },
    {
      badge: "CAPABILITY 03",
      title: "Complex Work Automation",
      desc: "Multi-layered reasoning for intricate coding & data pipelines.",
      color: "#D97706",
      icon: "⚡",
    },
  ];

  const current = capabilities[activeIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
      }}
    >
      {/* Apple Cupertino Card */}
      <div
        key={activeIndex}
        style={{
          width: "100%",
          padding: "44px 38px",
          borderRadius: 28,
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          border: `1.5px solid ${current.color}66`,
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.45)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: `${current.color}22`,
              color: current.color,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {current.badge}
          </span>
          <span style={{ fontSize: 44 }}>{current.icon}</span>
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: 44,
            fontWeight: 800,
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {current.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: 24,
            color: "#94A3B8",
            lineHeight: 1.45,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
          }}
        >
          {current.desc}
        </p>

        {/* Step Progress Ticks */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 100,
                backgroundColor: idx <= activeIndex ? current.color : "rgba(255, 255, 255, 0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 6. SCENE 6: MULTI-STEP WORKFLOW (Frames 885 - 1095)
// =========================================================================
const WorkflowPipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "01", title: "Analyze Objective", tag: "Strategy" },
    { num: "02", title: "Plan Execution", tag: "Architecture" },
    { num: "03", title: "Run Tools & Code", tag: "Autonomous" },
    { num: "04", title: "Verify & Deliver", tag: "Quality" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        gap: 22,
      }}
    >
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 100,
          backgroundColor: "rgba(16, 185, 129, 0.14)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          color: "#10B981",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: "0.14em",
          fontFamily: "'Poppins', sans-serif",
          textTransform: "uppercase",
        }}
      >
        AGENTIC PIPELINE
      </div>

      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: 44,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        Multiple Steps Automation
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {steps.map((st, i) => {
          const stepSpring = spring({
            frame: frame - i * 18,
            fps,
            config: { damping: 16, stiffness: 200 },
          });
          const opacity = interpolate(stepSpring, [0, 1], [0, 1]);
          const x = interpolate(stepSpring, [0, 1], [-40, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                padding: "18px 24px",
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#0071E3",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {st.num}
                </span>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {st.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#94A3B8",
                  padding: "6px 12px",
                  borderRadius: 100,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {st.tag}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 7. SCENE 7: REALITY CHECK / "LEKIN RUKO ZARA!" (Frames 1095 - 1290)
// =========================================================================
const RealityCheckScene: React.FC = () => {
  const frame = useCurrentFrame();

  const shake = frame <= 18 ? Math.sin(frame * 3.5) * 12 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0406",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        gap: 32,
        transform: `translateX(${shake}px)`,
      }}
    >
      {/* Big Apple-Style Warning Stamp */}
      <div
        style={{
          padding: "18px 40px",
          borderRadius: 100,
          backgroundColor: "#E11D48",
          boxShadow: "0 20px 50px rgba(225, 29, 72, 0.45)",
          transform: "rotate(-3deg)",
        }}
      >
        <span
          style={{
            fontSize: 50,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          LEKIN RUKO ZARA! ✋
        </span>
      </div>

      {/* Split-Screen: CLAIMS vs BENCHMARKS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
        <div
          style={{
            padding: "26px 20px",
            borderRadius: 22,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#94A3B8",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            MARKETING
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#F43F5E",
              marginTop: 6,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            CLAIMS 📢
          </div>
        </div>

        <div
          style={{
            padding: "26px 20px",
            borderRadius: 22,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#6EE7B7",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            REAL WORLD
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#10B981",
              marginTop: 6,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            BENCHMARKS 🧪
          </div>
        </div>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 600,
          color: "#E2E8F0",
          textAlign: "center",
          lineHeight: 1.4,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Asli test tab hoga jab ye models{" "}
        <span style={{ color: "#0071E3", fontWeight: 800 }}>real world tasks</span> mein perform karke dikhayenge.
      </p>
    </AbsoluteFill>
  );
};

// =========================================================================
// 8. SCENE 8: HUMAN-AI BIG QUESTION (Frames 1290 - 1425)
// =========================================================================
const HumanAiFutureScene: React.FC = () => {
  const frame = useCurrentFrame();

  const zoom = interpolate(frame, [0, 135], [1.0, 1.15]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("inputs/human_ai_future.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10, 11, 16, 0.4) 0%, rgba(10, 11, 16, 0.88) 75%, #0A0B10 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 270,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 45px",
          textAlign: "center",
          gap: 16,
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: "8px 22px",
            borderRadius: 100,
            backgroundColor: "rgba(0, 113, 227, 0.18)",
            border: "1px solid rgba(0, 113, 227, 0.45)",
            color: "#0071E3",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.14em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          THE BIG QUESTION
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: 44,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.25,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Kya AI Agents Sach Mein Hamara{" "}
          <span style={{ color: "#0071E3" }}>Tareeka Badalne Waale Hain?</span>
        </h3>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 9. SCENE 9: THE HIGH-ENERGY CTA (Frames 1425 - 1506)
// =========================================================================
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaSpring = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });
  const scale = interpolate(ctaSpring, [0, 1], [0.75, 1.0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0B10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        gap: 32,
      }}
    >
      {/* Apple Cupertino CTA Card */}
      <div
        style={{
          transform: `scale(${scale})`,
          padding: "38px 46px",
          borderRadius: 32,
          backgroundColor: "#1D1D1F",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 58 }}>🔔</span>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          FOLLOW KAR LO!
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 100,
            backgroundColor: "rgba(0, 113, 227, 0.2)",
            color: "#0071E3",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          @VIZION.STD · FOR DAILY AI REELS
        </div>
      </div>
    </AbsoluteFill>
  );
};
