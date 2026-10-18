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
import { DynamicReelConfig, SceneConfig } from "../types/reel-schema";
import sampleConfig from "../../public/inputs/sample-dynamic-reel.json";
import captionsData from "../../public/inputs/local_ai_vo_captions.json";
import { WordLevelCaptions } from "../components/WordLevelCaptions";

interface DynamicTechReelProps {
  config?: DynamicReelConfig;
}

export const DynamicTechReel: React.FC<DynamicTechReelProps> = ({
  config = sampleConfig as DynamicReelConfig,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Gentle ambient lighting breathing drift
  const orbScale = interpolate(Math.sin((frame / 45) * Math.PI), [-1, 1], [0.95, 1.05]);

  // Calculate cumulative frames for each scene
  let currentStart = 0;
  const scenesWithFrames = config.scenes.map((scene) => {
    const durationFrames = Math.round(scene.durationInSeconds * fps);
    const startFrame = currentStart;
    currentStart += durationFrames;
    return {
      ...scene,
      startFrame,
      durationFrames,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 25%, #1C2033 0%, #131522 55%, #0D0F18 100%)",
        fontFamily: "'Inter', -apple-system, sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Specular Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Luminous Ambient Orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          width: 900,
          height: 900,
          transform: `translate(-50%, -50%) scale(${orbScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Render Each Scene Dynamically */}
      {scenesWithFrames.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          <DynamicSceneRenderer scene={scene} />
        </Sequence>
      ))}

      {/* Word-Level Subtitles Overlay */}
      <WordLevelCaptions captions={captionsData} bottomOffset={260} />

      {/* Audio Streams with Bounded Sequences */}
      {config.audioFile && (
        <Sequence from={0} durationInFrames={durationInFrames}>
          <Audio src={staticFile(config.audioFile)} volume={1.0} />
        </Sequence>
      )}

      {config.bgmFile && (
        <Sequence from={0} durationInFrames={durationInFrames}>
          <Audio
            src={staticFile(config.bgmFile)}
            volume={(f) => {
              // Automatic sidechain ducking curve: 0.10 during speaking frames, 0.25 at end
              return interpolate(f, [0, durationInFrames - 60, durationInFrames], [0.12, 0.14, 0.25], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            }}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

const DynamicSceneRenderer: React.FC<{ scene: SceneConfig & { durationFrames: number } }> = ({
  scene,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 180 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.92, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Scene Header */}
      <h2
        style={{
          fontSize: 76,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: -1.5,
          margin: "0 0 16px 0",
          textShadow: "0 10px 40px rgba(0,0,0,0.8)",
        }}
      >
        {scene.title}
      </h2>

      {scene.subtitle && (
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.75)",
            textAlign: "center",
            maxWidth: 880,
            marginBottom: 44,
          }}
        >
          {scene.subtitle}
        </div>
      )}

      {/* Dynamic Content Card Based on Scene Type */}
      {scene.type === "terminal" && (
        <div
          style={{
            width: "100%",
            maxWidth: 880,
            background: "rgba(13, 15, 24, 0.9)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 20,
            padding: "24px 32px",
            boxShadow: "0 30px 70px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 28, color: "#38BDF8", marginBottom: 12 }}>
            $ {scene.params?.command || "ollama run deepseek-coder"}
          </div>
          {scene.params?.streamText && (
            <pre style={{ fontFamily: "monospace", fontSize: 20, color: "rgba(255, 255, 255, 0.6)", margin: 0 }}>
              {scene.params.streamText}
            </pre>
          )}
        </div>
      )}

      {scene.type === "metrics" && scene.params?.metrics && (
        <div style={{ display: "flex", gap: 20, width: "100%", maxWidth: 900 }}>
          {scene.params.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 20,
                padding: "28px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 700, letterSpacing: 1.5 }}>
                {m.label}
              </div>
              <div style={{ color: m.color || "#34D399", fontSize: 32, fontWeight: 900, marginTop: 8 }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {scene.type === "poll" && scene.params && (
        <div
          style={{
            width: "100%",
            maxWidth: 820,
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: 24,
            padding: "36px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
            {scene.params.pollQuestion || "Which model should we test next?"}
          </div>
          <div
            style={{
              background: "rgba(56, 189, 248, 0.2)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 16,
              padding: "16px",
              fontSize: 26,
              fontWeight: 800,
              color: "#38BDF8",
              marginBottom: 12,
            }}
          >
            {scene.params.pollOption1 || "DeepSeek Coder (94%)"}
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: "16px",
              fontSize: 24,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {scene.params.pollOption2 || "Llama 3 8B (6%)"}
          </div>
        </div>
      )}

      {scene.type === "cta" && (
        <div
          style={{
            background: "linear-gradient(135deg, #CC785C 0%, #E07A5F 100%)",
            color: "#FFFFFF",
            fontSize: 32,
            fontWeight: 900,
            padding: "20px 48px",
            borderRadius: 100,
            boxShadow: "0 20px 50px rgba(204, 120, 92, 0.4)",
            letterSpacing: 1,
          }}
        >
          {scene.params?.ctaButtonText || "+ FOLLOW FOR FREE TOOLS"}
        </div>
      )}
    </div>
  );
};
