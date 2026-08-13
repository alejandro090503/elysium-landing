import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para que el link corto (sin .html) también sirva el catálogo con sus meta tags.
  async rewrites() {
    return [{ source: "/catalogo", destination: "/catalogo.html" }];
  },
};

export default nextConfig;
