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
  console.log(`Generated stereo ambient BGM: ${filePath} (${(leftSamples.length / sampleRate).toFixed(1)}s)`);
}

const sampleRate = 44100;
const durationSeconds = 54.0; // 54s covers the 51.8s video cleanly
const totalSamples = Math.floor(sampleRate * durationSeconds);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// BPM & Timing
const bpm = 122;
const beatSec = 60 / bpm; // ~0.4918s
const sixteenthSec = beatSec / 4; // ~0.1229s

// Musical Scales: D-minor / F-major ambient progression
// Chord root freqs: D2 (73.4), F2 (87.3), G2 (98.0), Bb2 (116.5)
const rootFreqs = [73.42, 87.31, 98.00, 116.54];
// Arp notes: D4, F4, A4, C5, E5, F5
const arpNotes = [293.66, 349.23, 440.00, 523.25, 659.25, 698.46];

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const beatIndex = Math.floor(t / beatSec);
  const beatFrac = (t % beatSec) / beatSec;
  const sixteenthIndex = Math.floor(t / sixteenthSec);
  const sixteenthFrac = (t % sixteenthSec) / sixteenthSec;

  const barIndex = Math.floor(beatIndex / 4);
  const chordIdx = barIndex % rootFreqs.length;
  const currentRoot = rootFreqs[chordIdx];

  // 1. WARM ROUND KICK (Gentle analog pulse, sidechain trigger)
  // Drop out kick during the offline reveal (27.5s - 31.0s) for dramatic breathing room
  let kick = 0;
  const inOfflineBreak = t >= 27.5 && t < 31.0;
  if (!inOfflineBreak) {
    const kickEnv = Math.exp(-beatFrac * 12);
    const kickPitch = 48 + 90 * Math.exp(-beatFrac * 30);
    kick = Math.sin(2 * Math.PI * kickPitch * (beatFrac * beatSec)) * kickEnv * 0.65;
  }

  // 2. SOFT AMBIENT CLAP / RIMSHOT (Beats 2 and 4)
  let clap = 0;
  const isClapBeat = (beatIndex % 2 === 1);
  if (isClapBeat && !inOfflineBreak) {
    const clapEnv = Math.exp(-beatFrac * 26);
    const clapNoise = (Math.random() * 2 - 1) * 0.28;
    const clapTone = Math.sin(2 * Math.PI * 260 * (beatFrac * beatSec)) * 0.2;
    clap = (clapNoise + clapTone) * clapEnv * 0.45;
  }

  // 3. STEREO SHAKER / HI-HAT (Subtle 16th groove with swing)
  let hat = 0;
  const isAccent = (sixteenthIndex % 4 === 2);
  const hatEnv = Math.exp(-sixteenthFrac * (isAccent ? 35 : 55));
  const hatNoise = (Math.random() * 2 - 1) * (isAccent ? 0.25 : 0.12);
  hat = hatNoise * hatEnv * 0.35;

  // 4. WARM ANALOG SUB-BASS (Rich gentle saw-sine blend)
  const bassEnv = Math.exp(-sixteenthFrac * 7);
  const sidechain = inOfflineBreak ? 1.0 : (0.25 + 0.75 * Math.pow(beatFrac, 0.65));
  const bassPhase = 2 * Math.PI * currentRoot * t;
  const bassTone = (Math.sin(bassPhase) + 0.35 * Math.sin(2 * bassPhase)) * bassEnv * sidechain * 0.28;

  // 5. AMBIENT CRYSTAL TECH PLUCK (L/R Ping-Pong Stereo Arpeggiator)
  const arpNote = arpNotes[(sixteenthIndex * 2 + (sixteenthIndex % 3)) % arpNotes.length];
  const arpEnv = Math.exp(-sixteenthFrac * 12);
  const arpPhase = 2 * Math.PI * arpNote * t;
  const arpTone = Math.sin(arpPhase) * arpEnv * 0.18;

  // 6. AMBIENT WARM DRONE / PAD (Subtle background harmonic wash)
  const padTone = (
    Math.sin(2 * Math.PI * currentRoot * 2 * t) * 0.08 +
    Math.sin(2 * Math.PI * currentRoot * 3 * t) * 0.05
  );

  // 7. Master Fade In (first 0.4s) & Fade Out (last 2.0s)
  let masterEnv = 1.0;
  if (t < 0.4) {
    masterEnv = t / 0.4;
  } else if (t > durationSeconds - 2.0) {
    masterEnv = Math.max(0, (durationSeconds - t) / 2.0);
  }

  // Stereo Spread
  const stereoSpread = Math.sin(t * 1.8) * 0.3;
  const mixL = (kick + clap + hat * 0.8 + bassTone + padTone + arpTone * (0.6 - stereoSpread)) * masterEnv;
  const mixR = (kick + clap + hat * 0.8 + bassTone + padTone + arpTone * (0.6 + stereoSpread)) * masterEnv;

  left[i] = mixL;
  right[i] = mixR;
}

writeWavFile("ambient_tech_bgm.wav", sampleRate, left, right);
