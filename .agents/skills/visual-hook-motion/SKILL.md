---
name: visual-hook-motion
description: >
  Master skill for high-retention visual hooks, speed-graph motion physics, and creative short-form
  motion graphics. Codified directly from elite motion designer & creator @Anmol_type (Anmol Anuragi)
  covering the 3 Best Visual Hook Archetypes (Designer, Realtor, Diagnostic), 10-minute constraint drills,
  multi-layered bounding box framing, and frame-accurate sound choreography.
---

# 🎯 Viral Visual Hook & Speed-Graph Motion Graphics Skill
### *Codified from @Anmol_type (Anmol Anuragi) & Elite Short-Form Motion Design*

---

## ⚡ The Core Philosophy
> *"The first 3 seconds dictate 90% of short-form retention. Never open on a static talking head or a plain sentence. The visual hook MUST hit before or simultaneously with the first spoken syllable. If the eye isn't hooked in 0.5 seconds, the brain scrolls away."*

---

## 1. The 3 Master Visual Hook Archetypes

### 🎨 Archetype 1: The Designer Hook (Tech, SaaS, Creative, Workflows)
- **Visual Structure**:
  - Dark/Light ambient canvas with deep blurred backdrop.
  - Expanding geometric bounding box with corner crosshairs (`+`) or tech brackets (`[ ]`).
  - Central floating hero card with tactile 3D perspective tilt (`rotateX: 4deg`, `rotateY: -6deg`).
  - Status pill chip (`SYSTEM READY`, `V1.0`, `NEW UPDATE`) popping in at frame +3.
  - Kinetic headline with overshoot bounce.
- **Motion Dynamics**:
  - Box expansion: Starts at `scale: 0.6, opacity: 0`, expands to `1.04` (overshoot), dampens to `1.0` in 240ms.
  - Sound sync: Sub-bass hit + crisp mechanical whoosh on entry, high-pitch digital tick when brackets snap.

### 🏛️ Archetype 2: The Realtor / Authority Hook (Business, Finance, Founders, Real Estate)
- **Visual Structure**:
  - High-key split layout or horizontal divider mask wipe.
  - Dynamic camera tracking push (`scale: 1.0` -> `1.08` continuous drift).
  - Floating high-impact metric badge (e.g. `+240% GROWTH`, `$1.2M`, `VERIFIED`).
  - Sleek divider line with specular shimmer wipe.
- **Motion Dynamics**:
  - Mask wipe: Left-to-right wipe in 180ms.
  - Metric counter: Rapid number spin / spring popup with 12% overshoot.
  - Sound sync: Low thud on layout slam + cash register chime / mechanical snap on badge lock.

### 🔬 Archetype 3: The Pharmacist / Diagnostic Hook (Medical, Dermatology, Health, Science)
- **Visual Structure**:
  - Focus Ring / Problem Isolation: Darkened vignette around the edges with a highlighted circular or oval target ring over the problem zone (e.g., hair follicle, skin blemish, phone screen, battery).
  - Slow Ken Burns creeping zoom (`1.0` -> `1.06`) locked on the focal point.
  - Corner PiP presenter in floating frosted glass bubble (`TalkingHeadPresenter` PiP mode).
  - Diagnostic radar/scan line sweeping vertically across the target zone.
- **Motion Dynamics**:
  - Vignette deepens in 120ms (`opacity: 0` -> `0.65`).
  - Scanner line animates top-to-bottom over 45 frames.
  - Sound sync: Low atmospheric sub-drone + subtle diagnostic sci-fi chirp/sonar ping.

---

## 2. Speed-Graph Physics & Easing Rules

### 🚫 The Golden Law: Never Use Linear Keyframes
Linear motion looks robotic, cheap, and amateur. Every single motion must use steep acceleration curves with smooth damped settle.

### 📈 The "Steep Entry, Soft Settle" Curve
- **First 20% of Duration**: 75–80% of the movement occurs here (fast acceleration, punchy impact).
- **Remaining 80% of Duration**: Gentle deceleration, 8–15% overshoot bounce, and smooth damping.

### 💻 Remotion Spring Equivalents
```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// 1. Snappy Hook Pop (For cards, badges, text bursts)
const hookPop = spring({
  frame,
  fps,
  config: {
    damping: 12,    // Snappy bounce, quick settle
    stiffness: 220,  // Fast initial acceleration
    mass: 0.8,       // Light and agile
  },
});

// 2. Cinematic Camera Drift (For living background plates & B-roll)
const cameraDrift = interpolate(frame, [0, 180], [1.0, 1.05], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateRight: "clamp",
});
```

---

## 3. The 3-Frame Stagger Delay Rule (Choreography)
Never drop all elements onto the screen at frame 0. Stagger arrival to create a fluid domino effect:

| Frame Offset | Element | Animation | SFX Trigger |
| :--- | :--- | :--- | :--- |
| **Frame 0 (0ms)** | Background Plate & Framing Box | Rapid expand (`scale: 0.85 -> 1.0`) | `whoosh.wav` (vol: 0.45) |
| **Frame 3 (50ms)** | Primary Headline Text | Scale pop (`0.8 -> 1.08 -> 1.0`) | `sub_hit.wav` (vol: 0.70) |
| **Frame 6 (100ms)** | Context Badge / Status Pill | Slide-up & fade (`translateY: 20px -> 0`) | `pop.wav` (vol: 0.50) |
| **Frame 9 (150ms)** | Tech Brackets / Corner Crosshairs | Line draw or opacity snap | `click.wav` (vol: 0.40) |

---

## 4. Multi-Layered Framing & Tactile Overlays
To make flat 2D visuals feel like deep, high-budget 3D motion graphics:
1. **Corner Brackets**: 12px L-shaped corner guides around the hero asset (`borderTop: 2px solid rgba(255,255,255,0.4)`, `borderLeft: 2px solid rgba(255,255,255,0.4)`).
2. **Coordinate / System Stamps**: Subtle monospace label in corner (e.g., `01 // CAPTURE`, `REC ● 4K 60FPS`, `SYS_ANALYSIS`).
3. **Frosted Edge Stroke**: `1px solid rgba(255, 255, 255, 0.14)` with `box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.04)`.
4. **Living Micro-Motion**: Add continuous sinusoidal float (`Math.sin(frame / 36) * 4px`) to floating elements so they never look like a paused screenshot.

---

## 5. Sound Design Architecture for Hooks
Every visual impact must be doubled by a sonic frequency layer:
- **Low End (40–120Hz)**: Sub-bass impact (`sub_hit.wav`) provides weight and emotional gravity.
- **Mid End (500–2000Hz)**: Mechanical pop or camera shutter (`pop.wav` or `camera_click.wav`) establishes clarity and tactile satisfaction.
- **High End (4000–12000Hz)**: Air whoosh or metallic swish (`whoosh.wav`) leads the eye into the transition.
- **BGM Ducking**: Drop background music by **-14dB to -18dB** during the first 3 seconds so the hook SFX and voiceover cut through with maximum punch.
