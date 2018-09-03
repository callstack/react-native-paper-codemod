const testHelper = require('../testHelper');

test('searchbar transform test', () => {
  const { expected, actual } = testHelper(
    'searchbarTransform',
    'searchbarTransform'
  );
  expect(expected).toEqual(actual);
});
