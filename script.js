var generatedChoice = [];
var userChoice = [];
const colors = ["green", "red", "yellow", "blue"];
var game_started = false;
var level = 0;



document.addEventListener("keydown", startGame);

function startGame() {
  if (!game_started) {
    game_started = true;
    level = 0;
    generatedChoice = [];
    nextLevel();
    document.removeEventListener("keydown", startGame);
  }
}


function nextLevel() {
  userChoice = [];
  level++;
    document.querySelector("h1").innerHTML="Level "+level
  generateRandomButton();
}


function generateRandomButton() {
  const rand = Math.floor(Math.random() * 4);
  const color = colors[rand];
  generatedChoice.push(color);
  generateSound(color);
  generateAnimation(color);
}


function generateSound(color) {
  new Audio("./sounds/" + color + ".mp3").play();
}


function generateAnimation(color) {
  const btn = document.querySelector("." + color);
  btn.classList.add("animation");
  setTimeout(() => btn.classList.remove("animation"), 100);
}


document.querySelectorAll(".b").forEach(btn => {
  btn.addEventListener("click", function () {
    if (!game_started) return;

    const clickedColor = this.classList[0];
    userChoice.push(clickedColor);
    generateSound(clickedColor);
    generateAnimation(clickedColor);
    checkAnswer(userChoice.length - 1);
  });
});


function checkAnswer(index) {
  if (generatedChoice[index] === userChoice[index]) {
    console.log(userChoice)
    if (userChoice.length === generatedChoice.length) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    game_started = false;
    document.querySelector("h1").innerHTML="Game Over Press A Key To Restart"
    document.addEventListener("keydown", startGame);
    new Audio("./sounds/wrong.mp3").play();

  }
}
