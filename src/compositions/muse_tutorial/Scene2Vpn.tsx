import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DotWorldMapMockup, VpnAppMockup } from "./GenericUiMockups";
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

export const Scene2Vpn: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s1, s2, s3] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;

  // Shot 1: Step 1 Badge Slide-in
  const s1Rel = Math.max(0, globalFrame - s1.start_frame);
  const badgeSlide = spring({
    frame: s1Rel,
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
      {/* SHOT 2.1: HUGE STEP 1 BADGE */}
      {isShot1 && (
        <div
          style={{
            transform: `scale(${badgeSlide})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              padding: "16px 48px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.lg,
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "1px",
            }}
          >
            FIRST STEP
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
              STEP 1
            </span>
            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              <MarkerHighlight color={MUSE_THEME.colors.yellow}>
                VPN DOWNLOAD KARO
              </MarkerHighlight>
            </div>
          </HardShadowCard>
        </div>
      )}

      {/* SHOT 2.2: VPN APP TOGGLE TO CONNECTED */}
      {isShot2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            <MarkerHighlight color={MUSE_THEME.colors.yellow}>
              TRUSTED VPN → US SERVER
            </MarkerHighlight>
          </div>
          <VpnAppMockup startFrame={s2.start_frame} />
        </div>
      )}

      {/* SHOT 2.3: DOT-WORLD MAP (REGION LOCKED -> US) */}
      {isShot3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Kyunki Muse Abhi{" "}
            <MarkerHighlight color={MUSE_THEME.colors.coral}>
              US ONLY HAI
            </MarkerHighlight>
          </div>
          <DotWorldMapMockup startFrame={s3.start_frame} />
        </div>
      )}
    </div>
  );
};
