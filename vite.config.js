import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { dependencies } from "./package.json";

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('wc-')
      }
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // separate vendor deps by chunks (not one big chunk that is used by default)
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
