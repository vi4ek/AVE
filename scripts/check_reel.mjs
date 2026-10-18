import fs from "fs";
import readline from "readline";

async function checkReel() {
  const logPath = "C:/Users/Admin/.gemini/antigravity-ide/brain/b1ed8c33-6645-4448-b531-39a2b53707ba/.system_generated/logs/transcript_full.jsonl";
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"step_index":544,') || line.includes('"step_index":691,')) {
      const obj = JSON.parse(line);
      console.log("Step:", obj.step_index);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          console.log("Tool:", tc.name, "Target:", tc.args?.TargetFile);
          if (tc.args?.ReplacementContent) {
            console.log("Replacement:", tc.args.ReplacementContent.slice(0, 200));
          }
        }
      }
    }
  }
}

checkReel();
