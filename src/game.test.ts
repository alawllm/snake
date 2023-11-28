import {
  generateRandomPosition,
  generateApplePosition,
  startNewGame,
  resetGameState
} from "./game";

//tested: generateRandomPosition, generateApplePosition,

// export const startNewGame = (state: object, drawGame: DrawGame) => {
//   console.log("start new game!");
//   state = resetGameState();
//   drawGame();
// };

describe("game works", () => {
  test("generates random position", () => {
    let tileCount = 10;
    let randomPosition = generateRandomPosition(tileCount);
    expect(randomPosition).toBeGreaterThanOrEqual(0);
    expect(randomPosition).toBeLessThanOrEqual(tileCount);
  });
  test("generates apple position", () => {
    let tileCount = 10;
    const { newAppleX, newAppleY } = generateApplePosition(tileCount);
    expect(newAppleX).not.toEqual(tileCount);
    expect(newAppleY).not.toEqual(tileCount);
    expect(newAppleX).toBeGreaterThanOrEqual(0);
    expect(newAppleY).toBeGreaterThanOrEqual(0);
  });

  test("starts new game", async() => {
    const initialState: object = {
      appleX: 15,
      appleY: 10,
      direction: "",
      nextDirection: "",
      headX: 10,
      headY: 10,
      score: 0,
      snakeLength: 1,
      snakePositions: [],
      tileCount: 20,
      tileSize: 16,
    };
    const mockDrawNewGame = jest.fn();
    startNewGame(initialState, mockDrawNewGame);
    // expect(initialState.modified).toBe(true);
    expect(mockDrawNewGame).toHaveBeenCalledTimes(1);
  });
});
