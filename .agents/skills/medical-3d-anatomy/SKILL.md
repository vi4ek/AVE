---
name: medical-3d-anatomy
description: >
  Specialized skill for creating cinematic 3D anatomical and biological visualizations
  inside Remotion using Three.js (WebGL). Covers hair follicles, dermal papilla, skin layers,
  micro-vessels, cellular structures, and organ cross-sections for medical, dermatology,
  health, and science reels (9:16 vertical 1080x1920).
---

# Medical 3D Anatomy Visualizer Skill

## Core Philosophy

"Static medical diagrams feel like PowerPoint slides. Interactive 3D biological animations look like an HBO documentary or Apple Keynote."

In health and doctor reels, viewer trust and watch time skyrocket when complex medical claims are accompanied by **rotational 3D cutaways** rather than generic stock photos.

---

## 1. Available Component

Import the pre-built 3D visualizer from:
```tsx
import { Anatomy3DVisualizer } from "../components";
```

### Supported Anatomical Models:
1. `modelType="hair_follicle"`:
   - 3D Keratin Hair Shaft
   - Translucent Outer Root Sheath
   - Dermal Papilla Bulb (deep red active matrix)
   - Pulsing capillary micro-vessels
   - Sebaceous oil glands with callout badges
2. `modelType="skin_layers"`:
   - 3D Translucent skin stratum corneum, epidermis, and deep dermis collagen matrix
3. `modelType="neural_brain"`:
   - 3D Cognitive neural node network with synaptic connections

---

## 2. Implementation Pattern in Reels

Never hold a 3D cutaway longer than 3.5 seconds. Use it as a snappy, cinematic evidence proof:

```tsx
<Sequence from={240} durationInFrames={90} name="3D Hair Follicle Proof">
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F7',
  }}>
    <Anatomy3DVisualizer
      modelType="hair_follicle"
      width={900}
      height={900}
      rotationSpeed={1.2}
      showLabels={true}
    />
  </div>
</Sequence>
```

---

## 3. Cinematic Studio Lighting Formula

Every 3D anatomical model in Three.js must use a 3-point studio lighting rig:
- **Key Light**: High-intensity top-right white light (`0xffffff`, intensity `2.2`)
- **Rim Light**: Electric cyan accent (`0x0071E3`, intensity `2.8`) to separate tissue edges from the backdrop
- **Warm Sub-Fill**: Warm amber under-light (`0xf59e0b`, intensity `1.2`) to simulate blood supply warmth
- **Ambient**: Soft neutral ambient fill (`0xf5f5f7`, intensity `0.9`)

---

## 4. Frame-Accurate Determinism

Never use `requestAnimationFrame` or `Date.now()` inside Remotion Three.js components!
Always derive rotations and zooms purely from Remotion's frame clock:
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const rotationY = (frame / fps) * 0.8 * rotationSpeed;
```
This guarantees 100% frame-by-frame reproducibility on AWS Lambda cloud rendering without dropped frames.
