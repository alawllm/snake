import "jest-canvas-mock";
import {
  renderGameScreen,
  drawGameOver,
  drawApple,
  setScoreOnScreen,
} from "./render";

describe("draw", () => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  test("renders the game screen correctly", () => {
    renderGameScreen(ctx, canvas);
    expect(canvas).toMatchSnapshot();
    expect(ctx.fillRect).toHaveBeenCalledWith(
      0,
      0,
      canvas.clientWidth,
      canvas.clientHeight
    );
  });
  test("canvas fill color is the given color", () => {
    renderGameScreen(ctx, canvas);
    expect(ctx.fillStyle).toBe("#000000");
  });

  test("draws game over", () => {
    drawGameOver(ctx, canvas);
    expect(ctx.fillStyle).toBe("#ffffff");
    expect(ctx.font).toBe("55px handjet");
    expect(ctx.fillText).toHaveBeenCalledWith(
      "Game Over!",
      canvas.clientWidth / 6.5,
      canvas.clientHeight / 2
    );
  });
  test("draws apple", () => {
    let tileCount = 10;
    let tileSize = 10;
    let appleX = 8;
    let appleY = 8;
    drawApple(ctx, appleX, appleY, tileCount, tileSize);
    expect(ctx.fillStyle).toBe("#ff0000");
    expect(ctx.fillRect).toHaveBeenCalledWith(
      appleX * tileCount,
      appleY * tileCount,
      tileSize,
      tileSize
    );
  });
  test("sets score on screen", () => {
    let score = 15;
    const scoreContainer = document.createElement(
      "scoreContainer"
    ) as HTMLCanvasElement;
    setScoreOnScreen(score, scoreContainer);
    expect(scoreContainer.textContent).toBe("Score: " + score);
  });
});
