module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  globals: {
    drupalSettings: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "react/jsx-filename-extension": ["off"],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jest", "testing-library"],
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "import/extensions": ["error", "ignorePackages"],
    "no-underscore-dangle": ["off"],
    "no-use-before-define": ["error", "nofunc"],
    "import/prefer-default-export": ["off"],
  },
};
