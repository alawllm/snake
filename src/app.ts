import {
  drawGameOver,
  renderGameScreen,
  drawApple,
  setScoreOnScreen,
} from "./render.js";

import {
  generateRandomPosition,
  enableNewGameOnClick,
  increaseByOne,
} from "./game.js";

import {
  checkSnakeCollision,
  checkSnakeWithBoardCollision,
  shortenSnake,
  addNewHeadPosition,
  drawSnake,
  updateHeadPosition,
} from "./snake.js";
//canvas or dom elements
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const scoreContainer = <HTMLElement>document.getElementById("score-container");
const newGameButton = <HTMLButtonElement>document.getElementById("new-button");

//settings of the canvas
const tileCount = 20;
const tileSize = 16;

//State
let headX = 10;
let headY = 10;
//using direction to make sure no opposite moves
let direction: string;
//using nextDirection to decide the movements from the dictionary
let nextDirection: any;
//this function returns an object with properties newAppleX, newAppleY
//these properties can be accessed using the dot syntax
let appleX = generateRandomPosition(tileCount).newRandom;
let appleY = generateRandomPosition(tileCount).newRandom;
let score = 0;

let snakePositions: { x: number; y: number }[] = [];
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

const drawGame = (): void => {
  renderGameScreen(ctx, canvas);
  handleInput();

  let isCollision: boolean =
    checkSnakeWithBoardCollision(headX, headY, tileCount) ||
    checkSnakeCollision(snakePositions, headX, headY);

  renderSnake(isCollision);
  drawApple(ctx, appleX, appleY, tileCount, tileSize);

  checkAppleCollision();
  //setting direction to next direction, to avoid opposite moves
  direction = nextDirection;
  if (!isCollision) {
    setTimeout(drawGame, 1000 / (score / 2 + 3.3));
  } else {
    enableNewGameOnClick(newGameButton, startNewGame);
    drawGameOver(ctx, canvas);
  }
};
//modifies global variables
const renderSnake = (isCollision: boolean): void => {
  if (!isCollision) addNewHeadPosition(snakePositions, headX, headY);
  drawSnake(ctx, snakePositions, tileCount, tileSize);
  if (!isCollision) {
    headX = updateHeadPosition(
      headChange,
      nextDirection,
      headX,
      headY
    ).newHeadX;
    headY = updateHeadPosition(
      headChange,
      nextDirection,
      headX,
      headY
    ).newHeadY;
    shortenSnake(snakePositions, snakeLength);
  }
};
//modifies global variables
const checkAppleCollision = (): void => {
  if (appleX === headX && appleY === headY) {
    appleX = generateRandomPosition(tileCount).newRandom;
    appleY = generateRandomPosition(tileCount).newRandom;
    snakeLength = increaseByOne(snakeLength).num;
    score = increaseByOne(score).num;
  }
  setScoreOnScreen(score, scoreContainer);
};
//calls other functions that modify global variables
const startNewGame = (): void => {
  console.log("start new game!");
  newGameButton.removeEventListener("click", startNewGame);
  resetGameState();
  drawGame();
};
//not pure - modifies global variables
const resetGameState = (): void => {
  headX = 10;
  headY = 10;
  nextDirection = undefined;
  appleX = generateRandomPosition(tileCount).newRandom;
  appleY = generateRandomPosition(tileCount).newRandom;
  score = 0;
  snakePositions = [];
  snakeLength = 1;
};
//listens to a global event
const handleInput = (): void => {
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
};

drawGame();
