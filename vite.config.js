import { defineConfig } from "vite";
import layoutPlugin from "./plugins/vite.layout-plugin.js";
import metadataPlugin from "./plugins/vite.metadata-plugin.js";
import projectsPlugin from "./plugins/vite.projects-plugin.js";
import linksPlugin from "./plugins/vite.links-plugin.js";
import pagesPlugin from "./plugins/vite.pages-plugin.js";
import experiencesPlugin from "./plugins/vite.experiences-plugin.js";

export default defineConfig({
  base: "/",

  root: ".",
  publicDir: "public",

  server: {
    port: 3000,
    open: true,
    host: true
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"]
      },
      format: { comments: false }
    },
    cssMinify: true,
    cssCodeSplit: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,

    // ⚠️ BUILD UNIQUEMENT index.html
    rollupOptions: {
      input: {
        index: "index.html"
      }
    }
  },

  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    },
    devSourcemap: true
  },

  assetsInclude: ["**/*.webp", "**/*.jpg", "**/*.png", "**/*.svg"],

 plugins: [
  layoutPlugin(),
  metadataPlugin(),
  projectsPlugin(),
  linksPlugin(),
  experiencesPlugin(),
  pagesPlugin()
]

});
