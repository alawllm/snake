export const shortenSnake = (snakePositions, snakeLength) => {
    if (snakePositions.length >= snakeLength) {
        snakePositions.pop();
    }
};
export const addNewHeadPosition = (snakePositions, headX, headY) => {
    snakePositions.unshift({ x: headX, y: headY });
};
//render?
export const drawSnake = (ctx, snakePositions, tileCount, tileSize) => {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakePositions.length; i++) {
        ctx.fillRect(snakePositions[i].x * tileCount, snakePositions[i].y * tileCount, tileSize, tileSize);
    }
};
export const updateHeadPosition = (headChange, nextDirection, headX, headY) => {
    const tempNextDirection = headChange[nextDirection];
    let newHeadX = headX;
    let newHeadY = headY;
    //making sure that next direction is not undefined as it is at the beginning
    if (nextDirection in headChange) {
        newHeadX += tempNextDirection.x;
        newHeadY += tempNextDirection.y;
    }
    return { newHeadX, newHeadY };
};
export const checkSnakeCollision = (snakePositions, headX, headY) => {
    const collisionWithBody = snakePositions.some((position) => position.x === headX && position.y === headY);
    //object is a reference - check if these values are in the array
    if (collisionWithBody) {
        console.log("collision with body!");
        return true;
    }
    return false;
};
export const checkSnakeWithBoardCollision = (headX, headY, tileCount) => {
    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
        console.log("collision with board!");
        return true;
    }
    return false;
};
export const updateSnakeLengthAndScore = (snakeLength, score) => {
    let newSnakeLength = snakeLength + 1;
    let newScore = score + 1;
    return { newSnakeLength, newScore };
};
//# sourceMappingURL=snake.js.map