module.exports = {
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: true, // 全局使用return
      impliedStrict: true, // 开启严格模式
      jsx: true, // 使用jsx
      tsx: true, // 使用tsx
    },
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        trailingComma: "all",
        singleQuote: false,
        printWidth: 120,
        tabWidth: 2,
        endOfLine: "auto",
      },
    ],
  },
};
