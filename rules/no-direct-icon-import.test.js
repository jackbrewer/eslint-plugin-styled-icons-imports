import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import rule from "./no-direct-icon-import";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

describe("no-direct-icon-imports", () => {
  it("should enforce individual imports for icons", () => {
    ruleTester.run("no-direct-icon-imports", rule, {
      valid: [
        {
          code: `import { Check } from '@styled-icons/boxicons-regular/Check';`,
        },
        {
          code: `import { Label as LabelIcon } from '@styled-icons/boxicons-solid/Label';`,
        },
      ],
      invalid: [
        {
          code: `import { Check } from '@styled-icons/boxicons-regular';`,
          errors: [{ messageId: "noDirectIconImport" }],
          output: `import { Check } from '@styled-icons/boxicons-regular/Check';`,
        },
        {
          code: `import { Check, Label } from '@styled-icons/boxicons-regular';`,
          errors: [{ messageId: "noDirectIconImport" }],
          output: `import { Check } from '@styled-icons/boxicons-regular/Check';\nimport { Label } from '@styled-icons/boxicons-regular/Label';`,
        },
      ],
    });
  });
});
