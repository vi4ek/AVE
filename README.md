# 🎬 AVE — Agentic Video Engine
> **The AI-first Remotion framework for programmatic vertical reels, Apple-style tech explainers, and 3D motion graphics.**  
> Built by **@vizion.std** for creators, engineers, and AI coding agents.

---

## ⚡ 5-Minute Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Remotion Studio
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to preview, scrub, and inspect all compositions in real-time.

### 3. Render a Finished Video
```bash
# Render 16:9 Landscape Claude Launch Video
npm run render

# Render 9:16 Vertical Talking-Head Reel
npm run render:pro
```

---

## 🎯 The #1 Golden Rule: Storyboard-First Editing (A1 Mandate)

AVE is engineered to work seamlessly with AI coding assistants (**Antigravity, Claude Code, Cursor, Copilot**).

Before touching any code:
1. **Drop your raw voiceover / footage** into `public/inputs/`.
2. **Generate a Storyboard with Claude**: Copy the prompt from [`HOW_TO_DIRECT_ME.txt`](./HOW_TO_DIRECT_ME.txt) into Claude.
3. **Use the Gold-Standard Template**: Ensure Claude matches the format in [`DEMO_STORYBOARD.md`](./DEMO_STORYBOARD.md).
4. **Feed the Storyboard to your AI Agent**: The agent will read the timeline and build the composition frame-accurately on the first pass.

---

## 🧠 Built-In AI Agent Skills (`.agents/skills/`)

This engine includes 5 production-grade motion skills that your AI agents automatically discover and execute:

* 🍏 **`apple-keynote-motion`**: Cupertino light theme, frosted glass cards, and deliberate keynote pacing.
* 🩺 **`doctor-reel-editing`**: Universal 5-beat retention rhythm, presenter PiP bubbles, and clinical authority.
* 🧬 **`medical-3d-anatomy`**: Three.js WebGL 3D anatomical & biological visualizations.
* ⚡ **`motion-design`**: Disney animation principles, spring physics profiles, and easing curves.
* 🪝 **`visual-hook-motion`**: Elite 3-second visual hook archetypes (@Anmol_type drills).

---

## 🎨 Studio Customization in 1 Line

Customize your studio watermark, creator handle, and brand colors globally by editing [`src/studio.config.ts`](./src/studio.config.ts):

```typescript
export const STUDIO_CONFIG = {
  brandName: "Your Studio",
  creatorHandle: "@yourhandle",
  tagline: "High-Velocity Motion",
  colors: {
    accent: "#CC785C", // Primary brand accent
    dark: "#0A0B0E",   // Obsidian background
  },
};
```

---

## 🛠️ CLI Command Reference

See [`COMMANDS.md`](./COMMANDS.md) for the complete list of render, transcription, and cleanup scripts.

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches Remotion Studio browser preview |
| `npm run render` | Renders 16:9 60 FPS widescreen launch video |
| `npm run render:pro` | Renders 9:16 vertical talking-head reel |
| `npm run transcribe` | Generates free word-level subtitles via Groq Whisper |
| `npm run clean` | Purges background temp render caches (keeps outputs safe) |

---

## 📜 Master Guides
- [**DEMO_STORYBOARD.md**](./DEMO_STORYBOARD.md): The gold-standard storyboard specification for Claude.
- [**EDITING_GUIDE.md**](./EDITING_GUIDE.md): 12 master motion design rules and pacing techniques.
- [**HOW_TO_DIRECT_ME.txt**](./HOW_TO_DIRECT_ME.txt): Copy-paste prompt templates for your AI agent.
- [**MEMORY.md**](./MEMORY.md): The persistent memory architecture for AI agents.
- [**REQUIREMENTS.md**](./REQUIREMENTS.md): Node, hardware, and performance guidelines.
