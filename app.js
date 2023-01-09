import createBoard from "./utils/createBoard.js";

onload = () => {
  // run game when user select option and click button
  // select all elements
  const startBtn = document.getElementById("startBtn");
  const mainMenuElem = document.getElementById("mainMenu");
  const gameContainerElem = document.getElementById("gameContainer");

  startBtn.addEventListener("click", () => startGame(runGame));

  function startGame() {
    // check what options are selected and start game
    const difficulty = document.getElementById("gameDifficulty").value;
    // hide main menu screen and show game screen
    mainMenuElem.className = "hide";
    gameContainerElem.className = "show";

    // run game
    runGame(difficulty);
  }

  function runGame(difficulty) {
    // generate board based on difficulty
    switch (difficulty) {
      case "easy":
        // 8x8 grid with 10 bombs
        createBoard(8, 10);
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
  // game logic

  // bonus: button to return to main screen
  // bonus: some leaderboard - score
  // bonus: timer
};
