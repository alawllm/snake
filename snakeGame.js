const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreContainer = document.getElementById("score-container");

//settings of the canvas
let tileCount = 20;
let tileSize = 16;

//starting position of the snake
let headX = 10;
let headY = 10;

let direction;
let nextDirection;

let appleX = 5;
let appleY = 5;

let score = 0;

let snakePositions = [];
let snakeLength = 1;

const headChange = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function drawGame() {
  renderGameScreen();
  handleInput();
  //is there a collision - snakeWithBoard, snakeWithSnake;
  //renderSnake - arg isThereACollision

  renderSnake();
  drawApple();
  checkAppleCollision();
  direction = nextDirection;
  if (!checkSnakeWithBoardCollision()) {
    setTimeout(drawGame, 1000 / (score / 2 + 3));
  } else {
    drawGameOver();
  }
}

function renderSnake() {
  addNewHeadPosition();
  drawSnake();
  updateHeadPosition();
  shortenSnake();
}

function addNewHeadPosition() {
  snakePositions.unshift({ x: headX, y: headY });
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
  if (nextDirection in headChange) {
    headX += headChange[nextDirection].x;
    headY += headChange[nextDirection].y;
  }
}

function shortenSnake() {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
}

function renderGameScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "55px ubuntu mono";
  ctx.fillText("Game Over! ", canvas.clientWidth / 5, canvas.clientHeight / 2);
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

function checkSnakeWithBoardCollision() {
  if (headX < 0 || headY < 0 || headX > tileCount || headY > tileCount) {
    return true;
  }
  return false;
}

function handleInput() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "down") {
      nextDirection = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
      nextDirection = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
      nextDirection = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
      nextDirection = "right";
    }
  });
}

drawGame();
