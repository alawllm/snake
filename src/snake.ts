import { THeadChangeObject } from "./utils/types";

export const shortenSnake = (
  snakePositions: { x: number; y: number }[],
  snakeLength: number
): void => {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
};

export const addNewHeadPosition = (
  snakePositions: { x: number; y: number }[],
  headX: number,
  headY: number
): void => {
  console.log("add new head positions", snakePositions, headX, headY);
  snakePositions.unshift({ x: headX, y: headY });
};
//render?
export const drawSnake = (
  ctx: CanvasRenderingContext2D,
  snakePositions: { x: number; y: number }[],
  tileCount: number,
  tileSize: number
): void => {
  ctx.fillStyle = "green";

  for (let i = 0; i < snakePositions.length; i++) {
    ctx.fillRect(
      snakePositions[i].x * tileCount,
      snakePositions[i].y * tileCount,
      tileSize,
      tileSize
    );
  }
};

const headChange: THeadChangeObject = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const updateHeadPosition = (
  headX: number,
  headY: number,
  nextDirection: any
): { newHeadX: number; newHeadY: number } => {
  let tempNextDirection = headChange[
    nextDirection as keyof THeadChangeObject
  ] || { x: 0, y: 0 };
  let newHeadX = headX;
  let newHeadY = headY;
  if (nextDirection && nextDirection in headChange) {
    newHeadX += tempNextDirection.x;
    newHeadY += tempNextDirection.y;
  } else if (!(nextDirection in headChange)) {
    console.error(`Invalid nextDirection: ${nextDirection}`);
  }
  return { newHeadX, newHeadY };
};
export const updateSnakeLengthAndScore = (
  snakeLength: number,
  score: number
): { newSnakeLength: number; newScore: number } => {
  let newSnakeLength = snakeLength + 1;
  let newScore = score + 1;
  return { newSnakeLength, newScore };
};
