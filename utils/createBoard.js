// used to create elements for grid
function createBoard(size, bombsCount) {
  // select game board
  const gameBoardElem = document.getElementById("gameBoard");
  // get gridBoard width (height is same), substract size to fix gap problem
  const boardSize = gameBoardElem.clientWidth - size;

  // calculate width and height for each div
  const divSize = boardSize / size;

  // create Field
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      let divElem = document.createElement("div");
      // add div style
      divElem.className = "fieldStyle";
      divElem.style.width = divSize + "px";
      divElem.style.height = divSize + "px";

      // append to container
      gameBoardElem.append(divElem);

      // add click event
      divElem.addEventListener("click", () => {
        console.log("clicked");
      });
    }
  }
}

export default createBoard;
