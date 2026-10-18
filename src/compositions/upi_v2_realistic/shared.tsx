import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { UPI_THEME } from "./tokens";

// ─────────────────────────────────────────────────────────────
// 1. PAPER GRAIN OVERLAY (~6% opacity across whole video)
// ─────────────────────────────────────────────────────────────
export const PaperGrainOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.06,
        mixBlendMode: "multiply",
        backgroundImage: `radial-gradient(circle at 50% 50%, #111 1px, transparent 1px)`,
        backgroundSize: "4px 4px",
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────
// 2. KINETIC TEXT WITH MARKER WIPE
// ─────────────────────────────────────────────────────────────
interface WordConfig {
  text: string;
  highlight?: boolean;
  color?: string;
  highlightColor?: string;
}

interface KineticTextProps {
  words: WordConfig[];
  startFrameOffset?: number;
  textColor?: string;
  fontSize?: number;
  textAlign?: "center" | "left";
  style?: React.CSSProperties;
}

export const KineticHeadline: React.FC<KineticTextProps> = ({
  words,
  startFrameOffset = 0,
  textColor = UPI_THEME.colors.ink,
  fontSize = 72,
  textAlign = "center",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : "flex-start",
        alignItems: "center",
        gap: "14px 18px",
        fontFamily: UPI_THEME.fonts.headline,
        fontSize,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
        lineHeight: 1.08,
        maxWidth: 960,
        margin: "0 auto",
        ...style,
      }}
    >
      {words.map((w, i) => {
        const wordDelay = startFrameOffset + i * 4;
        const localFrame = Math.max(0, frame - wordDelay);
        const pop = spring({
          frame: localFrame,
          fps,
          config: { damping: 11, stiffness: 220, mass: 0.6 },
        });

        // Highlight marker wipe
        const markerWipe = interpolate(localFrame, [3, 14], [0, 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const wordColor = w.color || textColor;
        const markerBg = w.highlightColor || UPI_THEME.colors.yellowHighlight;

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              transform: `scale(${pop})`,
              color: wordColor,
              padding: w.highlight ? "4px 12px" : "2px 0",
              zIndex: 1,
            }}
          >
            {w.highlight && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "10%",
                  height: "72%",
                  width: `${markerWipe}%`,
                  backgroundColor: markerBg,
                  borderRadius: 6,
                  border: "2px solid #111111",
                  boxShadow: "2px 2px 0 #111111",
                  zIndex: -1,
                  transformOrigin: "left center",
                }}
              />
            )}
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 3. REAL-WORLD CUTAWAY COMPONENT (Dim overlay + 3px outline)
// ─────────────────────────────────────────────────────────────
interface RealWorldCutawayProps {
  imageSrc: string;
  captionTitle?: string;
  captionTag?: string;
  dimOpacity?: number;
  scaleRange?: [number, number];
}

