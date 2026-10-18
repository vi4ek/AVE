import fs from "fs";

// Simple WAV file generator in pure Node.js (no external deps)
function createWavBuffer(sampleRate, samples) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // "fmt " sub-chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // bitsPerSample

  // "data" sub-chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write 16-bit PCM samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intSample = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.round(intSample), 44 + i * 2);
  }

  return buffer;
}

const SR = 44100;

// 1. PING (Clean high-pitch crystal bell with exponential decay)
function genPing() {
  const dur = 0.45;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 9);
    samples[i] = (Math.sin(2 * Math.PI * 1760 * t) * 0.7 + Math.sin(2 * Math.PI * 3520 * t) * 0.3) * env;
  }
  return createWavBuffer(SR, samples);
}

// 2. COIN CLINK (Bright metallic dual ring with rapid decay)
function genCoinClink() {
  const dur = 0.55;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 12);
    samples[i] = (Math.sin(2 * Math.PI * 2350 * t) * 0.5 + Math.sin(2 * Math.PI * 3920 * t) * 0.5) * env;
  }
  return createWavBuffer(SR, samples);
}

// 3. SUCCESS CHIME (Ascending celestial arpeggio C5 -> E5 -> G5 -> C6)
function genSuccessChime() {
  const dur = 1.2;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  const notes = [
    { freq: 523.25, start: 0.0, end: 0.8 },
    { freq: 659.25, start: 0.12, end: 0.9 },
    { freq: 783.99, start: 0.24, end: 1.0 },
    { freq: 1046.5, start: 0.36, end: 1.2 }
  ];
  for (const note of notes) {
    const sIdx = Math.round(note.start * SR);
    const eIdx = Math.round(note.end * SR);
    for (let i = sIdx; i < eIdx; i++) {
      const t = (i - sIdx) / SR;
      const env = Math.exp(-t * 4);
      samples[i] += Math.sin(2 * Math.PI * note.freq * t) * 0.28 * env;
    }
  }
  return createWavBuffer(SR, samples);
}

// 4. LOCK CLUNK (Mechanical thud with low resonance)
function genLockClunk() {
  const dur = 0.3;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 18);
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 80) * 0.4;
    samples[i] = (Math.sin(2 * Math.PI * 180 * Math.exp(-t * 15) * t) * 0.7 + click) * env;
  }
  return createWavBuffer(SR, samples);
}

// 5. PHONE NOTIFICATION BUZZ (Haptic double vibration buzz)
function genNotificationBuzz() {
  const dur = 0.38;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  const bursts = [
    { start: 0.0, end: 0.12 },
    { start: 0.18, end: 0.32 }
  ];
  for (const b of bursts) {
    const sIdx = Math.round(b.start * SR);
    const eIdx = Math.round(b.end * SR);
    for (let i = sIdx; i < eIdx; i++) {
      const t = (i - sIdx) / SR;
      const env = Math.sin((t / (b.end - b.start)) * Math.PI);
      samples[i] += Math.sin(2 * Math.PI * 160 * t) * 0.6 * env;
    }
  }
  return createWavBuffer(SR, samples);
}

// 6. DIGITAL GLITCH SCRAMBLE
function genDigitalGlitch() {
  const dur = 0.4;
  const N = Math.round(SR * dur);
  const samples = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 6);
    const freq = 400 + Math.floor(Math.random() * 12) * 200;
    samples[i] = Math.sin(2 * Math.PI * freq * t) * (Math.random() > 0.3 ? 0.35 : 0) * env;
  }
  return createWavBuffer(SR, samples);
}

// Write the files
fs.writeFileSync("public/sfx/ping.wav", genPing());
fs.writeFileSync("public/sfx/coin_clink.wav", genCoinClink());
fs.writeFileSync("public/sfx/success_chime.wav", genSuccessChime());
fs.writeFileSync("public/sfx/lock_clunk.wav", genLockClunk());
fs.writeFileSync("public/sfx/notification_buzz.wav", genNotificationBuzz());
fs.writeFileSync("public/sfx/digital_glitch.wav", genDigitalGlitch());

console.log("Synthesized SFX wav files created in public/sfx/");
