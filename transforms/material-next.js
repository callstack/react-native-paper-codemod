const toolbarToAppbarTransform = require('./toolbarToAppbarTransform');
const dialogTranform = require('./dialogTransform');
const drawerTransform = require('./drawerTransform');
const cardTransform = require('./cardTransform');
const listTransform = require('./listTransform');
const paperTransform = require('./paperTransform');
const radioButtonGroupTransform = require('./radioButtonGroupTransform');
const searchbarTransform = require('./searchbarTransform');

const transforms = [
  toolbarToAppbarTransform,
  dialogTranform,
  cardTransform,
  listTransform,
  paperTransform,
  radioButtonGroupTransform,
  searchbarTransform,
  drawerTransform,
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
