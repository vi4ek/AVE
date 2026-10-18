import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HardShadowCard } from "./HardShadowCard";
import { MUSE_THEME } from "./tokens";

/**
 * 1. VPN APP MOCKUP (S2.2)
 * Clean generic VPN app mockup. Toggle flips to Connected, server list with 'United States' selected.
 * Strict rules: No brand logos, no Urban VPN logo.
 */
export const VpnAppMockup: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Toggle flip animation at frame 25
  const toggleProgress = spring({
    frame: relFrame - 20,
    fps,
    config: MUSE_THEME.springs.bouncy,
  });

  const isConnected = relFrame >= 20;

  // Hand cursor pointer click animation
  const cursorY = interpolate(relFrame, [0, 18, 22, 35], [260, 160, 160, 320], {
    extrapolateRight: "clamp",
  });
  const cursorScale = interpolate(relFrame, [18, 21, 25], [1, 0.85, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 840, position: "relative" }}>
      <HardShadowCard
        bg={MUSE_THEME.colors.white}
        shadowOffset={6}
        borderRadius={24}
        padding={36}
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        {/* App Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #111",
            paddingBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: MUSE_THEME.colors.blue,
                border: "2px solid #111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={MUSE_THEME.colors.yellow} />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.5px" }}>
              TRUSTED VPN CLIENT
            </span>
          </div>

          <div
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "2px solid #111",
              backgroundColor: isConnected ? MUSE_THEME.colors.mint : MUSE_THEME.colors.coral,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            {isConnected ? "● PROTECTED" : "○ UNPROTECTED"}
          </div>
        </div>

        {/* Central Switch Toggle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "20px 0",
          }}
        >
          <div
            style={{
              width: 140,
              height: 72,
              borderRadius: 999,
              backgroundColor: isConnected ? MUSE_THEME.colors.green : "#D1D5DB",
              border: "3px solid #111",
              boxShadow: "3px 3px 0px #111",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 999,
                backgroundColor: "#FFF",
                border: "3px solid #111",
                position: "absolute",
                top: 6,
                left: 6,
                transform: `translateX(${interpolate(toggleProgress, [0, 1], [0, 68])}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              {isConnected ? "✓" : "✕"}
            </div>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: isConnected ? MUSE_THEME.colors.green : MUSE_THEME.colors.ink,
            }}
          >
            {isConnected ? "CONNECTED TO US" : "TAP TO CONNECT"}
          </span>
        </div>

        {/* Server Selection Card */}
        <div
          style={{
            backgroundColor: MUSE_THEME.colors.blue,
            border: "3px solid #111",
            borderRadius: 16,
            padding: "18px 24px",
            boxShadow: "3px 3px 0px #111",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: MUSE_THEME.colors.yellow,
                border: "2px solid #111",
                borderRadius: 8,
                fontWeight: 900,
                fontSize: 16,
                boxShadow: "2px 2px 0 #111",
              }}
            >
              US
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 22, fontWeight: 800 }}>United States</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#4B5563" }}>
                New York · Fast Server (32ms)
              </span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: MUSE_THEME.colors.green,
              color: "#FFF",
              fontWeight: 800,
              fontSize: 14,
              padding: "6px 14px",
              borderRadius: 8,
              border: "2px solid #111",
            }}
          >
            ACTIVE
          </div>
        </div>
      </HardShadowCard>

      {/* Animated Vector Hand Cursor */}
      <div
        style={{
          position: "absolute",
          top: cursorY,
          left: 470,
          transform: `scale(${cursorScale})`,
          pointerEvents: "none",
          filter: "drop-shadow(3px 3px 0px #111)",
          zIndex: 10,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="#FFF" stroke="#111" strokeWidth="2" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10V2a2 2 0 0 0-4 0v11l-2.5-2.5a2 2 0 0 0-2.8 2.8L6 18.5A6 6 0 0 0 10.2 21H16a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0v-1" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. DOT WORLD MAP MOCKUP (S2.3)
 * Region locked in India -> US connected with route arrow
 */
export const DotWorldMapMockup: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const arrowDraw = interpolate(relFrame, [10, 35], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <HardShadowCard
      bg={MUSE_THEME.colors.white}
      shadowOffset={6}
      borderRadius={24}
      padding={36}
      style={{ width: 880, height: 480, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>GLOBAL ACCESS MAP</span>
        <span style={{ color: MUSE_THEME.colors.orange }}>US REGION UNLOCKED</span>
      </div>

      {/* Stylized Grid Map Canvas */}
      <div
        style={{
          width: "100%",
          height: 340,
          backgroundColor: MUSE_THEME.colors.offWhite,
          borderRadius: 16,
          border: "2px solid #111",
          position: "relative",
          backgroundImage:
            "radial-gradient(#CBD5E1 2px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* India Pin Location */}
        <div
          style={{
            position: "absolute",
            top: 190,
            left: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              backgroundColor: MUSE_THEME.colors.coral,
              border: "2px solid #111",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              boxShadow: "2px 2px 0 #111",
              whiteSpace: "nowrap",
              marginBottom: 4,
            }}
          >
            🇮🇳 Region Locked ✕
          </div>
          <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: MUSE_THEME.colors.redExpired, border: "2px solid #111" }} />
        </div>

        {/* US Pin Location */}
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              backgroundColor: MUSE_THEME.colors.mint,
              border: "2px solid #111",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              boxShadow: "2px 2px 0 #111",
              whiteSpace: "nowrap",
              marginBottom: 4,
            }}
          >
            🇺🇸 US Server Active ✓
          </div>
          <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: MUSE_THEME.colors.green, border: "2px solid #111" }} />
        </div>

        {/* SVG Route Connector */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            d="M 560 200 C 420 80, 320 80, 210 100"
            fill="none"
            stroke={MUSE_THEME.colors.ink}
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeDashoffset={100 - arrowDraw}
          />
        </svg>
      </div>
    </HardShadowCard>
  );
};

