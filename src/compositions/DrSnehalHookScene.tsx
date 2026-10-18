import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Video,
} from "remotion";
import { AudioController } from "../audio/AudioController";
import { DermatologyDesignerHook } from "../components/DermatologyDesignerHook";

/**
 * Standalone 5.8s (174 Frames @ 30 FPS) Preview for Dr. Snehal's Viral Designer Hook:
 * - NO NEON, NO GLOW, NO GLITCH, NO CYBERPUNK.
 * - Apple Cupertino Slate Frosted Glass.
 * - Tactile 3D tilted card with deep physical drop shadows.
 * - Organic speed-graph bounce (steep entry, 12% overshoot, damped settle).
 * - Multi-frequency sound design (sub-bass, whoosh, pop, mechanical click).
 */
export const DrSnehalHookScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090E",
        overflow: "hidden",
      }}
    >
      {/* 1. DOCTOR FOOTAGE RUNNING IN BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "scale(1.0)",
          transformOrigin: "center 34%",
          zIndex: 1,
        }}
      >
        <Video
          src={staticFile("inputs/hair_doctor.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 2. BACKGROUND CLINICAL MUSIC (Ducked to 0.05) */}
      <Audio
        src={staticFile("sfx/ambient_tech_bgm.wav")}
        volume={0.05}
        loop
      />

      {/* 3. CLEAN MINIMAL CLIENT HOOK FRAME (Strict Hard Rules) */}
      <DermatologyDesignerHook
        startFrame={0}
        durationInFrames={174}
        clinicName="Dr. Snehal MD"
      />


      {/* 4. SYNCHRONIZED SOUND EFFECTS */}
      <AudioController
        sfxCues={[
          { frame: 1, sound: "whoosh", volume: 0.35 },
          { frame: 4, sound: "sub_hit", volume: 0.65 },
          { frame: 7, sound: "pop", volume: 0.45 },
          { frame: 10, sound: "click", volume: 0.40 },
          { frame: 30, sound: "whoosh", volume: 0.25 },
          { frame: 160, sound: "whoosh", volume: 0.30 },
        ]}
      />
    </AbsoluteFill>
  );
};
