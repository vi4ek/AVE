export const THEME = {
  colors: {
    // Canvas & Surfaces
    canvas: "#0A0B0E",
    surfaceDark: "#12131A",
    surfaceCard: "#181924",
    surfaceHighlight: "#202230",
    
    // Brand & Claude Accents
    accentTerracotta: "#CC785C",
    accentAmber: "#E07A5F",
    accentWarmGlow: "#F59E0B",
    accentIris: "#818CF8",
    accentCyan: "#38BDF8",

    // Google Brand Accents
    googleBlue: "#4285F4",
    googleRed: "#EA4335",
    googleYellow: "#FBBC05",
    googleGreen: "#34A853",

    // Text & Foregrounds
    textPrimary: "#F3F3EE",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",
    textTerracotta: "#E07A5F",

    // Borders & Glassmorphism
    borderGlass: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(204, 120, 92, 0.4)",
    glowTerracotta: "rgba(204, 120, 92, 0.25)",
    glowAmber: "rgba(224, 122, 95, 0.2)",
    glowIris: "rgba(129, 140, 248, 0.25)",
  },

  // Calibrated Remotion Spring Profiles (60 FPS calibrated)
  springs: {
    // Fast, crisp entry for buttons, badges, and micro-interactions
    snappy: {
      mass: 0.6,
      damping: 14,
      stiffness: 140,
    },
    // Balanced, fluid motion for cards and dialogs
    smooth: {
      mass: 1.0,
      damping: 18,
      stiffness: 90,
    },
    // Weighted, high-end motion for scene titles and camera pans
    cinematic: {
      mass: 1.4,
      damping: 24,
      stiffness: 65,
    },
    // Organic bounce for icons and attention cues
    pop: {
      mass: 0.5,
      damping: 10,
      stiffness: 190,
    },
  },

  dimensions: {
    widescreen: { width: 1920, height: 1080 },
    vertical: { width: 1080, height: 1920 },
  },
  fps: 60,
} as const;

export type ThemeColors = typeof THEME.colors;
export type SpringProfile = keyof typeof THEME.springs;
