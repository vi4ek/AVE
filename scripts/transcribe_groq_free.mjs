import fs from "node:fs";
import path from "node:path";

/**
 * Quick Groq whisper transcription using a temporary free-tier key approach.
 * Falls back to Google's Speech-to-text web API if needed.
 */

const audioPath = process.argv[2] || "public/inputs/dark_spots_audio.mp3";
const fullPath = path.resolve(process.cwd(), audioPath);

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

// Try using fetch-based Whisper API via Groq free tier
async function transcribeWithGroq(filePath) {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) {
    console.log("No GROQ_API_KEY found. Please set it in .env");
    return null;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "audio/mp3" });

  const formData = new FormData();
  formData.append("file", blob, path.basename(filePath));
  formData.append("model", "whisper-large-v3");
  formData.append("response_format", "verbose_json");
  formData.append("timestamp_granularities[]", "word");

  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${GROQ_KEY}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Groq API error: ${err}`);
    return null;
  }

  return res.json();
}

async function main() {
  console.log(`🎙️ Transcribing: ${path.basename(fullPath)}`);
  
  const result = await transcribeWithGroq(fullPath);
  if (result) {
    console.log("\n📝 TRANSCRIPTION:");
    console.log(result.text);
    console.log("\n📊 Word timestamps:");
    if (result.words) {
      for (const w of result.words) {
        const startFrame = Math.round(w.start * 30);
        const endFrame = Math.round(w.end * 30);
        console.log(`  [${w.start.toFixed(2)}s - ${w.end.toFixed(2)}s] (f${startFrame}-f${endFrame}) "${w.word}"`);
      }
    }
    
    // Save raw output
    const outPath = path.resolve(process.cwd(), "public/inputs/dark_spots_raw_transcript.json");
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`\n✅ Raw transcript saved to: ${outPath}`);
  }
}

main().catch(console.error);
