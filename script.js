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
let direction = "right";

function drawGame() {
  clearScreen();
  drawSnake();
  setTimeout(drawGame, 1000 / refreshSpeed);
}

function drawSnake() {
  ctx.fillStyle = "orange";

  headX += headXChange;
  headY += headYChange;
  //args: x,y,width,height
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
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
