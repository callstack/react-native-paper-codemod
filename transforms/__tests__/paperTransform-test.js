const testHelper = require('../testHelper');

test('paper transform test 1', () => {
  const { expected, actual } = testHelper('paperTransform', 'paperTransform');
  expect(expected).toEqual(actual);
});
