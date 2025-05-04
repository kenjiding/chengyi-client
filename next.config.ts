const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chengyi-upload-files.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);