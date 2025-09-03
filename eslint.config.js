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
