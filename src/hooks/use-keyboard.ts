import { useCallback, useEffect } from "react";

export function useKeyboard(listeners: Record<string, () => void>) {
  const handleKey = useCallback(
    (ev: KeyboardEvent) => {
      const listener = listeners[ev.key];
      if (listener) {
        listener();
      }
    },
    [listeners]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}
