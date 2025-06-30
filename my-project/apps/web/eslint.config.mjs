import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    rules: {
      // ✅ TypeScript + React-safe defaults
      "@typescript-eslint/no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/display-name": "off",             // Useful for anonymous components in Next.js
      "react/jsx-key": "off",                  // Common false positives in mapped JSX
      "react/no-unescaped-entities": "off",    // Annoying for simple punctuation like apostrophes
      "react/jsx-no-undef": "off",             // TS already handles this
    },
  },
]);
