import React from "react";
import { useCurrentFrame } from "remotion";
import { SidebarSettingsMockup } from "./GenericUiMockups";
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

export const Scene6Settings: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const [s1, s2, s3] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;

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
      {/* SHOT 6.1: STEP 6 · BOTTOM LEFT '=' ICON */}
      {isShot1 && (
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
              padding: "10px 28px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            STEP 6
          </div>

          <div style={{ fontSize: 40, fontWeight: 900, textAlign: "center" }}>
            Bottom-Left Mein{" "}
            <MarkerHighlight color={MUSE_THEME.colors.yellow}>
              Do Lines Wala Icon
            </MarkerHighlight>{" "}
            Dikhega
          </div>

          <SidebarSettingsMockup startFrame={s1.start_frame} activeStep="menu" />
        </div>
      )}

      {/* SHOT 6.2: MENU -> SETTINGS */}
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
              padding: "10px 28px",
              backgroundColor: MUSE_THEME.colors.white,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            STEP 6 (CONT.)
          </div>

          <div style={{ fontSize: 42, fontWeight: 900, textAlign: "center" }}>
            Us Par Click Karo, Phir{" "}
            <MarkerHighlight color={MUSE_THEME.colors.mint}>
              SETTINGS
            </MarkerHighlight>
          </div>

          <SidebarSettingsMockup startFrame={s2.start_frame} activeStep="settings" />
        </div>
      )}

      {/* SHOT 6.3: SETTINGS -> GENERAL */}
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
              padding: "10px 28px",
              backgroundColor: MUSE_THEME.colors.mint,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            STEP 6 (FINAL)
          </div>

          <div style={{ fontSize: 42, fontWeight: 900, textAlign: "center" }}>
            Aur{" "}
            <MarkerHighlight color={MUSE_THEME.colors.yellow}>
              GENERAL MEIN
            </MarkerHighlight>{" "}
            Jao
          </div>

          <SidebarSettingsMockup startFrame={s3.start_frame} activeStep="general" />
        </div>
      )}
    </div>
  );
};
