const testHelper = require('../testHelper');

test('fab transform test', () => {
  const { expected, actual } = testHelper('fabTransform', 'fabTransform');
  expect(expected).toEqual(actual);
});
