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
  ctx.font = "60px handjet";

  const text = "Game Over!";
  const textWidth = ctx.measureText(text).width;

  const x = (canvas.width - textWidth) / 2;
  const y = canvas.height / 2 + 20;

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
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
