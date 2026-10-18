# 🛠️ Master Commands Reference Guide

This document contains every available command for the **Video Editing Engine**, categorized by workflow.

---

## 1. Interactive Preview & Development (Fastest Workflow)

Use this when drafting, designing, and inspecting edits frame-by-frame:

| Command | Description | Notes |
| :--- | :--- | :--- |
| `npm run dev` | Launches Remotion Studio at `http://localhost:3000` | Real-time scrubber, frame stepping, audio playback, hot-reloading |
| `npm run lint` | Runs TypeScript compilation check (`tsc --noEmit`) | Verifies zero type errors across all components |
| `npm run upgrade` | Upgrades Remotion core packages to latest compatible release | Keeps render engine up to date |

---

## 2. Agency Talking-Head Engine (Multi-Niche)

For Dermatologists, Lawyers, Coaches, Tech Founders, and Mystery/Documentary Reels:

| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run still:pro` | Renders poster frame of the Pro Talking-Head Reel (Frame 60) | `out/pro-talking-head-poster.png` |
| `npm run render:pro` | Renders 30s 9:16 Vertical Talking-Head Reel (concurrency=2) | `out/pro-talking-head-reel.mp4` |
| `npm run cloud:render:pro` | Renders Talking-Head Reel in 20-30s via AWS Lambda cloud | `out/pro-talking-head-reel.mp4` |

---

## 3. Dynamic Tech & Motion Graphics Videos

For animated product walkthroughs, keynotes, and JSON-driven reels:

| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run render:dynamic` | Renders complete reel configured via `sample-dynamic-reel.json` | `out/dynamic-reel.mp4` |
| `npm run render:local-ai` | Renders the 52.0s 9:16 Local AI Guide Reel (concurrency=2) | `out/local-ai-guide.mp4` |
| `npm run still:local-ai` | Renders high-res frame 750 poster for Local AI Reel | `out/local-ai-poster.png` |
| `npm run render:playground` | Renders Google AI Playground 32.0s Reel | `out/google-playground-reel.mp4` |
| `npm run still:playground` | Renders frame 600 poster for Google Playground Reel | `out/playground-poster.png` |
| `npm run render:muse` | Renders Muse AI Guide 43.5s Reel | `out/muse-ai-guide.mp4` |
| `npm run render` | Renders 16:9 Landscape Claude Showcase (60 FPS) | `out/claude-showcase.mp4` |
| `npm run render:vertical` | Renders 9:16 Vertical Claude Showcase (60 FPS) | `out/claude-vertical.mp4` |

---

## 4. Instagram Covers & Safe-Zone Graphics

Automatically formats 9:16 stories/reels and 1:1 profile grid previews:

| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run cover:reel` | Renders 1080x1920 9:16 Instagram Reel Cover | `out/auto-reel-cover.jpg` |
| `npm run cover:feed` | Renders 1080x1080 1:1 Feed Grid Cover (locked to profile safe zone) | `out/auto-feed-cover.jpg` |

---

## 4.1 Agency Brand & Animated Logo (`vizion.std`)

60 FPS cinematic animated logos, bumpers, and profile stings:

### Version 1: Cinematic Entrance & Stinger Bumper (5.0s, 300 Frames @ 60 FPS)
| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run still:logo` | High-res still of animated logo (Frame 90) | `out/vizion-logo-preview.png` |
| `npm run render:logo` | 16:9 Landscape 60 FPS Animated Logo (5.0s) | `out/vizion-logo-widescreen.mp4` |
| `npm run render:logo:vertical` | 9:16 Vertical Reel Bumper (5.0s) | `out/vizion-logo-vertical.mp4` |
| `npm run render:logo:square` | 1:1 Square Animated Logo Sting (5.0s) | `out/vizion-logo-square.mp4` |

### Version 2: 100% Seamless Infinite Looping Animated Logo (4.0s, 240 Frames @ 60 FPS)
*Designed with LottieFiles Motion Graphics skill: Multi-frequency sine oscillators, zero drift, counter-rotating reticle rings, floating layers, and continuous periodic shimmer.*
| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run still:logo:loop` | High-res still of looping logo (Frame 60) | `out/vizion-logo-loop-preview.png` |
| `npm run render:logo:loop` | 16:9 Landscape Seamless Looping Logo (4.0s) | `out/vizion-logo-loop.mp4` |
| `npm run render:logo:loop:vertical` | 9:16 Vertical Ambient Reel Loop (4.0s) | `out/vizion-logo-loop-vertical.mp4` |
| `npm run render:logo:loop:square` | 1:1 Square Looping Avatar / Web Sting (4.0s) | `out/vizion-logo-loop-square.mp4` |

---

## 4.2 Meta AI Models Reel (Hindi Podcast Voiceover)

| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run still:hook` | High-res still of puppy hook (Frame 60 - Ulta Tangoge) | `out/meta-ai-hook-preview.png` |
| `npm run render:hook` | 9:16 Vertical Reel Starting Hook Video (4.5s @ 30 FPS) | `out/meta-ai-hook.mp4` |
| `npm run still:meta-ai` | High-res still poster of full reel (Frame 420 - Models Showcase) | `out/meta-ai-models-poster.png` |
| `npm run render:meta-ai` | 9:16 Complete 50.2s 9-Scene Reel Video (1,506 frames @ 30 FPS) | `out/meta-ai-models-reel.mp4` |

