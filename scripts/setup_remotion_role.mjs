import {
  IAMClient,
  CreateRoleCommand,
  GetRoleCommand,
  PutRolePolicyCommand,
  AttachRolePolicyCommand,
} from "@aws-sdk/client-iam";
import { getRolePolicy } from "@remotion/lambda";
import dotenv from "dotenv";

const ROLE_NAME = "remotion-lambda-role";

dotenv.config();

const client = new IAMClient({
  region: process.env.REMOTION_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const assumeRolePolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
});

async function main() {
  console.log(`Checking if IAM role '${ROLE_NAME}' exists...`);
  let roleExists = false;
  try {
    await client.send(new GetRoleCommand({ RoleName: ROLE_NAME }));
    console.log(`Role '${ROLE_NAME}' already exists.`);
    roleExists = true;
  } catch (err) {
    if (err.name === "NoSuchEntity" || err.name === "NoSuchEntityException") {
      console.log(`Role '${ROLE_NAME}' not found, creating it...`);
    } else {
      throw err;
    }
  }

  if (!roleExists) {
    const createRes = await client.send(
      new CreateRoleCommand({
        RoleName: ROLE_NAME,
        AssumeRolePolicyDocument: assumeRolePolicy,
        Description: "Execution role for Remotion AWS Lambda serverless rendering",
      })
    );
    console.log(`Created role: ${createRes.Role?.Arn}`);
  }

  console.log("Attaching Remotion policy to role...");
  const rolePolicyDoc = getRolePolicy();
  await client.send(
    new PutRolePolicyCommand({
      RoleName: ROLE_NAME,
      PolicyName: "remotion-lambda-policy",
      PolicyDocument: rolePolicyDoc,
    })
  );
  console.log("Remotion policy successfully attached.");

  try {
    await client.send(
      new AttachRolePolicyCommand({
        RoleName: ROLE_NAME,
        PolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      })
    );
    console.log("AWSLambdaBasicExecutionRole policy attached.");
  } catch (e) {
    console.log("Note on BasicExecutionRole:", e.message);
  }

  console.log("\nWaiting 10 seconds for AWS IAM role propagation...");
  await new Promise((r) => setTimeout(r, 10000));
  console.log("IAM Role setup complete!");
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
