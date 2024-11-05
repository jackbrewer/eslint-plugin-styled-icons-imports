# eslint-plugin-styled-icons-imports

This ESLint plugin enforces individual icon imports from `@styled-icons` packages.

## What it does

Splits imports into standalone imports, and ensures each icon is imported individually.

```javascript
// Incorrect usage
import { Check, Label as LabelIcon } from "@styled-icons/boxicons-regular";

// Correct usage
import { Check } from "@styled-icons/boxicons-regular/Check";
import { Label as LabelIcon } from "@styled-icons/boxicons-regular/Label";
```

## Installation

To use this plugin, you’ll need to have `eslint` and this plugin installed in your project.

```bash
npm install eslint-plugin-styled-icons-imports --save-dev
```

## Usage

### **Add the plugin to your ESLint configuration:**

To use the recommended error status, add the plugin’s recommended setup to your ESLint `extends`:

```javascript
// .eslintrc.js
module.exports = {
  extends: ["plugin:styled-icons-imports/recommended"],
};
```

To use warnings instead of errors, you can tweak the rule manually:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ["styled-icons-imports"],
  rules: {
    "styled-icons-imports/no-direct-icon-imports": "warn",
  },
};
```

## Testing the plugin

This plugin includes unit tests to verify its functionality. The tests use vitest, with eslint’s RuleTester for ESLint rule-specific testing.

```bash
npm install
npm run test
```
