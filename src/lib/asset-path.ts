/**
 * Reusable helper for public asset paths.
 * Resolves correctly on:
 * - Localhost / standard root deployments: `/images/...`
 * - GitHub Pages subpath deployments: `/cyberxatria-preview/images/...`
 */
export function publicAsset(path: string): string {
  if (!path) return path;

  // Preserve external URLs and inline data URIs
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Normalize leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Avoid duplicate prefix if already present
  if (basePath && normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
