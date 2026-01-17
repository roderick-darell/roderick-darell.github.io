import { defineConfig } from "vite";
import layoutPlugin from "./plugins/vite.layout-plugin.js";
import metadataPlugin from "./plugins/vite.metadata-plugin.js";
import projectsPlugin from "./plugins/vite.projects-plugin.js";
import linksPlugin from "./plugins/vite.links-plugin.js";
// import galleryPlugin from "./plugins/vite.gallery-plugin.js"; // Disabled: galleries removed
// import pagesPlugin from "./plugins/vite.pages-plugin.js"; // Optional: disable if not needed

export default defineConfig({
  // GitHub Pages (root repo: roderick-darell.github.io)
  base: "/",

  // Static site configuration
  root: ".",
  publicDir: "public",

  // Development server options
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // Build options
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

    // IMPORTANT: build ONLY index.html
    rollupOptions: {
      input: {
        index: "index.html"
      },
      output: {
        manualChunks: undefined,
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js"
      }
    }
  },

  // CSS preprocessing
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    },
    devSourcemap: true,
    postcss: { plugins: [] }
  },

  // Asset handling
  assetsInclude: ["**/*.webp", "**/*.jpg", "**/*.png", "**/*.svg"],

  // Plugins
  plugins: [
    layoutPlugin(),
    metadataPlugin(),
    projectsPlugin(),
    linksPlugin()

    // Disabled because you removed Galleries + their pages:
    // galleryPlugin(),
    // pagesPlugin(),
  ],

  // Optimize dependencies
  optimizeDeps: {
    include: [],
    force: false
  }
});
