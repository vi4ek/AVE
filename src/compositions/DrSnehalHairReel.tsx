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
  Video,
} from "remotion";
import { AudioController } from "../audio/AudioController";
import { DrSnehalBrandPill } from "../components/DrSnehalBrandPill";
import { DermatologyDesignerHook } from "../components/DermatologyDesignerHook";
import { Anatomy3DVisualizer } from "../components/Anatomy3DVisualizer";
import captionsData from "../../public/inputs/dr_snehal_captions.json";

export const DrSnehalHairReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ========================================================
  // 1. DYNAMIC FPS SCALING CONTROLLER (Supports 30 FPS & 60 FPS)
  // ========================================================
  // 1. DYNAMIC FPS SCALING CONTROLLER (Supports 30 FPS & 60 FPS)
  // ========================================================
  // Reference base is 30 FPS (captions & edits were timed at 30fps).
  // At 60 FPS, timeScale is 2.0. frame30 gives the exact 30fps-equivalent frame index.
  const timeScale = fps / 30;
  const frame30 = frame / timeScale;
  const toFrames = (f30: number) => Math.round(f30 * timeScale);

  // Intervals where B-roll visual takes focus and presenter shrinks to PiP:
  const PIP_INTERVALS = [
    { start: 228, end: 325 }, // Mistake 1 B-roll
    { start: 368, end: 470 }, // Mistake 2 (3D Anatomy B-roll)
    { start: 505, end: 615 }, // Mistake 3 B-roll
    { start: 650, end: 775 }, // Mistake 4 B-roll
    { start: 815, end: 925 }, // Mistake 5 B-roll
  ];

  // True continuous smooth sinusoidal transition calculation (zero jumping or glitches)
  const TRANSITION_FRAMES_30 = 12; // ~400ms smooth cinematic ease
  let pipWeight = 0;
  for (const interval of PIP_INTERVALS) {
    if (frame30 >= interval.start && frame30 < interval.end) {
      const enterSpan = Math.min(TRANSITION_FRAMES_30, (interval.end - interval.start) / 2);
      const exitSpan = enterSpan;
      if (frame30 < interval.start + enterSpan) {
        const p = (frame30 - interval.start) / enterSpan;
        pipWeight = 0.5 - 0.5 * Math.cos(Math.PI * p);
      } else if (frame30 > interval.end - exitSpan) {
        const p = (interval.end - frame30) / exitSpan;
        pipWeight = 0.5 - 0.5 * Math.cos(Math.PI * p);
      } else {
        pipWeight = 1.0;
      }
      break;
    }
  }

  const isPipActive = pipWeight > 0.01;

  // Fullscreen Camera Punch Zooms (when not in PiP)
  let targetPunchZoom = 1.0;
  if (frame30 >= 174 && frame30 < 228) {
    const s = spring({ frame: frame - toFrames(174), fps, config: { damping: 14, stiffness: 220 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]); // "Mistake one"
  } else if (frame30 >= 325 && frame30 < 368) {
    const s = spring({ frame: frame - toFrames(325), fps, config: { damping: 14, stiffness: 220 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]); // "Mistake two"
  } else if (frame30 >= 470 && frame30 < 505) {
    const s = spring({ frame: frame - toFrames(470), fps, config: { damping: 14, stiffness: 220 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]); // "Mistake three"
  } else if (frame30 >= 615 && frame30 < 650) {
    const s = spring({ frame: frame - toFrames(615), fps, config: { damping: 14, stiffness: 220 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]); // "Mistake four"
  } else if (frame30 >= 775 && frame30 < 815) {
    const s = spring({ frame: frame - toFrames(775), fps, config: { damping: 14, stiffness: 220 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]); // "Mistake five"
  } else if (frame30 >= 925) {
    const s = spring({ frame: frame - toFrames(925), fps, config: { damping: 16, stiffness: 200 } });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.18]); // The Verdict ("Your scalp isn't a lab")
  }

  // PiP Styling Interpolations (Much bigger: 340px x 480px with crisp 4px white background stroke!)
  const presenterWidth = interpolate(pipWeight, [0, 1], [1080, 340]);
  const presenterHeight = interpolate(pipWeight, [0, 1], [1920, 480]);
  const presenterRight = interpolate(pipWeight, [0, 1], [0, 48]);
  const presenterBottom = interpolate(pipWeight, [0, 1], [0, 390]); // Generous clean buffer above captions
  const presenterRadius = interpolate(pipWeight, [0, 1], [0, 36]);
  const presenterBorder = interpolate(pipWeight, [0, 1], [0, 4]); // Crisp white stroke
  const presenterShadow = pipWeight > 0.05
    ? "0 24px 60px rgba(0, 0, 0, 0.85), 0 4px 16px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.35)"
    : "none";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090E",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 1. MASTER DR. SNEHAL VOICE (Broadcast loudnorm boosted for crisp, upfront vocal presence) */}
      <Audio
        src={staticFile("inputs/hair_doctor_boosted.mp3")}
        volume={1.35}
      />

      {/* 2. BACKGROUND CLINICAL MUSIC (Ducked to 0.025 so voice is crystal clear and upfront) */}
      <Audio
        src={staticFile("sfx/ambient_tech_bgm.mp3")}
        volume={0.025}
        loop
      />

      {/* 3. B-ROLL VISUAL PLATES (Rendered behind PiP at zIndex=10) */}

      {/* MISTAKE 1: Shampoo Cycling */}
      <Sequence from={toFrames(228)} durationInFrames={toFrames(97)} name="B-Roll 1: Shampoo Cycling">
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_shampoos.jpg")}
          alt="Shampoo cycling"
        />
      </Sequence>

      {/* MISTAKE 2: Live 3D WebGL Hair Follicle Anatomy Visualizer */}
      <Sequence from={toFrames(368)} durationInFrames={toFrames(102)} name="B-Roll 2: 3D Hair Follicle Anatomy">
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#080B12",
          }}
        >
          <Anatomy3DVisualizer
            modelType="hair_follicle"
            width={1000}
            height={1000}
            rotationSpeed={0.9}
            showLabels={false} // Clean cinematic biological animation, zero clutter
          />
          {/* Subtle gradient scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(7, 9, 14, 0.88) 0%, rgba(7, 9, 14, 0.15) 50%, rgba(7, 9, 14, 0.40) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </Sequence>

      {/* MISTAKE 3: Tight Hair Tension */}
      <Sequence from={toFrames(505)} durationInFrames={toFrames(110)} name="B-Roll 3: Traction Tension">
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_ponytail.jpg")}
          alt="Tight ponytail traction"
        />
      </Sequence>

      {/* MISTAKE 4: Prolonged 1-Year Inaction */}
      <Sequence from={toFrames(650)} durationInFrames={toFrames(125)} name="B-Roll 4: 1-Year Inaction">
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_hairbrush.jpg")}
          alt="Hairbrush fallen hair"
        />
      </Sequence>

      {/* MISTAKE 5: Random Reel DIY Hacks */}
      <Sequence from={toFrames(815)} durationInFrames={toFrames(110)} name="B-Roll 5: Social Media DIY Routine">
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_reel_scroll.jpg")}
          alt="Scrolling random social media routine"
        />
      </Sequence>

      {/* 4. MASTER PRESENTER TRACK (Continuous CFR Native Sync) */}
      <div
        style={{
          position: "absolute",
          right: presenterRight,
          bottom: presenterBottom,
          width: presenterWidth,
          height: presenterHeight,
          borderRadius: presenterRadius,
          overflow: "hidden",
          border: `${presenterBorder}px solid #FFFFFF`,
          boxShadow: presenterShadow,
          zIndex: 25,
          pointerEvents: "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: isPipActive
              ? `scale(${interpolate(pipWeight, [0, 1], [targetPunchZoom, 1.42])})`
              : `scale(${targetPunchZoom})`,
            transformOrigin: "center 28%",
          }}
        >
          <Video
            src={staticFile("inputs/hair_doctor.mp4")}
            muted={true}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* 5. HOOK FRAME (Frames 0 - 174) — Strict Hard Rules: ONE image + ONE line */}
      {frame30 < 174 && (
        <Sequence from={0} durationInFrames={toFrames(174)} name="Scene 0: Minimal Problem Hook">
          <DermatologyDesignerHook
            startFrame={0}
            durationInFrames={toFrames(174)}
          />
        </Sequence>
      )}

      {/* 6. TOP-LEFT DOCTOR BRAND PILL (Matches exact user reference: Name + Occupation only) */}
      <DrSnehalBrandPill startFrame={0} durationInFrames={toFrames(1152)} />

      {/* 7. WORD-LEVEL HUMAN CAPTIONS (Rendered globally at zIndex=90, zero box, pure drop shadow) */}
      <HumanWordCaptions captions={captionsData} />

      {/* 8. SFX SUITE: Subtle tactile accents calibrated for clinical trust (ZERO loud pops/whooshes on PiP) */}
      <AudioController
        sfxCues={[
          { frame: toFrames(1), sound: "whoosh", volume: 0.10 },
          { frame: toFrames(30), sound: "click", volume: 0.08 },
          { frame: toFrames(174), sound: "click", volume: 0.10 },
          { frame: toFrames(368), sound: "whoosh", volume: 0.06 },
          { frame: toFrames(925), sound: "sub_hit", volume: 0.18 },
        ]}
      />

      {/* 9. 35MM CINEMATIC FILM GRAIN (Subtle 2.5% texture, zIndex=99) */}
      <FilmGrainOverlay />
    </AbsoluteFill>
  );
};

