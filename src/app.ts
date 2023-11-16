import {
  drawGameOver,
  renderGameScreen,
  drawApple,
  setScoreOnScreen,
} from "./render.js";

import {
  enableNewGameOnClick,
  generateApplePosition,
  checkAppleCollision,
  resetGameState,
  arrowInputHandler,
} from "./game.js";

import {
  checkSnakeCollision,
  checkSnakeWithBoardCollision,
  shortenSnake,
  addNewHeadPosition,
  drawSnake,
  updateHeadPosition,
  updateSnakeLengthAndScore,
} from "./snake.js";

//canvas or dom elements
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const scoreContainer = <HTMLElement>document.getElementById("score-container");
const newGameButton = <HTMLButtonElement>document.getElementById("new-button");

type StateObject = {
  appleX: number;
  appleY: number;
  direction: string;
  nextDirection: any;
  headX: number;
  headY: number;
  score: number;
  snakeLength: number;
  snakePositions: { x: number; y: number }[];
  tileCount: number;
  tileSize: number;
};

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
    enableNewGameOnClick(newGameButton, startNewGame);
    drawGameOver(ctx, canvas);
  }
};
//modifies global variables
const renderSnake = (isCollision: boolean): void => {
  if (!isCollision)
    addNewHeadPosition(state.snakePositions, state.headX, state.headY);
  drawSnake(ctx, state.snakePositions, state.tileCount, state.tileSize);
  if (!isCollision) {
    let { newHeadX, newHeadY } = updateHeadPosition(
      headChange,
      state.nextDirection,
      state.headX,
      state.headY
    );
    state.headX = newHeadX;
    state.headY = newHeadY;
    shortenSnake(state.snakePositions, state.snakeLength);
  }
};

//calls other functions that modify global variables
const startNewGame = (): void => {
  console.log("start new game!");
  newGameButton.removeEventListener("click", startNewGame);
  state = resetGameState();
  drawGame();
};

const handleInput = (): void => {
  //adding arguments to the callback function?
  document.addEventListener(
    "keydown",
    (event) =>
      (state.nextDirection = arrowInputHandler(
        event,
        state.direction,
        state.nextDirection
      ))
  );
};

drawGame();

/*
playgame(){
  handleInput()
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
