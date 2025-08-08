import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
const config = {
  mode: "development",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    cssMinify: false,
    terserOptions: { compress: false, mangle: false },
  },
  define: { "process.env.NODE_ENV": "'development'" },
  esbuild: { jsx: "automatic", jsxImportSource: "react" },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "./assets/*", dest: "assets" },
        {
          src: "./public/assets/{*,}",
          dest: path.join("dist", "public/assets"),
        },
        { src: "./assets/*", dest: path.join("dist", "assets") },
      ],
      silent: true,
    }),
  ],
  resolve: {},
};
export default defineConfig(config);
