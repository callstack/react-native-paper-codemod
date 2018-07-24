const testHelper = require('../testHelper');

test('toolbar to appbar transform test', () => {
  const { expected, actual } = testHelper(
    'toolbarToAppbarTransform',
    'toolbarToAppbarTransform'
  );
  expect(expected).toEqual(actual);
});
