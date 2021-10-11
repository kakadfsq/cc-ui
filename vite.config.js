// eslint-disable-next-line @typescript-eslint/no-var-requires
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "./examples/"),
  resolve: {
    alias: {
      "@examples": path.resolve(__dirname, "examples/"),
      "@packages": path.resolve(__dirname, "packages/"),
      "@components": path.resolve(__dirname, "packages/components/"),
      "@styles": path.resolve(__dirname, "packages/styles/"),
      "@types": path.resolve(__dirname, "types/"),
    },
  },
  plugins: [vue()],
});
