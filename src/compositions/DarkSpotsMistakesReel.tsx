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
import captionsData from "../../public/inputs/dark_spots_captions.json";

// ========================================================
// DARK SPOTS MISTAKES — 9:16 Dermatology Reel
// Follows the same proven 5-mistake structure as hair reel
// ALL B-rolls are UNIQUE GENERATED assets (zero library reuse)
// Trimmed: 2.5s dead start + 5s dead end removed
// Duration: 34.3s @ 30fps = 1030 frames
// ========================================================

export const DarkSpotsMistakesReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ========================================================
  // 1. DYNAMIC FPS SCALING CONTROLLER (30/60 FPS Support)
  // ========================================================
  const timeScale = fps / 30;
  const frame30 = frame / timeScale;
  const toFrames = (f30: number) => Math.round(f30 * timeScale);

  // ========================================================
  // 2. PiP INTERVALS — B-roll takes focus, presenter shrinks
  // ========================================================
  const PIP_INTERVALS = [
    { start: 249, end: 345 }, // Mistake 1: Lemon juice DIY
    { start: 426, end: 525 }, // Mistake 2: Sun exposure / no sunscreen
    { start: 594, end: 700 }, // Mistake 3: Random creams
    { start: 768, end: 845 }, // Mistake 4: Picking spots (mirror worry)
    { start: 907, end: 975 }, // Mistake 5: Overnight results (skincare products)
  ];

  // Smooth sinusoidal PiP transition (zero jumping / glitches)
  const TRANSITION_FRAMES_30 = 12;
  let pipWeight = 0;
  for (const interval of PIP_INTERVALS) {
    if (frame30 >= interval.start && frame30 < interval.end) {
      const enterSpan = Math.min(
        TRANSITION_FRAMES_30,
        (interval.end - interval.start) / 2
      );
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

  // ========================================================
  // 3. PRESENTER CAMERA PUNCH ZOOMS (when not in PiP)
  // ========================================================
  let targetPunchZoom = 1.0;
  if (frame30 >= 195 && frame30 < 249) {
    // "Mistake one" punch
    const s = spring({
      frame: frame - toFrames(195),
      fps,
      config: { damping: 14, stiffness: 220 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]);
  } else if (frame30 >= 380 && frame30 < 426) {
    // "Mistake two" punch
    const s = spring({
      frame: frame - toFrames(380),
      fps,
      config: { damping: 14, stiffness: 220 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]);
  } else if (frame30 >= 550 && frame30 < 594) {
    // "Mistake three" punch
    const s = spring({
      frame: frame - toFrames(550),
      fps,
      config: { damping: 14, stiffness: 220 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]);
  } else if (frame30 >= 725 && frame30 < 768) {
    // "Mistake four" punch
    const s = spring({
      frame: frame - toFrames(725),
      fps,
      config: { damping: 14, stiffness: 220 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]);
  } else if (frame30 >= 865 && frame30 < 907) {
    // "Mistake five" punch
    const s = spring({
      frame: frame - toFrames(865),
      fps,
      config: { damping: 14, stiffness: 220 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.15]);
  } else if (frame30 >= 990) {
    // Verdict punch — "Your skin isn't a canvas"
    const s = spring({
      frame: frame - toFrames(990),
      fps,
      config: { damping: 16, stiffness: 200 },
    });
    targetPunchZoom = interpolate(s, [0, 1], [1.0, 1.18]);
  }

  // Breathing micro-motion (always active on presenter)
  const breathingScale =
    targetPunchZoom * (1.0 + Math.sin(frame / 48) * 0.002);

  // ========================================================
  // 4. PiP STYLING INTERPOLATIONS (340×480 portrait card)
  // ========================================================
  const presenterWidth = interpolate(pipWeight, [0, 1], [1080, 340]);
  const presenterHeight = interpolate(pipWeight, [0, 1], [1920, 480]);
  const presenterRight = interpolate(pipWeight, [0, 1], [0, 48]);
  const presenterBottom = interpolate(pipWeight, [0, 1], [0, 390]);
  const presenterRadius = interpolate(pipWeight, [0, 1], [0, 36]);
  const presenterBorder = interpolate(pipWeight, [0, 1], [0, 4]);
  const presenterShadow =
    pipWeight > 0.05
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
      {/* ══════════════════════════════════════════════════════
          1. MASTER VOICE — Broadcast loudnorm boosted audio
         ══════════════════════════════════════════════════════ */}
      <Audio
        src={staticFile("inputs/dark_spots_boosted.mp3")}
        volume={1.35}
      />

      {/* ══════════════════════════════════════════════════════
          2. BACKGROUND CLINICAL MUSIC (ducked to 0.025)
         ══════════════════════════════════════════════════════ */}
      <Audio
        src={staticFile("sfx/ambient_tech_bgm.mp3")}
        volume={0.025}
        loop
      />

      {/* ══════════════════════════════════════════════════════
          3. GENERATED B-ROLL VISUAL PLATES (z=10)
             ALL UNIQUE — zero library reuse
         ══════════════════════════════════════════════════════ */}

      {/* MISTAKE 1: Lemon Juice DIY Hack */}
      <Sequence
        from={toFrames(249)}
        durationInFrames={toFrames(96)}
        name="B-Roll 1: Lemon DIY Hack"
      >
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_lemon_diy_hack.jpg")}
          alt="Lemon juice DIY skincare hack"
        />
      </Sequence>

      {/* MISTAKE 2: Sun Exposure / No Sunscreen */}
      <Sequence
        from={toFrames(426)}
        durationInFrames={toFrames(99)}
        name="B-Roll 2: Sun Exposure"
      >
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_sun_exposure.jpg")}
          alt="Sun UV exposure on skin"
        />
      </Sequence>

      {/* MISTAKE 3: Random Creams Without Prescription */}
      <Sequence
        from={toFrames(594)}
        durationInFrames={toFrames(106)}
        name="B-Roll 3: Random Skincare Creams"
      >
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_skin_cream_apply.jpg")}
          alt="Applying random cream without prescription"
        />
      </Sequence>

      {/* MISTAKE 4: Picking & Squeezing Spots */}
      <Sequence
        from={toFrames(768)}
        durationInFrames={toFrames(77)}
        name="B-Roll 4: Mirror Skin Picking"
      >
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_mirror_worry.jpg")}
          alt="Worried skin picking in mirror"
        />
      </Sequence>

      {/* MISTAKE 5: Expecting Overnight Results */}
      <Sequence
        from={toFrames(907)}
        durationInFrames={toFrames(68)}
        name="B-Roll 5: Skincare Product Overload"
      >
        <CinematicVisualPlate
          imageSrc={staticFile("inputs/broll_skincare_products.jpg")}
          alt="Skincare products expecting instant results"
        />
      </Sequence>

      {/* ══════════════════════════════════════════════════════
          4. MASTER PRESENTER TRACK (Continuous Sync)
         ══════════════════════════════════════════════════════ */}
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
              ? `scale(${interpolate(pipWeight, [0, 1], [breathingScale, 1.42])})`
              : `scale(${breathingScale})`,
            transformOrigin: "center 28%",
          }}
        >
          <Video
            src={staticFile("inputs/dark_spots_h264.mp4")}
            muted={true}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          5. DARK SPOTS HOOK FRAME (Frames 0 - 171)
             ONE image + ONE line — exact proven hook structure
         ══════════════════════════════════════════════════════ */}
      {frame30 < 171 && (
        <Sequence
          from={0}
          durationInFrames={toFrames(171)}
          name="Scene 0: Dark Spots Hook"
        >
          <DarkSpotsHookFrame startFrame={0} durationInFrames={toFrames(171)} />
        </Sequence>
      )}

      {/* ══════════════════════════════════════════════════════
          6. DR. SNEHAL BRAND PILL (top-left, z=95)
         ══════════════════════════════════════════════════════ */}
      <DrSnehalBrandPill startFrame={0} durationInFrames={toFrames(1033)} />

      {/* ══════════════════════════════════════════════════════
          7. WORD-LEVEL CAPTIONS (z=90, global scope)
         ══════════════════════════════════════════════════════ */}
      <DarkSpotsCaptions captions={captionsData} />

      {/* ══════════════════════════════════════════════════════
          8. SFX SUITE — Subtle clinical accents
         ══════════════════════════════════════════════════════ */}
      <AudioController
        sfxCues={[
          { frame: toFrames(1), sound: "whoosh", volume: 0.1 },
          { frame: toFrames(30), sound: "click", volume: 0.08 },
          { frame: toFrames(195), sound: "click", volume: 0.1 },
          { frame: toFrames(380), sound: "click", volume: 0.1 },
          { frame: toFrames(550), sound: "click", volume: 0.1 },
          { frame: toFrames(725), sound: "click", volume: 0.1 },
          { frame: toFrames(865), sound: "click", volume: 0.1 },
          { frame: toFrames(990), sound: "sub_hit", volume: 0.18 },
        ]}
      />

      {/* ══════════════════════════════════════════════════════
          9. 35MM CINEMATIC FILM GRAIN (z=99)
         ══════════════════════════════════════════════════════ */}
      <FilmGrainOverlay />
    </AbsoluteFill>
  );
};

// ========================================================
// DARK SPOTS HOOK — ONE Image + ONE Line (Strict Hard Rules)
// ========================================================

const DarkSpotsHookFrame: React.FC<{
  startFrame: number;
  durationInFrames: number;
}> = ({ startFrame = 0, durationInFrames = 171 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  const lineSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.6 },
  });

  const exitProgress = interpolate(
    relFrame,
    [durationInFrames - 18, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(lineSpring, [0, 1], [24, 0]);
  const opacity =
    interpolate(lineSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  const imageScale = interpolate(relFrame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        backgroundColor: "#07090E",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Hook Image — Dark spots on face (unique generated) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${imageScale})`,
          transformOrigin: "center center",
          opacity: 1 - exitProgress,
        }}
      >
        <img
          src={staticFile("inputs/broll_dark_spots_face.jpg")}
          alt="Dark spots skin problem"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.72) contrast(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7, 9, 14, 0.90) 0%, rgba(7, 9, 14, 0.35) 45%, rgba(7, 9, 14, 0.40) 100%)",
          }}
        />
      </div>

      {/* The ONE line */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 50,
          right: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.22,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            margin: 0,
            padding: 0,
            textShadow:
              "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.95), 0 8px 30px rgba(0, 0, 0, 0.85)",
          }}
        >
          {relFrame < 68 ? (
            <span>You walked into my clinic</span>
          ) : (
            <span>
              pointing at your{" "}
              <span style={{ color: "#F9A8D4", fontWeight: 900 }}>
                dark spots
              </span>{" "}
              wanting them gone.
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

// ========================================================
// CINEMATIC B-ROLL VISUAL PLATE (Ken Burns drift)
// ========================================================

const CinematicVisualPlate: React.FC<{
  imageSrc: string;
  alt: string;
}> = ({ imageSrc, alt }) => {
  const frame = useCurrentFrame();

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
          filter: "contrast(1.03) brightness(0.85) saturate(1.08)",
        }}
      />
      {/* Soft gradient bottom scrim for crisp captions */}
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
// DARK SPOTS CAPTIONS — Poppins 800/900, Zero Box
// Beauty/Skincare niche: Rose accent (#F9A8D4)
// ========================================================

const DarkSpotsCaptions: React.FC<{ captions: any }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timeScale = fps / 30;
  const currentFrame30 = frame / timeScale;

  // Hook has its own typography — captions begin on "Mistake one"
  if (currentFrame30 < 195) return null;

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

  // Skincare/Dermatology niche punch words
  const PUNCH_WORDS = [
    "DARK",
    "SPOTS",
    "LEMON",
    "SUNSCREEN",
    "CREAMS",
    "PRESCRIPTION",
    "PICKING",
    "SQUEEZING",
    "OVERNIGHT",
    "SKIN",
    "CANVAS",
    "MISTAKE",
    "TREATMENT",
    "PATIENCE",
    "EXPERIMENTS",
    "CLINIC",
    "FACE",
    "RESULTS",
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
          const isWordActive =
            currentFrame30 >= w.startFrame && currentFrame30 <= w.endFrame;
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
            ? interpolate(
                wordSpring,
                [0, 1],
                [1.0, isPunch ? 1.15 : 1.08]
              )
            : 1.0;

          // Beauty/Skincare niche palette:
          // Active: Rose (#F9A8D4), Punch active: Coral red (#F87171), Spoken: White
          const wordColor = isWordActive
            ? isPunch
              ? "#F87171"
              : "#F9A8D4"
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
      <filter id="darkSpotsGrain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#darkSpotsGrain)" />
    </svg>
  );
};
