const toolbarToAppbarTransform = require('./toolbarToAppbarTransform');

// eslint-disable-next-line
module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  let ast = j(file.source);
  ast = toolbarToAppbarTransform(ast, j);

  return ast.toSource();
};
