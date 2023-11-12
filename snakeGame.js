const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreContainer = document.getElementById("score-container");

//settings of the canvas
let tileCount = 20;
let tileSize = 16;

//starting position of the snake
let headX = 10;
let headY = 10;

//using direction to make sure no opposite moves
let direction;
//using nextDirection to decide the movements from the dictionary
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
  console.log(snakePositions);

  //is there a collision - snakeWithBoard, snakeWithSnake;
  //renderSnake - arg isThereACollision
  let isCollision = checkSnakeWithBoardCollision() || checkSnakeCollision();

  // if (!checkSnakeCollision()) {
  renderSnake(isCollision);
  drawApple();
  checkAppleCollision();
  //setting direction to next direction, to avoid opposite moves
  direction = nextDirection;
  // }
  if (!isCollision) {
    setTimeout(drawGame, 1000 / (score / 2 + 3));
  } else {
    drawGameOver();
  }
}

function renderSnake(isCollision) {
  //add new x and y position to the beginning of the array
  if (!isCollision) addNewHeadPosition();

  //loop - fill next rectangles from the array
  drawSnake();
  if (!isCollision) {
    //update head position according to next direction
    updateHeadPosition();
    //pop the last array element
    shortenSnake();
  }
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
  //making sure that next direction is not undefined as it is at the beginning
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
  setScoreOnScreen();
}

function setScoreOnScreen() {
  scoreContainer.textContent = "Score: " + score;
}

function checkSnakeCollision() {
  if (nextDirection in headChange) {
    let newX = headX + headChange[nextDirection].x;
    let newY = headY + headChange[nextDirection].y;
    //check if the new head values are in the snake array.
    //if yes, then there is a collision
    const containsValues = snakePositions.some(
      (position) => position.x === newX || position.y === newY
    );
    //object is a reference - check if these values are in the array
    if (containsValues) {
      console.log(containsValues);
      return true;
    }
    console.log(containsValues);
    return false;
  }
}

function checkSnakeWithBoardCollision() {
  if (headX < 0 || headY < 0 || headX > tileCount || headY > tileCount) {
    return true;
  }
  return false;
}

function handleInput() {
  document.addEventListener("keydown", (event) => {
    //snake can go only forwards - direction cannot be opposite than it is
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
