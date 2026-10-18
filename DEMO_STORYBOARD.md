# 🎬 Gold-Standard Video Storyboard Specification

> **Mandatory AI Instruction**: Every video edited with the AVE engine must first have a structured storyboard generated matching this exact format. Never write vague paragraphs or generic bullet lists.

---

## 📌 Project Overview
- **Video Title**: Stop Wasting Hours Video Editing
- **Format / Aspect Ratio**: 9:16 Vertical Reel (1080x1920)
- **Target Duration**: 30.0s @ 30 FPS = 900 frames
- **Visual Style**: Anthropic Obsidian Canvas + Warm Amber Glow
- **Presenter Footprint**: Fullscreen Hook ➔ PiP Bubble during UI proof ➔ Fullscreen Turn
- **Audio Stems**:
  - Voiceover: `public/inputs/voiceover.mp3`
  - BGM: `public/sfx/tech_bgm.wav` (Auto-ducked to 0.025 during voice)

---

## ⏱️ Scene-by-Scene Production Breakdown

| Scene | Time & Frames | Visual Frame & Action | On-Screen Kinetic Text | Voiceover Line | SFX Cue | Transition |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | `0.0s - 3.5s`<br>(Frames 0–105) | **THE HOOK**: Fullscreen presenter. Problem visual zooms in with spring physics. No decorative badges or cluttered labels. | "STOP WASTING<br><span style="color:#CC785C">HOURS</span> EDITING" | *"If you're still manually keyframing reels in Premiere, you're doing it wrong."* | `sub_hit.wav` at f=1<br>`whoosh.wav` at f=45 | Cut |
| **02** | `3.5s - 8.5s`<br>(Frames 105–255) | **THE MODEL**: Presenter shrinks to bottom-right PiP bubble (340x480, 4px white border, 36px radius). Center reveals 3D browser card with Remotion timeline. | "PROGRAMMATIC<br>TIMELINES" | *"Here is how top engineering studios automate their entire short-form pipeline with code."* | `pop.wav` at f=110<br>`click.wav` at f=160 | 12-frame Cosine PiP |
| **03** | `8.5s - 16.0s`<br>(Frames 255–480) | **THE PROOF**: Center macOS terminal window animates typed code syntax. Word captions highlight in real-time synced to speech. | "WORDS SYNCED<br>TO SPEECH" | *"Word-level timestamps parse automatically using local Whisper AI models in seconds."* | `click.wav` on key typed | Whip Pan Left |
| **04** | `16.0s - 23.0s`<br>(Frames 480–690) | **THE TURN**: Presenter returns to fullscreen. Background shifts to deep obsidian with warm amber ambient glow. | "10X FASTER<br>WORKFLOW" | *"One script renders 10 platform variations across cloud servers in under 20 seconds."* | `riser.wav` build-up | Smooth Dissolve |
| **05** | `23.0s - 30.0s`<br>(Frames 690–900) | **THE CTA**: Clean frosted glass card with creator watermark pill (`@vizion.std`) and GitHub repo badge. | "CLONE THE ENGINE<br>START BUILDING" | *"Clone the engine today and build your own agentic video studio."* | `sub_hit.wav` at f=692 | Fade to Black |

---

## 🤖 How to Recreate This in Claude / LLM:
Copy and paste this exact prompt into Claude:
```text
"Review my script below and generate a frame-accurate video storyboard following the exact format of DEMO_STORYBOARD.md. Include Scene IDs, exact frame ranges, visual action, on-screen text with 1 accent word, voiceover lines, SFX cues, and transitions:

[PASTE YOUR SCRIPT HERE]"
```
