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

  const names = [
    'Toolbar',
    'ToolbarContent',
    'ToolbarAction',
    'ToolbarBackAction',
  ];

  const filtered = imported.filter(nodePath =>
    names.includes(nodePath.node.imported.name)
  );

  filtered.remove();

  const newImport = j.importSpecifier(j.identifier('Appbar'));

  imported.at(0).insertBefore(newImport);

  const openingToolbars = ast.find(j.JSXOpeningElement, {
    type: 'JSXOpeningElement',
    name: {
      name: 'Toolbar',
    },
  });

  const closingToolbars = ast.find(j.JSXClosingElement, {
    type: 'JSXClosingElement',
    name: {
      name: 'Toolbar',
    },
  });

  openingToolbars.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar';
    return node;
  });

  closingToolbars.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar';
    return node;
  });

  const openingBackAction = ast.find(j.JSXOpeningElement, {
    type: 'JSXOpeningElement',
    name: {
      name: 'ToolbarBackAction',
    },
  });

  const closingBackAction = ast.find(j.JSXClosingElement, {
    type: 'JSXClosingElement',
    name: {
      name: 'ToolbarBackAction',
    },
  });

  openingBackAction.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.BackAction';
    return node;
  });

  closingBackAction.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.BackAction';
    return node;
  });

  const openingAction = ast.find(j.JSXOpeningElement, {
    type: 'JSXOpeningElement',
    name: {
      name: 'ToolbarAction',
    },
  });

  const closingAction = ast.find(j.JSXClosingElement, {
    type: 'JSXClosingElement',
    name: {
      name: 'ToolbarAction',
    },
  });

  openingAction.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.Action';
    return node;
  });

  closingAction.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.Action';
    return node;
  });

  const openingContent = ast.find(j.JSXOpeningElement, {
    type: 'JSXOpeningElement',
    name: {
      name: 'ToolbarContent',
    },
  });

  const closingContent = ast.find(j.JSXClosingElement, {
    type: 'JSXClosingElement',
    name: {
      name: 'ToolbarContent',
    },
  });

  openingContent.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.Content';
    return node;
  });

  closingContent.replaceWith(nodePath => {
    const { node } = nodePath;
    node.name.name = 'Appbar.Content';
    return node;
  });

  return ast;
};
