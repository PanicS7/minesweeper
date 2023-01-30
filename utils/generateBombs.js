// generate bomb id
function generateBombs(size, bombsCount) { 
  /** Generate array with bomb id (used to know where bombs are at board)
   * @param size       {Number} size of board
   * @param bombsCount {Number} number of bombs
   * @return           {Array}  sorted list of id
   */

  // add bombs
  const bombsIds = [];

  for(let i = 1; i <= bombsCount; i++) {
    // Chose random number between 1 and board size
    let randomId = Math.trunc(Math.random() * (size * size));
    // if id = 0, choose another
    if (randomId === 0) {
      i--;
      continue;
    }
    // check does bombsId already have this id, if exist repeat loop
    bombsIds.includes(randomId) ? i-- : bombsIds.push(randomId);
  }

  return bombsIds.sort((a,b) => a-b);
}

export default generateBombs;