import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const ffmpeg = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const audioFile = path.resolve("public/inputs/muse_voiceover.mp3");

// Let's inspect speech between 45s and 70s in detail
const cuts = [
  { label: "45.0-53.5", start: 45.0, end: 53.5 },
  { label: "53.0-58.0", start: 53.0, end: 58.0 },
  { label: "57.0-63.0", start: 57.0, end: 63.0 },
  { label: "62.0-70.11", start: 62.0, end: 70.11 }
];

console.log("Analyzing latter half cuts...");
// Let's run silencedetect with lower threshold to see all micro pauses
const cmd = `"${ffmpeg}" -ss 45 -i "${audioFile}" -af silencedetect=noise=-30dB:d=0.25 -f null - 2>&1`;
const out = execSync(cmd, { shell: "cmd.exe" }).toString();

const lines = out.split("\n").filter(l => l.includes("silencedetect"));
console.log(lines.join("\n"));
