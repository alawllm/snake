//does not modify variables
export const renderGameScreen = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};
//does not modify variables
export const drawGameOver = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  ctx.fillStyle = "white";
  ctx.font = "55px handjet";
  ctx.fillText("Game Over!", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
};
//does not modify variables
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
//renders score on screen - does not modify the score
export const setScoreOnScreen = (
  score: number,
  scoreContainer: HTMLElement
): void => {
  scoreContainer.textContent = "Score: " + score;
};
