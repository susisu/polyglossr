import { config } from "@susisu/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default config(
  {
    tsconfigRootDir: import.meta.dirname,
  },
  {
    ignores: ["**/dist/**", "**/node_modules/**", "data/*.generated.json"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2024,
      },
    },
  },
  {
    // Root config files and the Node-side data-generation scripts run on Node.
    files: ["*.{js,ts}", "scripts/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    ...reactHooks.configs.flat.recommended,
  },
  {
    // Layer order, low to high: shared -> data -> (engine, stats) -> ui.
    // A layer may only import lower layers. The rules below check this per layer.
    //
    // shared is the lowest layer; it may import nothing above itself.
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/data/**", "**/engine/**", "**/stats/**", "**/ui/**"],
              message: "shared/ is the lowest layer. Import only other shared modules.",
            },
          ],
        },
      ],
    },
  },
  {
    // data may import only shared.
    files: ["src/data/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/engine/**", "**/stats/**", "**/ui/**"],
              message: "data/ may import only shared.",
            },
          ],
        },
      ],
    },
  },
  {
    // engine sits on data/shared. It must not import stats or ui.
    files: ["src/engine/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/stats/**", "**/ui/**"],
              message: "engine/ must not import stats/ or ui/.",
            },
          ],
        },
      ],
    },
  },
  {
    // stats sits on engine/data/shared. It must not import ui.
    files: ["src/stats/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/ui/**"],
              message: "stats/ must not import ui/.",
            },
          ],
        },
      ],
    },
  },
);
