# 🎬 Master Video Editing & Motion Direction Guide

Welcome to the **Video Editing Direction Playbook**. This guide contains **12 numbered directions** you can use to direct the AI agent. You can combine these directions in any prompt (e.g., *"Edit this clip using Direction 1 (Premium) and Direction 4 (Clean Captions)"*) to get exact, repeatable results.

---

## 🧭 Quick Index of Directions

1. [Direction 1: Motion Personality & Easing Archetypes](#direction-1-motion-personality--easing-archetypes)
2. [Direction 2: Multi-Cam Punch Zooms & Camera Framing](#direction-2-multi-cam-punch-zooms--camera-framing)
3. [Direction 3: Cut Rhythm & The 5-Beat Narrative Arc](#direction-3-cut-rhythm--the-5-beat-narrative-arc)
4. [Direction 4: Anti-AI Caption Typography & Word Highlights](#direction-4-anti-ai-caption-typography--word-highlights)
5. [Direction 5: B-Roll Cutaways & Proof Overlays](#direction-5-b-roll-cutaways--proof-overlays)
6. [Direction 6: Color Grading & Niche Brand Palettes](#direction-6-color-grading--niche-brand-palettes)
7. [Direction 7: Audio Architecture & Sound Design Cues](#direction-7-audio-architecture--sound-design-cues)
8. [Direction 8: The 3 Motion Layers (Primary, Secondary, Ambient)](#direction-8-the-3-motion-layers-primary-secondary-ambient)
9. [Direction 9: Split-Screen & Comparison Wipes](#direction-9-split-screen--comparison-wipes)
10. [Direction 10: Safe Zones & Social Media UI Protection](#direction-10-safe-zones--social-media-ui-protection)
11. [Direction 11: Engine Selection (HyperFrames vs. Remotion)](#direction-11-engine-selection-hyperframes-vs-remotion)
12. [Direction 12: Cloud Rendering & Storage Optimization](#direction-12-cloud-rendering--storage-optimization)
13. [Direction 13: Viral Retention Visual Hooks & Speed-Graph Motion](#direction-13-viral-retention-visual-hooks--speed-graph-motion)

---

## Direction 1: Motion Personality & Easing Archetypes
*(Derived from LottieFiles Motion Design Skill)*

Select **ONE** personality archetype per video to ensure mathematical and emotional consistency across all animations:

| Archetype | Timing | Easing Function | Overshoot | When to Use |
| :--- | :--- | :--- | :--- | :--- |
| **Premium** | 350–600ms | `cubic-bezier(0.4, 0, 0.2, 1)` | 0% | Apple keynote aesthetic, luxury reels, high-ticket consulting, dermatology trust. |
| **Energetic** | 100–250ms | `ease-out-expo` | 15–30% | Viral TikTok/Reels hooks, fast tech drops, meme edits, high-retention punches. |
| **Corporate** | 200–400ms | `cubic-bezier(0.2, 0, 0, 1)` | 0–3% | SaaS dashboards, fintech explainers, clean product tours, legal/B2B reels. |
| **Playful** | 150–300ms | `ease-out-back` | 10–20% | Bouncy stickers, gamified badges, consumer mobile apps, food/lifestyle clips. |

> **Direct Prompt Example:**
> *"Animate all entrance cards and popups using Direction 1: Premium motion."*

---

## Direction 2: Multi-Cam Punch Zooms & Camera Framing

Never leave a talking-head shot static for more than 4 seconds. Recreate a 2-camera studio setup from a single phone camera using spring-interpolated punch zooms:

- **The Hook (Wide - 1.0x)**: Lets the subject breathe naturally in frames 0 to 120.
- **The Punch-In (1.14x - 1.18x)**: Punch in sharply centered at eye level (`transform-origin: center 32%`) on power words (*"secret"*, *"stop"*, *"mistake"*).
- **The Verdict (Close - 1.18x - 1.22x)**: Deepest zoom for the final intimate CTA and verdict.
- **Breathing Micro-Motion**: Always add subtle sinusoidal float (`Math.sin(frame / 48) * 0.002`) so wide static shots never look frozen like a paused video.

> **Direct Prompt Example:**
> *"Apply Direction 2: Punch in 1.15x whenever the speaker mentions a key number or pain point."*

---

## Direction 3: Cut Rhythm & The 5-Beat Narrative Arc

Follow Jason Cooperson's proven short-form rhythm:

```text
[00:00 - 00:05] Hook (Wide camera, bold claim or question)
      │
[00:05 - 00:09] Punch 1 (Fast B-Roll cutaway proving claim #1)
      │
[00:09 - 00:14] Reveal (Deeper context + optional PiP bubble)
      │
[00:14 - 00:17] Punch 2 (Presenter punch-in re-engagement)
      │
[00:17 - 00:27] Evidence Cycle (2 to 3 rapid B-roll cutaways)
      │
[00:27 - 00:35] Verdict & CTA (Presenter close punch-in + branded outro)
```

**Cut Rules:**
- Cut at natural breath pauses, **NEVER mid-word**.
- Cut TO B-roll **before** the relevant word is spoken (anticipate the thought).
- Return to the presenter within **1 second** of finishing a B-roll point.
- Target split: **45–55% B-roll / 45–55% presenter**.

---

## Direction 4: Anti-AI Caption Typography & Word Highlights
*(Enforcing User-Validated Winning Caption Standard & Poppins Typography)*

Say NO to generic, cheap-looking AI captions (neon glowing boxes, robotic subtitles, or heavy 3D title cards over human presenters). Follow the verified high-retention caption architecture:

1. **MANDATORY FONT FAMILY**: **`'Poppins', sans-serif`** is the master display font across all reels (Weights: `900` for punch words & active syllables, `800` for spoken text, `700` for body). Secondary font: `'Roboto', sans-serif`.
2. **NO BOX / NO PILL FOR RAW SPOKEN TEXT**: Pure typography placed directly on the video canvas at `bottom: 250px` with a 3-stage cinematic dark drop shadow (zero neon glow, 100% readable on light and dark footage):
   ```css
   text-shadow: 0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.95), 0 8px 30px rgba(0, 0, 0, 0.85);
   ```
3. **PUNCHY 3–5 WORD BURSTS**: Break long sentences into tight bursts.
   - *Bad:* "The market crashed 40% and nobody saw it coming and here is why."
   - *Good:* Burst 1: "The market crashed 40%" ➔ Burst 2: "nobody saw it coming" ➔ Burst 3: "here is why."
4. **VERIFIED 4-TIER COLOR MATRIX**:
   - **Active Spoken Word**: Matte Warm Gold **`#FDE68A`** (weight: `900`, spring scale `1.08x`).
   - **Power Punch Words** (*Mistake, Clinic, Hair, Loss, Stop, Zero*): Matte Coral Red **`#F87171`** or Warm Amber **`#FB923C`** (weight: `900`, spring scale `1.15x`).
   - **Spoken Passed Words**: Pure Crisp White **`#FFFFFF`** (weight: `800`).
   - **Upcoming Words**: Translucent White **`rgba(255, 255, 255, 0.75)`**.
5. **HUMAN PRESENTER CLARITY RULE**:
   - For talking-head creator and doctor reels, avoid heavy 3D cards that block the speaker's face or look synthetic.
   - Use dynamic multi-cam punch zooms (Direction 2) paired with this pure kinetic caption layer for maximum human trust and retention.


---

## Direction 5: B-Roll Cutaways & Proof Overlays
*(Indexed Reusable Asset Library Protocol)*

Static images look like boring stock photos. Every B-roll must feel cinematic:

- **Ken Burns Drift**: Always apply a continuous subtle scale drift (`scale: 1.0 -> 1.06`) and horizontal pan (`x: 0 -> -15px`).
- **Positioning**: Place B-roll cards at `top: 200px` (below the brand watermark, above the lower-third caption zone).
- **Corner PiP (Picture-in-Picture) Bubble**: When demonstrating proof, shrink the speaker into a bottom-right circular badge (`width: 200px`, `border: 3px solid white`) so viewer connection is never lost.

### 📚 Master Reusable B-Roll Library (`b_rolls/` & `b_rolls/CATALOG.md`)
**STRICT CLEAN B-ROLL RULE**: Every file in this library must be 100% clean visual footage or photography — **STRICTLY NO BAKED-IN CAPTIONS, TEXT, LABELS, OR SUBTITLES**. All typography must be rendered programmatically in code.

Important assets are saved to `b_rolls/` with sequential numbering (`1_...`, `2_...`, `3_...`) and tracked in the catalog:

- **Directing by Clean ID**: Call any B-roll directly in your prompt by ID number:
  - `B-Roll #1`: Curious Puppy Hook (`1_puppy_curiosity_hook.jpg`) — clean puppy portrait for scroll-stopping hooks.
  - `B-Roll #2`: Human-AI Neural Future (`2_human_ai_neural_future.jpg`) — clean human hand & neural network.
  - `B-Roll #3`: Doomscrolling Fingers (`3_phone_reels_doomscroll.jpg`) — clean phone scrolling for screen time habits.
  - `B-Roll #4`: Fallen Hair on Brush (`4_hairbrush_fall_painpoint.jpg`) — clean medical/hair loss pain point.
  - `B-Roll #5`: Biotin / Vitamin Pills (`5_biotin_supplements_pills.jpg`) — clean supplement bottles & capsules.
  - `B-Roll #6`: Shampoo Bottles Shelf (`6_shampoo_bottles_market.jpg`) — clean retail cosmetic bottles on shelf.
  - `B-Roll #7`: High Tension Ponytail (`7_tight_ponytail_traction.jpg`) — clean high ponytail scalp tension shot.
  - `B-Roll #8`: Quantum AI Processor Chip (`8_ai_quantum_chip.jpg`) — clean glowing cyan/amber silicon chip.
  - `B-Roll #9`: Enterprise AI Data Center (`9_ai_datacenter_servers.jpg`) — clean server rack corridor.
  - `B-Roll #10`: Developer Workspace Setup (`10_coder_workspace_setup.jpg`) — clean night developer desk with monitors.
- **Library Catalog**: Tracked in [`b_rolls/CATALOG.md`](file:///c:/VIVEK/Projects/Video-Editing/b_rolls/CATALOG.md) and [`b_rolls/catalog.json`](file:///c:/VIVEK/Projects/Video-Editing/b_rolls/catalog.json).
- **Code Helper**: Programmatically load in Remotion via `getBrollUrl(id)` from `src/utils/brollLibrary.ts`.

---

## Direction 6: Color Grading & Niche Brand Palettes
*(Default Gold Standard: Apple Cupertino Keynote with Poppins)*

Match the color profile to the industry of the video:

| Niche | Caption Accent | Watermark Accent | Color Filter | Feel |
| :--- | :--- | :--- | :--- | :--- |
| **Apple Tech / Keynote (Default)** | `#0071E3` (Electric Blue) | `#0071E3` | `contrast(1.04) brightness(1.02)` | Clean, Cupertino white/frosted, Poppins 800/900 |
| **Doctor / Clinical** | `#FFE600` (Yellow) | `#38BDF8` (Cyan) | `contrast(1.06) brightness(1.02)` | High trust, warm hospital light |
| **Finance / Crypto** | `#00FF94` (Neon Green) | `#00FF94` | `contrast(1.08) saturate(0.90)` | Serious, institutional, luxury |
| **Business / CEO** | `#C9A84C` (Gold) | `#C9A84C` | `contrast(1.05) saturate(0.88)` | Executive, quiet luxury |
| **Fitness / Gym** | `#FF6B35` (Sunset Orange) | `#FF6B35` | `contrast(1.12) saturate(1.10)` | Raw energy, high contrast |
| **Dark Obsidian Tech** | `#38BDF8` (Cyan) | `#F59E0B` (Amber) | `contrast(1.07) saturate(0.95)` | Anthropic Claude, mysterious dark |

> **Apple Keynote Visual Standard Rules:**
> - Master Typography: `'Poppins', sans-serif` for titles/captions/pills, `'Roboto', sans-serif` for body metrics.
> - Cards: Frosted glass (`backdrop-filter: blur(40px)`, `border: 1px solid rgba(255, 255, 255, 0.14)` or `rgba(0, 0, 0, 0.08)`).
> - Matte chips (Blue `#0071E3`, Amber `#B45309`, Forest `#1B5E20`, Purple `#7C3AED`).
> - Branding: `@vizion.std` frosted glass pill watermark at `top: 60px, left: 56px`.

---

## Direction 7: Audio Architecture & Sound Design Cues

Great audio makes up 60% of the perceived production quality:

1. **Master Voice Continuity**: Presenter audio must span the entire composition without a single split or mute.
2. **Smart Ducking Curve**:
   - While presenter speaks: BGM volume automatically ducks to **`0.04 - 0.08`**.
   - During natural breath pauses: BGM swells smoothly to **`0.25`**.
3. **Frame-Accurate SFX Registry**:
   - `whoosh` (Vol 0.35): Triggers on every B-roll entrance.
   - `click` (Vol 0.40): Triggers on every camera punch-in zoom.
   - `sub_hit` (Vol 0.60): Triggers on the final verdict / CTA.

---

## Direction 8: The 3 Motion Layers (Primary, Secondary, Ambient)

To prevent flat, sterile edits, every composition must have 3 layers:

1. **Layer 1: Primary (Focus)**: The main action the viewer tracks (e.g. speaker talking, card appearing).
2. **Layer 2: Secondary (Depth)**: Supporting richness that follows the primary action (e.g. drop shadow expanding as a card lifts, an icon rotating 5°).
3. **Layer 3: Ambient (Life)**: Background atmosphere that never stops moving (e.g. SVG film grain at `z-index: 99`, luminous radial gradients breathing in the background).

---

## Direction 9: Split-Screen & Comparison Wipes

Use when demonstrating Before/After transformations or dual reactions:

- **50/50 Vertical Split**: Presenter on top half, B-roll / demonstration on bottom half with an animated accent divider line.
- **Interactive Wipe Slider**: A scanning line that sweeps across the screen from 0% to 100%, wiping from raw footage to finished result.

---

## Direction 10: Safe Zones & Social Media UI Protection

Never let buttons, usernames, or captions get blocked by Instagram or TikTok interface overlays:

- **Top Safe Zone (Top 120px)**: Reserved for brand watermark (`top: 60px, left: 56px`).
- **Center Zone (Middle 60%)**: Safe for punch captions and hero focal point.
- **Bottom Reserve (Bottom 250px)**: **STRICTLY CLEAN ZONE**. Keep free of critical text to prevent collisions with the Reels audio title, like/comment buttons, and description box.

### 🖼️ Master Reel Cover & Poster Standard (MANDATORY DEFAULT)
- **ALWAYS use 3D depth or cinematic blurred backgrounds** on every poster and cover photo until explicitly customized by the user.
- **Banned**: Plain, flat, or solid color backdrops.
- **Blurred Bokeh Background Formula**: Take the hero artwork/footage, scale up (`scale: 1.25x`), blur deeply (`filter: blur(60px) brightness(0.40) saturate(1.4)`), and layer beneath radial lens highlights.
- **3D Card Stacking**: Center cards must use tactile 3D perspective (`perspective: 1200px`), layered frosted glass (`backdrop-filter: blur(36px)`), and deep multi-stage ambient drop shadows (`0 30px 80px rgba(0, 0, 0, 0.55)`).
- **Feed 1:1 Safe-Zone**: All titles, badges, and focal elements must fit within the center `1080x1080` square (`Y: 420px to 1500px`).

---

## Direction 11: Engine Selection (HyperFrames vs. Remotion)

Direct the engine based on the content type:

- **Use HyperFrames (`npm run hf:...`)**: For talking-head reels, podcast clips, quick B-roll pacing, and HTML/CSS speed.
- **Use Remotion (`npm run render:...`)**: For 3D WebGL models, programmatic code-typing simulations, animated SVG graphs, and complex canvas particle systems.

---

## Direction 12: Cloud Rendering & Storage Optimization

Keep your laptop hardware safe and cool:

- **Preview Locally**: Run `npm run hf:preview` or `npm run dev` to scrub frame-by-frame with zero lag.
- **Export to Cloud**: Dispatch final high-res renders to AWS Lambda (`npm run hf:cloud:render` or `npm run cloud:render`). 
- **Clean Storage**: Run `npm run clean` after finishing projects to purge GBs of temporary render frame chunks without touching deliverables in `out/`.

---

## Direction 13: Viral Retention Visual Hooks & Speed-Graph Motion
*(Codified from @Anmol_type & High-Retention Motion Design)*

Never start a video on a plain talking head or a naked static sentence. Viewers decide within the first 0.5 to 1.5 seconds whether to swipe. Direct your hook using one of the 3 validated archetypes:

### 1. The 3 Hook Archetypes
- **The Designer Hook** (Tech / SaaS / Creator / Process):
  - Expanding bounding box with corner crosshairs (`+`) or brackets (`[ ]`).
  - Tactile 3D perspective tilt (`rotateX: 4deg`, `rotateY: -6deg`).
  - Status pill chip (`SYSTEM 01`, `NEW FEATURE`) popping in at frame +3.
  - Paired with sub-bass slam + mechanical click sound layer.
- **The Realtor / Authority Hook** (Finance / B2B / Founder / Agency):
  - High-key split layout or clean horizontal divider mask wipe.
  - Camera tracking push (`scale: 1.0` -> `1.08` continuous drift).
  - Floating high-impact metric badge (e.g. `+240% GROWTH`, `$1.2M`, `VERIFIED`).
  - Specular shimmer line wipe across the divider.
- **The Pharmacist / Diagnostic Hook** (Medical / Problem Breakdown / Science):
  - Focal problem isolation: Vignette darkens background while a glowing target ring highlights the issue.
  - Slow Ken Burns creeping zoom (`1.0` -> `1.06`) locked on the focal point.
  - Presenter shrunken into a floating corner frosted bubble (`TalkingHeadPresenter` PiP).
  - Sonar ping or diagnostic chirp audio cue.

### 2. The Speed-Graph & Stagger Rules
- **No Linear Keyframes**: 80% of motion happens in the first 20% of duration, followed by 80% damped settle.
- **3-Frame Stagger Delay**: Background plate (frame 0) ➔ Main Title (frame 3) ➔ Badge / Chip (frame 6) ➔ Brackets (frame 9).
- **Living Drift**: All elements maintain continuous sinusoidal micro-motion (`Math.sin(frame / 36) * 4px`) to prevent frozen frames.

---

## 🚀 How to Combine Directions in a Single Prompt

You can direct the agent with concise, professional commands like:

> *"Edit the talking head video in `inputs/footage/speaker.mp4` using:*
> - *Direction 1: Premium Motion*
> - *Direction 2: 1.15x Punch Zooms on key numbers*
> - *Direction 4: Anti-AI Captions with yellow accent*
> - *Direction 7: Ducked tech BGM and whoosh sound effects on cuts*
> - *Direction 12: Render on AWS Cloud"*
