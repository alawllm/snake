import {
  drawGameOver,
  renderGameScreen,
  drawApple,
  setScoreOnScreen,
} from "./render.js";

import { generateRandomApplePosition } from "./game.js";

import { checkSnakeCollision } from "./snake.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const scoreContainer = <HTMLElement>document.getElementById("score-container");

const newGameButton = <HTMLButtonElement>document.getElementById("new-button");
//settings of the canvas
//tiles counted from 0 to 19
let tileCount = 20;
let tileSize = 16;

//starting position of the snake
let headX = 10;
let headY = 10;

//using direction to make sure no opposite moves
let direction: string;
//using nextDirection to decide the movements from the dictionary
let nextDirection: any;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

let score = 0;

type SnakePositionsObject = {
  x: number;
  y: number;
};

type SnakePositionsArray = SnakePositionsObject[];

let snakePositions: SnakePositionsArray = [];
let snakeLength = 1;

type HeadChangeObject = {
  up: { x: number; y: number };
  down: { x: number; y: number };
  left: { x: number; y: number };
  right: { x: number; y: number };
};

const headChange: HeadChangeObject = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function drawGame(): void {
  renderGameScreen(ctx, canvas);
  //sets position of nextDirection for the next render
  handleInput();

  let isCollision: boolean =
    checkSnakeWithBoardCollision() ||
    checkSnakeCollision(snakePositions, headX, headY);

  renderSnake(isCollision);
  drawApple(ctx, appleX, appleY, tileCount, tileSize);
  checkAppleCollision();
  //setting direction to next direction, to avoid opposite moves
  direction = nextDirection;
  if (!isCollision) {
    setTimeout(drawGame, 1000 / (score / 2 + 3.3));
  } else {
    enableNewGameOnClick();
    drawGameOver(ctx, canvas);
  }
}

function renderSnake(isCollision: boolean): void {
  //add new x and y position to the beginning of the array
  if (!isCollision) addNewHeadPosition();

  //loop - fill next rectangles from the array
  drawSnake();

  if (!isCollision) {
    //update head position according to the direction
    updateHeadPosition();
    shortenSnake();
  }
}

function addNewHeadPosition(): void {
  snakePositions.unshift({ x: headX, y: headY });
}

function drawSnake(): void {
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

function updateHeadPosition(): void {
  const tempNextDirection = headChange[nextDirection as keyof HeadChangeObject];
  //making sure that next direction is not undefined as it is at the beginning
  if (nextDirection in headChange) {
    headX += tempNextDirection.x;
    headY += tempNextDirection.y;
  }
  //logging shallow copy of the array to the console
  console.log([...snakePositions]);
}

function shortenSnake(): void {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
}

function enableNewGameOnClick(): void {
  newGameButton.addEventListener("click", startNewGame);
}

function startNewGame(): void {
  console.log("start new game!");
  // Remove the event listener before starting a new game
  // Call drawGame to start a new game
  newGameButton.removeEventListener("click", startNewGame);
  resetGameState();
  drawGame();
}

function resetGameState(): void {
  headX = 10;
  headY = 10;
  nextDirection = undefined;
  appleX = Math.floor(Math.random() * tileCount);
  appleY = Math.floor(Math.random() * tileCount);
  score = 0;
  snakePositions = [];
  snakeLength = 1;
}

function checkAppleCollision(): void {
  if (appleX === headX && appleY === headY) {
    const { newAppleX, newAppleY } = generateRandomApplePosition(
      appleX,
      appleY,
      tileCount
    );
    appleX = newAppleX;
    appleY = newAppleY;
    snakeLength++;
    score++;
  }
  setScoreOnScreen(score, scoreContainer);
}

function checkSnakeWithBoardCollision(): boolean {
  if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
    return true;
  }
  return false;
}

function handleInput(): void {
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
