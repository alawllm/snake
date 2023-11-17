import { HeadChangeObject } from "./types";

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

export const updateHeadPosition = (
  nextDirection: any,
  headX: number,
  headY: number
): { newHeadX: number; newHeadY: number } => {
  const headChange: HeadChangeObject = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };
  const tempNextDirection = headChange[nextDirection as keyof HeadChangeObject];
  let newHeadX = headX;
  let newHeadY = headY;
  //making sure that next direction is not undefined as it is at the beginning
  if (nextDirection in headChange) {
    newHeadX += tempNextDirection.x;
    newHeadY += tempNextDirection.y;
  }
  return { newHeadX, newHeadY };
};

export const checkSnakeCollision = (
  snakePositions: { x: number; y: number }[],
  headX: number,
  headY: number
): boolean => {
  const collisionWithBody = snakePositions.some(
    (position) => position.x === headX && position.y === headY
  );
  //object is a reference - check if these values are in the array
  if (collisionWithBody) {
    console.log("collision with body!");
    return true;
  }
  return false;
};

export const checkSnakeWithBoardCollision = (
  headX: number,
  headY: number,
  tileCount: number
): boolean => {
  if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
    console.log("collision with board!");
    return true;
  }
  return false;
};

export const updateSnakeLengthAndScore = (
  snakeLength: number,
  score: number
): { newSnakeLength: number; newScore: number } => {
  let newSnakeLength = snakeLength + 1;
  let newScore = score + 1;
  return { newSnakeLength, newScore };
};
