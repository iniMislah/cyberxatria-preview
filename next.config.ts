import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isStaticExport = isGitHubPages || process.env.STATIC_EXPORT === "true";
const basePath = isGitHubPages ? "/cyberxatria-preview" : "";

const nextConfig: NextConfig = {
  ...(isStaticExport && { output: "export" }),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "true" : "false",
  },
  ...(isGitHubPages && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
};

export default nextConfig;
