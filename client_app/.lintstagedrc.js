module.exports = {
  "*.{js,jsx}": [
    "yarn test:staged",
    "eslint --fix",
    "prettier --write --ignore-unknown",
  ],
  "!(*.js|*.jsx)": "prettier --write --ignore-unknown",
  "../../../../**/*.php": "php -l",
};
