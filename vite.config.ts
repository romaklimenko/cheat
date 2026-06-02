/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// Served from the root of the custom domain (letterpress.klimenko.dk),
// so the base path is "/".
export default defineConfig({
  base: "/",
  build: {
    target: "es2022",
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
