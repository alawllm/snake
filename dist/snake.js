export const checkSnakeCollision = (snakePositions, headX, headY) => {
    const collisionWithBody = snakePositions.some((position) => position.x === headX && position.y === headY);
    //object is a reference - check if these values are in the array
    if (collisionWithBody) {
        return true;
    }
    return false;
};
export const checkSnakeWithBoardCollision = (headX, headY, tileCount) => {
    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
        return true;
    }
    return false;
};
export const shortenSnake = (snakePositions, snakeLength) => {
    if (snakePositions.length >= snakeLength) {
        snakePositions.pop();
    }
};
export const addNewHeadPosition = (snakePositions, headX, headY) => {
    snakePositions.unshift({ x: headX, y: headY });
};
export const drawSnake = (ctx, snakePositions, tileCount, tileSize) => {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakePositions.length; i++) {
        ctx.fillRect(snakePositions[i].x * tileCount, snakePositions[i].y * tileCount, tileSize, tileSize);
    }
};
//# sourceMappingURL=snake.js.map