const oldNames = ['FABGroup'];

const allNames = [{ oldName: 'FABGroup', newName: 'FAB.Group' }];

module.exports = function transform(ast, j) {
  const importPath = ast.find(j.ImportDeclaration, {
    type: 'ImportDeclaration',
    source: {
      type: 'Literal',
      value: 'react-native-paper',
    },
  });
  const imported = importPath.find(j.ImportSpecifier, {
    type: 'ImportSpecifier',
  });

  const filtered = imported.filter(nodePath =>
    oldNames.includes(nodePath.node.imported.name)
  );

  const fabImportsFiltered = imported.filter(
    nodePath => nodePath.node.imported.name === 'FAB'
  );

  const portalImportsFiltered = imported.filter(
    nodePath => nodePath.node.imported.name === 'Portal'
  );

  if (filtered.length === 0) {
    return ast;
  }

  if (fabImportsFiltered.length === 0) {
    const newImport = j.importSpecifier(j.identifier('FAB'));
    imported.at(0).insertBefore(newImport);
  }

  if (portalImportsFiltered.length === 0) {
    const newImport = j.importSpecifier(j.identifier('Portal'));
    imported.at(0).insertBefore(newImport);
  }

  filtered.remove();

  allNames.forEach(({ oldName, newName }) => {
    const openingTags = ast.find(j.JSXOpeningElement, {
      type: 'JSXOpeningElement',
      name: {
        name: oldName,
      },
    });

    const closingTags = ast.find(j.JSXClosingElement, {
      type: 'JSXClosingElement',
      name: {
        name: oldName,
      },
    });

    openingTags.replaceWith(nodePath => {
      const { node } = nodePath;
      node.name.name = newName;
      const fabNode = nodePath.parent;
      const parent = nodePath.parent.parent;
      if (parent.value.type === 'ReturnStatement') {
        const portal = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('Portal'), [], false),
          j.jsxClosingElement(j.jsxIdentifier('Portal'))
        );
        const paddedChildren = [
          j.jsxText('\n'),
          fabNode.value,
          j.jsxText('\n'),
        ];
        portal.children = paddedChildren;
        parent.value.argument = portal;
      } else {
        const portal = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('Portal'), [], false),
          j.jsxClosingElement(j.jsxIdentifier('Portal'))
        );
        const paddedChildren = [
          j.jsxText('\n'),
          fabNode.value,
          j.jsxText('\n'),
        ];
        portal.children = paddedChildren;
        parent.value.children.push(portal, j.jsxText('\n'));
        const filteredElementsToRemove = parent.value.children.filter(
          child =>
            child.openingElement &&
            child.openingElement.name &&
            child.openingElement.name.name !== 'FAB.Group'
        );
        const formatted = [];
        filteredElementsToRemove.forEach(element => {
          formatted.push(j.jsxText('\n'), element);
        });
        parent.value.children = [...formatted];
      }
      return node;
    });

    closingTags.replaceWith(nodePath => {
      const { node } = nodePath;
      node.name.name = newName;
      return node;
    });
  });

  return ast;
};
