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

export interface MetaAiHookProps {
  showAudio?: boolean;
}

/**
 * MetaAiHookScene - Starting Hook (0.0s - 4.5s / 135 frames @ 30 FPS)
 *
 * Style: Apple Cupertino Keynote Motion & Poppins Typography
 * Audio: "Agar tum kutte ke bachhe ko ulta tangoge, tab bhi wo tumhe ye baatein nahi batayega."
 *
 * Choreography:
 * - Cute puppy visual with dramatic Ken Burns punch-zoom (1.0x -> 1.22x)
 * - Playful upside-down rotation snap when speaker says "ULTA TANGOGE"
 * - Apple Cupertino frosted glass pill badges & titanium typography
 * - Poppins font weights (800 & 900)
 * - Top-left @vizion.std watermark pill badge
 */
export const MetaAiHookScene: React.FC<MetaAiHookProps> = ({ showAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------------------------
  // 1. CAMERA & PUPPY MOTION DYNAMICS
  // -----------------------------------------------------------------
  const baseZoom = interpolate(frame, [0, 50, 110], [1.0, 1.12, 1.22], {
    extrapolateRight: "clamp",
  });

  // "Ulta Tangoge" Inversion Spring (Triggered at Frame 42 / ~1.4s)
  const flipSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });
  const rotationZ = interpolate(flipSpring, [0, 1], [0, -180]);
  const flipScale = interpolate(flipSpring, [0, 0.5, 1], [1.0, 0.88, 1.05]);

  // Quick comedic freeze-frame shake at frame 56
  const shakeX =
    frame >= 50 && frame <= 62
      ? Math.sin((frame - 50) * 2.8) * 12
      : 0;

  // -----------------------------------------------------------------
  // 2. KINETIC TEXT PHRASING
  // -----------------------------------------------------------------
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });
  const p1Scale = interpolate(p1Spring, [0, 1], [0.82, 1.0]);
  const p1Opacity = interpolate(frame, [0, 8, 42, 48], [0, 1, 1, 0]);

  const p2Spring = spring({ frame: frame - 45, fps, config: { damping: 12, stiffness: 240 } });
  const p2Scale = interpolate(p2Spring, [0, 1], [0.7, 1.08]);
  const p2Opacity = interpolate(frame, [45, 50, 85, 90], [0, 1, 1, 0]);

  const p3Spring = spring({ frame: frame - 88, fps, config: { damping: 16, stiffness: 200 } });
  const p3Scale = interpolate(p3Spring, [0, 1], [0.85, 1.0]);
  const p3Opacity = interpolate(frame, [88, 94, 130, 135], [0, 1, 1, 0.2]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0C10",
        overflow: "hidden",
        fontFamily: "'Poppins', -apple-system, sans-serif",
      }}
    >
      {/* Load Google Fonts Poppins */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Roboto:wght@500;700&display=swap');
      `}</style>

      {/* PUPPY HERO VISUAL (PUNCH ZOOM & "ULTA" FLIP) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${baseZoom * flipScale}) rotate(${rotationZ}deg) translateX(${shakeX}px)`,
          transformOrigin: "center 45%",
          zIndex: 2,
        }}
      >
        <Img
          src={staticFile("inputs/puppy_hook.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.05) brightness(1.02)",
          }}
        />

        {/* Apple Cinematic Vignette Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(10, 11, 15, 0.55) 75%, rgba(10, 11, 15, 0.92) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* TOP WATERMARK BRANDING: Cupertino Standard (@vizion.std) */}
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
          backgroundColor: "rgba(255, 255, 255, 0.82)",
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

      {/* KINETIC FLOATING CAPTION PILLS (APPLE FROSTED GLASS) */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          left: 0,
          right: 0,
          zIndex: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          pointerEvents: "none",
        }}
      >
        {/* PHRASE 1 (0.0s - 1.4s): "AGAR TUM KUTTE KE BACHHE KO..." */}
        {p1Opacity > 0.01 && (
          <div
            style={{
              opacity: p1Opacity,
              transform: `scale(${p1Scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "14px 32px",
                borderRadius: 100,
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 34,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#1D1D1F",
                }}
              >
                Agar Tum <span style={{ color: "#0071E3" }}>Kutte Ke Bachhe</span> Ko
              </span>
            </div>
          </div>
        )}

        {/* PHRASE 2 (1.4s - 2.9s): "ULTA TANGOGE 🙃" */}
        {p2Opacity > 0.01 && (
          <div
            style={{
              opacity: p2Opacity,
              transform: `scale(${p2Scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "18px 40px",
                borderRadius: 100,
                backgroundColor: "#1D1D1F",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
                transform: "rotate(-3deg)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                }}
              >
                ULTA TANGOGE! 🙃
              </span>
            </div>
          </div>
        )}

        {/* PHRASE 3 (2.9s - 4.5s): "TAB BHI WO NAHI BATAYEGA! 🤫" */}
        {p3Opacity > 0.01 && (
          <div
            style={{
              opacity: p3Opacity,
              transform: `scale(${p3Scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "16px 36px",
                borderRadius: 100,
                backgroundColor: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#1D1D1F",
                }}
              >
                Tab Bhi Wo <span style={{ color: "#E11D48" }}>Nahi Batayega!</span> 🤫
              </span>
            </div>
          </div>
        )}
      </div>

      {/* AUDIO TRACKS (IF SHOW AUDIO ENABLED) */}
      {showAudio && (
        <>
          <Audio
            src={staticFile("inputs/meta_ai_models_vo.mp3")}
            startFrom={0}
            volume={1.0}
          />
          <Audio
            src={staticFile("sfx/ambient_tech_bgm.wav")}
            startFrom={0}
            volume={0.04}
          />
          <Audio src={staticFile("sfx/sub_hit.wav")} startFrom={0} volume={0.8} />
          <Sequence from={42} durationInFrames={30}>
            <Audio src={staticFile("sfx/whoosh.wav")} startFrom={0} volume={0.65} />
          </Sequence>
          <Sequence from={54} durationInFrames={20}>
            <Audio src={staticFile("sfx/pop.wav")} startFrom={0} volume={0.7} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};
