import type { NextConfig } from "next";

// Em produção (GitHub Pages), o site fica em
// https://<usuário>.github.io/<repositório>/ — então precisa de um basePath.
// O workflow do GitHub Actions define NEXT_BASE_PATH com o nome do
// repositório antes de rodar o build. Em desenvolvimento local fica vazio.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
