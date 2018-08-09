const testHelper = require('../testHelper');

test('radioButtonGroup transform test 1', () => {
  const { expected, actual } = testHelper(
    'radioButtonGroupTransform',
    'radioButtonGroupTransform'
  );
  expect(expected).toEqual(actual);
});
