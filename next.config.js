/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  experimental: {
    appDir: true,
  }, 
  images: {
    domains: ['juicebox.money','jbx.mypinata.cloud'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
