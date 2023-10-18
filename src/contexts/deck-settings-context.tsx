import { createContext, useContext, useState } from "react";

type DeckSettingsContextType = {
  deckSize: number;
  setDeckSize: (size: number) => void;
};

const DeckSettingsContext = createContext<DeckSettingsContextType>({
  deckSize: 42,
  setDeckSize: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function DeckSettingsContextProvider({ children }: Props) {
  const [deckSize, setDeckSize] = useState(42);

  return (
    <DeckSettingsContext.Provider
      value={{
        deckSize,
        setDeckSize,
      }}
    >
      {children}
    </DeckSettingsContext.Provider>
  );
}

export function useDeckSettingsContext() {
  return useContext(DeckSettingsContext);
}
