import { drawGameOver, renderGameScreen, drawApple, setScoreOnScreen, } from "./render.js";
import { generateRandomPosition, enableNewGameOnClick } from "./game.js";
import { checkSnakeCollision, checkSnakeWithBoardCollision, shortenSnake, addNewHeadPosition, drawSnake, updateHeadPosition, } from "./snake.js";
//canvas or dom elements
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreContainer = document.getElementById("score-container");
const newGameButton = document.getElementById("new-button");
//settings of the canvas
const tileCount = 20;
const tileSize = 16;
//State
let headX = 10;
let headY = 10;
//using direction to make sure no opposite moves
let direction;
//using nextDirection to decide the movements from the dictionary
let nextDirection;
//this function returns an object with properties newAppleX, newAppleY
//these properties can be accessed using the dot syntax
let appleX = generateRandomPosition(tileCount);
let appleY = generateRandomPosition(tileCount);
let score = 0;
let snakePositions = [];
let snakeLength = 1;
const headChange = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
};
const drawGame = () => {
    renderGameScreen(ctx, canvas);
    handleInput();
    let isCollision = checkSnakeWithBoardCollision(headX, headY, tileCount) ||
        checkSnakeCollision(snakePositions, headX, headY);
    renderSnake(isCollision);
    drawApple(ctx, appleX, appleY, tileCount, tileSize);
    let isAppleCollision = checkAppleCollision(appleX, appleY, headX, headY);
    if (isAppleCollision) {
        let appleXY = generateApplePosition();
        appleX = appleXY.appleX;
        appleY = appleXY.appleY;
        let lengthScore = updateSnakeLengthAndScore(snakeLength, score);
        snakeLength = lengthScore.snakeLength;
        score = lengthScore.score;
    }
    setScoreOnScreen(score, scoreContainer);
    //setting direction to next direction, to avoid opposite moves
    direction = nextDirection;
    if (!isCollision) {
        setTimeout(drawGame, 1000 / (score / 2 + 3.3));
    }
    else {
        enableNewGameOnClick(newGameButton, startNewGame);
        drawGameOver(ctx, canvas);
    }
};
//modifies global variables
const renderSnake = (isCollision) => {
    if (!isCollision)
        addNewHeadPosition(snakePositions, headX, headY);
    drawSnake(ctx, snakePositions, tileCount, tileSize);
    if (!isCollision) {
        let { newHeadX, newHeadY } = updateHeadPosition(headChange, nextDirection, headX, headY);
        headX = newHeadX;
        headY = newHeadY;
        shortenSnake(snakePositions, snakeLength);
    }
};
//modifies global variables
const checkAppleCollision = (appleX, appleY, headX, headY) => {
    if (appleX === headX && appleY === headY) {
        return true;
    }
    return false;
};
const generateApplePosition = () => {
    appleX = generateRandomPosition(tileCount);
    appleY = generateRandomPosition(tileCount);
    return { appleX, appleY };
};
const updateSnakeLengthAndScore = (snakeLength, score) => {
    snakeLength++;
    score++;
    return { snakeLength, score };
};
// setScoreOnScreen(score, scoreContainer);
//calls other functions that modify global variables
const startNewGame = () => {
    console.log("start new game!");
    newGameButton.removeEventListener("click", startNewGame);
    resetGameState();
    drawGame();
};
//not pure - modifies global variables
const resetGameState = () => {
    headX = 10;
    headY = 10;
    nextDirection = undefined;
    appleX = generateRandomPosition(tileCount);
    appleY = generateRandomPosition(tileCount);
    score = 0;
    snakePositions = [];
    snakeLength = 1;
};
//listens to a global event
const handleInput = () => {
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
};
drawGame();
//# sourceMappingURL=app.js.map