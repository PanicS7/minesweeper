import createBoard from "./utils/createBoard.js";

onload = () => {
  // run game when user select option and click button
  // select all elements
  const startBtn = document.getElementById("startBtn");
  const mainMenuElem = document.getElementById("mainMenu");
  const gameContainerElem = document.getElementById("gameContainer");

  const endModal = document.getElementById("endModal");
  const changeDifModal = document.getElementById("changeDifModal");
  const gameDifficultyModal = document.getElementById("gameDifficultyModal");

  const elements = {
    mainMenuElem,
    gameContainerElem,
    endModal
  }

  startBtn.addEventListener("click", () => startGame(elements, runGame));

  // Modal play again 
  let modalBtnPlay = document.getElementById("modalBtnPlay");
  modalBtnPlay.addEventListener("click" , () => playAgain(elements));

  // Modal change dificulty - show modal
  let modalChangeDifBtn = document.getElementById("modalBtnChangeDif");
  modalChangeDifBtn.addEventListener("click" , () => openChangeDifModal(changeDifModal));

  // Modal play again with changed difficulty
  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.addEventListener("click" , () =>  playAgain(elements, gameDifficultyModal.value, changeDifModal));
  
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
      // 15x15 grid with 40 bombs
      createBoard(15, 40, difficulty);
      break;
    case "hard":
      // 22x22 grid with 100 bombs
      createBoard(22, 100, difficulty);
      break;
    default:
      console.log("Something went wrong, please reset game!");
  }
}

function playAgain(elements, newDif = 0, changeDifModal = "") {
  let difficulty = newDif == 0 ? event.target.dataset.difficulty : newDif;

  // reset change modal to default hidden so next time user wont see it opened when end modal is loaded
  changeDifModal !== "" && (changeDifModal.className = "hide");

  // reset data from prev game
  const gameBoardElem = document.getElementById("gameBoard");
  gameBoardElem.innerHTML = "";

  startGame(elements, runGame, difficulty);
}

function openChangeDifModal(elem) {
  elem.className = "show";
}


export default runGame;
