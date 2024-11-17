import {
  drawGameOver,
  renderGameScreen,
  drawApple,
  setScoreOnScreen,
} from "./render.js";

import {
  newGameListener,
  generateApplePosition,
  startNewGame,
  handleInput,
} from "./game.js";

import {
  shortenSnake,
  addNewHeadPosition,
  drawSnake,
  updateHeadPosition,
  updateSnakeLengthAndScore,
} from "./snake.js";

import {
  checkSnakeCollision,
  checkSnakeWithBoardCollision,
  checkAppleCollision,
} from "./collision.js";

import { StateObject } from "./types.js";

//canvas or dom elements
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const scoreContainer = <HTMLElement>document.getElementById("score-container");
const newGameButton = <HTMLButtonElement>document.getElementById("new-button");

let state: StateObject = {
  appleX: 15,
  appleY: 10,
  direction: "",
  nextDirection: "",
  headX: 10,
  headY: 10,
  score: 0,
  snakeLength: 1,
  snakePositions: [],
  tileCount: 20,
  tileSize: 16,
};

const drawGame = (): void => {
  renderGameScreen(ctx, canvas);
  let isCollision: boolean =
    checkSnakeWithBoardCollision(state.headX, state.headY, state.tileCount) ||
    checkSnakeCollision(state.snakePositions, state.headX, state.headY);
  renderSnake(isCollision);
  drawApple(ctx, state.appleX, state.appleY, state.tileCount, state.tileSize);

  let isAppleCollision: boolean = checkAppleCollision(
    state.appleX,
    state.appleY,
    state.headX,
    state.headY
  );
  if (isAppleCollision) {
    let { newAppleX, newAppleY } = generateApplePosition(state.tileCount);
    state.appleX = newAppleX;
    state.appleY = newAppleY;
    let { newSnakeLength, newScore } = updateSnakeLengthAndScore(
      state.snakeLength,
      state.score
    );
    state.snakeLength = newSnakeLength;
    state.score = newScore;
  }
  setScoreOnScreen(state.score, scoreContainer);
  //setting direction to next direction, to avoid opposite moves
  state.direction = state.nextDirection;
  if (!isCollision) {
    setTimeout(drawGame, 1000 / (state.score / 2 + 3.3));
  } else {
    drawGameOver(ctx, canvas);
  }
};

const renderSnake = (isCollision: boolean): void => {
  if (!isCollision)
  addNewHeadPosition(state.snakePositions, state.headX, state.headY);
  drawSnake(ctx, state.snakePositions, state.tileCount, state.tileSize);
  console.log('nextDirection', state.nextDirection, 'direction', state.direction)
  if (!isCollision) {
    let { newHeadX, newHeadY } = updateHeadPosition(
      state.headX,
      state.headY,
      state.nextDirection
    );
    state.headX = newHeadX;
    state.headY = newHeadY;
    shortenSnake(state.snakePositions, state.snakeLength);
  }
};

drawGame();
handleInput(state);
newGameListener(newGameButton, state, drawGame, startNewGame);

/*
playgame(){
  while(true){
    drawEverything()
    handleGameStateChanges()
    if (gameover){
      handleGameOver()
    }
    setTimeout(...)
  }
}
*/
