import generateBombs from "./generateBombs.js";
import generateHints from "./generateHints.js";

// used to create elements for grid, and store bomb placements
function createBoard(size, bombsCount, difficulty) {
  // generate bombs id
  const bombsId = generateBombs(size, bombsCount);

  // generate hints
  const hintsAndBombs = generateHints(size, bombsId);

  // select game board
  const gameBoardElem = document.getElementById("gameBoard");
  // get gridBoard width (height is same), substract size to fix gap problem
  const boardSize = gameBoardElem.clientWidth - size;

  // calculate width and height for each div
  const divSize = boardSize / size;

  // counter is used for unicate id for div elements
  let counter = 1;

  // opened hints - used to track end of game (if user open every hind and only bombs left - game ends)
  let openedHintsCount = size * size - bombsCount;

  // end modal elem
  const endModal = document.getElementById("endModal");
  const gameEndMsg = document.getElementById("gameEndMsg");
  // end modal play btn
  const modalBtnPlay = document.getElementById("modalBtnPlay");

  // game container 
  const gameContainer = document.getElementById("gameContainer"); 

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

      // add click event (show bomb and hints)
      divElem.addEventListener("click", handleClick);

      // add right click event (show flag)
      divElem.addEventListener("contextmenu", () => {
        console.log(event.target)
        event.preventDefault();
        // take just number from id
        var divId = divElem.id.match(/\d/g);
        divId = divId.join("");

        divElem.innerHTML = "<i class='fa-solid fa-flag'></i>";
      })      
    }
  }

  // show modal logic
  function hideGameBoard(gameContainer, endModal, modalBtnPlay) {
    // show end modal and add styles
    endModal.className = "show";
    // hide game board
    gameContainer.className = "hide";

    // add some data if user wish to play again at same difficulty
    modalBtnPlay.dataset.difficulty = difficulty;
  }

  function handleClick() {
      // take just number from id
      var divId = event.target.id.match(/\d/g);
      divId = divId.join("");

      // if bomb is at clicked field show bomb icon
      if (hintsAndBombs[divId - 1] === "b") {
        event.target.innerHTML = "<i class='fa-solid fa-bomb'></i>";
        event.target.className = "fail";

        // game end logic
        // hide game board and show modal
        gameEndMsg.innerText = "GAME OVER!";
        setTimeout(hideGameBoard, 500, gameContainer, endModal, modalBtnPlay);
      } else {
        // if not show hint for this field
        event.target.innerText = hintsAndBombs[divId - 1];

        // disable event listener for this elem
        event.target.removeEventListener("click", handleClick);

        // track opened field, if user open every field and don't click at bomb game ends
        openedHintsCount--;

        if (openedHintsCount <= 0) {
          console.log("game end")
          // game end logic
          // hide game board and show modal
          gameEndMsg.innerText = "YOU WON!";
          setTimeout(hideGameBoard, 500, gameContainer, endModal, gameEndMsg, modalBtnPlay);
        }
    }
  }

}

export default createBoard;
