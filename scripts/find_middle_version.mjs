import fs from "fs";
import readline from "readline";

async function findMiddle() {
  const logPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/b1ed8c33-6645-4448-b531-39a2b53707ba/.system_generated/logs/transcript_full.jsonl";
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes("write_to_file") || line.includes("replace_file_content")) {
      if (line.includes("src\\\\compositions\\\\upi") || line.includes("src/compositions/upi")) {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            console.log(`Step ${obj.step_index} (${obj.created_at}): ${tc.name} -> ${tc.args?.TargetFile}`);
          }
        }
      }
    }
  }
}

findMiddle();
