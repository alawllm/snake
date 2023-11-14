type SnakePositionsObject = {
  x: number;
  y: number;
};

type SnakePositionsArray = SnakePositionsObject[];

export const checkSnakeCollision = (
  snakePositions: SnakePositionsArray,
  headX: number,
  headY: number
): boolean => {
  const collisionWithBody = snakePositions.some(
    (position) => position.x === headX && position.y === headY
  );
  //object is a reference - check if these values are in the array
  if (collisionWithBody) {
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
    return true;
  }
  return false;
};

export const shortenSnake = (
  snakePositions: SnakePositionsArray,
  snakeLength: number
): void => {
  if (snakePositions.length >= snakeLength) {
    snakePositions.pop();
  }
};

export const addNewHeadPosition = (
  snakePositions: SnakePositionsArray,
  headX: number,
  headY: number
): void => {
  snakePositions.unshift({ x: headX, y: headY });
};

export const drawSnake = (
  ctx: CanvasRenderingContext2D,
  snakePositions: SnakePositionsArray,
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
