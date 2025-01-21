// eslint.config.js
module.exports = [
  {
    files: ["*.js", "src/**/*.js"], // Define which files ESLint should lint
    rules: {
      "no-console": "warn",
      semi: ["error", "always"],
    },
  },
];
