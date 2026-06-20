import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/** `base` is overridable via the `POLYGLOSSR_BASE` env var for sub-path deploys (e.g. GitHub Pages at `/polyglossr/`). */
export default defineConfig({
  base: process.env["POLYGLOSSR_BASE"] ?? "/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
