/** @type {import('next').NextConfig} */
const nextConfig = {
 experimental: {
  serverActions: {
   allowedOrigins: ["http://localhost:3000/*"],
  },
 },

 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "*.r2.cloudflarestorage.com",
    port: "",
    pathname: "**",
   },
   {
    protocol: "https",
    hostname: "*.cloudflarestorage.com",
    port: "",
    pathname: "**",
   },
  ],
 },
};

export default nextConfig;
