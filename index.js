const noDirectIconImport = require("./rules/no-direct-icon-import.js");

module.exports = {
  rules: {
    "no-direct-icon-import": noDirectIconImport,
  },
  configs: {
    recommended: {
      plugins: ["styled-icons-imports"],
      rules: {
        "styled-icons-imports/no-direct-icon-import": "error",
      },
    },
  },
};
