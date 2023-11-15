import { drawGameOver, renderGameScreen, drawApple, setScoreOnScreen, } from "./render.js";
import { generateRandomApplePosition, enableNewGameOnClick } from "./game.js";
import { checkSnakeCollision, checkSnakeWithBoardCollision, shortenSnake, addNewHeadPosition, drawSnake, updateHeadPosition, } from "./snake.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreContainer = document.getElementById("score-container");
const newGameButton = document.getElementById("new-button");
//settings of the canvas
//tiles counted from 0 to 19
let tileCount = 20;
let tileSize = 16;
//starting position of the snake
let headX = 10;
let headY = 10;
//using direction to make sure no opposite moves
let direction;
//using nextDirection to decide the movements from the dictionary
let nextDirection;
let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);
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
    renderGameScreen(ctx, canvas);
    handleInput();
    let isCollision = checkSnakeWithBoardCollision(headX, headY, tileCount) ||
        checkSnakeCollision(snakePositions, headX, headY);
    renderSnake(isCollision);
    drawApple(ctx, appleX, appleY, tileCount, tileSize);
    checkAppleCollision();
    //setting direction to next direction, to avoid opposite moves
    direction = nextDirection;
    if (!isCollision) {
        setTimeout(drawGame, 1000 / (score / 2 + 3.3));
    }
    else {
        enableNewGameOnClick(newGameButton, startNewGame);
        drawGameOver(ctx, canvas);
    }
}
function renderSnake(isCollision) {
    if (!isCollision)
        addNewHeadPosition(snakePositions, headX, headY);
    drawSnake(ctx, snakePositions, tileCount, tileSize);
    if (!isCollision) {
        const { newHeadX, newHeadY } = updateHeadPosition(headChange, nextDirection, headX, headY);
        headX = newHeadX;
        headY = newHeadY;
        shortenSnake(snakePositions, snakeLength);
    }
}
// function updateHeadPosition(
//   headChange: HeadChangeObject,
//   nextDirection: string,
//   headX: number,
//   headY: number
// ): void {
//   const tempNextDirection = headChange[nextDirection as keyof HeadChangeObject];
//   //making sure that next direction is not undefined as it is at the beginning
//   if (nextDirection in headChange) {
//     headX += tempNextDirection.x;
//     headY += tempNextDirection.y;
//   }
//   console.log([...snakePositions]);
// }
function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        const { newAppleX, newAppleY } = generateRandomApplePosition(tileCount);
        appleX = newAppleX;
        appleY = newAppleY;
        snakeLength++;
        score++;
    }
    setScoreOnScreen(score, scoreContainer);
}
function startNewGame() {
    console.log("start new game!");
    newGameButton.removeEventListener("click", startNewGame);
    resetGameState();
    drawGame();
}
function resetGameState() {
    headX = 10;
    headY = 10;
    nextDirection = undefined;
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    score = 0;
    snakePositions = [];
    snakeLength = 1;
}
function handleInput() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && direction !== "down") {
            nextDirection = "up";
        }
        else if (event.key === "ArrowDown" && direction !== "up") {
            nextDirection = "down";
        }
        else if (event.key === "ArrowLeft" && direction !== "right") {
            nextDirection = "left";
        }
        else if (event.key === "ArrowRight" && direction !== "left") {
            nextDirection = "right";
        }
    });
}
drawGame();
//# sourceMappingURL=app.js.map