# 📋 System & Environment Requirements

This document outlines all system, hardware, runtime, and cloud requirements to develop, preview, and render videos using this engine.

---

## 1. Local Development Environment

| Dependency | Minimum Version | Current / Recommended Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v22.0.0` (Required) | `v22.14.0` (Active) | High-performance runtime for both Remotion & HyperFrames engines |
| **npm** | `v10.0.0` | `10.9.2` (Active) | Package & dependency manager |
| **TypeScript** | `5.0+` | `5.9.3` (Installed) | Static type safety & Remotion compilation |
| **Chromium** | *Bundled* | *Auto-managed* | Headless browser for frame rasterization (Puppeteer / Chrome shell) |
| **FFmpeg** | *Bundled* | *Auto-managed* | Deterministic video encoding, H.264 muxing & audio stitching |

> [!NOTE]
> Node.js was upgraded to `v22.14.0` to support HyperFrames agent-native engine. A rollback copy of Node 20 is safely preserved in `C:\Users\Admin\.tools\node-v20`.

---

## 2. Hardware Profile & Recommendations

| Component | Minimum Spec | Current Host System | Operational Optimization |
| :--- | :--- | :--- | :--- |
| **CPU** | 2 Cores / 4 Threads | 2 Cores / 4 Logical Threads | Cap local Remotion renders at `--concurrency=2`. Offload final exports to AWS Cloud. |
| **RAM** | 8 GB | 8 GB+ | Frame rasterization in memory; purges automatically post-render via `npm run clean`. |
| **Disk Space** | 2 GB free | 10 GB+ recommended | Shared `inputs/` and protected `out/` folders; background chunk caches purged via `npm run clean`. |

---

## 3. Core Software Stack

### Engine A: Remotion React Motion Engine
- **Remotion Core**: `remotion@4.0.534` & `@remotion/cli@4.0.534`
- **UI Framework**: `react@19.2.3` & `react-dom@19.2.3`
- **Transitions & Media**: `@remotion/transitions`, `@remotion/media-utils`
- **Cloud Serverless**: `@remotion/lambda@4.0.534`
- **3D Graphics & Icons**: `three@^0.186.1`, `lucide-react@^1.53.0`
- **Styling**: `tailwindcss@4.0.0` & vanilla design tokens

### Engine B: HyperFrames Agent-Native Engine
- **HyperFrames Core**: `hyperframes@0.8.153` (Pure HTML5, CSS, GSAP 3.14.2)
- **AWS Cloud Stack**: `@hyperframes/aws-lambda` (AWS Step Functions chunk distributor)
- **Validation Suite**: `npm run hf:check` (Lint, runtime, layout shift, and WCAG AA contrast gatekeeper)

### Skill Engines:
- **Motion Design Skill Engine**: `.agents/skills/motion-design/` (LottieFiles universal motion principles)
- **Talking-Head Editing Skill**: `.agents/skills/doctor-reel-editing/` (Jason Cooperson 5-beat rhythm)
- **Apple Keynote Motion Skill**: `.agents/skills/apple-keynote-motion/` (Cupertino light aesthetic)

---

## 4. Cloud Serverless Rendering Requirements (AWS)

Both engines share your root `.env` AWS credentials to eliminate local laptop thermal strain:

```ini
# AWS IAM Credentials (Requires Lambda, Step Functions & S3 access)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
REMOTION_AWS_REGION="us-east-1"
```

### Pre-Configured Cloud Resources:
- **Region**: `us-east-1`
- **Remotion Lambda Function**: `remotion-render-4-0-534-mem2048mb-disk2048mb-120sec` (ARM64 Graviton2)
- **HyperFrames Stack**: AWS Step Functions standard workflow + Lambda chunk workers
- **S3 Bucket**: `remotionlambda-useast1-ncwjqknb82` (Auto-purges render temp chunks after 24h)
- **Active Remotion Site ID**: `3yh34vr7ih`

---

## 5. Master Playbooks & Prompt Guides
- [**EDITING_GUIDE.md**](./EDITING_GUIDE.md): 12 numbered master directions for pacing, typography, and punch zooms.
- [**HOW_TO_DIRECT_ME.txt**](./HOW_TO_DIRECT_ME.txt): Instant copy-paste prompt cheatsheet for one-shot agent direction.
- [**COMMANDS.md**](./COMMANDS.md): Full CLI cheat sheet for all local, cloud, and cleanup commands.
