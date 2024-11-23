import {
  generateRandomPosition,
  generateApplePosition,
  resetGameState,
  newGameListener,
  arrowInputHandler,
  handleInput,
  startNewGame,
} from "./game";
import { TStateObject } from "./utils/types";

describe("Game utility functions", () => {
  describe("generateRandomPosition", () => {
    test("returns a random position within bounds", () => {
      const tileCount = 10;
      const randomPosition = generateRandomPosition(tileCount);

      expect(randomPosition).toBeGreaterThanOrEqual(0);
      expect(randomPosition).toBeLessThan(tileCount);
    });
  });

  describe("generateApplePosition", () => {
    test("returns apple position within bounds", () => {
      const tileCount = 20;
      const { newAppleX, newAppleY } = generateApplePosition(tileCount);

      expect(newAppleX).toBeGreaterThanOrEqual(0);
      expect(newAppleX).toBeLessThan(tileCount);
      expect(newAppleY).toBeGreaterThanOrEqual(0);
      expect(newAppleY).toBeLessThan(tileCount);
    });
  });

  describe("resetGameState", () => {
    test("resets game state to default values", () => {
      const defaultState = resetGameState();

      expect(defaultState).toEqual({
        appleX: 15,
        appleY: 18,
        direction: "",
        nextDirection: "",
        headX: 10,
        headY: 10,
        score: 0,
        snakeLength: 1,
        snakePositions: [],
        tileCount: 20,
        tileSize: 16,
      });
    });
  });

  describe("newGameListener", () => {
    test("calls startNewGame when button is clicked", () => {
      const mockButton = document.createElement("button");
      const mockState = resetGameState();
      const mockDrawGame = jest.fn();
      const mockStartNewGame = jest.fn();

      newGameListener(mockButton, mockState, mockDrawGame, mockStartNewGame);
      mockButton.click();

      expect(mockStartNewGame).toHaveBeenCalledWith(mockState, mockDrawGame);
      expect(mockStartNewGame).toHaveBeenCalledTimes(1);
    });
  });

  describe("arrowInputHandler", () => {
    test("updates direction when valid arrow key is pressed", () => {
      expect(
        arrowInputHandler({ key: "ArrowUp" } as KeyboardEvent, "left", "left")
      ).toBe("up");
      expect(
        arrowInputHandler({ key: "ArrowDown" } as KeyboardEvent, "up", "up")
      ).toBe("up");
    });

    test("does not update direction to the opposite of the current direction", () => {
      expect(
        arrowInputHandler({ key: "ArrowUp" } as KeyboardEvent, "down", "down")
      ).toBe("down");
      expect(
        arrowInputHandler({ key: "ArrowDown" } as KeyboardEvent, "up", "up")
      ).toBe("up");
      expect(
        arrowInputHandler(
          { key: "ArrowLeft" } as KeyboardEvent,
          "right",
          "right"
        )
      ).toBe("right");
      expect(
        arrowInputHandler(
          { key: "ArrowRight" } as KeyboardEvent,
          "left",
          "left"
        )
      ).toBe("left");
    });
  });

  describe("handleInput", () => {
    test("updates state.nextDirection based on key press", () => {
      const mockState: TStateObject = resetGameState();
      handleInput(mockState);

      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      document.dispatchEvent(event);

      expect(mockState.nextDirection).toBe("up");
    });
  });

  describe("startNewGame", () => {
    test("resets state and calls drawGame", () => {
      const mockState: TStateObject = {
        appleX: 5,
        appleY: 5,
        direction: "up",
        nextDirection: "up",
        headX: 5,
        headY: 5,
        score: 10,
        snakeLength: 5,
        snakePositions: [{ x: 5, y: 5 }],
        tileCount: 20,
        tileSize: 16,
      };
      const mockDrawGame = jest.fn();

      startNewGame(mockState, mockDrawGame);

      expect(mockState).toEqual(resetGameState());
      expect(mockDrawGame).toHaveBeenCalledTimes(1);
    });
  });
});
