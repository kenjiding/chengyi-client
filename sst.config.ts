// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
import loadEnvToObject from './scripts/loadEnv';

export default $config({
  app(input) {
    return {
      name: "chengyi-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "eu-central-1",
        },
      },
    };
  },
  async run() {
    const environments = loadEnvToObject();
    new sst.aws.Nextjs("chengyi-website", {
      domain: {
        name: "www.chengyiauto.com",
        dns: false,
        cert: "arn:aws:acm:us-east-1:241533142437:certificate/56353f71-e326-42e0-90c8-0626dc9d5901"
      },
      environment: {
        ...environments
      },
      permissions: [
        {
          effect: "allow",
          actions: [
            "ec2:CreateNetworkInterface",
            "ec2:DescribeNetworkInterfaces",
            "ec2:DeleteNetworkInterface",
            "ec2:AssignPrivateIpAddresses",
            "ec2:UnassignPrivateIpAddresses"
          ],
          resources: ["*"]
        }
      ]
    });
  },
});
