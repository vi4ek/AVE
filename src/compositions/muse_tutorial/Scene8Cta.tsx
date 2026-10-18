import React from "react";
import { useCurrentFrame } from "remotion";
import { HardShadowCard } from "./HardShadowCard";
import { MUSE_THEME } from "./tokens";

interface SceneProps {
  sceneData: {
    start_frame: number;
    end_frame: number;
    shots: Array<{
      id: string;
      start_frame: number;
      end_frame: number;
      duration_frames: number;
      on_screen_text: string;
    }>;
  };
}

export const Scene8Cta: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();

  const [s1, s2] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;

  // Shot 1: Copy button tap
  const s1Rel = Math.max(0, globalFrame - s1.start_frame);
  const copyTapped = s1Rel >= 20;

  // Shot 2: Follow button pulse
  const s2Rel = Math.max(0, globalFrame - s2.start_frame);
  const followPulse = 1 + 0.04 * Math.sin((s2Rel / 6) * Math.PI);
  const followed = s2Rel >= 25;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        boxSizing: "border-box",
      }}
    >
      {/* SHOT 8.1: CODE COPY KARO, ABHI TRY KARO */}
      {isShot1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
          }}
        >
          <div
            style={{
              padding: "10px 32px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: "4px 4px 0 #FFF",
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            CLAIM YOUR 1B TOKENS
          </div>

          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={8}
            borderRadius={32}
            borderWidth={4}
            padding={48}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              width: 900,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 104,
                fontWeight: 900,
                color: MUSE_THEME.colors.ink,
                letterSpacing: "8px",
                lineHeight: 1,
              }}
            >
              NKGW5B
            </span>

            {/* Simulated Copy Button */}
            <div
              style={{
                padding: "16px 44px",
                backgroundColor: copyTapped ? MUSE_THEME.colors.green : MUSE_THEME.colors.orange,
                color: "#FFF",
                border: "3px solid #111",
                borderRadius: 16,
                boxShadow: "4px 4px 0 #111",
                fontWeight: 900,
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span>{copyTapped ? "COPIED! ✓" : "COPY CODE"}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </div>

            <div style={{ fontSize: 22, fontWeight: 700, color: "#4B5563" }}>
              Join at <span style={{ fontWeight: 900, color: MUSE_THEME.colors.ink }}>muse.ai/join</span>
            </div>
          </HardShadowCard>

          {/* Offer terms footer (MUST BE VISIBLE) */}
          <div
            style={{
              color: "#9CA3AF",
              fontSize: 16,
              fontWeight: 600,
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            Offer terms badal sakte hain · muse.ai/join check karo
          </div>
        </div>
      )}

      {/* SHOT 8.2: FOLLOW KARO · @VIZION.STD */}
      {isShot2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 28,
              backgroundColor: MUSE_THEME.colors.orange,
              border: "4px solid #FFF",
              boxShadow: "4px 4px 0 #FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              color: "#FFF",
              fontWeight: 900,
            }}
          >
            V
          </div>

          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={8}
            borderRadius={32}
            borderWidth={4}
            padding={56}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              width: 880,
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              Aise AI Tricks Ke Liye
            </div>

            <div
              style={{
                transform: `scale(${followPulse})`,
              }}
            >
              <div
                style={{
                  padding: "18px 56px",
                  backgroundColor: followed ? MUSE_THEME.colors.green : MUSE_THEME.colors.ink,
                  color: "#FFF",
                  borderRadius: 20,
                  border: "3px solid #111",
                  boxShadow: "4px 4px 0 #FF5A1F",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span>{followed ? "FOLLOWING ✓" : "FOLLOW KARO"}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5v14" />
                </svg>
              </div>
            </div>

            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: MUSE_THEME.colors.orange,
                letterSpacing: "0.5px",
              }}
            >
              @vizion.std
            </span>
          </HardShadowCard>
        </div>
      )}
    </div>
  );
};
