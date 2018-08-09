const testHelper = require('../testHelper');

test('list transform test 1', () => {
  const { expected, actual } = testHelper('listTransform', 'listTransform');
  expect(expected).toEqual(actual);
});

test('list transform test 2', () => {
  const { expected, actual } = testHelper('listTransform', 'listTransform2');
  expect(expected).toEqual(actual);
});

test('list transform test 3', () => {
  const { expected, actual } = testHelper('listTransform', 'listTransform3');
  expect(expected).toEqual(actual);
});
