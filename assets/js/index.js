const levelElement = document.getElementById("level-title");
const buttonColors = ["green", "red", "yellow", "blue"];
let computerPattern = [];
let userPattern = [];
let level = 0;
let started = false;

function getNextPattern() {
  // generate computer pattern
  const randomNumber = Math.floor(Math.random() * buttonColors.length);
  const randomColor = buttonColors[randomNumber];
  computerPattern.push(randomColor);
  console.log("Computer pattern", computerPattern);

  //   play the computer pattern for the user
  // loop through the computer pattern

  computerPattern.forEach((color, index) => {
    //   play the computer pattern for the user
    setTimeout(() => {
      playPatternSound(color);
      animateButton(color);
    }, 1000 * index);
  });

  // increase the level

  level++;
  levelElement.textContent = `level ${level}`;

  //Reset user pattern
  userPattern = [];
}

function playPatternSound(color) {
  const colorAudio = new Audio(`assets/sounds/${color}.mp3`);
  colorAudio.play();
}
function animateButton(color) {
  const buttonElement = document.getElementById(`${color}`);

  buttonElement.classList.add("pressed");

  setTimeout(() => {
    buttonElement.classList.remove("pressed");
  }, 500);
}

// start game
document.addEventListener("keydown", () => {
  if (!started) {
    getNextPattern();
    started = true;
  }
});

// get user pattern

const buttonElements = document.querySelectorAll(".btn");
buttonElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    const userClickedColor = event.target.id;
    userPattern.push(userClickedColor);

    playPatternSound(userClickedColor);
    animateButton(userClickedColor);

    validatePattern(userPattern.length - 1);
    console.log("user pattern:", userPattern);
  });
});

function validatePattern(lastUserSelection) {
  if (computerPattern[lastUserSelection] === userPattern[lastUserSelection]) {
    if (computerPattern.length === userPattern.length) {
      setTimeout(() => {
        getNextPattern();
      }, 1000);
    }
  } else {
    console.log("wrong selection");

    const wrongAudio = new Audio("assets/sounds/wrong.mp3");
    wrongAudio.play();
    levelElement.textContent = `game over! press any key to start`;
    document.querySelector("body").classList.add("game-over");
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    restartGame();
  }
}
function restartGame() {
  level = 0;
  computerPattern = [];
  started = false;
}
