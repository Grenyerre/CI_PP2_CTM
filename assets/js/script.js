const controlButtons = document.querySelectorAll(".control-button");
const gameState = document.getElementById("game-state");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const musicButton = document.getElementById("music-button");
const userName = document.getElementById("user-name");
const soundtrack = document.getElementById("soundtrack");
const meow = document.getElementById("meow");
const purr = document.getElementById("purr");

let catDirection;
let mouseLocation;
let eaten = 0;
let escaped = 0;
let gameImage = document.getElementById("game-image");

var instructionsBox = document.getElementById("instructions-box");
var instructionsButton = document.getElementById("instructions-button");
let closeInstructionsButton = document.getElementById("close-instructions-button");

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

/* Generate random number to determine from which hole the mouse appears. */
function generateMouseLocation() {
    const computerChoice = Math.floor(Math.random() * 3);

    switch (computerChoice) {
        case 0:
            mouseLocation = 'left';
            break;
        case 1:
            mouseLocation = 'centre';
            break;
        case 2:
            mouseLocation = 'right';
            break;
    }
}


/* Take the player's chosen direction and the computer's mouse location */
/* Enter choices into checkOutcome function */
controlButtons.forEach((button => button.addEventListener("click", function () {
    catDirection = button.textContent;
    generateMouseLocation();
    checkResult(catDirection, mouseLocation);
})

/* Compare player and computer choices */
/* Determine whether the mouse escaped or was eaten */
/* Alter game image accordingly and increment relevant score */
function checkResult(catDirection, mouseLocation) {
        let outcome = "";

        let gameImage = `assets/images/cat_${catDirection}_mouse_${mouseLocation}.png`;

        if (catDirection === mouseLocation) {
            eaten++;
            gameImage.src = gameImage;
            outcome.gameState.innerHTML = `You pounced ${catDirection} and the mouse chose ${mouseLocation}. Yum yum!`;
            playerScore.innerHTML = eaten;
            function playAudio() {
                purr.play();
            }
        } else {
            escaped++;
            gameImage.src = gameImage;
            outcome.gameState.innerHTML = `You pounced ${catDirection} and mouse chose ${mouseLocation}. Better luck next time!`;
            computerScore.innerHTML = escaped;
            function playAudio() {
                meow.play();
            }
        }

        return outcome;
    }

/* Check whether 5 escape attempts have been made. */
function checkGameEnd() {
        if (eaten < 2) {
            gameState.innerHTML = `${userName} is still hungry, feed me.`;
            const userPlayImg = "assets/images/cat_still_hungry.png";
            setTimeout(endGame, 3000);
        } else if (eaten >= 2 && eaten <= 4) {
            gameState.innerHTML = `Well done ${userName}, you're almost full.`;
            const userPlayImg = "assets/images/cat_full.png";
            setTimeout(endGame, 3000);
        } else {
            gameState.innerHTML = `Amazing ${userName}, you have achieved satiety.`;
            const userPlayImg = "assets/images/cat_eats_mouse.png";
            setTimeout(endGame, 3000);
        }
    };

/* Disable direction buttons when 5 mice have been released */
function endGame() {
    document.getElementById("left").disabled = true;
    document.getElementById("centre").disabled = true;
    document.getElementById("right").disabled = true;

    gameState.innerHTML = `${userName}, if you want to play again, please press 'Restart Game'`;
};
