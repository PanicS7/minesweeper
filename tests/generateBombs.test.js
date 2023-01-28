import generateBombs from "../utils/generateBombs"

test('generateBomb create array of correct size', () => {
  expect(generateBombs(8,10)).toHaveLength(10);
});

test('generateBomb does not include duplicated numbers', () => {
  let bombsId = generateBombs(8,10);
  // create copy of array with unicated values (removes duplicated)
  let unicate = [...new Set(bombsId)];
  // if this 2 are same test pass
  expect(bombsId.length).toBe(unicate.length);
});