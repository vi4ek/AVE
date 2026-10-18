---
name: apple-keynote-motion
description: >
  Gold-standard editing skill for Apple-inspired tech reels, SaaS showcases, and creator videos.
  Encodes the exact Cupertino light theme, Poppins & Roboto typography, frosted glassmorphism,
  matte non-neon color accents, subtle top-left watermark branding (@vizion.std), and ElevenLabs audio ducking.
---

# Apple Keynote Motion & Viral Tech Reel Skill

## Core Philosophy

"Loud neon graphics look amateur and dated. Clean Apple Cupertino glassmorphism, deep titanium typography, and subtle matte chips look like a billion-dollar keynote."

This skill was validated as the gold standard for `@vizion.std` reels.

---

## 1. Visual Design Tokens

| Property | Value / Specification |
|---|---|
| **Canvas Background** | Pure Apple Off-White `#F5F5F7` with ambient specular radial glows |
| **Primary Typography** | **`'Poppins', sans-serif`** (Weights: 700, 800, 900) for all display headlines & pills |
| **Secondary Typography** | **`'Roboto', sans-serif`** (Weights: 500, 600) for body copy & metrics |
| **Headline Color** | Apple Titanium Black `#1D1D1F` |
| **Subtext Color** | Apple Muted Slate `#6E6E73` |
| **Card Surface** | Cupertino frosted glass: `rgba(255, 255, 255, 0.94)`, `backdrop-filter: blur(40px)` |
| **Card Borders & Shadows** | `border: 1px solid rgba(0, 0, 0, 0.08)`, `box-shadow: 0 25px 60px rgba(0, 0, 0, 0.07)` |
| **Matte Accents (NO NEON)** | Apple Electric Blue `#0071E3`, Forest Sage `#1B5E20`, Warm Amber `#B45309`, Purple `#7C3AED` |

---

## 2. Branding Watermark Standard

Place at top-left across all reels:
```tsx
<div style={{
  position: "absolute",
  top: 60,
  left: 56,
  zIndex: 95,
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "8px 16px 8px 10px",
  borderRadius: 100,
  backgroundColor: "rgba(255, 255, 255, 0.65)",
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
  opacity: 0.55,
}}>
  <img src={staticFile("inputs/channel_logo.jpg")} style={{ width: 38, height: 38, borderRadius: "50%" }} />
  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 700, color: "#1D1D1F" }}>
    @vizion.std
  </span>
</div>
```

---

## 3. Audio & Voice Architecture

1. **Master Voiceover**: Mounted continuously at `volume={1.0}`.
2. **BGM Ducking**: Duck ambient background music to **`0.04`** throughout the entire video so the voice cuts through with zero competition.
3. **Sound Effects**: Use subtle tactile UI clicks (`click.wav`), soft pops (`pop.wav`), and gentle swooshes (`whoosh.wav`).
