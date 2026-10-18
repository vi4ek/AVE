import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { ClientNiche, NICHE_PROFILES } from "../presets/niches";

export type TalkingHeadMode = "wide" | "punch-in" | "pip" | "split";

export interface CameraCue {
  frame: number;
  mode: TalkingHeadMode;
}

export interface TalkingHeadPresenterProps {
  videoSrc?: string;
  posterImage?: string;
  mode?: TalkingHeadMode;
  cues?: CameraCue[];
  niche?: ClientNiche;
  speakerName?: string;
  speakerTitle?: string;
  punchZoomFactor?: number;
  punchOrigin?: string;
  pipPosition?: "bottom-right" | "bottom-left" | "top-right";
  isSpeaking?: boolean;
}

export const TalkingHeadPresenter: React.FC<TalkingHeadPresenterProps> = ({
  videoSrc,
  posterImage,
  mode = "wide",
  cues,
  niche = "dermatology",
  speakerName = "Dr. Sarah Jenkins",
  speakerTitle = "Board-Certified Dermatologist",
  punchZoomFactor = 1.18,
  punchOrigin = "50% 36%",
  pipPosition = "bottom-right",
  isSpeaking = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const profile = NICHE_PROFILES[niche];

  // Resolve current active mode from timeline cues if provided, else prop
  let currentMode = mode;
  let modeStartFrame = 0;

  if (cues && cues.length > 0) {
    const sorted = [...cues].sort((a, b) => a.frame - b.frame);
    const active = [...sorted].reverse().find((c) => frame >= c.frame) || sorted[0];
    currentMode = active.mode;
    modeStartFrame = active.frame;
  }

  const localCueFrame = Math.max(0, frame - modeStartFrame);

  // Snappy punch-in spring
  const punchSpring = spring({
    frame: localCueFrame,
    fps,
    config: { damping: 16, mass: 0.5, stiffness: 220 },
  });

  // Smooth PiP transition spring
  const pipSpring = spring({
    frame: localCueFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  // Micro-motion breathing float to keep single-camera footage alive
  const breathingScale = 1.0 + Math.sin(frame / 45) * 0.003;
  const breathingPanY = Math.cos(frame / 45) * 2;

  // Determine scale and transform
  let scale = 1.0;
  let transformOrigin = "center center";

  if (currentMode === "punch-in") {
    scale = interpolate(punchSpring, [0, 1], [1.0, punchZoomFactor]);
    transformOrigin = punchOrigin;
  } else if (currentMode === "wide") {
    scale = breathingScale;
  }

  // Speaking indicator pulses
  const pulseRing = isSpeaking
    ? interpolate(Math.sin((frame / 7) * Math.PI), [-1, 1], [1, 1.12])
    : 1;

  // Render PiP Mode
  if (currentMode === "pip") {
    const pipScale = interpolate(pipSpring, [0, 1], [0.6, 1]);
    const pipOpacity = interpolate(pipSpring, [0, 1], [0, 1]);

    const posStyle: React.CSSProperties =
      pipPosition === "bottom-right"
        ? { bottom: 60, right: 40 }
        : pipPosition === "bottom-left"
        ? { bottom: 60, left: 40 }
        : { top: 60, right: 40 };

    return (
      <div
        style={{
          position: "absolute",
          ...posStyle,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: pipPosition.includes("right") ? "flex-end" : "flex-start",
          gap: 12,
          opacity: pipOpacity,
          transform: `scale(${pipScale})`,
          transformOrigin: pipPosition.includes("right") ? "bottom right" : "bottom left",
        }}
      >
        {/* Presenter Circle with Glowing Audio Pulse */}
        <div style={{ position: "relative", width: 170, height: 170 }}>
          {/* Animated audio halo ring */}
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: `2px solid ${profile.colors.primary}`,
              opacity: isSpeaking ? 0.65 : 0.2,
              transform: `scale(${pulseRing})`,
              transition: "transform 0.1s ease-out",
            }}
          />

          {/* Presenter Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${profile.colors.cardBorder}`,
              boxShadow: `0 18px 45px rgba(0, 0, 0, 0.7), 0 0 30px ${profile.colors.primary}44`,
              background: "#090D16",
              position: "relative",
            }}
          >
            {videoSrc ? (
              <Video
                src={videoSrc}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : posterImage ? (
              <img
                src={posterImage}
                alt={speakerName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <SimulatedPresenterPortrait niche={niche} speakerName={speakerName} />
            )}
          </div>

          {/* Active Speaking Badge */}
          {isSpeaking && (
            <div
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                backgroundColor: profile.colors.primary,
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  display: "inline-block",
                }}
              />
              MIC
            </div>
          )}
        </div>

        {/* Floating Mini Name Badge */}
        <div
          style={{
            background: "rgba(10, 15, 26, 0.88)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${profile.colors.cardBorder}`,
            padding: "6px 14px",
            borderRadius: 12,
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            textAlign: pipPosition.includes("right") ? "right" : "left",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            {speakerName}
          </div>
          <div
            style={{
              fontSize: 10,
              color: profile.colors.primary,
              fontWeight: 600,
            }}
          >
            {speakerTitle}
          </div>
        </div>
      </div>
    );
  }

  // Render Split Screen Mode
  if (currentMode === "split") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "50%",
          overflow: "hidden",
          borderRadius: 24,
          border: `1.5px solid ${profile.colors.cardBorder}`,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${scale}) translateY(${breathingPanY}px)`,
            transformOrigin,
            willChange: "transform",
          }}
        >
          {videoSrc ? (
            <Video
              src={videoSrc}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : posterImage ? (
            <img
              src={posterImage}
              alt={speakerName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <SimulatedPresenterPortrait niche={niche} speakerName={speakerName} />
          )}
        </div>
      </div>
    );
  }

  // Render Full Screen Mode (Wide or Punch-In)
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#05070D",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${breathingPanY}px)`,
          transformOrigin,
          willChange: "transform",
          transition: "transform 0.1s ease-out",
        }}
      >
        {videoSrc ? (
          <Video
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : posterImage ? (
          <img
            src={posterImage}
            alt={speakerName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <SimulatedPresenterStudio
            niche={niche}
            speakerName={speakerName}
            speakerTitle={speakerTitle}
            isSpeaking={isSpeaking}
          />
        )}
      </div>
    </div>
  );
};

