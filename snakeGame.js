const canvas = document.getElementById("game");
//ctx returns reference to canvas' 2d drawing api object
const ctx = canvas.getContext("2d");

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

let refreshSpeed = 5;

//initial direction
let direction;

let appleX = 5;
let appleY = 5;

let score = 0;

//store position of the snake
//snakePositions[0].x, snakePositions[0].y
let snakePositions = [];
let snakeLength = 1;

function drawGame() {
  clearScreen();
  renderSnake();
  drawApple();
  checkCollision();
  setTimeout(drawGame, 1000 / refreshSpeed);
}

function renderSnake() {
  ctx.fillStyle = "green";

  //adding new head position
  snakePositions.unshift({ x: headX, y: headY });

  drawSnake();
  //updating head position
  headX += headXChange;
  headY += headYChange;

  shortenSnake();
}

function drawSnake() {
  for (let i = 0; i < snakePositions.length; i++) {
    ctx.fillRect(
      snakePositions[i].x * tileCount,
      snakePositions[i].y * tileCount,
      tileSize,
      tileSize
    );
  }
}

function shortenSnake() {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
}

function clearScreen() {
  ctx.strokeStyle = "green";
  ctx.fillStyle = "black";

  ctx.lineWidth = 10;

  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  // Draw a border around the canvas
  ctx.strokeRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    snakeLength++;
    score++;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    headYChange = -1;
    headXChange = 0;
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    headYChange = 1;
    headXChange = 0;
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    headXChange = -1;
    headYChange = 0;
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    headXChange = 1;
    headYChange = 0;
    direction = "right";
  }
});

drawGame();
