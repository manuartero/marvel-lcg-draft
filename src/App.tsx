import { useState } from "react";
import { Deck } from "./components/deck";
import { Mulligan } from "./components/mulligan";
import { PlayerSelection } from "./components/player-selection";
import { useDecks } from "./use-decks";

import type { Card, CardFaction } from "./services/cards";
import type { Selection } from "./domain";

type AppState = "player-selection" | "deck-building";

export function App() {
  const [appState, setAppState] = useState<AppState>("player-selection");
  const [selectedFactions, setSelectedFactions] = useState<Set<CardFaction>>(
    new Set()
  );
  const {
    player1Deck,
    player2Deck,
    addCardToPlayer1Deck,
    addCardToPlayer2Deck,
  } = useDecks();

  const playersReady = (selection: Selection<CardFaction>) => {
    setAppState("deck-building");
    setSelectedFactions(
      new Set([selection.player1, selection.player2, "Basic"])
    );
  };

  const mulliganStepReady = (selection: Selection<Card>) => {
    addCardToPlayer1Deck(selection.player1);
    addCardToPlayer2Deck(selection.player2);
  };

  if (appState === "player-selection") {
    return <PlayerSelection onReady={playersReady} />;
  }

  return (
    <>
      <Deck playerDeck={player1Deck} />
      <Mulligan
        selectedFactions={selectedFactions}
        onCardsSelected={mulliganStepReady}
      />
      <Deck playerDeck={player2Deck} />
    </>
  );
}
