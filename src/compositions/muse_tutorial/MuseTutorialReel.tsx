import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import retimedData from "../../../public/inputs/muse_retimed.json";
import { VizionWatermarkPill } from "../../components/VizionWatermarkPill";
import { PaperGrain } from "./PaperGrain";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Vpn } from "./Scene2Vpn";
import { Scene3Browser } from "./Scene3Browser";
import { Scene4Account } from "./Scene4Account";
import { Scene5Claim } from "./Scene5Claim";
import { Scene6Settings } from "./Scene6Settings";
import { Scene7Redeem } from "./Scene7Redeem";
import { Scene8Cta } from "./Scene8Cta";
import { MUSE_THEME } from "./tokens";

export const MuseTutorialReel: React.FC = () => {
  const globalFrame = useCurrentFrame();

  const { scenes, shots } = retimedData;

  // Determine current active shot and background color
  const activeShot =
    shots.find(
      (s) => globalFrame >= s.start_frame && globalFrame < s.end_frame
    ) || shots[shots.length - 1];

  const bgColor = activeShot.background || MUSE_THEME.colors.offWhite;

  // Sound effects cue list directly tied to shot trigger frames
  const sfxTriggers: Array<{ frame: number; sound: string; vol: number }> = [
    // S1
    { frame: shots[0].start_frame + 2, sound: "pop", vol: 0.5 },
    { frame: shots[0].start_frame + 18, sound: "coin_clink", vol: 0.6 },
    { frame: shots[1].start_frame, sound: "sub_hit", vol: 0.7 },
    { frame: shots[2].start_frame, sound: "clock_tick", vol: 0.6 },
    { frame: shots[2].start_frame + 25, sound: "clock_tick", vol: 0.6 },
    // S2
    { frame: shots[3].start_frame, sound: "whoosh", vol: 0.6 },
    { frame: shots[3].start_frame + 4, sound: "sub_hit", vol: 0.65 },
    { frame: shots[4].start_frame + 20, sound: "click", vol: 0.6 },
    { frame: shots[4].start_frame + 24, sound: "ping", vol: 0.5 },
    { frame: shots[5].start_frame + 10, sound: "ping", vol: 0.5 },
    // S3
    { frame: shots[6].start_frame + 5, sound: "click", vol: 0.4 },
    { frame: shots[7].start_frame + 18, sound: "click", vol: 0.7 },
    { frame: shots[7].start_frame + 22, sound: "pop", vol: 0.5 },
    // S4
    { frame: shots[8].start_frame + 8, sound: "sub_hit", vol: 0.75 },
    { frame: shots[9].start_frame + 10, sound: "click", vol: 0.4 },
    { frame: shots[10].start_frame + 12, sound: "ping", vol: 0.5 },
    { frame: shots[11].start_frame, sound: "success_chime", vol: 0.8 },
    // S5
    { frame: shots[12].start_frame, sound: "whoosh", vol: 0.55 },
    { frame: shots[13].start_frame + 5, sound: "clock_tick", vol: 0.6 },
    { frame: shots[14].start_frame + 6, sound: "sub_hit", vol: 0.8 },
    // S6
    { frame: shots[15].start_frame, sound: "whoosh", vol: 0.6 },
    { frame: shots[16].start_frame + 4, sound: "click", vol: 0.5 },
    { frame: shots[17].start_frame + 4, sound: "pop", vol: 0.5 },
    // S7
    { frame: shots[18].start_frame + 4, sound: "click", vol: 0.5 },
    { frame: shots[19].start_frame + 8, sound: "click", vol: 0.4 },
    { frame: shots[19].start_frame + 24, sound: "ping", vol: 0.6 },
    { frame: shots[20].start_frame, sound: "success_chime", vol: 0.75 },
    // S8
    { frame: shots[21].start_frame + 20, sound: "click", vol: 0.6 },
    { frame: shots[21].start_frame + 24, sound: "ping", vol: 0.5 },
    { frame: shots[22].start_frame, sound: "pop", vol: 0.6 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        fontFamily: MUSE_THEME.typography.fontFamily,
        color: MUSE_THEME.colors.ink,
        overflow: "hidden",
        transition: "background-color 0.15s ease",
      }}
    >
      {/* 1. Master Voiceover Audio Track (Continuous 70.10s) */}
      <Audio src={staticFile("inputs/muse_voiceover.mp3")} volume={1.0} />

      {/* 2. Light Ambient Background Music (ducked under VO at 0.12) */}
      <Audio
        src={staticFile("sfx/ambient_tech_bgm.mp3")}
        volume={globalFrame > 1950 ? 0.05 : 0.11}
      />

      {/* 3. Synchronized Sound Effects */}
      {sfxTriggers.map((sfx, idx) => {
        if (globalFrame === sfx.frame) {
          return (
            <Audio
              key={idx}
              src={staticFile(`sfx/${sfx.sound}.wav`)}
              volume={sfx.vol}
            />
          );
        }
        return null;
      })}

      {/* 4. Active Scene Renderers (Global Frame Driven - No Sequence Reset Bug) */}
      {globalFrame >= scenes[0].start_frame &&
        globalFrame < scenes[0].end_frame && (
          <Scene1Hook sceneData={scenes[0]} />
        )}

      {globalFrame >= scenes[1].start_frame &&
        globalFrame < scenes[1].end_frame && (
          <Scene2Vpn sceneData={scenes[1]} />
        )}

      {globalFrame >= scenes[2].start_frame &&
        globalFrame < scenes[2].end_frame && (
          <Scene3Browser sceneData={scenes[2]} />
        )}

      {globalFrame >= scenes[3].start_frame &&
        globalFrame < scenes[3].end_frame && (
          <Scene4Account sceneData={scenes[3]} />
        )}

      {globalFrame >= scenes[4].start_frame &&
        globalFrame < scenes[4].end_frame && (
          <Scene5Claim sceneData={scenes[4]} />
        )}

      {globalFrame >= scenes[5].start_frame &&
        globalFrame < scenes[5].end_frame && (
          <Scene6Settings sceneData={scenes[5]} />
        )}

      {globalFrame >= scenes[6].start_frame &&
        globalFrame < scenes[6].end_frame && (
          <Scene7Redeem sceneData={scenes[6]} />
        )}

      {globalFrame >= scenes[7].start_frame &&
        globalFrame <= scenes[7].end_frame && (
          <Scene8Cta sceneData={scenes[7]} />
        )}

      {/* 5. Tactile Paper Texture Overlay */}
      <PaperGrain />

      {/* 6. Top-Left Watermark Pill (@vizion.std) */}
      <VizionWatermarkPill />
    </AbsoluteFill>
  );
};
