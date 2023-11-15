export const generateRandomPosition = (tileCount) => {
    const newRandom = Math.floor(Math.random() * tileCount);
    return { newRandom };
};
export const enableNewGameOnClick = (newGameButton, startNewGame) => {
    newGameButton.addEventListener("click", startNewGame);
};
export const increaseByOne = (num) => {
    num++;
    return { num };
};
//# sourceMappingURL=game.js.map