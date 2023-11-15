export const generateRandomApplePosition = (tileCount) => {
    const newAppleX = Math.floor(Math.random() * tileCount);
    const newAppleY = Math.floor(Math.random() * tileCount);
    return { newAppleX, newAppleY };
};
export const enableNewGameOnClick = (newGameButton, startNewGame) => {
    newGameButton.addEventListener("click", startNewGame);
};
//# sourceMappingURL=game.js.map