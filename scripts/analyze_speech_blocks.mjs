import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const ffmpeg = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const audioFile = path.resolve("public/inputs/muse_voiceover.mp3");

// Run silencedetect with noise=-28dB and min duration 0.35s
const cmd = `"${ffmpeg}" -i "${audioFile}" -af silencedetect=noise=-28dB:d=0.35 -f null - 2>&1`;
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

console.log("Filtered Silences (>= 0.35s):");
silences.forEach((s, idx) => {
  console.log(`Silence [${idx+1}]: ${s.start.toFixed(2)}s - ${s.end.toFixed(2)}s (dur: ${s.duration.toFixed(2)}s)`);
});

// Now let's calculate speech segments between silences
const speechSegments = [];
let prevEnd = 0;

for (let i = 0; i < silences.length; i++) {
  const s = silences[i];
  speechSegments.push({
    index: i,
    start: prevEnd,
    end: s.start,
    duration: s.start - prevEnd,
    followedByPause: s.duration
  });
  prevEnd = s.end;
}
speechSegments.push({
  index: silences.length,
  start: prevEnd,
  end: 70.11,
  duration: 70.11 - prevEnd,
  followedByPause: 0
});

console.log("\nSpeech Segments:");
speechSegments.forEach(seg => {
  console.log(`Speech ${seg.index}: ${seg.start.toFixed(2)}s -> ${seg.end.toFixed(2)}s (dur: ${seg.duration.toFixed(2)}s), then pause ${seg.followedByPause.toFixed(2)}s`);
});
