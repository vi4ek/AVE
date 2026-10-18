import fs from "fs";

function createWavBuffer(sampleRate, samples) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.round(intVal), 44 + i * 2);
  }

  return buffer;
}

const SR = 44100;

// Soft, warm, velvety air whoosh (no harsh frequencies, warm low-end air puff)
function generateSoftWhoosh(duration = 0.38) {
  const N = Math.round(SR * duration);
  const rawNoise = new Float32Array(N);

  // 1. Generate Voss-McCartney Pink Noise (smooth, balanced, warm, no harsh highs)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < N; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    rawNoise[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  // 2. Dynamic 2-pole Low-Pass Filter sweeping from 160Hz -> 680Hz -> 120Hz
  const filtered = new Float32Array(N);
  let lp1 = 0;
  let lp2 = 0;
  let lp3 = 0;

  for (let i = 0; i < N; i++) {
    const prog = i / N;
    // Bell curve sweep for cutoff frequency
    const cutoff = 150 + Math.sin(prog * Math.PI) * 550; // max 700Hz - zero irritating treble/hiss!
    // RC lowpass filter coefficient
    const dt = 1 / SR;
    const rc = 1 / (2 * Math.PI * cutoff);
    const alpha = dt / (rc + dt);

    // 3-stage cascade lowpass for steep smooth roll-off (>18dB/octave)
    lp1 += alpha * (rawNoise[i] - lp1);
    lp2 += alpha * (lp1 - lp2);
    lp3 += alpha * (lp2 - lp3);

    // Add gentle sub-harmonic warmth (deep air displacement)
    const subFreq = 90 + Math.sin(prog * Math.PI) * 60;
    const subTone = Math.sin(2 * Math.PI * subFreq * (i / SR)) * 0.18;

    // Smooth cubic bell envelope (ultra soft attack and release, no click)
    const env = Math.sin(prog * Math.PI) ** 3.0;

    filtered[i] = (lp3 * 1.4 + subTone) * env * 0.75;
  }

  return createWavBuffer(SR, filtered);
}

// Generate and write
const softWhooshBuffer = generateSoftWhoosh(0.38);
fs.writeFileSync("public/sfx/whoosh.wav", softWhooshBuffer);
console.log("Successfully generated velvety soft whoosh to public/sfx/whoosh.wav");
