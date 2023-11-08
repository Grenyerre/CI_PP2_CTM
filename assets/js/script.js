const controlButtons = document.querySelectorAll(".control-button");
const gameState = document.getElementById("game-state");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const musicButton = document.getElementById("music-button");
const userName = document.getElementById("user-name");
const soundtrack = document.getElementById("soundtrack");
const meow = document.getElementById("meow");
const purr = document.getElementById("purr");
const felines = [
  "Tom",
  "Sarah",
  "Harry",
  "Leela",
  "KitKat",
  "Romana",
  "Adric",
  "Nyssa",
  "Tegan",
  "Peri",
];
const catName = document.getElememtById("cat-name");
let catDirection;
let mouseLocation;
let eaten = 0;
let escaped = 0;
let gameImage = document.getElementById("game-image");

var instructionsBox = document.getElementById("instructions-box");
var instructionsButton = document.getElementById("instructions-button");
let closeInstructionsButton = document.getElementById(
  "close-instructions-button"
);

let restartButton = document.getElementById("restart-button");

/** Modal box settings - adapted from w3schools.com */
instructionsButton.addEventListener("click", function () {
  instructionsBox.style.display = "block";
});

closeInstructionsButton.addEventListener("click", function () {
  instructionsBox.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target == instructionsBox) {
    instructionsBox.style.display = "none";
  }
});

/* Music & FX settings*/
musicButton.addEventListener("click", function () {
  if (soundtrack.paused) {
    soundtrack.volume = 0.2;
    soundtrack.play();
    musicButton.innerHTML = "Mute Music";
  } else {
    soundtrack.pause();
    musicButton.innerHTML = "Play Music";
  }
});

/* Reset button */
restartButton.addEventListener("click", function () {
  location.reload();
});
/* Generate random number to select catName from the array felines */
function chooseCatName() {
  let catName = "";
  const rndNum = Math.floor(Math.random() * 10);
  catName = felines[rndNum];
  return catName;
  console.log(catName);
  catName.innerHTML = `Your cat is called ${catName}`;
}

chooseCatName();

/* Generate random number to determine from which hole the mouse will appear. */
function generateMouseLocation() {
  const computerChoice = Math.floor(Math.random() * 3);

  switch (computerChoice) {
    case 0:
      mouseLocation = "left";
      break;
    case 1:
      mouseLocation = "centre";
      break;
    case 2:
      mouseLocation = "right";
      break;
  }
}

/* Take the player's chosen direction and the computer's mouse location */
/* Enter choices into checkOutcome function */
controlButtons.forEach((button) =>
  button.addEventListener("click", function () {
    catDirection = button.textContent;
    generateMouseLocation();
    checkResult(catDirection, mouseLocation);
    checkGameEnd(escaped, eaten);
  })
);

/* Compare player and computer choices */
/* Determine whether the mouse escaped or was eaten */
/* Alter game image accordingly and increment relevant score */
function checkResult(catDirection, mouseLocation) {
  let outcome = "";
  let imageSrc = `assets/images/cat_${catDirection}_mouse_${mouseLocation}.png`;
  gameImage.src = imageSrc;

  if (catDirection === mouseLocation) {
    eaten++;
    outcome = `You pounced ${catDirection} and the mouse chose ${mouseLocation}. Yum yum!`;
    gameState.innerHTML = outcome;
    playerScore.innerHTML = eaten;
    purr.loop = false;
    purr.play();
  } else if (catDirection !== mouseLocation) {
    escaped++;
    outcome = `You pounced ${catDirection} and mouse chose ${mouseLocation}. Better luck next time!`;
    gameState.innerHTML = outcome;
    computerScore.innerHTML = escaped;
    meow.loop = false;
    meow.play();
  }

  return outcome;
}

/* Check whether 5 attempts have been made. */
function checkGameEnd() {
  console.log("Am I ever called!");
  if ((escaped == 5 && eaten == 0) || (escaped == 4 && eaten == 1)) {
    gameState.innerHTML = `Never mind, ${catName} is still hungry, more mice needed!.`;
    gameImage.innerHTML = "assets/images/cat_still_hungry.png";
    endGame();
  } else if ((escaped == 3 && eaten == 2) || (escaped == 2 && eaten == 3)) {
    gameState.innerHTML = `Good attempt! ${catName} is almost full.`;
    gameImage = "assets/images/cat_full.png";
    endGame();
  } else if ((escaped == 1 && eaten == 4) || (escaped == 0 && eaten == 5)) {
    gameState.innerHTML = `Well done! ${catName} has achieved satiety.`;
    gameImage = "assets/images/cat_eats_mouse.png";
    endGame();
  }
}

/* Disable direction buttons when 5 mice have been released */
function endGame() {
  document.getElementById("left").disabled = true;
  document.getElementById("centre").disabled = true;
  document.getElementById("right").disabled = true;

  gameState.innerHTML = "To play again, please press the Restart Game button";
}
