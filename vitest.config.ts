import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "app"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["tests/e2e/**", "tests/a11y/**", "tests/seo/**"],
    css: true,
    restoreMocks: true,
  },
});
