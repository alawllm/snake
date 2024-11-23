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
export const checkAppleCollision = (appleX, appleY, headX, headY) => {
    if (appleX === headX && appleY === headY) {
        return true;
    }
    return false;
};
//# sourceMappingURL=collision.js.map