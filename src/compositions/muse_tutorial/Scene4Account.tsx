import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AccountFormMockup, AgeVerificationMockup } from "./GenericUiMockups";
import { HardShadowCard } from "./HardShadowCard";
import { MarkerHighlight } from "./MarkerHighlight";
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

export const Scene4Account: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s1, s2, s3, s4] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;
  const isShot4 = globalFrame >= s4.start_frame && globalFrame < s4.end_frame;

  // Shot 1: Step 4 with Important sticker slap
  const s1Rel = Math.max(0, globalFrame - s1.start_frame);
  const stickerSlap = spring({
    frame: s1Rel - 10,
    fps,
    config: MUSE_THEME.springs.bouncy,
  });

  // Shot 4: Account Ready Checkmark burst
  const s4Rel = Math.max(0, globalFrame - s4.start_frame);
  const checkPop = spring({
    frame: s4Rel,
    fps,
    config: MUSE_THEME.springs.bouncy,
  });

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
      {/* SHOT 4.1: STEP 4 · IMPORTANT STICKER */}
      {isShot1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            position: "relative",
          }}
        >
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
              gap: 16,
              width: 880,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 120,
                fontWeight: 900,
                color: MUSE_THEME.colors.ink,
                lineHeight: 1,
              }}
            >
              STEP 4
            </span>
            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              Ye Step{" "}
              <MarkerHighlight color={MUSE_THEME.colors.yellow}>
                SABSE IMPORTANT HAI
              </MarkerHighlight>
            </div>
          </HardShadowCard>

          {/* Slapped 'IMPORTANT' Sticker */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: 20,
              padding: "14px 32px",
              backgroundColor: MUSE_THEME.colors.orange,
              color: "#FFF",
              border: "3px solid #111",
              borderRadius: 16,
              boxShadow: "4px 4px 0 #111",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "1px",
              transform: `scale(${Math.max(0, stickerSlap)}) rotate(12deg)`,
            }}
          >
            ★ IMPORTANT ★
          </div>
        </div>
      )}

      {/* SHOT 4.2: GMAIL SE ACCOUNT BANAO */}
      {isShot2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 900, textAlign: "center" }}>
            Apne{" "}
            <MarkerHighlight color={MUSE_THEME.colors.yellow}>
              Gmail Account Se
            </MarkerHighlight>{" "}
            Sign Up Karo
          </div>
          <AccountFormMockup startFrame={s2.start_frame} />
        </div>
      )}

      {/* SHOT 4.3: AGE VERIFICATION */}
      {isShot3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 900, textAlign: "center" }}>
            Age Verification Aaye Toh{" "}
            <MarkerHighlight color={MUSE_THEME.colors.mint}>
              Complete Kar Lo
            </MarkerHighlight>
          </div>
          <AgeVerificationMockup startFrame={s3.start_frame} />
        </div>
      )}

      {/* SHOT 4.4: ACCOUNT READY ✓ (GREEN BG) */}
      {isShot4 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
            transform: `scale(${checkPop})`,
          }}
        >
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
              gap: 24,
              width: 880,
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 999,
                backgroundColor: MUSE_THEME.colors.green,
                border: "4px solid #111",
                boxShadow: "4px 4px 0 #111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
                color: "#FFF",
                fontWeight: 900,
              }}
            >
              ✓
            </div>

            <div style={{ fontSize: 56, fontWeight: 900, textAlign: "center" }}>
              ACCOUNT READY!
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#4B5563" }}>
              Workspace created successfully
            </div>
          </HardShadowCard>
        </div>
      )}
    </div>
  );
};
