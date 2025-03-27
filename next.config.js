const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smartbizapps.pl",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    domains: [
      "v0.blob.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "example.com",
      "static.payu.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
