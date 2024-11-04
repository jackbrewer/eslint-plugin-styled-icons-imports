module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure icons are imported individually from @styled-icons",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
    messages: {
      noDirectIconImport:
        "Do not import icons directly from '{{ packageName }}'. Import them individually instead.",
    },
    fixable: "code", // This marks the rule as fixable
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // Check if the import is from any @styled-icons package
        if (
          importSource.startsWith("@styled-icons/") &&
          node.specifiers.length > 0
        ) {
          context.report({
            node,
            messageId: "noDirectIconImport",
            data: {
              packageName: importSource,
            },
            fix(fixer) {
              // Generate individual import statements for each specifier
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
