export const renderGameScreen = (ctx, canvas) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};
export const drawGameOver = (ctx, canvas) => {
    ctx.font = "55px handjet";
    const text = "Game Over!";
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = canvas.height / 2 + 20;
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
};
export const drawApple = (ctx, appleX, appleY, tileCount, tileSize) => {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};
export const setScoreOnScreen = (score, scoreContainer) => {
    scoreContainer.textContent = "Score: " + score;
};
//# sourceMappingURL=render.js.map