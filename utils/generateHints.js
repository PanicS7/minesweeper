function generateHints(size, bombsId) {
  const gridSize = size * size;
  const hintsAndBombs = [];

  // fill hintsAndBombs with bombs and placeholder for hints
  for(let i = 1; i <= gridSize; i++) {
    if (bombsId.includes(i)) {
      hintsAndBombs.push("b");
    } else {
      hintsAndBombs.push("h");
    }
  }

  // find edge of board
  // find left side ids
  let leftSideId = [];
  for(let i = 1; i <= gridSize; i = i + size) {
    leftSideId.push(i);
  }

  // find right side ids
  let rightSideId = [];
  for(let i = size; i <= gridSize; i = i + size) {
    rightSideId.push(i);
  }

  // // find bottom side ids
  let bottomSideId = [];
  for(let i = size * size - size + 1; i <= gridSize; i++) {
    bottomSideId.push(i);
  }

  // find top side ids
  let topSideId = [];
  for(let i = 1; i <= size; i++) {
    topSideId.push(i);
  }

  let finishedHints = []; 
  hintsAndBombs.map((field, index) => {
    if(field === "b") {
      finishedHints.push("b");
      return;
    }

    let bombsCount = 0; // used to track bombs count around field
    const fieldId = index + 1;

    // check left side if not at edge already
    if (leftSideId.includes(fieldId) === false) {
      // check is bomb on left side
      if (hintsAndBombs[index - 1] === "b") {
        bombsCount++;
      }
    }
    // check right side if not at edge already
    if (rightSideId.includes(fieldId) === false) {
      // check is bomb on right side
      if (hintsAndBombs[index + 1] === "b") {
        bombsCount++;
      }
    }
    // check top side if not at edge already
    if (topSideId.includes(fieldId) === false) {
      // check is bomb on top side
      if (hintsAndBombs[index - size] === "b") {
        bombsCount++;
      }
    }
    // check bottom side if not at edge already
    if (bottomSideId.includes(fieldId) === false) {
      // check is bomb on bottom side
      if (hintsAndBombs[index + size] === "b") {
        bombsCount++;
      }
    }

    // check top-left side if not at edge already
    if ((topSideId.includes(fieldId) === false) && (leftSideId.includes(fieldId) === false)) {
      // check is bomb at top-left side
      if (hintsAndBombs[(index - 1) - size] === "b") {
        bombsCount++;
      }
    }
    // check top-right side if not at edge already
    if ((topSideId.includes(fieldId) === false) && (rightSideId.includes(fieldId) === false)) {
      // check is bomb at top-right side
      if (hintsAndBombs[(index + 1) - size] === "b") {
        bombsCount++;
      }
    }
    // check bottom-left side if not at edge already
    if ((bottomSideId.includes(fieldId) === false) && (leftSideId.includes(fieldId) === false)) {
      // check is bomb at bottom-left side
      if (hintsAndBombs[(index - 1) + size] === "b") {
        bombsCount++;
      }
    }
    // check bottom-right side if not at edge already
    if ((bottomSideId.includes(fieldId) === false) && (rightSideId.includes(fieldId) === false)) {
      // check is bomb at bottom-right side
      if (hintsAndBombs[(index + 1) + size] === "b") {
        bombsCount++;
      }
    }

    finishedHints.push(bombsCount);
  })

 return finishedHints;
}

export default generateHints;

