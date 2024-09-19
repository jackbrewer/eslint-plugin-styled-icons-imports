export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure icons are imported individually from @styled-icons",
      category: "Best Practices",
    },
    schema: [], // no options
    messages: {
      noMultiIconImport:
        "Do not import multiple icons from '{{ packageName }}'. Import them individually instead.",
    },
    fixable: "code", // This marks the rule as fixable
  },
  create(context) {
    const allowedPackages = [
      "@styled-icons/boxicons-regular",
      "@styled-icons/boxicons-logos",
      "@styled-icons/boxicons-solid",
    ];

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (
          allowedPackages.includes(importSource) &&
          node.specifiers.length > 1
        ) {
          context.report({
            node,
            messageId: "noMultiIconImport",
            data: {
              packageName: importSource,
            },
            fix(fixer) {
              const individualImports = node.specifiers
                .map((specifier) => {
                  return `import { ${specifier.local.name} } from '${importSource}/${specifier.local.name}';`;
                })
                .join("\n");

              // Replace the full import statement with individual imports
              return fixer.replaceText(node, individualImports);
            },
          });
        }
      },
    };
  },
};
