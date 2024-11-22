export const renderGameScreen = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};
export const drawGameOver = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  ctx.fillStyle = "white";
  ctx.font = "60px handjet";
  ctx.fillText("Game Over!", canvas.clientWidth / 7, canvas.clientHeight / 2);
};
export const drawApple = (
  ctx: CanvasRenderingContext2D,
  appleX: number,
  appleY: number,
  tileCount: number,
  tileSize: number
): void => {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};
export const setScoreOnScreen = (
  score: number,
  scoreContainer: HTMLElement
): void => {
  scoreContainer.textContent = "Score: " + score;
};
