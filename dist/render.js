//does not modify variables
export const renderGameScreen = (ctx, canvas) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};
//does not modify variables
export const drawGameOver = (ctx, canvas) => {
    ctx.fillStyle = "white";
    ctx.font = "55px handjet";
    ctx.fillText("Game Over!", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
};
//does not modify variables
export const drawApple = (ctx, appleX, appleY, tileCount, tileSize) => {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};
//renders score on screen - does not modify the score
export const setScoreOnScreen = (score, scoreContainer) => {
    scoreContainer.textContent = "Score: " + score;
};
//# sourceMappingURL=render.js.map