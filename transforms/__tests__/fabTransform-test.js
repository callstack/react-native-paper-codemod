const testHelper = require('../testHelper');

test('fab transform test', () => {
  const { expected, actual } = testHelper('fabTransform', 'fabTransform');
  expect(expected).toEqual(actual);
});

test('fab transform test2', () => {
  const { expected, actual } = testHelper('fabTransform', 'fabTransform2');
  expect(expected).toEqual(actual);
});
