type SnakePositionsObject = {
  x: number;
  y: number;
};

type SnakePositionsArray = SnakePositionsObject[];

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

type HeadChangeObject = {
  up: { x: number; y: number };
  down: { x: number; y: number };
  left: { x: number; y: number };
  right: { x: number; y: number };
};

export const updateHeadPosition = (
  headChange: HeadChangeObject,
  nextDirection: string,
  headX: number,
  headY: number
): { newHeadX: number; newHeadY: number } => {
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
