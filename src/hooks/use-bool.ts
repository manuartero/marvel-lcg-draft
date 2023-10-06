import { useCallback, useState } from "react";

export function useBool(): [boolean, () => void] {
  const [value, setValue] = useState(false);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}
