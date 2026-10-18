import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sfxDir = path.resolve(__dirname, "../public/sfx");
if (!fs.existsSync(sfxDir)) {
  fs.mkdirSync(sfxDir, { recursive: true });
}

function writeWavFile(filename, sampleRate, leftSamples, rightSamples) {
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = leftSamples.length * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Interleave stereo 16-bit PCM
  for (let i = 0; i < leftSamples.length; i++) {
    const l = Math.max(-1, Math.min(1, leftSamples[i]));
    const r = Math.max(-1, Math.min(1, rightSamples[i]));
    const intL = l < 0 ? l * 0x8000 : l * 0x7fff;
    const intR = r < 0 ? r * 0x8000 : r * 0x7fff;
    buffer.writeInt16LE(Math.floor(intL), 44 + i * 4);
    buffer.writeInt16LE(Math.floor(intR), 44 + i * 4 + 2);
  }

  const filePath = path.join(sfxDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated stereo BGM: ${filePath} (${(leftSamples.length / sampleRate).toFixed(1)}s)`);
}

const sampleRate = 44100;
const durationSeconds = 33.0; // Covers entire 31.32s video + tail
const totalSamples = Math.floor(sampleRate * durationSeconds);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// BPM & Timing
const bpm = 124;
const beatSec = 60 / bpm; // ~0.48387s
const sixteenthSec = beatSec / 4; // ~0.12096s

// Bass notes (frequencies in Hz): D2, F2, G2, A2
const bassFreqs = [73.42, 87.31, 98.00, 110.00];

// Arp notes: D4, F4, A4, C5, D5
const arpFreqs = [293.66, 349.23, 440.00, 523.25, 587.33];

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const beatIndex = Math.floor(t / beatSec);
  const beatFrac = (t % beatSec) / beatSec;
  const sixteenthIndex = Math.floor(t / sixteenthSec);
  const sixteenthFrac = (t % sixteenthSec) / sixteenthSec;

  // 1. KICK DRUM (Every beat, 4-on-the-floor)
  // Drop out kick between 14.5s and 17.2s for build-up/riser!
  let kick = 0;
  const inBuildUp = t >= 14.0 && t < 17.2;
  if (!inBuildUp) {
    const kickEnv = Math.exp(-beatFrac * 14);
    const kickPitch = 50 + 130 * Math.exp(-beatFrac * 35);
    kick = Math.sin(2 * Math.PI * kickPitch * (beatFrac * beatSec)) * kickEnv * 0.75;
  }

  // 2. SNARE / CLAP (Beats 2 and 4, except during drop build-up)
  let clap = 0;
  const isClapBeat = (beatIndex % 2 === 1);
  if (isClapBeat && !inBuildUp) {
    const clapEnv = Math.exp(-beatFrac * 22);
    const clapNoise = (Math.random() * 2 - 1) * 0.4;
    const clapTone = Math.sin(2 * Math.PI * 220 * (beatFrac * beatSec)) * 0.3;
    clap = (clapNoise + clapTone) * clapEnv * 0.6;
  }

  // Build-up snare roll (accelerating snare hits between 14.0s and 17.2s)
  if (inBuildUp) {
    const rollRate = t < 15.5 ? sixteenthSec : sixteenthSec / 2;
    const rollFrac = (t % rollRate) / rollRate;
    const rollEnv = Math.exp(-rollFrac * 18);
    const rollNoise = (Math.random() * 2 - 1) * 0.35;
    const rollVol = 0.2 + 0.5 * ((t - 14.0) / 3.2);
    clap += rollNoise * rollEnv * rollVol;
  }

  // 3. HI-HAT (16th notes with groove accent)
  let hihat = 0;
  const isAccent = (sixteenthIndex % 4 === 2); // upbeat
  const hatEnv = Math.exp(-sixteenthFrac * (isAccent ? 25 : 45));
  const hatNoise = (Math.random() * 2 - 1) * (isAccent ? 0.35 : 0.2);
  hihat = hatNoise * hatEnv * 0.45;

  // 4. ROLLING TECH SYNTH BASS (16th notes sidechained to kick)
  const barIndex = Math.floor(beatIndex / 4);
  const noteIdx = barIndex % bassFreqs.length;
  const currentBassFreq = bassFreqs[noteIdx];
  const bassEnv = Math.exp(-sixteenthFrac * 9);
  // Sidechain compression dip right on the kick beat
  const sidechain = inBuildUp ? 1.0 : (0.2 + 0.8 * Math.pow(beatFrac, 0.7));
  const bassPhase = 2 * Math.PI * currentBassFreq * t;
  // Rich saw wave approximation
  const bassWave = Math.sin(bassPhase) + 0.5 * Math.sin(2 * bassPhase) + 0.25 * Math.sin(3 * bassPhase);
  const bass = bassWave * bassEnv * sidechain * 0.32;

  // 5. STEREO TECH ARP PLUCK
  const arpNote = arpFreqs[(sixteenthIndex * 3) % arpFreqs.length];
  const arpEnv = Math.exp(-sixteenthFrac * 15);
  const arpPhase = 2 * Math.PI * arpNote * t;
  const arpWave = Math.sin(arpPhase) * arpEnv * 0.16;

  // 6. Master Fade In (first 0.3s) and Fade Out (last 1.5s)
  let masterEnv = 1.0;
  if (t < 0.3) {
    masterEnv = t / 0.3;
  } else if (t > durationSeconds - 1.5) {
    masterEnv = Math.max(0, (durationSeconds - t) / 1.5);
  }

  // Stereo width pan
  const panOffset = Math.sin(t * 1.5) * 0.25;
  const leftMix = (kick + clap + hihat * 0.85 + bass + arpWave * (0.6 - panOffset)) * masterEnv;
  const rightMix = (kick + clap + hihat * 0.85 + bass + arpWave * (0.6 + panOffset)) * masterEnv;

  left[i] = leftMix;
  right[i] = rightMix;
}

writeWavFile("tech_bgm.wav", sampleRate, left, right);
