import { loadFont as loadBarlowCondensed } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";

// Load professional Google Fonts as requested (optimized weights)
const { fontFamily: headlineFont } = loadBarlowCondensed("normal", {
  weights: ["700", "800", "900"],
  ignoreTooManyRequestsWarning: true,
});
const { fontFamily: bodyFont } = loadPlusJakartaSans("normal", {
  weights: ["600", "700", "800"],
  ignoreTooManyRequestsWarning: true,
});

export const UPI_THEME = {
  colors: {
    bg: "#0B0D11",
    bgElevated: "#13171F",
    bgCard: "#181D26",
    surfaceBorder: "rgba(255, 255, 255, 0.08)",
    surfaceBorderActive: "rgba(255, 90, 31, 0.4)",
    textPrimary: "#F0F2F5",
    textSecondary: "#9AA4B2",
    textMuted: "#667085",
    // THE ONE ORANGE ACCENT
    orange: "#FF5A1F",
    orangeGlow: "rgba(255, 90, 31, 0.25)",
    // Functional accents
    green: "#22C55E",
    red: "#EF4444",
  },
  fonts: {
    headline: headlineFont,
    body: bodyFont,
  },
  safeZone: {
    top: 140,
    bottom: 380, // Keep bottom 20% safe from social UI
    paddingX: 72,
  },
};
