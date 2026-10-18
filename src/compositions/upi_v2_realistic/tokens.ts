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
    // Neo-brutalist / Color-block palette
    ink: "#111111",
    offWhite: "#F7F4EE",
    bg: "#F7F4EE",
    surfaceBorder: "#111111",
    hardShadow: "4px 4px 0 #111111",
    hardShadowLarge: "6px 6px 0 #111111",
    hardShadowSmall: "3px 3px 0 #111111",

    // Accent colors
    orange: "#FF5A1F",
    yellowHighlight: "#FFDF00",
    green: "#16A34A",
    greenLight: "#D6F5E0",
    coral: "#FFD9D6",
    coralDark: "#E11D48",
    blueLight: "#DCE8FF",
    yellowLight: "#FFE9A8",

    // Per-scene background colors specified in prompt
    sceneBg: {
      hook: "#F7F4EE",
      hookS13: "#FF5A1F",
      appPin: "#DCE8FF",
      npci: "#FFE9A8",
      banksLeft: "#FFD9D6",
      banksRight: "#D6F5E0",
      confirmation: "#16A34A",
      cta: "#111111",
    },
  },
  borders: {
    neo: "3px solid #111111",
    neoThick: "4px solid #111111",
    neoThin: "2px solid #111111",
  },
  shadows: {
    neo: "4px 4px 0 #111111",
    neoLg: "6px 6px 0 #111111",
    neoSm: "3px 3px 0 #111111",
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
