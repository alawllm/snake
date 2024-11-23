export const renderGameScreen = (ctx, canvas) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};
export const drawGameOver = (ctx, canvas) => {
    ctx.fillStyle = "white";
    ctx.font = "55px handjet";
    ctx.fillText("Game Over!", canvas.clientWidth / 7, canvas.clientHeight / 2);
};
export const drawApple = (ctx, appleX, appleY, tileCount, tileSize) => {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};
export const setScoreOnScreen = (score, scoreContainer) => {
    scoreContainer.textContent = "Score: " + score;
};
//# sourceMappingURL=render.js.map