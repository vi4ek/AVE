export type ClientNiche =
  | "dermatology"
  | "legal"
  | "lifecoach"
  | "tech"
  | "documentary";

export interface NicheProfile {
  id: ClientNiche;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    canvas: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    highlight: string;
  };
  typography: {
    fontFamily: string;
    headingWeight: number;
    letterSpacing: string;
    badgeCase: "uppercase" | "capitalize" | "none";
  };
  badgeIcon: "medical" | "legal" | "check" | "code" | "documentary";
  cinematic: {
    grainOpacity: number;
    vignetteIntensity: number;
  };
}

export const NICHE_PROFILES: Record<ClientNiche, NicheProfile> = {
  dermatology: {
    id: "dermatology",
    name: "Dermatology & Medical Clinic",
    colors: {
      primary: "#0284C7", // Medical Sky Blue
      secondary: "#0F172A", // Dark Slate
      accent: "#10B981", // Approved Clinical Emerald
      canvas: "#F8FAFC", // High-key clean clinical white
      cardBg: "rgba(255, 255, 255, 0.92)",
      cardBorder: "rgba(2, 132, 199, 0.25)",
      textPrimary: "#0F172A",
      textSecondary: "#475569",
      highlight: "#0284C7",
    },
    typography: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      headingWeight: 800,
      letterSpacing: "-0.5px",
      badgeCase: "uppercase",
    },
    badgeIcon: "medical",
    cinematic: {
      grainOpacity: 0.03, // Ultra-clean, low grain
      vignetteIntensity: 0.25,
    },
  },

  legal: {
    id: "legal",
    name: "Legal & Law Firm",
    colors: {
      primary: "#C5A059", // Antique Champagne Gold
      secondary: "#0B132B", // Oxford Navy
      accent: "#D97706", // Amber Seal
      canvas: "#0B132B", // Deep Prestige Navy
      cardBg: "rgba(11, 19, 43, 0.88)",
      cardBorder: "rgba(197, 160, 89, 0.35)",
      textPrimary: "#F8F9FA",
      textSecondary: "#CBD5E1",
      highlight: "#C5A059",
    },
    typography: {
      fontFamily: "'Playfair Display', Georgia, serif",
      headingWeight: 700,
      letterSpacing: "0.2px",
      badgeCase: "uppercase",
    },
    badgeIcon: "legal",
    cinematic: {
      grainOpacity: 0.07,
      vignetteIntensity: 0.45,
    },
  },

  lifecoach: {
    id: "lifecoach",
    name: "Life Coach & Executive Speaker",
    colors: {
      primary: "#EA580C", // Warm Terracotta Energy
      secondary: "#1E1B18", // Espresso Canvas
      accent: "#F59E0B", // Radiant Amber
      canvas: "#1E1B18", // Warm Organic Espresso
      cardBg: "rgba(30, 27, 24, 0.85)",
      cardBorder: "rgba(234, 88, 12, 0.3)",
      textPrimary: "#FAF7F2",
      textSecondary: "#D6D3D1",
      highlight: "#EA580C",
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      headingWeight: 800,
      letterSpacing: "-0.8px",
      badgeCase: "uppercase",
    },
    badgeIcon: "check",
    cinematic: {
      grainOpacity: 0.06,
      vignetteIntensity: 0.4,
    },
  },

  tech: {
    id: "tech",
    name: "Silicon Tech & Founder",
    colors: {
      primary: "#38BDF8", // Electric Cyan
      secondary: "#0D0F18", // Deep Atmospheric Slate
      accent: "#34D399", // Emerald Hardware Core
      canvas: "#0D0F18",
      cardBg: "rgba(255, 255, 255, 0.06)",
      cardBorder: "rgba(255, 255, 255, 0.14)",
      textPrimary: "#FFFFFF",
      textSecondary: "rgba(255, 255, 255, 0.65)",
      highlight: "#38BDF8",
    },
    typography: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      headingWeight: 900,
      letterSpacing: "-1px",
      badgeCase: "uppercase",
    },
    badgeIcon: "code",
    cinematic: {
      grainOpacity: 0.04,
      vignetteIntensity: 0.35,
    },
  },

  documentary: {
    id: "documentary",
    name: "Documentary & Mystery Storyteller",
    colors: {
      primary: "#DC2626", // Archival Crimson
      secondary: "#18181B", // Deep Charcoal Ink
      accent: "#EAB308", // Highlighter Yellow
      canvas: "#18181B", // Noir Slate
      cardBg: "rgba(24, 24, 27, 0.9)",
      cardBorder: "rgba(255, 255, 255, 0.12)",
      textPrimary: "#F4EFE6", // Newsprint Cream
      textSecondary: "#A1A1AA",
      highlight: "#DC2626",
    },
    typography: {
      fontFamily: "'Courier Prime', monospace",
      headingWeight: 700,
      letterSpacing: "0.5px",
      badgeCase: "uppercase",
    },
    badgeIcon: "documentary",
    cinematic: {
      grainOpacity: 0.12, // Heavy archival 35mm grain
      vignetteIntensity: 0.65, // Dramatic dark noir vignette
    },
  },
};
