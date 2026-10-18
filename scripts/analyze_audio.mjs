import { execSync } from "child_process";
import path from "path";

const ffmpeg = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const audio = path.resolve("public/inputs/viral_voice.mp3");

const cmd = `"${ffmpeg}" -i "${audio}" -af silencedetect=noise=-28dB:d=0.25 -f null - 2>&1`;
const out = execSync(cmd, { shell: "cmd.exe" }).toString();
const lines = out.split("\n").filter(l => l.includes("silence_"));
console.log(lines.join("\n"));
