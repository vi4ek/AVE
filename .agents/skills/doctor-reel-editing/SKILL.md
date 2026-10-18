---
name: doctor-reel-editing
description: >
  Universal editing skill for ANY talking-head reel (Instagram/YouTube Shorts 9:16).
  Works across ALL niches: medical/doctor, finance, fitness, business, tech, food, real estate, etc.
  Covers cut rhythm, B-roll placement, caption styling, color grading, audio, and Remotion implementation.
  Derived from Jason Cooperson AI video editing workflow and Claude Code + Remotion automation approach.
  Apply this skill whenever editing ANY talking-head reel regardless of niche.
---

# Universal Talking-Head Reel Editing Skill

## Core Philosophy

"The hook, story order, and creative taste are human decisions. The execution — cuts, captions, color, motion — is automated."
— Jason Cooperson workflow principle

This is a composition-based editing approach using Remotion + React. Every edit is:
- Deterministic — same input always gives same output
- Reusable — build once, apply to any niche
- Timeline-collision-proof — no double-clip bugs

---

## NON-NEGOTIABLES (Apply to EVERY niche, EVERY video)

### 1. Timeline Collision Rule — ZERO OVERLAPS
Every Remotion Sequence must have non-overlapping frame ranges.

CORRECT:
  Presenter: from=0  to from=165   (165 frames)
  B-Roll 1:  from=165 to from=270  (105 frames)
  Presenter: from=270 to ...

WRONG (causes double-clip visual artifact):
  Presenter: from=0 duration=300   (shows frames 0-300)
  B-Roll:    from=165 duration=105 (shows frames 165-270 ON TOP of presenter)

Fix Pattern: Never render two Video elements visible at the same time.
Use conditional render (showMainPresenter && Video) to gate the presenter track.

### 2. Audio Continuity Rule
The presenter's voice audio must NEVER CUT. Keep a single Video element spanning ALL frames
(full duration) with muted={false}. Visual tracks cut freely, but audio is always continuous.

```tsx
// Audio master — never muted, never wrapped in Sequence
<Video src={staticFile("inputs/presenter.mp4")} style={{ display: 'none' }} />
// Visual layer — swaps between presenter and B-rolls via conditional render
```

### 3. Caption Isolation Rule
Captions must live in their own z-index layer (z=90) above ALL other elements, NEVER inside a
Sequence with limited duration. Captions render globally for the entire video, phrase by phrase.

### 4. Z-Index Hierarchy (always this order)
- z=99  — Film grain overlay
- z=95  — Watermark / name badge
- z=90  — Captions (WordLevelCaptions)
- z=20  — B-roll cards / editorial tags
- z=10  — B-roll images
- z=5   — Presenter video layer
- z=1   — Background

---

## PROFESSIONAL CUT RHYTHM — The 5-Beat Structure (Universal)

This structure works for ALL niches. Adjust B-roll content, not the structure itself.

| Beat       | Duration | Type                        | Purpose                                        |
|-----------|----------|-----------------------------|------------------------------------------------|
| Hook       | ~5.5s    | Presenter wide (1.0x zoom)  | Grab attention with a bold claim or question   |
| Punch 1    | ~3.5s    | B-Roll cutaway              | Visually prove the first claim                 |
| Reveal     | ~5s      | B-Roll + optional PiP       | Deeper explanation with visual context         |
| Punch 2    | ~2.3s    | Presenter punch-in (1.14x)  | Re-engage viewer, add energy                   |
| Evidence 1 | ~3.2s    | B-Roll cutaway              | Visual proof of claim #3                       |
| Evidence 2 | ~5.5s    | B-Roll cutaway              | Visual proof of claim #4                       |
| Evidence 3 | ~5.5s    | B-Roll cutaway              | Visual proof of claim #5                       |
| Verdict    | ~8s      | Presenter punch-in (1.18x)  | Strong conclusion + CTA                        |

