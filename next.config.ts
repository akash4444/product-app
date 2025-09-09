import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: ["cdn.dummyjson.com"],
    remotePatterns:[{
      protocol:"https",
      hostname:"upload.wikimedia.org",
      pathname:"/**"
    }]
  }
};

export default nextConfig;
