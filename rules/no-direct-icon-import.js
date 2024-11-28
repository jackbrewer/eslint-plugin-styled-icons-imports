module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure icons are imported individually from @styled-icons",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
    messages: {
      noDirectIconImport:
        "Do not import icons directly from '{{ packageName }}'. Import them individually instead.",
    },
    fixable: "code",
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // Check if the import is from @styled-icons and only has a base package path
        if (
          importSource.startsWith("@styled-icons/") &&
          importSource !== "@styled-icons/styled-icon" && // Exclude core imports
          importSource.split("/").length === 2 && // base package only, no icon subpath
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
                  const iconName = specifier.imported.name;
                  const localName = specifier.local.name;
                  const correctedSource = `${importSource}/${iconName}`;

                  // Handle aliases correctly if the imported and local names differ
                  return localName === iconName
                    ? `import { ${iconName} } from '${correctedSource}';`
                    : `import { ${iconName} as ${localName} } from '${correctedSource}';`;
                })
                .join("\n");

              return fixer.replaceText(node, individualImports);
            },
          });
        }
      },
    };
  },
};
