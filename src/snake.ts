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
