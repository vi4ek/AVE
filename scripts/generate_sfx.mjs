import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sfxDir = path.resolve(__dirname, "../public/sfx");
if (!fs.existsSync(sfxDir)) {
  fs.mkdirSync(sfxDir, { recursive: true });
}

function writeWavFile(filename, sampleRate, samples) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF identifier
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.floor(intVal), 44 + i * 2);
  }

  const filePath = path.join(sfxDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath}`);
}

const sampleRate = 44100;

// 1. POP / REVEAL SFX (0.12s) - Warm resonant bubble pop
{
  const duration = 0.12;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    const freq = 340 + Math.sin(progress * Math.PI) * 120; // gentle pitch bend
    const env = Math.exp(-progress * 18);
    const wave = Math.sin(2 * Math.PI * freq * t);
    samples[i] = wave * env * 0.7;
  }
  writeWavFile("pop.wav", sampleRate, samples);
}

// 2. MECHANICAL TACTILE CLICK (0.05s) - Clean, crisp UI click
{
  const duration = 0.05;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    const env = Math.exp(-progress * 45);
    const noise = (Math.random() * 2 - 1) * 0.3;
    const tone = Math.sin(2 * Math.PI * 1800 * t) * 0.7;
    samples[i] = (tone + noise) * env * 0.6;
  }
  writeWavFile("click.wav", sampleRate, samples);
}

// 3. AIR WHOOSH (0.4s) - Smooth filtered camera move sweep
{
  const duration = 0.4;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const progress = i / totalSamples;
    const env = Math.sin(progress * Math.PI) ** 2; // bell curve
    const noise = Math.random() * 2 - 1;
    // simulated resonant whoosh modulation
    const mod = Math.sin(2 * Math.PI * (120 + progress * 240) * (i / sampleRate));
    samples[i] = (noise * 0.35 + mod * 0.65) * env * 0.65;
  }
  writeWavFile("whoosh.wav", sampleRate, samples);
}

// 4. SUB IMPACT BRAAM (0.8s) - Cinematic deep bass drop for titles
{
  const duration = 0.8;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    const freq = 65 * Math.exp(-progress * 2.5); // drops from 65Hz to ~20Hz
    const env = Math.exp(-progress * 5);
    const sub = Math.sin(2 * Math.PI * freq * t);
    const harmonic = Math.sin(2 * Math.PI * (freq * 2) * t) * 0.25;
    samples[i] = (sub + harmonic) * env * 0.85;
  }
  writeWavFile("sub_hit.wav", sampleRate, samples);
}

// 5. RISER SWEEP (0.7s) - Tension riser leading into transitions
{
  const duration = 0.7;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = i / totalSamples;
    const freq = 120 + progress * progress * 600; // rising from 120Hz to 720Hz
    const env = progress ** 1.8;
    const tone = Math.sin(2 * Math.PI * freq * t);
    const noise = (Math.random() * 2 - 1) * 0.2;
    samples[i] = (tone + noise) * env * 0.6;
  }
  writeWavFile("riser.wav", sampleRate, samples);
}

console.log("All SFX assets generated successfully.");
