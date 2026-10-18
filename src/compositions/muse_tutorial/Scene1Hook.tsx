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

export const Scene1Hook: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s1, s2, s3] = sceneData.shots;

  // Active shot determination
  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;

  // Shot 1: 1 BILLION Counter roll-up & coin pop-ins
  const s1Rel = Math.max(0, globalFrame - s1.start_frame);
  const counterVal = Math.floor(
    interpolate(s1Rel, [5, 55], [0, 1000], {
      extrapolateRight: "clamp",
    })
  );

  const titlePop = spring({
    frame: s1Rel,
    fps,
    config: MUSE_THEME.springs.snappy,
  });

  // Shot 2: Muse card slam in
  const s2Rel = Math.max(0, globalFrame - s2.start_frame);
  const cardSlam = spring({
    frame: s2Rel,
    fps,
    config: MUSE_THEME.springs.bouncy,
  });

  // Shot 3: 48 HRS countdown ring
  const s3Rel = Math.max(0, globalFrame - s3.start_frame);
  const ringProgress = interpolate(s3Rel, [0, s3.duration_frames], [0, 360], {
    extrapolateRight: "clamp",
  });
  const ringSeconds = Math.max(
    0,
    48 - Math.floor(interpolate(s3Rel, [0, s3.duration_frames], [0, 48]))
  );

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
        position: "relative",
      }}
    >
      {/* SHOT 1.1: 1 BILLION FREE TOKENS */}
      {isShot1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            transform: `scale(${titlePop})`,
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            META'S NEW AGENT: MUSE
          </div>

          {/* Hero Counter Card */}
          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={8}
            borderRadius={28}
            borderWidth={4}
            padding={48}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: 900,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 108,
                fontWeight: 900,
                color: MUSE_THEME.colors.orange,
                lineHeight: 1,
              }}
            >
              {counterVal >= 1000 ? "1 BILLION" : `${counterVal}M`}
            </span>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: "-0.5px",
                textAlign: "center",
              }}
            >
              <MarkerHighlight color={MUSE_THEME.colors.yellow} delayFrames={10}>
                FREE TOKENS
              </MarkerHighlight>
            </div>
          </HardShadowCard>

          {/* Floating Token Coins */}
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { val: "+250M" },
              { val: "+500M" },
              { val: "+1,000,000,000" },
            ].map((item, idx) => {
              const coinPop = spring({
                frame: s1Rel - 15 - idx * 8,
                fps,
                config: MUSE_THEME.springs.pop,
              });
              return (
                <div
                  key={idx}
                  style={{
                    padding: "10px 22px",
                    backgroundColor: MUSE_THEME.colors.offWhite,
                    border: MUSE_THEME.borders.standard,
                    borderRadius: 14,
                    boxShadow: MUSE_THEME.shadows.standard,
                    fontWeight: 900,
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transform: `scale(${Math.max(0, coinPop)})`,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      backgroundColor: "#FFD700",
                      border: "2px solid #111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 900,
                      color: "#111",
                    }}
                  >
                    T
                  </div>
                  <span>{item.val}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SHOT 1.2: MUSE · 1B TOKENS CARD SLAM */}
      {isShot2 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
            transform: `scale(${cardSlam})`,
          }}
        >
          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={8}
            borderRadius={28}
            borderWidth={4}
            padding={44}
            style={{ width: 920, display: "flex", flexDirection: "column", gap: 28 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "3px solid #111",
                paddingBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: MUSE_THEME.colors.orange,
                    border: "3px solid #111",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "#FFF",
                    fontSize: 24,
                  }}
                >
                  M
                </div>
                <span style={{ fontSize: 32, fontWeight: 900 }}>Muse Workspace</span>
              </div>
              <div
                style={{
                  padding: "8px 18px",
                  backgroundColor: MUSE_THEME.colors.mint,
                  border: "2px solid #111",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                PRO ALLOWANCE
              </div>
            </div>

            {/* Token Balance Badge Filling Up */}
            <div
              style={{
                padding: "28px 36px",
                backgroundColor: MUSE_THEME.colors.yellow,
                border: "3px solid #111",
                borderRadius: 20,
                boxShadow: "4px 4px 0 #111",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#374151" }}>
                  CURRENT BALANCE
                </span>
                <span
                  style={{
                    fontFamily: MUSE_THEME.typography.mono,
                    fontSize: 54,
                    fontWeight: 900,
                  }}
                >
                  1,000,000,000
                </span>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#FFF",
                  border: "3px solid #111",
                  borderRadius: 12,
                  fontWeight: 900,
                  fontSize: 22,
                }}
              >
                ACTIVE ✓
              </div>
            </div>

            <div style={{ fontSize: 36, fontWeight: 900, textAlign: "center" }}>
              Milenge{" "}
              <MarkerHighlight color={MUSE_THEME.colors.yellow} delayFrames={6}>
                1 BILLION FREE TOKENS
              </MarkerHighlight>
            </div>
          </HardShadowCard>
        </div>
      )}

      {/* SHOT 1.3: SIRF 48 GHANTE COUNTDOWN RING */}
      {isShot3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
          }}
        >
          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={8}
            borderRadius={28}
            borderWidth={4}
            padding={48}
            style={{
              width: 900,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
            }}
          >
            <div
              style={{
                padding: "8px 24px",
                backgroundColor: MUSE_THEME.colors.coral,
                border: "3px solid #111",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 20,
              }}
            >
              ⚠️ CRITICAL DEADLINE
            </div>

            {/* Countdown Circular Ring */}
            <div style={{ position: "relative", width: 260, height: 260 }}>
              <svg width="260" height="260">
                <circle
                  cx="130"
                  cy="130"
                  r="105"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                <circle
                  cx="130"
                  cy="130"
                  r="105"
                  fill="none"
                  stroke={MUSE_THEME.colors.orange}
                  strokeWidth="20"
                  strokeDasharray="660"
                  strokeDashoffset={660 - (ringProgress / 360) * 660}
                  strokeLinecap="round"
                  transform="rotate(-90 130 130)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: MUSE_THEME.typography.mono,
                    fontSize: 64,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {ringSeconds}h
                </span>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#6B7280" }}>
                  WINDOW
                </span>
              </div>
            </div>

            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              <MarkerHighlight color={MUSE_THEME.colors.coral}>
                SIRF 48 GHANTE
              </MarkerHighlight>
              <div style={{ fontSize: 28, color: "#4B5563", marginTop: 8, fontWeight: 700 }}>
                ke andar ye ek step karna padega!
              </div>
            </div>
          </HardShadowCard>
        </div>
      )}
    </div>
  );
};
