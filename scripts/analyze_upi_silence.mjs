import { execSync } from "child_process";
import fs from "fs";

// Run ffmpeg silencedetect with -30dB and min duration 0.3s
const result = execSync('npx remotion ffmpeg -i public/inputs/upi_voiceover.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null - 2>&1', {
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024
});

const lines = result.split("\n");
const silences = [];
let currentStart = null;

for (const line of lines) {
  if (line.includes("silence_start:")) {
    const match = line.match(/silence_start:\s*([\d\.]+)/);
    if (match) currentStart = parseFloat(match[1]);
  } else if (line.includes("silence_end:")) {
    const matchEnd = line.match(/silence_end:\s*([\d\.]+)\s*\|\s*silence_duration:\s*([\d\.]+)/);
    if (matchEnd && currentStart !== null) {
      silences.push({
        start: currentStart,
        end: parseFloat(matchEnd[1]),
        duration: parseFloat(matchEnd[2])
      });
      currentStart = null;
    }
  }
}

console.log("Found silences (d >= 0.3s):", JSON.stringify(silences, null, 2));
