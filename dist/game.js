export const generateRandomPosition = (tileCount) => {
    const newRandom = Math.floor(Math.random() * tileCount);
    return newRandom;
};
export const generateApplePosition = (tileCount) => {
    let newAppleX = generateRandomPosition(tileCount);
    let newAppleY = generateRandomPosition(tileCount);
    return { newAppleX, newAppleY };
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
export const newGameListener = (newGameButton, state, drawGame, startNewGame) => {
    console.log("hello from new game listener");
    newGameButton.addEventListener("click", () => startNewGame(state, drawGame));
};
export const arrowInputHandler = (event, direction, nextDirection) => {
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
    return nextDirection;
};
export const handleInput = (state) => {
    let { direction, nextDirection } = state;
    document.addEventListener("keydown", (event) => {
        state.nextDirection = arrowInputHandler(event, direction, nextDirection);
    });
};
//# sourceMappingURL=game.js.map