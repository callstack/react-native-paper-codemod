const fs = require('fs');
const p = require('path');
const jscodeshift = require('jscodeshift');

const read = fileName =>
  fs.readFileSync(
    p.join(__dirname, global.baseDir, '__testfixtures__', fileName),
    'utf8'
  );

test('toolbarToAppbarTransform', () => {
  const source = read(`toolbarToAppbarTransform.js`);
  const output = read(`toolbarToAppbarTransform.output.js`);
  let transform = require(p.join(global.baseDir, 'toolbarToAppbarTransform'));

  if (transform.default) {
    transform = transform.default;
  }

  const ast = jscodeshift(source);
  const transformedAst = transform(ast, jscodeshift);

  expect(transformedAst.toSource().trim()).toEqual(output.trim());
});
