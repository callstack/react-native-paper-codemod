const toolbarToAppbarTransform = require('./toolbarToAppbarTransform');
const dialogTranform = require('./dialogTransform');
const drawerTransform = require('./drawerTransform');
const cardTransform = require('./cardTransform');
const listTransform = require('./listTransform');
const paperTransform = require('./paperTransform');

const transforms = [
  toolbarToAppbarTransform,
  dialogTranform,
  drawerTransform,
  cardTransform,
  listTransform,
  paperTransform,
];

// eslint-disable-next-line
module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  let ast = j(file.source);
  transforms.forEach(transform => {
    ast = transform(ast, j);
  });

  return ast.toSource();
};
