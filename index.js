const noMultiIconImports = require("./rules/no-multi-icon-imports.cjs");

module.exports = {
  rules: {
    "no-multi-icon-imports": noMultiIconImports,
  },
  configs: {
    recommended: {
      plugins: ["boxicon-imports"],
      rules: {
        "boxicon-imports/no-multi-icon-imports": "error",
      },
    },
  },
};
