const oldNames = ['CardCover', 'CardActions', 'CardContent'];

const allNames = [
  { oldName: 'CardCover', newName: 'Card.Cover' },
  { oldName: 'CardActions', newName: 'Card.Actions' },
  { oldName: 'CardContent', newName: 'Card.Content' },
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

  const cardImport = imported.filter(
    nodePath => nodePath.node.imported.name === 'Card'
  );

  if (filtered.length > 0 && cardImport.length === 0) {
    const newImport = j.importSpecifier(j.identifier('Card'));
    imported.at(0).insertBefore(newImport);
  } else if (filtered.length === 0) {
    return ast;
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
