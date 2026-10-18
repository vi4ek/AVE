import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const ffmpeg = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const audioFile = path.resolve("public/inputs/muse_voiceover.mp3");

console.log("Analyzing audio:", audioFile);

// Run silencedetect
const cmd = `"${ffmpeg}" -i "${audioFile}" -af silencedetect=noise=-30dB:d=0.28 -f null - 2>&1`;
const out = execSync(cmd, { shell: "cmd.exe" }).toString();

const silences = [];
const lines = out.split("\n");
let currentStart = null;

for (const line of lines) {
  if (line.includes("silence_start:")) {
    const match = line.match(/silence_start:\s*([\d\.]+)/);
    if (match) currentStart = parseFloat(match[1]);
  } else if (line.includes("silence_end:")) {
    const match = line.match(/silence_end:\s*([\d\.]+)\s*\|\s*silence_duration:\s*([\d\.]+)/);
    if (match && currentStart !== null) {
      silences.push({
        start: currentStart,
        end: parseFloat(match[1]),
        duration: parseFloat(match[2])
      });
      currentStart = null;
    }
  }
}

console.log(`Found ${silences.length} silence intervals:`);
silences.forEach((s, i) => {
  console.log(`  [${i+1}] ${s.start.toFixed(2)}s -> ${s.end.toFixed(2)}s (dur: ${s.duration.toFixed(2)}s)`);
});
