export const generateRandomApplePosition = (
  appleX: number,
  appleY: number,
  tileCount: number
) => {
  const newAppleX = Math.floor(Math.random() * tileCount);
  const newAppleY = Math.floor(Math.random() * tileCount);

  return { newAppleX, newAppleY };
};
