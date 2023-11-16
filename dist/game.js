export const generateRandomPosition = (tileCount) => {
    const newRandom = Math.floor(Math.random() * tileCount);
    return newRandom;
};
export const generateApplePosition = (tileCount) => {
    let newAppleX = generateRandomPosition(tileCount);
    let newAppleY = generateRandomPosition(tileCount);
    return { newAppleX, newAppleY };
};
export const enableNewGameOnClick = (newGameButton, startNewGame) => {
    newGameButton.addEventListener("click", startNewGame);
};
//# sourceMappingURL=game.js.map