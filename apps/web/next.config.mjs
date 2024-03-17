/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