---

## 5. Audio & AI Speech Transcription

| Command | Description | Output Location |
| :--- | :--- | :--- |
| `npm run transcribe` | Generates word-level Whisper JSON timestamps for voiceover | `public/inputs/<file>_captions.json` |
| `node scripts/transcribe_audio.mjs <path-to-audio>` | Transcribes any custom audio file into word-level timestamps | Custom JSON output |

---

## 5.1 Automated AI Script-to-Video Pipeline

Autonomous pipeline converting a raw topic or script into a fully animated reel:

| Command | Description | What It Does |
| :--- | :--- | :--- |
| `npm run pipeline:ai` | Runs default AI pipeline on topic | Generates storyboard, captions & audio assets |
| `node scripts/ai_pipeline.mjs --topic "..." --niche dermatology` | Generates assets for dermatology | Configures medical badges & before/after |
| `node scripts/ai_pipeline.mjs --topic "..." --niche legal --render` | Generates + local render | Storyboard ➔ Captions ➔ Renders MP4 locally |
| `node scripts/ai_pipeline.mjs --topic "..." --niche tech --cloud` | Generates + AWS cloud render | Storyboard ➔ Captions ➔ Renders on AWS Lambda |

---

## 6. Frame-Accurate Spot Checks & Partial Renders

When you only changed 1-2 seconds (e.g. at 12.34s) and do not want to wait for the whole video:

```bash
# 1. Render a single exact frame (12.34s @ 30 FPS = Frame 370) in 1-2 seconds:
npx remotion still ProTalkingHeadReel out/spot-check.png --frame=370

# 2. Render ONLY a specific range of frames (e.g. Frames 360 to 390 = 12.0s to 13.0s):
npx remotion render ProTalkingHeadReel out/snippet.mp4 --frames=360-390

# 3. Render 16:9 widescreen variant of dynamic reel:
npx remotion render DynamicTechReelWidescreen out/tech-widescreen.mp4 --concurrency=2
```

---

## 7. AWS Lambda Cloud Infrastructure

Serverless rendering on AWS Graviton2 architecture:

| Command | Description |
| :--- | :--- |
| `npm run cloud:deploy` | Bundles and uploads the latest React code to the active AWS S3 site |
| `npm run cloud:sites` | Lists active deployed Remotion sites on AWS |
| `npm run cloud:render` | Serverless cloud render of `LocalAiGuideReel` |
| `npm run cloud:render:playground` | Serverless cloud render of `GooglePlaygroundReel` |
| `npm run cloud:render:muse` | Serverless cloud render of `MuseAiGuide` |
| `npm run cloud:render:pro` | Serverless cloud render of `ProTalkingHeadReel` |

---

## 8. Storage & Maintenance (Safe Cleanup)

| Command | Description | Safety Guarantee |
| :--- | :--- | :--- |
| `npm run clean` | Purges `%TEMP%/remotion-*` chunks and bundler cache | **Never touches `out/` deliverables** |
| `npm run clean:footage` | Purges temp renders + non-essential footage | Output files remain protected |
| `npm run clean:all` | Comprehensive cache and intermediate file purge | Output files remain protected |

---

## 9. HyperFrames Engine (HTML/CSS Agent-Native Video)

Lightweight browser-driven video creation, talking-head packaging, and AWS Step Functions cloud rendering:

| Command | Description | What It Does |
| :--- | :--- | :--- |
| `npm run hf:preview` | Interactive Browser Studio | Runs local preview server with interactive timeline scrubber |
| `npm run hf:check` | Gatekeeper Check | Runs lint, runtime validation, layout, motion & WCAG AA contrast check |
| `npm run hf:timeline` | Inspect & Edit Timeline | Shows tracks, clips, and enables agent split/trim/move operations |
| `npm run hf:transcribe` | Word-Level Whisper Transcriber | Generates millisecond-accurate word timestamps for audio/video |
| `npm run hf:render` | Local MP4 Export | Renders composition locally using headless Chrome + FFmpeg |
| `npm run hf:cloud:deploy` | AWS Step Functions Deploy | Deploys/updates serverless Lambda + S3 + Step Functions chunk stack |
| `npm run hf:cloud:render` | AWS Serverless Cloud Render | Renders 1080x1920 reel across parallel cloud Lambdas to `out/` |
| `npm run hf:cloud:status` | Check Cloud Render Status | Inspects running or completed AWS Step Functions execution status |
| `npm run hf:cloud:destroy` | Tear Down AWS Stack | Deletes serverless rendering stack when not in use |

---

> [!NOTE]
> Whenever a new script or utility is added to `package.json`, it must immediately be documented in this table and persisted in `MEMORY.md`.

