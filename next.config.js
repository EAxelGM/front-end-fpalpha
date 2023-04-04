/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "export",
  distDir: "dist",
  trailingSlash: true,
};

module.exports = nextConfig;