export const RealWorldCutaway: React.FC<RealWorldCutawayProps> = ({
  imageSrc,
  captionTitle,
  captionTag = "REALITY CHECK",
  dimOpacity = 0.28,
  scaleRange = [1.0, 1.06],
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 90], scaleRange, {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    >
      <Img
        src={staticFile(imageSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
        }}
      />
      {/* Dim overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(17, 17, 17, ${dimOpacity})`,
        }}
      />

      {/* Floating Tag Header */}
      {captionTag && (
        <div
          style={{
            position: "absolute",
            top: UPI_THEME.safeZone.top,
            left: UPI_THEME.safeZone.paddingX,
            backgroundColor: UPI_THEME.colors.yellowHighlight,
            border: UPI_THEME.borders.neo,
            boxShadow: UPI_THEME.shadows.neo,
            borderRadius: 12,
            padding: "8px 20px",
            fontFamily: UPI_THEME.fonts.headline,
            fontSize: 24,
            fontWeight: 900,
            color: UPI_THEME.colors.ink,
            letterSpacing: "0.08em",
          }}
        >
          {captionTag}
        </div>
      )}

      {/* Caption at bottom above safe zone */}
      {captionTitle && (
        <div
          style={{
            position: "absolute",
            bottom: UPI_THEME.safeZone.bottom + 20,
            left: UPI_THEME.safeZone.paddingX,
            right: UPI_THEME.safeZone.paddingX,
            backgroundColor: UPI_THEME.colors.offWhite,
            border: UPI_THEME.borders.neo,
            boxShadow: UPI_THEME.shadows.neoLg,
            borderRadius: 20,
            padding: "20px 28px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: UPI_THEME.fonts.headline,
              fontSize: 44,
              fontWeight: 900,
              color: UPI_THEME.colors.ink,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {captionTitle}
          </span>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 4. REALISTIC PHONE MOCKUP (Color-block Neo-Brutalist)
// ─────────────────────────────────────────────────────────────
interface RealisticPhoneProps {
  children: React.ReactNode;
  showThumb?: boolean;
  thumbPressed?: boolean;
  scale?: number;
}

export const RealisticPhone: React.FC<RealisticPhoneProps> = ({
  children,
  showThumb = false,
  thumbPressed = false,
  scale = 1.0,
}) => {
  return (
    <div
      style={{
        width: 580,
        height: 1040,
        borderRadius: 54,
        backgroundColor: UPI_THEME.colors.offWhite,
        border: UPI_THEME.borders.neoThick,
        boxShadow: "6px 6px 0 #111111",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 28px",
        overflow: "hidden",
        transform: `scale(${scale})`,
      }}
    >
      {/* Top Speaker & Camera Notch */}
      <div
        style={{
          width: 140,
          height: 28,
          backgroundColor: "#111111",
          borderRadius: "0 0 16px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 16,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#2a2a2a",
          }}
        />
        <div
          style={{
            width: 44,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#222",
          }}
        />
      </div>

      {/* Screen Inner Container */}
      <div
        style={{
          width: "100%",
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 36,
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div
        style={{
          width: 140,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#111111",
          marginTop: 14,
        }}
      />

      {/* Animated Realistic Hand / Thumb Tap Overlay */}
      {showThumb && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            right: 80,
            width: 180,
            height: 220,
            pointerEvents: "none",
            transform: thumbPressed
              ? "translate(10px, 15px) scale(0.96) rotate(-14deg)"
              : "translate(0, 0) scale(1) rotate(-18deg)",
            transition: "transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 30,
          }}
        >
          {/* Stylized Neo-brutalist Thumb */}
          <div
            style={{
              width: 90,
              height: 180,
              borderRadius: "45px 45px 30px 30px",
              backgroundColor: "#F3C8A0",
              border: "3px solid #111111",
              boxShadow: "4px 4px 0 #111111",
              position: "relative",
            }}
          >
            {/* Thumb nail */}
            <div
              style={{
                width: 44,
                height: 48,
                borderRadius: "22px 22px 10px 10px",
                backgroundColor: "#FDECE2",
                border: "2px solid #111111",
                margin: "12px auto 0 auto",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 5. REALISTIC BANK SMS NOTIFICATION BANNER
// ─────────────────────────────────────────────────────────────
interface BankSmsBannerProps {
  type: "debit" | "credit";
  bankName: string;
  amount: number;
  account: string;
  balance?: number;
  slideProgress: number;
}

export const BankSmsBanner: React.FC<BankSmsBannerProps> = ({
  type,
  bankName,
  amount,
  account,
  balance,
  slideProgress,
}) => {
  const isDebit = type === "debit";
  const accentColor = isDebit ? UPI_THEME.colors.coralDark : UPI_THEME.colors.green;
  const bgCard = UPI_THEME.colors.offWhite;

  return (
    <div
      style={{
        position: "absolute",
        top: UPI_THEME.safeZone.top + 20,
        left: UPI_THEME.safeZone.paddingX,
        right: UPI_THEME.safeZone.paddingX,
        backgroundColor: bgCard,
        border: UPI_THEME.borders.neoThick,
        boxShadow: UPI_THEME.shadows.neoLg,
        borderRadius: 24,
        padding: "24px 28px",
        transform: `translateY(${interpolate(slideProgress, [0, 1], [-180, 0])}px)`,
        opacity: slideProgress,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: accentColor,
              border: "2px solid #111",
            }}
          />
          <span
            style={{
              fontFamily: UPI_THEME.fonts.headline,
              fontSize: 22,
              fontWeight: 800,
              color: UPI_THEME.colors.ink,
              letterSpacing: "0.04em",
            }}
          >
            {bankName} · SMS ALERT
          </span>
        </div>
        <span
          style={{
            fontFamily: UPI_THEME.fonts.body,
            fontSize: 18,
            color: "#666",
            fontWeight: 700,
          }}
        >
          Just now
        </span>
      </div>

      <div
        style={{
          fontFamily: UPI_THEME.fonts.body,
          fontSize: 24,
          lineHeight: 1.35,
          fontWeight: 700,
          color: UPI_THEME.colors.ink,
        }}
      >
        {isDebit ? (
          <>
            Rs.{amount.toFixed(2)} <span style={{ color: accentColor, fontWeight: 800 }}>DEBITED</span> from A/c {account} via UPI.
            {balance !== undefined && (
              <span style={{ display: "block", fontSize: 20, color: "#555", marginTop: 4 }}>
                Avail Bal: Rs.{balance.toLocaleString("en-IN")}.00
              </span>
            )}
          </>
        ) : (
          <>
            Rs.{amount.toFixed(2)} <span style={{ color: accentColor, fontWeight: 800 }}>CREDITED</span> to A/c {account} via UPI ref #9482.
            {balance !== undefined && (
              <span style={{ display: "block", fontSize: 20, color: "#555", marginTop: 4 }}>
                New Bal: Rs.{balance.toLocaleString("en-IN")}.00
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
