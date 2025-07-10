/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:course/certificate/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:course/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