Universal Cut Rules (niche-agnostic):
- Cut at natural breath pauses, NEVER mid-word
- Cut TO B-roll BEFORE the relevant word is spoken (anticipate, don't lag)
- Return to presenter WITHIN 1s of completing a B-roll point
- Total B-roll: 40-55% of video duration
- Total presenter: 45-60% of video duration

---

## PRESENTER CAMERA — Dynamic Framing (Universal)

Always apply progressive zoom. Never use a flat static shot for the entire video.

```tsx
// WIDE: Opening hook — no zoom, let the subject breathe
presenterScale = 1.0;

// PUNCH-IN: Re-engagement moments
const punchSpring = spring({ frame: frame - punchStart, fps, config: { damping: 15, stiffness: 200 } });
presenterScale = interpolate(punchSpring, [0, 1], [1.0, 1.14]);

// VERDICT: Final close — most intimate moment
presenterScale = interpolate(verdictSpring, [0, 1], [1.0, 1.18]);

// Breathing micro-motion (always apply on presenter frames)
const breathingScale = presenterScale * (1.0 + Math.sin(frame / 48) * 0.002);
```

---

## B-ROLL QUALITY STANDARDS (Universal)

- Format: 9:16 portrait (1080x1920px)
- Style: Warm, editorial, real environments — NO stock photo look
- No infographics, no vector illustrations, no text-heavy images
- Ken Burns motion ALWAYS (never static image):

```tsx
const drift = interpolate(frame, [0, durationInFrames], [1.0, 1.06]);
const panX = interpolate(frame, [0, durationInFrames], [0, -15]);
```

B-Roll Card positioning: top: 200, left: 56 (below watermark, above captions)

---

## CAPTION SYSTEM — Anti-AI Look (Universal)

### The 3 Rules of Human-Looking Captions
1. NO BOX — pure text on video (no pill, no frosted glass, no border, no background)
2. PURE DROP SHADOW — multi-layer text shadow only, NO glow
3. DISPLAY FONT — Syne, Montserrat, or Outfit (NOT Inter, NOT Roboto)

```tsx
// Universal caption base — apply to all niches
fontFamily = "'Syne', 'Montserrat', sans-serif"
fontSize = 46
noBox = true
textShadow = "0 4px 16px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.85)"

// Active word: niche accent color (see niche table below)
fontWeight = 900
scale = 1.08

// Inactive word (spoken):
color = "#FFFFFF"
fontWeight = 800

// Upcoming word:
color = "rgba(255,255,255,0.72)"
fontWeight = 800
```

Caption Phrasing — 3-5 words per burst (ALWAYS):

BAD: "The market crashed 40% and nobody saw it coming and here's why."
GOOD:
  Burst 1: "The market crashed 40%"
  Burst 2: "nobody saw it coming"
  Burst 3: "here's why."

### 6 Typography Principles (From Video Editor's Typography Masterclass)
1. **Visual Contrast Hierarchy**: Strong weight/size delta between punch keywords (900 weight, larger) and connecting words (700 weight, smaller).
2. **Font Pairing Limit**: Maximum 2 fonts per reel (e.g., Syne for punch captions, Outfit for watermark/labels). Never introduce a 3rd typeface.
3. **Tracking & Kerning**: Negative letter-spacing (`-0.5px` to `-1px`) on large headlines and active words for high-impact tightness; positive tracking (`+1.2px` to `+1.8px`) on small uppercase metadata tags.
4. **Anchor Quadrant Placement**: 
   - Top-Left: Speaker identity / badge (unobtrusive authority)
   - Lower-Third / Center: Punch captions (viewer eye-level while seeing speaker's face)
   - Bottom 20%: Safe zone reserve (keep clean of UI text to avoid TikTok/Instagram overlay collisions)
5. **Color Hierarchy**: White (`#FFFFFF`) for spoken, translucent (`rgba(255,255,255,0.72)`) for upcoming, and single curated accent hex for active punch words.
6. **No Artificial Glow**: Glow reduces legibility against daylight footage; multi-stage directional drop shadow guarantees 100% legibility on light coats, bright skies, or dark rooms.

---

## FILM GRAIN — Always Apply (Universal)

```tsx
<svg style={{ opacity: 0.025, mixBlendMode: 'overlay', position: 'absolute', inset: 0, zIndex: 99 }}>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" />
</svg>
```

---

## NICHE OVERRIDE TABLE

Each niche has its own: accent color, color grade, caption uppercase rule, B-roll style, and watermark accent.

| Niche           | Caption Accent   | Color Grade                                  | Uppercase? | B-Roll Style              | Watermark Accent |
|-----------------|-----------------|----------------------------------------------|------------|---------------------------|-----------------|
| Medical/Doctor  | #FFE600 yellow  | contrast(1.06) brightness(1.02) saturate(0.96) | YES        | Clinical, warm, soft light | #38BDF8 cyan    |
| Finance/Crypto  | #00FF94 green   | contrast(1.08) brightness(1.0) saturate(0.90)  | YES        | Charts, city, luxury       | #00FF94 green   |
| Fitness/Gym     | #FF6B35 orange  | contrast(1.12) brightness(1.04) saturate(1.10) | YES        | Gym, sweat, motion blur    | #FF6B35 orange  |
| Business/CEO    | #C9A84C gold    | contrast(1.05) brightness(1.02) saturate(0.88) | YES        | Office, product, lifestyle | #C9A84C gold    |
| Tech/Startup    | #A78BFA purple  | contrast(1.07) brightness(1.01) saturate(0.95) | YES        | Screens, code, devices     | #A78BFA purple  |
| Food/Cooking    | #FF8C42 amber   | contrast(1.04) brightness(1.06) saturate(1.15) | NO         | Food close-ups, textures   | #FF8C42 amber   |
| Real Estate     | #34D399 teal    | contrast(1.05) brightness(1.03) saturate(0.92) | YES        | Properties, spaces, keys   | #34D399 teal    |
| Motivational    | #FF4081 pink    | contrast(1.10) brightness(1.03) saturate(1.05) | YES        | Crowd, sky, action         | #FF4081 pink    |
| Education       | #60A5FA blue    | contrast(1.06) brightness(1.02) saturate(0.94) | NO         | Books, boards, study       | #60A5FA blue    |
| Beauty/Skincare | #F9A8D4 rose    | contrast(1.03) brightness(1.05) saturate(1.08) | NO         | Textures, products, skin   | #F9A8D4 rose    |

Usage: When editing a video, identify niche → apply the matching row as overrides on top of universal defaults.

---

## WATERMARK / NAME BADGE — Universal Template

```tsx
// Container — always top-left
position: 'absolute', top: 96, left: 56, zIndex: 95
backdropFilter: 'blur(20px)'
background: 'rgba(10, 14, 24, 0.72)'
border: '1px solid rgba(255, 255, 255, 0.14)'
borderLeft: `4px solid ${NICHE_ACCENT_COLOR}`  // from niche table above
padding: '12px 22px'
borderRadius: '0 12px 12px 0'

// Name line
fontSize: 22, fontWeight: 800, color: '#FFFFFF'

// Title line (role / credential)
fontSize: 14, fontWeight: 600, color: '#94A3B8', letterSpacing: '1.2px', textTransform: 'uppercase'
```

Entrance animation (universal):
```tsx
const entrance = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 180 } });
translateY = interpolate(entrance, [0, 1], [-20, 0]);
opacity = interpolate(entrance, [0, 1], [0, 1]);
```

---

## B-ROLL CONTENT IDEAS BY NICHE

| Niche           | B-Roll Ideas                                                      |
|-----------------|-------------------------------------------------------------------|
| Medical/Doctor  | Hair, scalp, shampoo bottles, supplements, clinic tools, skin     |
| Finance/Crypto  | Stock charts, cash, crypto logos, city skylines, luxury cars      |
| Fitness/Gym     | Workout clips, weights, protein shakes, transformation photos     |
| Business/CEO    | Laptop, handshake, office, product shots, team meeting            |
| Tech/Startup    | Code on screen, phone apps, device close-ups, UI demos            |
| Food/Cooking    | Ingredient close-ups, cooking process, plated food, textures      |
| Real Estate     | Property exterior, interior rooms, keys, neighborhood shots       |
| Motivational    | Sunrise, running, crowd, goals written, success moments           |
| Education       | Books, notes, whiteboard, studying, campus, classroom             |
| Beauty/Skincare | Product packaging, skin texture, application, before/after        |

---

## SOUND DESIGN (Universal)

| Cue     | Trigger                      | Volume |
|---------|------------------------------|--------|
| whoosh  | Every B-roll cut-in          | 0.35   |
| click   | Every presenter punch-in     | 0.40   |
| sub_hit | Verdict / outro entry        | 0.60   |

---

## COMPOSITION SPECS for 9:16 Reels

```tsx
// Standard short-form reel (~38s)
durationInFrames={1152}  // 38.4s x 30fps
fps={30}
width={1080}
height={1920}

// Short hook reel (~15s)
durationInFrames={450}

// Long-form reel (~60s)
durationInFrames={1800}
```

---

## REUSABLE COMPONENT CHECKLIST

Before rendering ANY video, verify ALL of these:

- [ ] Video master track spans ALL frames (audio continuity)
- [ ] All Sequence ranges are NON-OVERLAPPING (no timeline collisions)
- [ ] Presenter visibility gated by showMainPresenter boolean
- [ ] WordLevelCaptions is OUTSIDE all Sequence blocks (global scope)
- [ ] Z-index hierarchy followed: grain(99) > watermark(95) > captions(90) > cards(20) > broll(10) > presenter(5)
- [ ] Ken Burns drift applied to all B-roll images
- [ ] Niche accent color applied to: watermark border + caption active word
- [ ] Film grain SVG applied at zIndex 99
- [ ] npm run lint passes 0 errors before cloud deploy

---

## CLOUD RENDER WORKFLOW

```bash
# 1. Lint check (mandatory)
npm run lint

# 2. Deploy to AWS S3 (required after every code change)
npm run cloud:deploy

# 3. Cloud render
npm run cloud:render:hair    # for hair/doctor reel
# or add new render scripts to package.json for other niches
```

AWS Lambda: 59 parallel instances, ~120s render time for 1152-frame 1080x1920.

---

## PiP (Picture-in-Picture) BUBBLE

Use when you want to show B-roll AND keep presenter visible simultaneously:

```tsx
position: 'absolute', bottom: 120, right: 56
width: 200, height: 200
borderRadius: '50%'
border: '3px solid rgba(255, 255, 255, 0.7)'
overflow: 'hidden'

<Video src={staticFile("inputs/presenter.mp4")} style={{
  transform: 'scale(1.15)',
  transformOrigin: 'center 32%',  // Focus on face, not shoulders
  objectFit: 'cover'
}} />
```

---

## ADVANCED EDITING TECHNIQUES (Universal & Niche)

### 1. Small / Big Text Hierarchy (Kinetic Word Emphasis)
Do not keep every word the same size. Differentiate punch keywords (1.3x–1.5x larger, bold) from filler words:
```tsx
// Small / Big contrast pattern:
const isPunchWord = ["STOP", "HAIR FALL", "SECRET", "MILLION", "MISTAKE", "NEVER"].includes(word.toUpperCase());

<span style={{
  fontSize: isPunchWord ? fontSize * 1.35 : fontSize * 0.92,
  fontWeight: isPunchWord ? 900 : 700,
  color: isPunchWord ? activeColor : "#FFFFFF",
  transform: isPunchWord ? `scale(${isWordActive ? 1.15 : 1.05})` : `scale(${isWordActive ? 1.08 : 1.0})`,
  letterSpacing: isPunchWord ? "-0.5px" : "0px",
  textTransform: isPunchWord ? "uppercase" : "none",
}}>
  {word}
</span>
```

### 2. Multi-Layer Directional & Ambient Shadows (Zero Murky Glow)
Realistic readability on all backgrounds (white coats, bright skies, dark studios):
```tsx
// Premium 3-stage text shadow:
// Stage 1: Sharp dark edge (readability against light backgrounds)
// Stage 2: Directional drop shadow (depth and separation)
// Stage 3: Soft ambient dispersion (smooth integration)
const textShadow = [
  "0 2px 4px rgba(0, 0, 0, 0.95)",
  "0 4px 16px rgba(0, 0, 0, 0.90)",
  "0 12px 36px rgba(0, 0, 0, 0.80)"
].join(", ");

// Card / B-Roll ambient container shadow:
const cardShadow = "0 25px 60px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12)";
```

### 3. Chroma Key (Green Screen Removal in Remotion)
When isolating a presenter shot against green screen footage without external tools:
```tsx
// Pattern: Canvas-based pixel color distance keying or CSS mix/filter
// In Remotion, render custom keying component using requestAnimationFrame or offscreen canvas:
export const ChromaKeyVideo: React.FC<{ src: string; keyColor?: [number, number, number]; threshold?: number }> = ({
  src,
  keyColor = [0, 255, 0], // Green
  threshold = 85
}) => {
  // Use canvas to sample each frame, calculate Euclidean distance:
  // sqrt((r - kr)^2 + (g - kg)^2 + (b - kb)^2) < threshold -> alpha = 0
  // Or for solid background replacement, use CSS clip-path / WebGL shader integration
};
```

### 4. Split Screen Edits (Dual Comparison / Reaction)
Vertical 50/50 split or diagonal split for side-by-side demonstration:
```tsx
// 50/50 Vertical Split Reel (Top: Presenter, Bottom: Proof / B-roll):
<div style={{ position: "relative", width: 1080, height: 1920 }}>
  {/* Top Section */}
  <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 960, overflow: "hidden" }}>
    <Video src={staticFile("inputs/presenter.mp4")} style={{ width: 1080, height: 1920, transform: "translateY(-15%)" }} />
  </div>
  {/* Divider Line */}
  <div style={{ position: "absolute", top: 958, left: 0, width: 1080, height: 4, background: NICHE_ACCENT_COLOR, zIndex: 30 }} />
  {/* Bottom Section */}
  <div style={{ position: "absolute", top: 960, left: 0, width: 1080, height: 960, overflow: "hidden" }}>
    <Img src={staticFile("inputs/broll.jpg")} style={{ width: 1080, height: 960, objectFit: "cover" }} />
  </div>
</div>
```

### 5. Mask Out Edits (Clip-Path Shapes, Spotlight, Feathered Reveals)
Reveal elements with smooth geometric or soft feathered masks:
```tsx
// Dynamic Wipe / Reveal Mask:
const wipeProgress = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: "clamp" });
// clip-path: inset(0 0 0 [wipeProgress]%)

// Circular Spotlight Mask (highlight scalp, product label, key area):
const spotlightMask = "circle(180px at 50% 40%)";
style={{ clipPath: spotlightMask }}

// Soft Feathered Edge Mask (gradual fade at bottom for presenter or b-roll):
style={{
  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
}}
```

---

## ANTI-PATTERNS — Never Do These (All Niches)

| Anti-Pattern                    | Problem                             | Fix                                        |
|---------------------------------|-------------------------------------|--------------------------------------------|
| Two Video elements both visible | Double-clip glitch                  | Gate with showMainPresenter boolean        |
| Captions inside Sequence        | Captions disappear during B-roll    | Place captions globally                    |
| Long caption phrases (>6 words) | AI/robot look                       | Break into 3-5 word bursts                 |
| Caption box / pill background   | Generic AI editor look              | noBox={true}, pure shadow only             |
| Neon glow on active word        | Cyber/Instagram filter look         | Use niche matte accent color, no glow      |
| Flat static presenter shot      | No energy or engagement             | Spring zoom + breathing micro-motion       |
| B-roll card at bottom           | Overlaps captions                   | Move card to top: 200                      |
| Static B-roll image             | Stock photo feel                    | Always apply Ken Burns drift               |
| Deploy without lint             | Runtime errors on Lambda            | Always npm run lint first                  |
| Same accent on captions AND UI  | Visual noise / no hierarchy         | Accent on watermark border only            |
| Uppercase captions on soft niches | Feels aggressive for food/beauty  | Use niche uppercase setting from table     |
| Render >10s video locally      | Overheats 2-core CPU / locks PC     | ALWAYS use AWS Lambda cloud render         |
| Uncompressed WAV on Lambda      | Socket hang up / S3 timeout         | Compress vocal & BGM to 192k MP3 (<1.5MB)  |
| 120s Lambda timeout on 3D reels | Chunk timeout on Three.js WebGL     | Deploy/use 240s Lambda function            |
| Small 200px square PiP          | Looks like tiny cheap webcam        | Use 340x480px portrait card with 4px stroke|
| Loud cartoon pops/whooshes on PiP| Breaks professional clinical trust | Silent or subtle click (0.08) only         |

---

## AWS LAMBDA CLOUD RENDERING MANDATE (>10s Videos)

> [!IMPORTANT]
> **STRICT COMPUTE RULE**: Any video longer than 10 seconds **MUST ALWAYS** be rendered using AWS Lambda (`npm run cloud:render:...`), NEVER locally. The host machine is a dual-core system and must not be subjected to heavy local video encoding.

### 1. Remotion Lambda Rules & Configuration
- **Deploy 240s Timeout Function for Heavy / WebGL Reels**:
  Default Remotion Lambda functions time out at 120s. Three.js anatomical visualizations or complex motion graphics require ~120-150s per chunk in software rasterization.
  Deploy and target the 240s function:
  ```bash
  npx remotion lambda functions deploy --timeout=240 --memory=2048 --disk=2048
  # Deployed as: remotion-render-4-0-534-mem2048mb-disk2048mb-240sec
  ```
- **CLI Flag Exclusivity**:
  `--frames-per-lambda` and `--concurrency` are **mutually exclusive** in Remotion CLI. Specify `--concurrency=10` alone to divide the timeline evenly across 10-11 Lambdas.
- **Production Cloud Render Command**:
  ```bash
  remotion lambda render <serve-url> <composition-id> out/<output.mp4> \
    --function-name=remotion-render-4-0-534-mem2048mb-disk2048mb-240sec \
    --concurrency=10 \
    --concurrency-per-lambda=1 \
    --max-retries=3 \
    --x264-preset=veryfast
  ```
- **Asset Weight Rule for S3**:
  Never pass uncompressed 15–20 MB WAV files to Lambda. 10+ concurrent Lambdas downloading raw WAV assets trigger `Error: socket hang up`. Always transcode vocal masters and BGM to 192kbps MP3 (< 1.5 MB).

---

## PICTURE-IN-PICTURE (PiP) PORTRAIT CARD STANDARD

For all doctor, expert, and professional talking-head reels, do NOT use a small 200px square box. Use the **340px × 480px Portrait Card**:

```tsx
// PiP Dimensions & Styling
width: 340,
height: 480,
borderRadius: 36,
border: "4px solid #FFFFFF",
boxShadow: "0 24px 60px rgba(0, 0, 0, 0.85)",
overflow: "hidden",
position: "absolute",
right: 48,
bottom: 390, // Positioned safely above word-level captions (bottom: 250)

// Presenter Framing inside PiP
<Video
  src={staticFile("inputs/presenter.mp4")}
  muted={true}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1.42)",
    transformOrigin: "center 28%", // Emphasizes face, expression, and lab coat
  }}
/>
```

- **Easing**: 12-frame (~400ms) sinusoidal cosine easing (`0.5 - 0.5 * Math.cos(Math.PI * p)`) for buttery smooth entrance and exit. Zero harsh spring bounce.
- **Audio during PiP**: Silent transition or subtle tactile click (`volume={0.08}`). Never play loud comedic cartoon whooshes or pops.

---

## VOCAL & AUDIO BALANCING STANDARD

1. **Broadcast Vocal Normalization**:
   - Extract presenter voice and run EBU R128 normalization (`loudnorm=I=-14:TP=-1.5:LRA=11`).
   - Mute the raw camera video track to eliminate ambient room hiss and phase issues.
   - Play normalized audio at `volume={1.35}`.
2. **Dynamic BGM Ducking**:
   - Background music ducked to `0.025 - 0.030` whenever presenter is speaking.
3. **Sound FX Restraint**:
   - Sound FX volume capped at `0.08 - 0.12` for clinical/medical reels. Only use tactile micro-clicks or soft whisper swooshes.