/**
 * 3. BROWSER WINDOW MOCKUP (S3.1 & S3.2)
 * Clean browser frame, typing muse.ai/join, Sign Up button with click ripple
 */
export const BrowserWindowMockup: React.FC<{
  startFrame?: number;
  showClick?: boolean;
}> = ({ startFrame = 0, showClick = false }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Typewriter for url
  const fullUrl = "muse.ai/join";
  const charsTyped = Math.min(fullUrl.length, Math.floor(relFrame / 2.5));
  const typedText = fullUrl.slice(0, charsTyped);

  // Button click ripple
  const clickScale = showClick
    ? interpolate(relFrame, [15, 20, 26], [1, 0.92, 1], { extrapolateRight: "clamp" })
    : 1;

  return (
    <HardShadowCard
      bg={MUSE_THEME.colors.white}
      shadowOffset={6}
      borderRadius={24}
      padding={0}
      style={{ width: 880, overflow: "hidden" }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          backgroundColor: MUSE_THEME.colors.yellow,
          borderBottom: "3px solid #111",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Window controls */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, border: "2px solid #111", backgroundColor: "#FF5A5F" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, border: "2px solid #111", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, border: "2px solid #111", backgroundColor: "#27C93F" }} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            backgroundColor: MUSE_THEME.colors.white,
            border: "2px solid #111",
            borderRadius: 12,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "2px 2px 0px #111",
          }}
        >
          <span style={{ fontSize: 16 }}>🔒</span>
          <span style={{ fontFamily: MUSE_THEME.typography.mono, fontWeight: 700, fontSize: 18, color: MUSE_THEME.colors.ink }}>
            https://{typedText}
            {relFrame % 14 < 7 && <span style={{ color: MUSE_THEME.colors.orange }}>|</span>}
          </span>
        </div>
      </div>

      {/* Webpage Content */}
      <div
        style={{
          padding: 40,
          backgroundColor: MUSE_THEME.colors.offWhite,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            padding: "6px 16px",
            backgroundColor: MUSE_THEME.colors.mint,
            border: "2px solid #111",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          NEW AI AGENT
        </div>

        <h2 style={{ fontSize: 44, fontWeight: 900, margin: 0, letterSpacing: "-1px", textAlign: "center" }}>
          Welcome to Muse
        </h2>
        <p style={{ fontSize: 20, color: "#4B5563", margin: 0, textAlign: "center", maxWidth: 500, fontWeight: 600 }}>
          Create an account to unlock your developer agent platform.
        </p>

        {/* Sign Up Button */}
        <div
          style={{
            transform: `scale(${clickScale})`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              padding: "18px 48px",
              backgroundColor: MUSE_THEME.colors.orange,
              color: "#FFF",
              fontWeight: 900,
              fontSize: 24,
              borderRadius: 16,
              border: "3px solid #111",
              boxShadow: "4px 4px 0px #111",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>SIGN UP</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </HardShadowCard>
  );
};

/**
 * 4. ACCOUNT FORM MOCKUP (S4.2)
 * Gmail signup form. Blurs email address for privacy.
 */
export const AccountFormMockup: React.FC<{ startFrame?: number }> = () => {

  return (
    <HardShadowCard
      bg={MUSE_THEME.colors.white}
      shadowOffset={6}
      borderRadius={24}
      padding={36}
      style={{ width: 840, display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "2px solid #111", paddingBottom: 16 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" fill={MUSE_THEME.colors.yellow} />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span style={{ fontSize: 24, fontWeight: 900 }}>CREATE YOUR ACCOUNT</span>
      </div>

      {/* Google Sign In Option */}
      <div
        style={{
          padding: "16px 24px",
          backgroundColor: MUSE_THEME.colors.offWhite,
          border: "2px solid #111",
          borderRadius: 14,
          boxShadow: "2px 2px 0 #111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontWeight: 800,
          fontSize: 18,
        }}
      >
        <span>G</span>
        <span>Continue with Google</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 2, backgroundColor: "#E5E7EB" }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: "#6B7280" }}>OR WITH EMAIL</span>
        <div style={{ flex: 1, height: 2, backgroundColor: "#E5E7EB" }} />
      </div>

      {/* Email input field - BLURRED FOR PRIVACY */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 16, fontWeight: 800 }}>Gmail Address</label>
        <div
          style={{
            border: "2px solid #111",
            borderRadius: 12,
            padding: "14px 18px",
            backgroundColor: MUSE_THEME.colors.offWhite,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Privacy blurred email representation */}
          <div
            style={{
              filter: "blur(5px)",
              userSelect: "none",
              fontSize: 18,
              fontWeight: 700,
              color: "#374151",
            }}
          >
            creator.official99@gmail.com
          </div>
          <span
            style={{
              fontSize: 13,
              backgroundColor: MUSE_THEME.colors.mint,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #111",
              fontWeight: 800,
            }}
          >
            BLURRED ✓
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div
        style={{
          padding: "16px 28px",
          backgroundColor: MUSE_THEME.colors.mint,
          border: "3px solid #111",
          borderRadius: 14,
          boxShadow: "3px 3px 0 #111",
          fontWeight: 900,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        CONTINUE
      </div>
    </HardShadowCard>
  );
};

/**
 * 5. AGE VERIFICATION MOCKUP (S4.3)
 */
export const AgeVerificationMockup: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  const fill = interpolate(relFrame, [5, 45], [10, 100], {
    extrapolateRight: "clamp",
  });
  const isComplete = relFrame >= 45;

  return (
    <HardShadowCard
      bg={MUSE_THEME.colors.white}
      shadowOffset={6}
      borderRadius={24}
      padding={36}
      style={{ width: 840, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" fill={MUSE_THEME.colors.mint} />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          </svg>
          <span style={{ fontSize: 24, fontWeight: 900 }}>AGE VERIFICATION</span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            backgroundColor: isComplete ? MUSE_THEME.colors.green : MUSE_THEME.colors.yellow,
            color: isComplete ? "#FFF" : MUSE_THEME.colors.ink,
            padding: "6px 12px",
            borderRadius: 8,
            border: "2px solid #111",
          }}
        >
          {isComplete ? "VERIFIED ✓" : "CHECKING..."}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 28,
          backgroundColor: MUSE_THEME.colors.offWhite,
          border: "2px solid #111",
          borderRadius: 999,
          overflow: "hidden",
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: `${fill}%`,
            height: "100%",
            backgroundColor: isComplete ? MUSE_THEME.colors.green : MUSE_THEME.colors.mint,
            borderRadius: 999,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: "#4B5563", textAlign: "center" }}>
        {isComplete ? "Quick verification complete. You're set!" : "Verifying eligibility (18+)..."}
      </div>
    </HardShadowCard>
  );
};

