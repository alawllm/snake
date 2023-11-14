export const checkSnakeCollision = (snakePositions, headX, headY) => {
    const collisionWithBody = snakePositions.some((position) => position.x === headX && position.y === headY);
    //object is a reference - check if these values are in the array
    if (collisionWithBody) {
        return true;
    }
    return false;
};
//# sourceMappingURL=snake.js.map