import { renderStill, selectComposition } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";
import path from "path";
import fs from "fs";

const retimed = JSON.parse(fs.readFileSync("public/inputs/muse_retimed.json"));
const outDir = path.resolve("out/contact_sheet_muse");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const framesToRender = retimed.shots.map((s, idx) => {
  const midFrame = Math.round((s.start_frame + s.end_frame) / 2);
  const cleanId = s.id.replace(".", "_");
  return {
    frame: midFrame,
    name: `${String(idx + 1).padStart(2, "0")}_${cleanId}`,
    label: s.on_screen_text || s.id
  };
});

console.log(`Starting rapid contact sheet render (${framesToRender.length} stills across all shots)...`);

async function main() {
  const entryPoint = path.resolve("src/index.ts");
  console.log("Bundling Remotion project once...");
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MuseTutorialReel",
  });

  console.log(`Composition loaded: ${composition.id} (${composition.durationInFrames} frames)`);

  for (let i = 0; i < framesToRender.length; i++) {
    const item = framesToRender[i];
    const outputPath = path.join(outDir, `${item.name}.png`);
    console.log(`[${i + 1}/${framesToRender.length}] Rendering frame ${item.frame} (${item.label})...`);
    
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outputPath,
      frame: item.frame,
      imageFormat: "png",
      chromiumOptions: {
        gl: "angle",
      },
    });
  }

  console.log(`\n🎉 Successfully rendered all ${framesToRender.length} contact sheet stills in out/contact_sheet_muse/!`);
}

main().catch(err => {
  console.error("Contact sheet render error:", err);
  process.exit(1);
});
