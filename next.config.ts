import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"upload.wikimedia.org",
      pathname:"/**"
    },{
      protocol:"https",
      hostname:"cdn.dummyjson.com",
      pathname:"/**"
    }
  ]
  }
};

export default nextConfig;
