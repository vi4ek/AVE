import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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

export const Scene5Claim: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s1, s2, s3] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;

  // S5.1: Orbiting Coins angle
  const s1Rel = Math.max(0, globalFrame - s1.start_frame);
  const orbitAngle = (s1Rel * 4) % 360;

  // S5.2: 48:00:00 ticking
  const s2Rel = Math.max(0, globalFrame - s2.start_frame);
  const secondsLeft = Math.max(
    0,
    48 * 3600 - Math.floor(interpolate(s2Rel, [0, s2.duration_frames], [0, 7200]))
  );
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;
  const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  // S5.3: EXPIRED stamp slam
  const s3Rel = Math.max(0, globalFrame - s3.start_frame);
  const stampSlam = spring({
    frame: s3Rel - 6,
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
      {/* SHOT 5.1: STEP 5 · CLAIM */}
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
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            STEP 5
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
              gap: 28,
              width: 880,
            }}
          >
            {/* Orbiting Question Center */}
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 84,
                  fontWeight: 900,
                  color: MUSE_THEME.colors.orange,
                }}
              >
                ?
              </div>

              {/* Orbiting Coin 1 */}
              <div
                style={{
                  position: "absolute",
                  top: 80 + Math.sin((orbitAngle * Math.PI) / 180) * 80,
                  left: 80 + Math.cos((orbitAngle * Math.PI) / 180) * 80,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: "#FFD700",
                  border: "2px solid #111",
                  boxShadow: "2px 2px 0 #111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                T
              </div>
              {/* Orbiting Coin 2 */}
              <div
                style={{
                  position: "absolute",
                  top: 80 + Math.sin(((orbitAngle + 180) * Math.PI) / 180) * 80,
                  left: 80 + Math.cos(((orbitAngle + 180) * Math.PI) / 180) * 80,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: "#FFD700",
                  border: "2px solid #111",
                  boxShadow: "2px 2px 0 #111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                T
              </div>
            </div>

            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              Ab Tokens{" "}
              <MarkerHighlight color={MUSE_THEME.colors.yellow}>
                CLAIM KAISE KAREIN?
              </MarkerHighlight>
            </div>
          </HardShadowCard>
        </div>
      )}

      {/* SHOT 5.2: 48 GHANTE KE ANDAR COUNTDOWN */}
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
              padding: "8px 24px",
              backgroundColor: MUSE_THEME.colors.white,
              border: MUSE_THEME.borders.thick,
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 20,
            }}
          >
            ⚡ REDEMPTION RULE
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
              width: 880,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 76,
                fontWeight: 900,
                color: MUSE_THEME.colors.redExpired,
                letterSpacing: "2px",
              }}
            >
              {timeString}
            </span>

            <div style={{ fontSize: 42, fontWeight: 900, textAlign: "center" }}>
              Account Banne Ke{" "}
              <MarkerHighlight color={MUSE_THEME.colors.coral}>
                48 GHANTE KE ANDAR
              </MarkerHighlight>{" "}
              Redeem Karna Hai!
            </div>
          </HardShadowCard>
        </div>
      )}

      {/* SHOT 5.3: DEADLINE MISS = EXPIRED STAMP (INK BG) */}
      {isShot3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
            position: "relative",
          }}
        >
          <HardShadowCard
            bg={MUSE_THEME.colors.offWhite}
            shadowOffset={8}
            borderRadius={32}
            borderWidth={4}
            padding={64}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              width: 880,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 88,
                fontWeight: 900,
                color: "#6B7280",
                textDecoration: "line-through",
              }}
            >
              00:00:00
            </span>

            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center", marginTop: 8 }}>
              Uske Baad{" "}
              <span style={{ color: MUSE_THEME.colors.redExpired }}>
                NAHI MILEGA!
              </span>
            </div>

            <div style={{ fontSize: 24, fontWeight: 700, color: "#4B5563" }}>
              Code invalid ho jayega
            </div>
          </HardShadowCard>

          {/* Red Stamp Slammed Over 00:00:00 */}
          <div
            style={{
              position: "absolute",
              top: 40,
              padding: "14px 40px",
              backgroundColor: MUSE_THEME.colors.redExpired,
              color: "#FFF",
              border: "5px solid #111",
              borderRadius: 16,
              boxShadow: "6px 6px 0 #111",
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: "3px",
              transform: `scale(${Math.max(0, stampSlam)}) rotate(-10deg)`,
            }}
          >
            EXPIRED
          </div>
        </div>
      )}
    </div>
  );
};
