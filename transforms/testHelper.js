const fs = require('fs');
const p = require('path');
const jscodeshift = require('jscodeshift');
const flowParser = require('flow-parser');

const read = fileName =>
  fs.readFileSync(
    p.join(
      __dirname,
      global.baseDir,
      'transforms',
      '__testfixtures__',
      fileName
    ),
    'utf8'
  );

module.exports = (transformName, testFileName) => {
  const source = read(`${testFileName}.input.js`);
  const output = read(`${testFileName}.output.js`);
  let transform = require(p.join('../', 'transforms', transformName));

  if (transform.default) {
    transform = transform.default;
  }

  const ast = jscodeshift(source, { parser: flowParser });
  const transformedAst = transform(ast, jscodeshift);

  return {
    expected: output.trim(),
    actual: transformedAst.toSource().trim(),
  };
};
