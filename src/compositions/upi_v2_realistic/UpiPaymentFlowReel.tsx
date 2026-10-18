import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import retimedData from "../../../public/inputs/retimed.json";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2AppPin } from "./Scene2AppPin";
import { Scene3Npci } from "./Scene3Npci";
import { Scene4Banks } from "./Scene4Banks";
import { Scene5Confirmation } from "./Scene5Confirmation";
import { Scene6Cta } from "./Scene6Cta";
import { PaperGrainOverlay } from "./shared";
import { VizionWatermarkPill } from "../../components/VizionWatermarkPill";
import { UPI_THEME } from "./tokens";

export const UpiPaymentFlowReelRealistic: React.FC = () => {
  const frame = useCurrentFrame();

  const [scene1, scene2, scene3, scene4, scene5, scene6] = retimedData.scenes;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: UPI_THEME.colors.bg,
        fontFamily: UPI_THEME.fonts.body,
        overflow: "hidden",
      }}
    >
      {/* ────────────────────────────────────────────────────────────
          1. VOICE OVER TRACKS (Exact Scene Timing)
         ──────────────────────────────────────────────────────────── */}
      {retimedData.scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.start_frame}
          durationInFrames={scene.duration_frames}
          name={`VO: Scene ${scene.id}`}
        >
          <Audio src={staticFile(scene.vo_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* ────────────────────────────────────────────────────────────
          2. SFX CUES (Retimed Cues with Strict Volume Balancing)
         ──────────────────────────────────────────────────────────── */}
      {retimedData.sfx_cues.map((cue, idx) => {
        // Map sound names to audio files in public/sfx/
        const soundFile =
          cue.sound === "sub_hit"
            ? "sfx/sub_hit.wav"
            : cue.sound === "whoosh"
            ? "sfx/whoosh.wav"
            : cue.sound === "click"
            ? "sfx/click.wav"
            : cue.sound === "pop"
            ? "sfx/pop.wav"
            : cue.sound === "riser"
            ? "sfx/riser.wav"
            : cue.sound === "ping"
            ? "sfx/ping.wav"
            : cue.sound === "coin_clink"
            ? "sfx/coin_clink.wav"
            : cue.sound === "success_chime"
            ? "sfx/success_chime.wav"
            : cue.sound === "lock_clunk"
            ? "sfx/lock_clunk.wav"
            : cue.sound === "digital_glitch"
            ? "sfx/digital_glitch.wav"
            : cue.sound === "notification_buzz"
            ? "sfx/notification_buzz.wav"
            : "sfx/click.wav";

        const volume =
          cue.sound === "whoosh"
            ? Math.min(cue.volume * 0.5, 0.28)
            : cue.volume;

        return (
          <Sequence
            key={idx}
            from={cue.frame}
            durationInFrames={45}
            name={`SFX: ${cue.sound}`}
          >
            <Audio src={staticFile(soundFile)} volume={volume} />
          </Sequence>
        );
      })}

      {/* ────────────────────────────────────────────────────────────
          3. SCENE VISUALS (Scenes manage their own global frame Sequences)
         ──────────────────────────────────────────────────────────── */}
      <Scene1Hook shots={scene1.shots} />
      <Scene2AppPin shots={scene2.shots} />
      <Scene3Npci shots={scene3.shots} />
      <Scene4Banks shots={scene4.shots} />
      <Scene5Confirmation shots={scene5.shots} />
      <Scene6Cta shots={scene6.shots} />

      {/* ────────────────────────────────────────────────────────────
          4. OFFICIAL BRAND WATERMARK PILL (@vizion.std)
         ──────────────────────────────────────────────────────────── */}
      <VizionWatermarkPill />

      {/* ────────────────────────────────────────────────────────────
          5. GLOBAL PAPER-GRAIN OVERLAY
         ──────────────────────────────────────────────────────────── */}
      <PaperGrainOverlay />
    </AbsoluteFill>
  );
};
