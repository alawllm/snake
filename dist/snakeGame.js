"use strict";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreContainer = document.getElementById("score-container");
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
    renderGameScreen();
    //sets position of nextDirection for the next render
    handleInput();
    let isCollision = checkSnakeWithBoardCollision() || checkSnakeCollision();
    //changes head position, pushes new x and y coordinates to snakePositions array
    //loop that moves the snake forwardf
    //pops unnecessary elements off the end of the snake
    renderSnake(isCollision);
    drawApple();
    checkAppleCollision();
    //setting direction to next direction, to avoid opposite moves
    direction = nextDirection;
    if (!isCollision) {
        setTimeout(drawGame, 1000 / (score / 2 + 3));
    }
    else {
        drawGameOver();
    }
}
function renderSnake(isCollision) {
    //add new x and y position to the beginning of the array
    if (!isCollision)
        addNewHeadPosition();
    //loop - fill next rectangles from the array
    drawSnake();
    if (!isCollision) {
        //update head position according to the direction
        updateHeadPosition();
        shortenSnake();
    }
}
function addNewHeadPosition() {
    snakePositions.unshift({ x: headX, y: headY });
}
function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakePositions.length; i++) {
        ctx.fillRect(snakePositions[i].x * tileCount, snakePositions[i].y * tileCount, tileSize, tileSize);
    }
}
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
function shortenSnake() {
    if (snakePositions.length >= snakeLength) {
        snakePositions.pop();
    }
}
function renderGameScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function drawGameOver() {
    ctx.fillStyle = "white";
    ctx.font = "55px ubuntu mono";
    ctx.fillText("Game Over! ", canvas.clientWidth / 5, canvas.clientHeight / 2);
}
function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeLength++;
        score++;
    }
    setScoreOnScreen();
}
function setScoreOnScreen() {
    scoreContainer.textContent = "Score: " + score;
}
function checkSnakeCollision() {
    const collisionWithBody = snakePositions.some((position) => position.x === headX && position.y === headY);
    //object is a reference - check if these values are in the array
    if (collisionWithBody) {
        console.log("collision with body!");
        return true;
    }
    console.log("ok no collision with body");
    return false;
}
function checkSnakeWithBoardCollision() {
    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
        return true;
    }
    return false;
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
//# sourceMappingURL=snakeGame.js.map