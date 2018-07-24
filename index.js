const toolbarToAppbarTransform = require('./transforms/toolbarToAppbarTransform');

module.exports = function transform(file, api) {
  const j = api.jscodeshift;

  let ast = j(file.source);
  ast = toolbarToAppbarTransform(ast);

  return ast.toSource();
};
