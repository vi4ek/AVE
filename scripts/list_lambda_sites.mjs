import { getSites, getFunctions } from "@remotion/lambda";
import dotenv from "dotenv";

dotenv.config();

const region = process.env.REMOTION_AWS_REGION || "us-east-1";

async function main() {
  try {
    const { sites } = await getSites({ region });
    console.log("=== Remotion Lambda Sites ===");
    sites.forEach(s => console.log(`Site: ${s.siteName}, id: ${s.id}`));

    const { functions } = await getFunctions({ region, compatibleOnly: true });
    console.log("\n=== Remotion Lambda Functions ===");
    functions.forEach(f => console.log(`Function: ${f.functionName}, memory: ${f.memorySizeInMb}`));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
