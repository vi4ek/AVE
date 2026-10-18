import { deploySite, getFunctions, renderMediaOnLambda, getRenderProgress, getOrCreateBucket } from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const region = process.env.REMOTION_AWS_REGION || "us-east-1";
const entryPoint = path.resolve("src/index.ts");
const siteName = "3yh34vr7ih";
const compositionId = "MuseTutorialReel";
const outDir = path.resolve("out");
const outPath = path.resolve("out/muse_tutorial.mp4");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  console.log("=== AWS Lambda Remotion Cloud Renderer ===");
  console.log(`Region: ${region}`);

  console.log("Resolving S3 Bucket for Remotion Lambda...");
  const { bucketName } = await getOrCreateBucket({ region });
  console.log(`✓ S3 Bucket: ${bucketName}`);

  console.log(`Deploying site '${siteName}' from ${entryPoint}...`);
  const deployRes = await deploySite({
    entryPoint,
    siteName,
    region,
    bucketName,
  });

  const serveUrl = deployRes.serveUrl || deployRes.siteName || siteName;
  console.log(`✓ Site deployed successfully! Serve URL: ${serveUrl}`);

  const functions = await getFunctions({
    region,
    compatibleOnly: false,
  });

  if (!functions || functions.length === 0) {
    throw new Error("No Remotion Lambda functions found in region " + region);
  }

  const selectedFunction = functions[0].functionName;
  console.log(`✓ Using Lambda Function: ${selectedFunction}`);

  console.log(`Starting cloud render for composition '${compositionId}' (2103 frames)...`);
  const { renderId } = await renderMediaOnLambda({
    region,
    functionName: selectedFunction,
    serveUrl,
    composition: compositionId,
    codec: "h264",
    imageFormat: "jpeg",
    maxRetries: 3,
    concurrencyPerLambda: 2,
    framesPerLambda: 30,
  });

  console.log(`Render initiated! Render ID: ${renderId}, Bucket: ${bucketName}`);

  // Poll progress until finished
  while (true) {
    await new Promise((r) => setTimeout(r, 3000));
    const progress = await getRenderProgress({
      region,
      functionName: selectedFunction,
      bucketName,
      renderId,
    });

    if (progress.fatalErrorEncountered) {
      throw new Error(`Fatal Lambda Error: ${JSON.stringify(progress.errors)}`);
    }

    const pct = Math.round((progress.overallProgress || 0) * 100);
    const renderedChunks = progress.chunks || 0;
    console.log(`Cloud rendering progress: ${pct}% (chunks: ${renderedChunks})`);

    if (progress.done) {
      console.log(`✓ Cloud render finished on AWS Lambda!`);
      if (progress.outputFile) {
        console.log(`Downloading output from AWS to ${outPath}...`);
        const res = await fetch(progress.outputFile);
        const arrayBuf = await res.arrayBuffer();
        fs.writeFileSync(outPath, Buffer.from(arrayBuf));
        console.log(`✓ Deliverable saved: ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
      }
      break;
    }
  }

  console.log(`\n🎉 Muse AI Tutorial video successfully generated at: out/muse_tutorial.mp4`);
}

main().catch(err => {
  console.error("AWS Lambda Cloud Render error:", err.message);
  process.exit(1);
});
