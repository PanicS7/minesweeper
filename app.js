import createBoard from "./utils/createBoard.js";

onload = () => {
  // run game when user select option and click button
  // select all elements
  const startBtn = document.getElementById("startBtn");
  const mainMenuElem = document.getElementById("mainMenu");
  const gameContainerElem = document.getElementById("gameContainer");

  const endModal = document.getElementById("endModal");

  const elements = {
    mainMenuElem,
    gameContainerElem,
    endModal
  }

  startBtn.addEventListener("click", () => startGame(elements, runGame));

  // Modal play again 
  let modalBtnPlay = document.getElementById("modalBtnPlay");
  modalBtnPlay.addEventListener("click" , () => playAgain(elements));

  // bonus: some leaderboard - score
  // bonus: timer
};

function startGame(elements, runGame, value = 0) {
  const {mainMenuElem, gameContainerElem, endModal} = elements;

  // check what options are selected and start game
  const difficulty = value ? value : document.getElementById("gameDifficulty").value;

  // hide main menu screen and show game screen
  mainMenuElem.className = "hide";
  gameContainerElem.className = "show";

  // hide modal if it is opened
  endModal.className = "hide";
  
  // run game
  runGame(difficulty);
}

function runGame(difficulty = 0) {
  // generate board based on difficulty
  switch (difficulty) {
    case "easy":
      // 8x8 grid with 10 bombs
      createBoard(8, 10, difficulty);
      break;
    case "medium":
      console.log("medium");
      break;
    case "hard":
      console.log("hard");
      break;
    default:
      console.log("Something went wrong, please reset game!");
  }
}

function playAgain(elements) {
  let difficulty = event.target.dataset.difficulty;

  // reset data from prev game
  const gameBoardElem = document.getElementById("gameBoard");
  gameBoardElem.innerHTML = "";

  startGame(elements, runGame, difficulty);
}


export default runGame;
