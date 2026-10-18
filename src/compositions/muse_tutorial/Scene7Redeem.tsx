import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
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

export const Scene7Redeem: React.FC<SceneProps> = ({ sceneData }) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [s1, s2, s3] = sceneData.shots;

  const isShot1 = globalFrame >= s1.start_frame && globalFrame < s1.end_frame;
  const isShot2 = globalFrame >= s2.start_frame && globalFrame < s2.end_frame;
  const isShot3 = globalFrame >= s3.start_frame && globalFrame < s3.end_frame;

  // Shot 2: NKGW5B typewriter letter by letter
  const s2Rel = Math.max(0, globalFrame - s2.start_frame);
  const code = "NKGW5B";
  const lettersTyped = Math.min(code.length, Math.floor(s2Rel / 10) + 1);
  const displayedCode = code.slice(0, lettersTyped);

  // Shot 3: Two cards 'AAP +1B' and 'MAIN +1B'
  const s3Rel = Math.max(0, globalFrame - s3.start_frame);
  const card1Pop = spring({
    frame: s3Rel,
    fps,
    config: MUSE_THEME.springs.bouncy,
  });
  const card2Pop = spring({
    frame: s3Rel - 12,
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
      {/* SHOT 7.1: STEP 7 · REDEEM INVITE CODE */}
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
            AAKHRI STEP (STEP 7)
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
            <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>
              <MarkerHighlight color={MUSE_THEME.colors.yellow}>
                Redeem Invite Code
              </MarkerHighlight>{" "}
              Par Click Karo
            </div>

            {/* Simulated Redeem Input Field */}
            <div
              style={{
                width: "100%",
                padding: "24px 32px",
                backgroundColor: MUSE_THEME.colors.offWhite,
                border: "3px solid #111",
                borderRadius: 20,
                boxShadow: "4px 4px 0 #111",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700, color: "#9CA3AF" }}>
                Enter invite code...
              </span>
              <div
                style={{
                  padding: "12px 28px",
                  backgroundColor: MUSE_THEME.colors.orange,
                  color: "#FFF",
                  fontWeight: 900,
                  fontSize: 20,
                  borderRadius: 12,
                  border: "2px solid #111",
                }}
              >
                APPLY
              </div>
            </div>
          </HardShadowCard>
        </div>
      )}

      {/* SHOT 7.2: CODE NKGW5B HUGE AND HIGH CONTRAST */}
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
              padding: "12px 32px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: MUSE_THEME.borders.thick,
              borderRadius: MUSE_THEME.radii.pill,
              boxShadow: MUSE_THEME.shadows.standard,
              fontWeight: 900,
              fontSize: 26,
            }}
          >
            ENTER THIS CODE
          </div>

          {/* Huge high-contrast code box */}
          <HardShadowCard
            bg={MUSE_THEME.colors.white}
            shadowOffset={10}
            borderRadius={36}
            borderWidth={5}
            padding={56}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              width: 920,
            }}
          >
            <span
              style={{
                fontFamily: MUSE_THEME.typography.mono,
                fontSize: 136,
                fontWeight: 900,
                color: MUSE_THEME.colors.ink,
                letterSpacing: "14px",
                lineHeight: 1,
              }}
            >
              {displayedCode}
              {s2Rel % 12 < 6 && <span style={{ color: MUSE_THEME.colors.orange }}>|</span>}
            </span>

            <div
              style={{
                padding: "8px 24px",
                backgroundColor: MUSE_THEME.colors.mint,
                borderRadius: 999,
                border: "2px solid #111",
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              PAUSE & COPY THIS CODE
            </div>
          </HardShadowCard>

          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#FFF",
              textAlign: "center",
              textShadow: "2px 2px 0 #111",
            }}
          >
            N - K - G - W - 5 - B
          </div>
        </div>
      )}

      {/* SHOT 7.3: DONO KO 1B TOKENS + REFERRAL DISCLOSURE */}
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
              fontSize: 48,
              fontWeight: 900,
              color: "#FFF",
              textAlign: "center",
              textShadow: "3px 3px 0 #111",
            }}
          >
            DONO KO 1 BILLION TOKENS!
          </div>

          {/* Two side-by-side cards: AAP +1B & MAIN +1B */}
          <div style={{ display: "flex", gap: 32, width: "100%", justifyContent: "center" }}>
            {/* Card 1: AAP */}
            <div style={{ transform: `scale(${Math.max(0, card1Pop)})` }}>
              <HardShadowCard
                bg={MUSE_THEME.colors.white}
                shadowOffset={6}
                borderRadius={24}
                padding={36}
                style={{
                  width: 420,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    backgroundColor: MUSE_THEME.colors.mint,
                    border: "3px solid #111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900 }}>AAPKO</span>
                <span
                  style={{
                    fontFamily: MUSE_THEME.typography.mono,
                    fontSize: 48,
                    fontWeight: 900,
                    color: MUSE_THEME.colors.green,
                  }}
                >
                  +1B TOKENS
                </span>
              </HardShadowCard>
            </div>

            {/* Card 2: MAIN */}
            <div style={{ transform: `scale(${Math.max(0, card2Pop)})` }}>
              <HardShadowCard
                bg={MUSE_THEME.colors.yellow}
                shadowOffset={6}
                borderRadius={24}
                padding={36}
                style={{
                  width: 420,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    backgroundColor: "#FFF",
                    border: "3px solid #111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900 }}>MUJHE BHI</span>
                <span
                  style={{
                    fontFamily: MUSE_THEME.typography.mono,
                    fontSize: 48,
                    fontWeight: 900,
                    color: MUSE_THEME.colors.orange,
                  }}
                >
                  +1B TOKENS
                </span>
              </HardShadowCard>
            </div>
          </div>

          {/* Referral Disclosure Label - MUST STAY VISIBLE */}
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: MUSE_THEME.colors.offWhite,
              border: MUSE_THEME.borders.standard,
              borderRadius: 14,
              boxShadow: "3px 3px 0 #111",
              fontWeight: 800,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            REFERRAL CODE · Ye mera referral code hai, isse dono ko bonus milta hai
          </div>
        </div>
      )}
    </div>
  );
};
