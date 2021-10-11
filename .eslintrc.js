module.exports = {
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: true, // 全局使用return
      impliedStrict: true, // 开启严格模式
      jsx: true, // 使用jsx
      tsx: true, // 使用tsx
    },
  },
  plugins: ["vue", "prettier"],
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
