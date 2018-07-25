const toolbarToAppbarTransform = require('./toolbarToAppbarTransform');

const cardTransform = require('./cardTransform');

// eslint-disable-next-line
module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  let ast = j(file.source);
  ast = toolbarToAppbarTransform(ast, j);

  ast = cardTransform(ast, j);

  return ast.toSource();
};
