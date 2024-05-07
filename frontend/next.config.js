/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: ["localhost"],
   },
   env: {
      HOST_URL: process.env.HOST_URL,
   },
};

module.exports = nextConfig;
