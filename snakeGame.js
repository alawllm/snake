const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreContainer = document.getElementById("score-container");

//1. set canvas context, define the logic of the game
//2. set up the snake - initial position on the canvas
//3. handle user input - pressing arrow buttons on the keyboard
//4. implement a game loop - continuously update the game and redraw the canvas
//5. add apple and collision logic
//7. update snake position
//8. handle eating and growing
//9. add scoring and game over conditions

//settings of the canvas
let tileCount = 20;
let tileSize = 18;

//starting position of the snake
let headX = 10;
let headY = 10;

//assign changed position according to arrows pressed
let headXChange = 0;
let headYChange = 0;

let direction;
let nextDirection;

let appleX = 5;
let appleY = 5;

let score = 0;

let snakePositions = [];
let snakeLength = 1;

function drawGame() {
  renderGameScreen();
  renderSnake();
  drawApple();
  checkAppleCollision();
  direction = nextDirection;
  if (!checkSnakeBoardCollision()) {
    setTimeout(drawGame, 1000 / (score / 2 + 3));
  } else {
    drawGameOver();
  }
}

function renderSnake() {
  //add new head position
  snakePositions.unshift({ x: headX, y: headY });

  drawSnake();
  updateHeadPosition();
  shortenSnake();
}

function drawSnake() {
  ctx.fillStyle = "green";

  for (let i = 0; i < snakePositions.length; i++) {
    ctx.fillRect(
      snakePositions[i].x * tileCount,
      snakePositions[i].y * tileCount,
      tileSize,
      tileSize
    );
  }
}

function updateHeadPosition() {
  headX += headXChange;
  headY += headYChange;
}

function shortenSnake() {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
}

function renderGameScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.strokeStyle = "green";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    snakeLength++;
    score++;
  }
  scoreContainer.textContent = "Score: " + score;
}

function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "55px ubuntu mono";
  ctx.fillText("Game Over! ", canvas.clientWidth / 5, canvas.clientHeight / 2);
}

function checkSnakeBoardCollision() {
  if (headX < 0 || headY < 0 || headX > tileCount || headY > tileCount) {
    return true;
  }
  return false;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    headYChange = -1;
    headXChange = 0;
    nextDirection = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    headYChange = 1;
    headXChange = 0;
    nextDirection = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    headXChange = -1;
    headYChange = 0;
    nextDirection = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    headXChange = 1;
    headYChange = 0;
    nextDirection = "right";
  }
});

drawGame();
