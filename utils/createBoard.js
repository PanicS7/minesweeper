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
        event.preventDefault();
        // if elem is not already right clicked
        if (event.target.id) {
          // take just number from id
          var divId = event.target.id.match(/\d/g);
          divId = divId.join("");
  
          event.target.innerHTML = "<i class='fa-solid fa-flag'></i>";
        } else {
          // toggle flag
          event.target.parentNode.innerHTML = "";
        }
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

  // Helper function to get neighboring field IDs
  function getNeighborIds(fieldId) {
    const neighbors = [];
    const sizeSquared = size * size;
    
    // Check all 8 directions
    const directions = [
      -1, // left
      1,  // right
      -size, // top
      size,  // bottom
      -size - 1, // top-left
      -size + 1, // top-right
      size - 1,  // bottom-left
      size + 1   // bottom-right
    ];
    
    const row = Math.ceil(fieldId / size);
    const col = fieldId % size === 0 ? size : fieldId % size;
    
    directions.forEach(direction => {
      const neighborId = fieldId + direction;
      
      // Check if neighbor is valid (within bounds)
      if (neighborId >= 1 && neighborId <= sizeSquared) {
        const neighborRow = Math.ceil(neighborId / size);
        const neighborCol = neighborId % size === 0 ? size : neighborId % size;
        
        // Check if neighbor is adjacent (within one row/column)
        if (Math.abs(neighborRow - row) <= 1 && Math.abs(neighborCol - col) <= 1) {
          neighbors.push(neighborId);
        }
      }
    });
    
    return neighbors;
  }

  // Function to recursively reveal empty fields
  function revealEmptyFields(fieldId) {
    const divElem = document.getElementById(`field${fieldId}`);
    
    // If already revealed or is a bomb, return
    if (!divElem || divElem.style.backgroundColor === '#e0e0e0' || hintsAndBombs[fieldId - 1] === "b") {
      return;
    }
    
    // Mark as revealed by changing background
    divElem.style.backgroundColor = '#e0e0e0';
    divElem.style.border = '1px solid #7b7b7b';
    
    // Remove click event listener
    divElem.removeEventListener("click", handleClick);
    
    // Get the hint value for this field
    const hintValue = hintsAndBombs[fieldId - 1];
    
    // Decrease opened hints count
    openedHintsCount--;
    
    // If it's 0 (empty), show nothing and reveal neighbors
    if (hintValue === 0) {
      divElem.innerText = '';
      
      // Get all neighbors and reveal them recursively
      const neighbors = getNeighborIds(fieldId);
      neighbors.forEach(neighborId => {
        revealEmptyFields(neighborId);
      });
    } else {
      // If it's a number (1-8), show it
      divElem.innerText = hintValue;
    }
    
    // Check if game is won
    if (openedHintsCount <= 0) {
      console.log("game end");
      // game end logic
      // hide game board and show modal
      gameEndMsg.innerText = "YOU WON!";
      setTimeout(hideGameBoard, 500, gameContainer, endModal, modalBtnPlay);
    }
  }

  function handleClick() {
      // take just number from id
      var divId = event.target.id.match(/\d/g);
      divId = divId.join("");

      // Check if field has flag
      if (event.target.innerHTML.includes('fa-flag')) {
        return; // Don't reveal flagged fields
      }

      // if bomb is at clicked field show bomb icon
      if (hintsAndBombs[divId - 1] === "b") {
        event.target.innerHTML = "<i class='fa-solid fa-bomb'></i>";
        event.target.className = "fail";

        // game end logic
        // hide game board and show modal
        gameEndMsg.innerText = "GAME OVER!";
        setTimeout(hideGameBoard, 500, gameContainer, endModal, modalBtnPlay);
      } else {
        // Reveal the field (this will handle 0s recursively)
        revealEmptyFields(parseInt(divId));
      }
  }

}

export default createBoard;
