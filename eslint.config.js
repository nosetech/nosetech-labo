import js from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astroEslint from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        MediaQueryListEvent: "readonly",
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        MutationObserver: "readonly",
        ResizeObserver: "readonly",
        PointerEvent: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
    },
  },
  ...astroEslint.configs.recommended,
  {
    ignores: ["node_modules/**", "dist/**", ".astro/**"],
  },
];
