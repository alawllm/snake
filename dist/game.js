export const generateRandomApplePosition = (appleX, appleY, tileCount) => {
    const newAppleX = Math.floor(Math.random() * tileCount);
    const newAppleY = Math.floor(Math.random() * tileCount);
    return { newAppleX, newAppleY };
};
//# sourceMappingURL=game.js.map