// ========================================================
// CLEAN B-ROLL VISUAL PLATE (Zero Fake Labels / Zero Pills)
// ========================================================

const CinematicVisualPlate: React.FC<{
  imageSrc: string;
  alt: string;
}> = ({ imageSrc, alt }) => {
  const frame = useCurrentFrame();

  // Subtle continuous slow Ken Burns push
  const kenBurns = interpolate(frame, [0, 120], [1.02, 1.08], {
    extrapolateRight: "clamp",
  });
  const panX = interpolate(frame, [0, 120], [0, -12], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090E",
        overflow: "hidden",
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${kenBurns}) translateX(${panX}px)`,
          filter: "contrast(1.04) brightness(0.85)",
        }}
      />
      {/* Soft gradient bottom scrim so captions are 100% crisp */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(7, 9, 14, 0.92) 0%, rgba(7, 9, 14, 0.25) 45%, rgba(7, 9, 14, 0.30) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ========================================================
// USER-APPROVED VIRAL REEL CAPTIONS (Poppins 800/900, Zero Box)
// ========================================================

const HumanWordCaptions: React.FC<{ captions: any }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timeScale = fps / 30;
  const currentFrame30 = frame / timeScale;

  // The hook frame (0 - 174) has its own dedicated typography. Captions begin on "Mistake one"
  if (currentFrame30 < 174) return null;

  const activePhrase = captions.phrases.find(
    (p: any) => currentFrame30 >= p.startFrame && currentFrame30 <= p.endFrame
  );

  if (!activePhrase) return null;

  const phraseStartFrame = Math.round(activePhrase.startFrame * timeScale);
  const enter = spring({
    frame: frame - phraseStartFrame,
    fps,
    config: { damping: 16, mass: 0.45, stiffness: 240 },
  });

  const translateY = interpolate(enter, [0, 1], [10, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  const PUNCH_WORDS = [
    "CLINIC",
    "HAIR",
    "PATIENCE",
    "MISTAKE",
    "SHAMPOOS",
    "BIOTIN",
    "DEFICIENCY",
    "TIED",
    "TIGHT",
    "IGNORED",
    "YEAR",
    "ROUTINE",
    "SCALP",
    "LAB",
    "TREATMENT",
    "EXPERIMENT",
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 250,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 90,
        pointerEvents: "none",
        padding: "0 56px",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px 14px",
          maxWidth: 960,
        }}
      >
        {activePhrase.words.map((w: any, idx: number) => {
          const isWordActive = currentFrame30 >= w.startFrame && currentFrame30 <= w.endFrame;
          const isWordPassed = currentFrame30 > w.endFrame;
          const cleanWord = w.word.replace(/[.,:;!?]/g, "").toUpperCase();
          const isPunch = PUNCH_WORDS.includes(cleanWord);

          const wordStartFrame = Math.round(w.startFrame * timeScale);
          const wordSpring = spring({
            frame: frame - wordStartFrame,
            fps,
            config: { damping: 14, mass: 0.4, stiffness: 260 },
          });

          const wordScale = isWordActive
            ? interpolate(wordSpring, [0, 1], [1.0, isPunch ? 1.15 : 1.08])
            : 1.0;

          // Verified palette: Matte warm gold (#FDE68A) for active, coral red (#F87171) for punch, white for spoken
          const wordColor = isWordActive
            ? (isPunch ? "#F87171" : "#FDE68A")
            : isWordPassed
              ? "#FFFFFF"
              : "rgba(255, 255, 255, 0.72)";

          return (
            <span
              key={idx}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: isPunch ? 50 : 44,
                fontWeight: isWordActive || isPunch ? 900 : 800,
                color: wordColor,
                transform: `scale(${wordScale})`,
                display: "inline-block",
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
                textTransform: "uppercase",
                // Crisp multi-layered cinematic drop shadow (zero neon glow, 100% legible)
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.95), 0 4px 16px rgba(0, 0, 0, 0.90), 0 12px 32px rgba(0, 0, 0, 0.85)",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ========================================================
// 35MM SUBTLE ORGANIC FILM GRAIN (2.5% Opacity)
// ========================================================

const FilmGrainOverlay: React.FC = () => {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.025,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        zIndex: 99,
      }}
    >
      <filter id="filmNoise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#filmNoise)" />
    </svg>
  );
};
