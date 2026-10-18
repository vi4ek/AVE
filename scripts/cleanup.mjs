import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("🧹 Video Engine Background Cache & Temp Frame Cleaner\n");
console.log("🛡️  GUARANTEE: The 'out/' directory is strictly PROTECTED. No final output files will be touched.\n");

let freedBytes = 0;
let deletedFilesCount = 0;

function removeDirSafe(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      const stats = fs.statSync(dirPath);
      // Recursively calculate size
      function calculateDirSize(d) {
        let size = 0;
        try {
          const entries = fs.readdirSync(d, { withFileTypes: true });
          for (const entry of entries) {
            const p = path.join(d, entry.name);
            if (entry.isDirectory()) {
              size += calculateDirSize(p);
            } else {
              size += fs.statSync(p).size;
              deletedFilesCount++;
            }
          }
        } catch (_) {}
        return size;
      }

      freedBytes += calculateDirSize(dirPath);
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`  ✓ Purged heavy cache folder: ${dirPath}`);
    }
  } catch (err) {
    console.error(`  ✗ Error cleaning ${dirPath}:`, err.message);
  }
}

// 1. Clean heavy background render chunks & temp frames in OS temp directory
const systemTemp = os.tmpdir();
try {
  const tempEntries = fs.readdirSync(systemTemp, { withFileTypes: true });
  for (const entry of tempEntries) {
    if (entry.isDirectory()) {
      const name = entry.name.toLowerCase();
      // Remotion creates temp directories during rendering (chunks, frame caches, stitched buffers)
      if (
        name.startsWith("remotion") ||
        name.startsWith("remotion-render") ||
        name.startsWith("remotion-bundle") ||
        name.startsWith("chrome_headless")
      ) {
        removeDirSafe(path.join(systemTemp, entry.name));
      }
    }
  }
} catch (err) {
  console.log("  ℹ️  Could not scan system temp folder:", err.message);
}

// 2. Clean project-level bundler & compilation caches (Remotion + HyperFrames)
const projectCacheDirs = [
  path.join(rootDir, "node_modules", ".cache"),
  path.join(rootDir, ".remotion"),
  path.join(rootDir, ".cache"),
  path.join(os.homedir(), ".cache", "hyperframes"),
  path.join(rootDir, "hyperframes", "compositions", "talking-head-reel", ".hyperframes", "artifacts"),
];

for (const dir of projectCacheDirs) {
  removeDirSafe(dir);
}

// 3. Confirm out/ remains 100% untouched
const outDir = path.join(rootDir, "out");
if (fs.existsSync(outDir)) {
  const outputs = fs.readdirSync(outDir);
  console.log(`\n  🛡️  Preserved all ${outputs.length} output file(s) in out/:`);
  for (const file of outputs) {
    console.log(`     • out/${file}`);
  }
}

const freedMB = (freedBytes / (1024 * 1024)).toFixed(2);
console.log(`\n✨ Background cache cleanup complete!`);
console.log(`   Cleaned: ${deletedFilesCount} temporary chunk file(s) (~${freedMB} MB freed).`);
console.log(`   Deliverables in 'out/' were NOT modified or deleted.\n`);
