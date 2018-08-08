const allNames = [{ oldName: 'DrawerItem', newName: 'DrawerSection.Item' }];

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

  const drawerSectionImport = imported.filter(
    nodePath => nodePath.node.imported.name === 'DrawerSection'
  );

  const drawerItemImport = imported.filter(
    nodePath => nodePath.node.imported.name === 'DrawerItem'
  );

  if (drawerSectionImport.length === 0 && drawerItemImport.length > 0) {
    const newImport = j.importSpecifier(j.identifier('DrawerSection'));
    drawerItemImport.at(0).insertBefore(newImport);
    drawerItemImport.remove();
  } else if (drawerItemImport.length > 0) {
    drawerItemImport.remove();
  } else if (
    drawerSectionImport.length === 0 &&
    drawerItemImport.length === 0
  ) {
    return ast;
  }

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
      const colorProps = node.attributes.filter(
        ({ name }) => name && name.name === 'color'
      );
      const colorProp = colorProps.length === 1 ? colorProps[0] : null;

      const themeProps = node.attributes.filter(
        ({ name }) => name && name.name === 'theme'
      );
      const themeProp = themeProps.length === 1 ? themeProps[0] : null;

      let shouldRemoveColorProp = false;

      if (themeProp) {
        if (themeProp.value.type === 'JSXExpressionContainer') {
          if (themeProp.value.expression.type === 'ObjectExpression') {
            const colorsPropsInsideTheme = themeProp.value.expression.properties.filter(
              ({ key }) => key.name === 'colors'
            );
            if (colorsPropsInsideTheme.length === 0) {
              const expression = colorProp.value.expression;

              const innerObjectProperty = j.objectProperty(
                j.identifier('primary'),
                expression
              );
              const innerObjectExpression = j.objectExpression([
                innerObjectProperty,
              ]);
              const colorProperty = j.objectProperty(
                j.identifier('colors'),
                innerObjectExpression
              );
              themeProp.value.expression.properties.push(colorProperty);
              shouldRemoveColorProp = true;
            } else if (colorsPropsInsideTheme.length === 1) {
              if (colorsPropsInsideTheme[0].value.type === 'ObjectExpression') {
                const primaryProps = colorsPropsInsideTheme[0].value.properties.filter(
                  ({ key }) => key.name === 'primary'
                );
                if (primaryProps.length === 0) {
                  const expression = colorProp.value.expression;

                  const primaryProperty = j.objectProperty(
                    j.identifier('primary'),
                    expression
                  );
                  colorsPropsInsideTheme[0].value.properties.push(
                    primaryProperty
                  );
                  shouldRemoveColorProp = true;
                }
              }
            }
          }
        }
      } else {
        colorProp.name.name = 'theme';
        const expression = colorProp.value.expression;

        const innerObjectProperty = j.objectProperty(
          j.identifier('primary'),
          expression
        );
        const innerObjectExpression = j.objectExpression([innerObjectProperty]);
        const colorProperty = j.objectProperty(
          j.identifier('colors'),
          innerObjectExpression
        );
        const objectExpression = j.objectExpression([colorProperty]);
        const jsxContainer = j.jsxExpressionContainer(objectExpression);

        colorProp.value = jsxContainer;
      }

      if (shouldRemoveColorProp) {
        const notColorProps = node.attributes.filter(
          ({ name }) => !(name && name.name === 'color')
        );
        node.attributes = notColorProps;
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
