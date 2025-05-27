import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript"
    ],
    rules: {
      // Image element optimization is not compatible with output: 'export'
      '@next/next/no-img-element': 'off'
    }
  })
];

export default eslintConfig;
