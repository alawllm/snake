import { drawGameOver, renderGameScreen, drawApple, setScoreOnScreen, } from "./render.js";
import { generateRandomApplePosition } from "./game.js";
import { checkSnakeCollision, checkSnakeWithBoardCollision, shortenSnake, addNewHeadPosition, drawSnake, } from "./snake.js";
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
    //sets position of nextDirection for the next render
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
        enableNewGameOnClick();
        drawGameOver(ctx, canvas);
    }
}
function renderSnake(isCollision) {
    //add new x and y position to the beginning of the array
    if (!isCollision)
        addNewHeadPosition(snakePositions, headX, headY);
    //loop - fill next rectangles from the array
    drawSnake(ctx, snakePositions, tileCount, tileSize);
    if (!isCollision) {
        //update head position according to the direction
        updateHeadPosition();
        shortenSnake(snakePositions, snakeLength);
    }
}
// function drawSnake(): void {
//   ctx.fillStyle = "green";
//   for (let i = 0; i < snakePositions.length; i++) {
//     ctx.fillRect(
//       snakePositions[i].x * tileCount,
//       snakePositions[i].y * tileCount,
//       tileSize,
//       tileSize
//     );
//   }
// }
function updateHeadPosition() {
    const tempNextDirection = headChange[nextDirection];
    //making sure that next direction is not undefined as it is at the beginning
    if (nextDirection in headChange) {
        headX += tempNextDirection.x;
        headY += tempNextDirection.y;
    }
    //logging shallow copy of the array to the console
    console.log([...snakePositions]);
}
function enableNewGameOnClick() {
    newGameButton.addEventListener("click", startNewGame);
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
function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        const { newAppleX, newAppleY } = generateRandomApplePosition(appleX, appleY, tileCount);
        appleX = newAppleX;
        appleY = newAppleY;
        snakeLength++;
        score++;
    }
    setScoreOnScreen(score, scoreContainer);
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