/**
 * 6. SIDEBAR SETTINGS MOCKUP (S6.1, S6.2, S6.3)
 * Generic sidebar with bottom-left two-line icon circled, Settings popup
 */
export const SidebarSettingsMockup: React.FC<{
  startFrame?: number;
  activeStep?: "menu" | "settings" | "general";
}> = ({ activeStep = "menu" }) => {

  return (
    <div style={{ width: 880, display: "flex", gap: 24, position: "relative" }}>
      {/* Left Sidebar Mockup */}
      <HardShadowCard
        bg={MUSE_THEME.colors.white}
        shadowOffset={6}
        borderRadius={24}
        padding={24}
        style={{ width: 320, height: 480, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 900, borderBottom: "2px solid #111", paddingBottom: 12 }}>
            Muse AI
          </div>
          <div style={{ padding: "10px 14px", backgroundColor: MUSE_THEME.colors.offWhite, borderRadius: 10, border: "2px solid #111", fontSize: 15, fontWeight: 700 }}>
            + New Thread
          </div>
          <div style={{ padding: "8px 12px", fontSize: 14, fontWeight: 600, color: "#6B7280" }}>
            Recent chats...
          </div>
        </div>

        {/* Bottom-left two lines '=' menu button with callout */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              padding: "12px 18px",
              backgroundColor: MUSE_THEME.colors.yellow,
              border: "3px solid #111",
              borderRadius: 14,
              boxShadow: "3px 3px 0 #111",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>☰</span>
            <span>Menu</span>
          </div>

          {/* Animated Callout Ring */}
          <div
            style={{
              position: "absolute",
              top: -8,
              left: -8,
              right: -8,
              bottom: -8,
              border: "4px solid #FF5A1F",
              borderRadius: 20,
              pointerEvents: "none",
            }}
          />
        </div>
      </HardShadowCard>

      {/* Right: Settings Popover Menu & General Tab */}
      <HardShadowCard
        bg={MUSE_THEME.colors.white}
        shadowOffset={6}
        borderRadius={24}
        padding={28}
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, borderBottom: "2px solid #111", paddingBottom: 12 }}>
          SETTINGS PANEL
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: activeStep === "general" ? MUSE_THEME.colors.mint : MUSE_THEME.colors.offWhite,
              border: "2px solid #111",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 16,
              boxShadow: activeStep === "general" ? "2px 2px 0 #111" : "none",
            }}
          >
            General
          </div>
          <div style={{ padding: "8px 18px", backgroundColor: MUSE_THEME.colors.offWhite, border: "2px solid #111", borderRadius: 10, fontWeight: 700, fontSize: 16, color: "#6B7280" }}>
            Account
          </div>
          <div style={{ padding: "8px 18px", backgroundColor: MUSE_THEME.colors.offWhite, border: "2px solid #111", borderRadius: 10, fontWeight: 700, fontSize: 16, color: "#6B7280" }}>
            Billing
          </div>
        </div>

        {/* General Panel Body */}
        <div
          style={{
            flex: 1,
            backgroundColor: MUSE_THEME.colors.offWhite,
            border: "2px solid #111",
            borderRadius: 14,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Theme</span>
            <span style={{ fontWeight: 800, fontSize: 14, padding: "4px 10px", backgroundColor: "#FFF", border: "1px solid #111", borderRadius: 6 }}>
              Light
            </span>
          </div>

          {/* REDEEM INVITE CODE ROW */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: activeStep === "general" ? MUSE_THEME.colors.yellow : "#FFF",
              border: "3px solid #111",
              borderRadius: 12,
              boxShadow: "3px 3px 0 #111",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 900, fontSize: 18 }}>Redeem Invite Code</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#4B5563" }}>
                Claim your 1B token allowance
              </span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 900 }}>→</span>
          </div>
        </div>
      </HardShadowCard>
    </div>
  );
};
