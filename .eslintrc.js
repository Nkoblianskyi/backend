const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
  ].map(require.resolve),
  parserOptions: {
    project,
  },

  rules: {
    "@typescript-eslint/no-unsafe-call": "off",
    "react/function-component-definition": "off",
    "import/no-default-export": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": "warn",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enum",
        format: ["UPPER_CASE"],
      },
    ],
  },

  ignorePatterns: ["node_modules/", "dist/"],
};
