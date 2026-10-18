import React from "react";
import { useCurrentFrame } from "remotion";
import { BrowserWindowMockup } from "./GenericUiMockups";
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

export const Scene3Browser: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const [s1, s2] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;

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
      {/* SHOT 3.1: STEP 2 - BROWSER MEIN MUSE.AI KHOLO */}
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
              backgroundColor: MUSE_THEME.colors.white,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            STEP 2
          </div>

          <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
            Browser Mein{" "}
            <MarkerHighlight color={MUSE_THEME.colors.orange}>
              muse.ai kholo
            </MarkerHighlight>
          </div>

          <BrowserWindowMockup startFrame={s1.start_frame} showClick={false} />
        </div>
      )}

      {/* SHOT 3.2: STEP 3 - SIGN UP BUTTON CLICK */}
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
            STEP 3
          </div>

          <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
            <MarkerHighlight color={MUSE_THEME.colors.mint}>
              SIGN UP PAR CLICK KARO
            </MarkerHighlight>
          </div>

          <BrowserWindowMockup startFrame={s2.start_frame} showClick={true} />
        </div>
      )}
    </div>
  );
};
