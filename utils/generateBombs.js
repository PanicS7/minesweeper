// generate bomb id
function generateBombs(size, bombsCount) { 
  // add bombs
  const bombsIds = [];

  for(let i = 1; i <= bombsCount; i++) {
    let randomId = (Math.random() * (size * size)).toFixed();
    // check does bombsId already have this id
    bombsIds.includes(randomId) ? i-- : bombsIds.push(randomId);
  }

  return bombsIds.sort();
}

export default generateBombs;