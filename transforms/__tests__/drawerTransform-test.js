const testHelper = require('../testHelper');

test('drawer transform test', () => {
  const { expected, actual } = testHelper('drawerTransform', 'drawerTransform');
  expect(expected).toEqual(actual);
});

test('drawer transform test2', () => {
  const { expected, actual } = testHelper(
    'drawerTransform',
    'drawerTransform2'
  );
  expect(expected).toEqual(actual);
});

test('drawer transform test3', () => {
  const { expected, actual } = testHelper(
    'drawerTransform',
    'drawerTransform3'
  );
  expect(expected).toEqual(actual);
});
