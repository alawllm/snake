export const generateRandomPosition = (tileCount) => {
    const newRandom = Math.floor(Math.random() * tileCount);
    return newRandom;
};
export const generateApplePosition = (tileCount) => {
    let newAppleX = generateRandomPosition(tileCount);
    let newAppleY = generateRandomPosition(tileCount);
    return { newAppleX, newAppleY };
};
export const checkAppleCollision = (appleX, appleY, headX, headY) => {
    if (appleX === headX && appleY === headY) {
        return true;
    }
    return false;
};
export const enableNewGameOnClick = (newGameButton, startNewGame) => {
    newGameButton.addEventListener("click", startNewGame);
};
export const resetGameState = () => {
    return {
        appleX: 15,
        appleY: 18,
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
};
export const arrowInputHandler = (event, direction, nextDirection) => {
    if (event.key === "ArrowUp" && direction !== "down") {
        return (nextDirection = "up");
    }
    else if (event.key === "ArrowDown" && direction !== "up") {
        return (nextDirection = "down");
    }
    else if (event.key === "ArrowLeft" && direction !== "right") {
        return (nextDirection = "left");
    }
    else if (event.key === "ArrowRight" && direction !== "left") {
        return (nextDirection = "right");
    }
};
//# sourceMappingURL=game.js.map