# Project Memory & Architecture Context: AVE (Agentic Video Engine)

## 1. Project Mission & Identity
A high-production, programmatic video editing and motion graphics engine inspired by modern tech keynotes (Apple, Anthropic, Linear/Stripe). Built on Remotion 4 (React 19 + TypeScript) to empower AI coding agents to edit frame-accurate vertical reels (9:16) and widescreen videos (16:9).

---

## 2. Mandatory Pre-Edit Intake & A1 Claude Storyboard Protocol
> [!IMPORTANT]
> **NEVER START EDITING IMMEDIATELY AFTER A SINGLE PROMPT.**
> The AI agent MUST gather complete context first and enforce the Storyboard-First rule before touching any video code.

### A. The Agent's Mandatory Greeting & Intake Questions
Before writing code, the assistant must ask:
1. **What are we editing?** (Topic, core message, audience, target duration, aspect ratio: 9:16 or 16:9).
2. **Do you have a Script?** (Paste text or drop `script.md` into `public/inputs/`).
3. **Do you have an Audio file?** (Voiceover `.mp3` / `.wav` in `public/inputs/`).
4. **Do you have Raw Footage?** (Screen recording or camera clip in `public/inputs/`).
5. **Describe the Visual Style** (Apple Keynote, Anthropic Obsidian Launch, Clinical PiP, or Fast Viral Roundup). If not provided, suggest one from memory.

### B. The #1 Golden Rule (A1 Mandate): The Claude Storyboard
Instruct the user:
> *"Create a storyboard of editing for your video from Claude (or your LLM), download it and paste it here or give me the file. This is the #1 requirement to edit videos accurately on the first pass."*
- If the user's storyboard from Claude is vague or disorganized, tell them:
  > *"Feed our [`DEMO_STORYBOARD.md`](./DEMO_STORYBOARD.md) template to Claude and ask it: 'Recreate my video storyboard using this exact structured tabular format.' "*
- Only after reviewing and confirming alignment with the scene-by-scene storyboard may the agent implement code.

---

## 3. Continuous Self-Updating Memory Protocol (Zero Prompt Repetition)
> [!IMPORTANT]
> **Proactive Rule Persistence**:
> 1. Whenever a new rule, user preference, workflow refinement, or operational constraint is established, the assistant **MUST proactively persist it into `MEMORY.md`**.
> 2. The assistant must NEVER wipe, overwrite, or degrade existing memory context, design tokens, or architectural standards. Always append or extend thoughtfully.
> 3. Whenever a new npm script or render command is added to `package.json`, it **MUST immediately be documented in `COMMANDS.md`** and `MEMORY.md`.
> 4. This guarantees long-term memory continuity without the user having to repeat their preferences.

---

## 4. Design System Tokens & Physics Profiles

| Category | Values / Specs |
| :--- | :--- |
| **Canvas** | 1080x1920 (9:16 Vertical Reel) & 1920x1080 (16:9 Landscape), 60 FPS standard |
| **Background Colors** | Slate Obsidian `#0A0B0E`, Dark Charcoal `#12131A`, Card Surface `#1A1B23` |
| **Accent Colors** | Warm Terracotta / Amber `#CC785C`, `#E07A5F`, Warm Glow `#F59E0B`, Medical Mint `#0D9488` |
| **Typography** | Inter / Geist / Poppins for UI & headings; Editorial Serif for select accents |
| **Physics Profiles** | `snappy`: `{ mass: 0.8, damping: 14, stiffness: 120 }`<br>`smooth`: `{ mass: 1.2, damping: 20, stiffness: 80 }`<br>`cinematic`: `{ mass: 1.5, damping: 28, stiffness: 60 }` |
| **Glassmorphism** | `backdrop-filter: blur(24px)`, border: `1px solid rgba(255, 255, 255, 0.08)`, box-shadow ambient glow |

---

## 5. Audio & Sound Design Standards
- **Master Voiceover**: Placed at `volume={1.0}`.
- **Dynamic BGM Ducking**: Background music must duck down to `0.025` during voiceover segments so speech remains 100% upfront and authoritative.
- **Bounded Audio**: Always enclose `<Audio>` tags inside bounded `<Sequence>` tags to prevent audio bleeding outside scene durations.
- **Procedural Sound FX**: Synchronize frame-accurate SFX on graphic hits (`sub_hit.wav`, `whoosh.wav`, `pop.wav`, `click.wav`).

---

## 6. Presenter Picture-in-Picture (PiP) Standards
- **When to Use**: Whenever a diagram, screen recording, or B-roll visual takes primary focus.
- **Card Sizing**: `340px` width × `480px` height with `borderRadius: 36px`.
- **Styling**: Crisp white border (`border: 4px solid #FFFFFF`) with deep ambient shadow (`0 24px 60px rgba(0, 0, 0, 0.85)`).
- **Smooth Cosine Motion**: Continuous 12-frame (~400ms) sinusoidal cosine easing (`0.5 - 0.5 * Math.cos(Math.PI * p)`) for buttery smooth entrance and exit without visual jumping.
- **Hook Protection**: NEVER PiP during the first 3 seconds (the hook stays fullscreen).

---

## 7. Kinetic Caption Standards
- **Typography**: Bold heavy sans (Poppins / Montserrat 800 or Anton). Big and confident.
- **Reveal**: Word-by-word staggered reveal.
- **Color**: Pure white text with **at most ONE accent color per line** on the punch word. No rainbow text.
- **Safety**: Safe buffer above the bottom interface safe-zone (`bottom: 250px`).

---

## 8. Storage & Asset Lifecycle Protocol
- **`public/` is the Single Source of Truth**: All assets mounted via `staticFile("...")` must live in `public/`.
- **Strict Final Output Protection**: The entire `out/` directory is strictly protected. Final video renders and exports are permanent and never touched by cleanup scripts.
- **Cleanup Command**: `npm run clean` purges OS temp Remotion render artifacts (`%TEMP%/remotion-*`) and bundler caches without ever touching `out/`.
