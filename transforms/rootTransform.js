const toolbarToAppbarTransform = require('./toolbarToAppbarTransform');
const dialogTranform = require('./dialogTransform');

// eslint-disable-next-line
module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  let ast = j(file.source);
  ast = toolbarToAppbarTransform(ast, j);
  ast = dialogTranform(ast, j);

  return ast.toSource();
};
