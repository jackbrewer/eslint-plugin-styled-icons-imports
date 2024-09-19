import noMultiIconImports from "./rules/no-multi-icon-imports.js";

export const rules = {
  "no-multi-icon-imports": noMultiIconImports,
};

export const configs = {
  recommended: {
    plugins: ["boxicon-imports"],
    rules: {
      "boxicon-imports/no-multi-icon-imports": "error",
    },
  },
};
