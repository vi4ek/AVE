import React from "react";
import { Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export interface DuckingRange {
  startFrame: number;
  endFrame: number;
}

export interface AudioControllerProps {
  bgmSrc?: string;
  bgmVolume?: number; // 0.0 - 1.0 (default 0.35)
  duckingAmount?: number; // ducked volume (default 0.09)
  duckingRanges?: DuckingRange[];
  speechWords?: Array<{ startFrame: number; endFrame: number }>;
  sfxCues?: Array<{
    frame: number;
    sound: "whoosh" | "click" | "pop" | "sub_hit" | "riser";
    volume?: number;
  }>;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  bgmSrc,
  bgmVolume = 0.35,
  duckingAmount = 0.09,
  duckingRanges = [],
  speechWords = [],
  sfxCues = [],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Combined ducking intervals from explicit ranges and speech words
  const activeRanges: DuckingRange[] = [...duckingRanges];

  // Auto-group speech words into active speech segments if provided
  if (speechWords.length > 0) {
    let currentSegment: DuckingRange | null = null;
    const gapThreshold = 25; // ~0.4s pause between words counts as continuation

    for (const w of speechWords) {
      if (!currentSegment) {
        currentSegment = { startFrame: w.startFrame, endFrame: w.endFrame };
      } else if (w.startFrame - currentSegment.endFrame <= gapThreshold) {
        currentSegment.endFrame = w.endFrame;
      } else {
        activeRanges.push(currentSegment);
        currentSegment = { startFrame: w.startFrame, endFrame: w.endFrame };
      }
    }
    if (currentSegment) {
      activeRanges.push(currentSegment);
    }
  }

  // Smooth cosine/spring volume ducking calculation
  let currentVolume = bgmVolume;
  const fadeFrames = 12; // ~0.4s smooth transition at 30fps

  for (const range of activeRanges) {
    if (frame >= range.startFrame - fadeFrames && frame <= range.endFrame + fadeFrames) {
      if (frame < range.startFrame) {
        const dip = interpolate(
          frame,
          [range.startFrame - fadeFrames, range.startFrame],
          [bgmVolume, duckingAmount],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        currentVolume = Math.min(currentVolume, dip);
      } else if (frame > range.endFrame) {
        const swell = interpolate(
          frame,
          [range.endFrame, range.endFrame + fadeFrames],
          [duckingAmount, bgmVolume],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        currentVolume = Math.min(currentVolume, swell);
      } else {
        currentVolume = duckingAmount;
      }
    }
  }

  return (
    <>
      {/* Background Music with Automatic Sidechain Ducking */}
      {bgmSrc && (
        <Sequence from={0} durationInFrames={durationInFrames}>
          <Audio
            src={bgmSrc.startsWith("http") ? bgmSrc : staticFile(bgmSrc)}
            volume={currentVolume}
          />
        </Sequence>
      )}

      {/* Frame-Accurate SFX Triggers with Bounded Playback */}
      {sfxCues.map((cue, idx) => {
        if (frame >= cue.frame && frame <= cue.frame + 60) {
          return (
            <Sequence
              key={`${cue.sound}-${cue.frame}-${idx}`}
              from={cue.frame}
              durationInFrames={60}
            >
              <Audio
                src={staticFile(`sfx/${cue.sound}.wav`)}
                volume={cue.volume ?? 0.65}
              />
            </Sequence>
          );
        }
        return null;
      })}
    </>
  );
};
