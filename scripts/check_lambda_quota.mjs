import { LambdaClient, GetAccountSettingsCommand } from "@aws-sdk/client-lambda";
import dotenv from "dotenv";

dotenv.config();

const client = new LambdaClient({
  region: process.env.REMOTION_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function main() {
  try {
    const res = await client.send(new GetAccountSettingsCommand({}));
    console.log("=== AWS Lambda Account Concurrency Settings ===");
    console.log("Total Concurrent Executions Limit:", res.AccountLimit?.ConcurrentExecutions);
    console.log("Unreserved Concurrent Executions:", res.AccountLimit?.UnreservedConcurrentExecutionLimit);
    console.log("Account Usage Total Code Size:", res.AccountUsage?.TotalCodeSize);
    console.log("Account Usage Function Count:", res.AccountUsage?.FunctionCount);
  } catch (err) {
    console.error("Error fetching account settings:", err.message);
  }
}

main();
