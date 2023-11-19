import { drawGameOver, renderGameScreen, drawApple, setScoreOnScreen, } from "./render.js";
import { enableNewGameOnClick, generateApplePosition, resetGameState, arrowInputHandler, } from "./game.js";
import { shortenSnake, addNewHeadPosition, drawSnake, updateHeadPosition, updateSnakeLengthAndScore, } from "./snake.js";
import { checkSnakeCollision, checkSnakeWithBoardCollision, checkAppleCollision, } from "./collision.js";
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
const drawGame = () => {
    renderGameScreen(ctx, canvas);
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
        state.snakeLength = newSnakeLength;
        state.score = newScore;
        console.log("apple collision!");
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
const renderSnake = (isCollision) => {
    if (!isCollision)
        addNewHeadPosition(state.snakePositions, state.headX, state.headY);
    drawSnake(ctx, state.snakePositions, state.tileCount, state.tileSize);
    if (!isCollision) {
        let { newHeadX, newHeadY } = updateHeadPosition(state.nextDirection, state.headX, state.headY);
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
    document.addEventListener("keydown", (event) => {
        state.nextDirection = arrowInputHandler(event, state.direction, state.nextDirection);
        //just before collision with body, nextDirection is undefined
        console.log(state.nextDirection);
    });
};
drawGame();
handleInput();
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