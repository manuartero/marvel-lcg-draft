import { fireEvent, renderHook } from "@testing-library/react";
import { useKeyboard } from "./use-keyboard";

describe("useKeyboard()", () => {
  test("listens to keyboard events", () => {
    const listeners = {
      Enter: jest.fn(),
      Escape: jest.fn(),
    };

    renderHook(() => useKeyboard(listeners));

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    fireEvent(document, enterEvent);

    expect(listeners["Enter"]).toHaveBeenCalledTimes(1);

    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    fireEvent(document, escapeEvent);

    expect(listeners["Escape"]).toHaveBeenCalledTimes(1);
  });
});
