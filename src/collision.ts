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

export const checkAppleCollision = (
  appleX: number,
  appleY: number,
  headX: number,
  headY: number
): boolean => {
  if (appleX === headX && appleY === headY) {
    return true;
  }
  return false;
};
