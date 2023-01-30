import generateHints from "../utils/generateHints"

test('generateHints - return array of right size', () => {
  let testArr = [2,10,23,24,32,41,43,47,52,64];
  expect(generateHints(8, testArr)).toHaveLength(64);
});

test('generateHints - return right amount of bombs', () => {
  let testArr = [2,10,23,24,32,41,43,47,52,64];
  let result = generateHints(8, testArr);
  let countOfBombs = 0;
  result.forEach(data => {
    if (data === "b") {
      countOfBombs++;
    }
  })

  expect(countOfBombs).toBe(10);
});