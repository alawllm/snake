import "jest-canvas-mock";
import { renderGameScreen } from "./render";

//this function paints black rectangle on the screen
// export const renderGameScreen = (
//     ctx: CanvasRenderingContext2D,
//     canvas: HTMLCanvasElement
//   ): void => {
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//   };

describe("draw", () => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  test("renders the game screen correctly", () => {
    renderGameScreen(ctx, canvas);
    expect(canvas).toMatchSnapshot();
  });
});
