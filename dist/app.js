import { drawGameOver, renderGameScreen, drawApple, setScoreOnScreen, } from "./render.js";
import { enableNewGameOnClick, generateApplePosition, checkAppleCollision, resetGameState, } from "./game.js";
import { checkSnakeCollision, checkSnakeWithBoardCollision, shortenSnake, addNewHeadPosition, drawSnake, updateHeadPosition, updateSnakeLengthAndScore, } from "./snake.js";
//canvas or dom elements
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreContainer = document.getElementById("score-container");
const newGameButton = document.getElementById("new-button");
let state = {
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
const headChange = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
};
const drawGame = () => {
    renderGameScreen(ctx, canvas);
    handleInput();
    let isCollision = checkSnakeWithBoardCollision(state.headX, state.headY, state.tileCount) ||
        checkSnakeCollision(state.snakePositions, state.headX, state.headY);
    renderSnake(isCollision);
    drawApple(ctx, state.appleX, state.appleY, state.tileCount, state.tileSize);
    let isAppleCollision = checkAppleCollision(state.appleX, state.appleY, state.headX, state.headY);
    if (isAppleCollision) {
        let { newAppleX, newAppleY } = generateApplePosition(state.tileCount);
        state.appleX = newAppleX;
        state.appleY = newAppleY;
        let { newSnakeLength, newScore } = updateSnakeLengthAndScore(state.snakeLength, state.score);
        console.log(newSnakeLength, newScore);
        console.log(state.snakeLength, state.score);
        state.snakeLength = newSnakeLength;
        state.score = newScore;
    }
    setScoreOnScreen(state.score, scoreContainer);
    //setting direction to next direction, to avoid opposite moves
    state.direction = state.nextDirection;
    if (!isCollision) {
        setTimeout(drawGame, 1000 / (state.score / 2 + 3.3));
    }
    else {
        enableNewGameOnClick(newGameButton, startNewGame);
        drawGameOver(ctx, canvas);
    }
};
//modifies global variables
const renderSnake = (isCollision) => {
    if (!isCollision)
        addNewHeadPosition(state.snakePositions, state.headX, state.headY);
    drawSnake(ctx, state.snakePositions, state.tileCount, state.tileSize);
    if (!isCollision) {
        let { newHeadX, newHeadY } = updateHeadPosition(headChange, state.nextDirection, state.headX, state.headY);
        state.headX = newHeadX;
        state.headY = newHeadY;
        shortenSnake(state.snakePositions, state.snakeLength);
    }
};
//calls other functions that modify global variables
const startNewGame = () => {
    console.log("start new game!");
    newGameButton.removeEventListener("click", startNewGame);
    state = resetGameState();
    drawGame();
};
const handleInput = () => {
    //adding arguments to the callback function?
    document.addEventListener("keydown", arrowInputHandler);
};
const arrowInputHandler = (event) => {
    if (event.key === "ArrowUp" && state.direction !== "down") {
        state.nextDirection = "up";
    }
    else if (event.key === "ArrowDown" && state.direction !== "up") {
        state.nextDirection = "down";
    }
    else if (event.key === "ArrowLeft" && state.direction !== "right") {
        state.nextDirection = "left";
    }
    else if (event.key === "ArrowRight" && state.direction !== "left") {
        state.nextDirection = "right";
    }
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
//# sourceMappingURL=app.js.map