
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export async function getAWSSecretData() {
  const secret_name = "prod/database/info";

  const client = new SecretsManagerClient({
    region: "eu-central-1",
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    throw error;
  }

  return JSON.parse(response.SecretString || '');
}
export const JWT_SECRET = process.env.JWT_SECRET || 'chengyi-server-key';
