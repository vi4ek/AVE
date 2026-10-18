import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Exact speech start and end timestamps from the audio analysis:
// Scene 1: 0.0s to 7.6s (Speech ends around 7.34s)
// Scene 2: 9.0s to 19.5s (Speech starts 9.32s, ends 19.27s)
// Scene 3: 20.3s to 33.2s (Speech starts 20.56s, ends 32.92s)
// Scene 4: 33.8s to 43.7s (Speech starts 34.05s, ends 43.43s)
// Scene 5: 44.0s to 49.7s (Speech starts 44.28s, ends 49.48s)
// Scene 6: 50.3s to 54.28s (Speech starts 50.60s, ends 53.45s)

const sceneCuts = [
  { scene: 1, start: 0.0, end: 7.7 },
  { scene: 2, start: 9.0, end: 19.6 },
  { scene: 3, start: 20.3, end: 33.2 },
  { scene: 4, start: 33.8, end: 43.7 },
  { scene: 5, start: 44.0, end: 49.8 },
  { scene: 6, start: 50.3, end: 54.28 }
];

const outDir = "public/inputs/upi_scenes";
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sceneDurations = [];

for (const cut of sceneCuts) {
  const outFile = `${outDir}/scene_${cut.scene}_vo.mp3`;
  const duration = cut.end - cut.start;
  const cmd = `npx remotion ffmpeg -ss ${cut.start} -to ${cut.end} -i "public/inputs/upi_voiceover.mp3" -c:a libmp3lame -q:a 2 "${outFile}" -y`;
  execSync(cmd, { stdio: "inherit" });

  // Get exact duration via ffprobe
  const probeCmd = `npx remotion ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${outFile}"`;
  const exactDuration = parseFloat(execSync(probeCmd, { encoding: "utf8" }).trim());
  sceneDurations.push({
    scene: cut.scene,
    file: outFile,
    duration_s: exactDuration,
    frames_30: Math.round(exactDuration * 30)
  });
}

console.log("Processed Scene Clips:", JSON.stringify(sceneDurations, null, 2));
