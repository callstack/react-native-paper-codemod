const testHelper = require('../testHelper');

test('toolbar to appbar transform test 1', () => {
  const { expected, actual } = testHelper('dialogTransform', 'dialogTransform');
  expect(expected).toEqual(actual);
});

test('toolbar to appbar transform test 2', () => {
  const { expected, actual } = testHelper(
    'dialogTransform',
    'dialogTransform2'
  );
  expect(expected).toEqual(actual);
});
