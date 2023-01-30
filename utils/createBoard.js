import generateBombs from "./generateBombs.js";
import generateHints from "./generateHints.js";

// used to create elements for grid, and store bomb placements
function createBoard(size, bombsCount) {
  // generate bombs id
  const bombsId = generateBombs(size, bombsCount);
  console.log(bombsId);

  // generate hints
  const hintsAndBombs = generateHints(size, bombsId);
  console.log(hintsAndBombs);

  // select game board
  const gameBoardElem = document.getElementById("gameBoard");
  // get gridBoard width (height is same), substract size to fix gap problem
  const boardSize = gameBoardElem.clientWidth - size;

  // calculate width and height for each div
  const divSize = boardSize / size;

  // counter is used for unicate id for div elements
  let counter = 1;

  // create Field
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      let divElem = document.createElement("div");
      // add div style
      divElem.className = "fieldStyle";
      divElem.style.width = divSize + "px";
      divElem.style.height = divSize + "px";

      // add id to div
      divElem.id = `field${counter}`;

      // append to container
      gameBoardElem.append(divElem);

      // increase counter
      counter++;

      // add click event
      divElem.addEventListener("click", () => {
        // take just number from id
        var divId = divElem.id.match(/\d/g);
        divId = divId.join("");

        // if bomb is at clicked field show bomb icon
        if (hintsAndBombs[divId - 1] === "b") {
          divElem.innerHTML = "<i class='fa-solid fa-bomb'></i>";
          divElem.className = "fail";

          // game end logic
        } else {
          // if not show hint for this field
          divElem.innerText = hintsAndBombs[divId - 1];
        }
      });
    }
  }

  

}

export default createBoard;