// High-fidelity fallback simulated portrait for PiP
const SimulatedPresenterPortrait: React.FC<{
  niche: ClientNiche;
  speakerName: string;
}> = ({ niche, speakerName }) => {
  const profile = NICHE_PROFILES[niche];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 50% 35%, ${profile.colors.primary}33 0%, #080D1A 85%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${profile.colors.primary} 0%, ${profile.colors.secondary} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: 800,
          color: "#FFFFFF",
          boxShadow: `0 8px 20px ${profile.colors.primary}66`,
        }}
      >
        {speakerName
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>
    </div>
  );
};

// High-fidelity studio presenter fallback for Full Screen
const SimulatedPresenterStudio: React.FC<{
  niche: ClientNiche;
  speakerName: string;
  speakerTitle: string;
  isSpeaking: boolean;
}> = ({ niche, speakerName, speakerTitle, isSpeaking }) => {
  const frame = useCurrentFrame();
  const profile = NICHE_PROFILES[niche];

  const waveHeight = isSpeaking
    ? Math.abs(Math.sin(frame / 6)) * 24 + 10
    : 4;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 50% 30%, ${profile.colors.primary}22 0%, #060913 70%, #020408 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Studio Background Rim Lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${profile.colors.primary}18 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Grid Floor Perspective Lines */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom center",
          opacity: 0.4,
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* Stylized Speaker Avatar Silhouette & Face Light */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Speaker Head / Profile */}
        <div
          style={{
            position: "relative",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${profile.colors.cardBg} 0%, rgba(15, 23, 42, 0.95) 100%)`,
            border: `3px solid ${profile.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px ${profile.colors.primary}33`,
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${profile.colors.primary} 0%, ${profile.colors.accent} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-1px",
              boxShadow: `0 12px 30px ${profile.colors.primary}55`,
            }}
          >
            {speakerName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>

          {/* Clinical / Legal Verification Badge Pin */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: profile.colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#FFFFFF",
              boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
              border: "2px solid #FFFFFF",
            }}
          >
            ✓
          </div>
        </div>

        {/* Dynamic Speech Waveform Visualizer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 36,
            padding: "8px 20px",
            borderRadius: 20,
            background: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${profile.colors.cardBorder}`,
          }}
        >
          {[0.6, 1.2, 0.8, 1.5, 0.9, 1.3, 0.7].map((factor, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: isSpeaking
                  ? Math.max(4, Math.sin((frame / 5) + i) * waveHeight * factor)
                  : 4,
                borderRadius: 2,
                backgroundColor: profile.colors.primary,
                transition: "height 0.08s ease-out",
              }}
            />
          ))}
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: profile.colors.primary,
              marginLeft: 8,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            LIVE CAM FEED
          </span>
        </div>
      </div>
    </div>
  );
};
