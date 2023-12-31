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
export const updateHeadPosition = (nextDirection, headX, headY) => {
    const headChange = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
    };
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
export const updateSnakeLengthAndScore = (snakeLength, score) => {
    let newSnakeLength = snakeLength + 1;
    let newScore = score + 1;
    return { newSnakeLength, newScore };
};
//# sourceMappingURL=snake.js.map