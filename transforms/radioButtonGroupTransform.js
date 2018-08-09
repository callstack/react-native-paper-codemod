const oldNames = ['RadioButtonGroup'];

const allNames = [
  { oldName: 'RadioButtonGroup', newName: 'RadioButton.Group' },
];

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

  const radioButtonImportsFiltered = imported.filter(
    nodePath => nodePath.node.imported.name === 'RadioButton'
  );

  if (filtered.length === 0) {
    return ast;
  }

  if (radioButtonImportsFiltered.length === 0) {
    const newImport = j.importSpecifier(j.identifier('RadioButton'));
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
