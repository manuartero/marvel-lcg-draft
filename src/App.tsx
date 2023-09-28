import { useState } from "react";
import { Deck } from "./components/deck";
import { Mulligan } from "./components/mulligan";
import { PlayerSelection } from "./components/player-selection";
import { useDecks } from "./use-decks";

import type { FactionSelection } from "./components/player-selection";

type AppState = "player-selection" | "deck-building";

export function App() {
  const [appState, setAppState] = useState<AppState>("player-selection");
  const {
    player1Deck,
    player2Deck,
    addCardToPlayer1Deck,
    addCardToPlayer2Deck,
  } = useDecks();

  const playersReady = (selection: FactionSelection) => {
    console.log(selection);
    setAppState("deck-building");
  };

  if (appState === "player-selection") {
    return <PlayerSelection onReady={playersReady} />;
  }

  return (
    <>
      <Deck playerDeck={player1Deck} />
      <Mulligan />
      <Deck playerDeck={player2Deck} />
    </>
  );
}
