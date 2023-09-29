import { useState } from "react";
import { CollectionDialog } from "./components/collection-dialog";
import { Deck } from "./components/deck";
import { Mulligan } from "./components/mulligan";
import { PlayerSelection } from "./components/player-selection";
import { Toolbar } from "./components/toolbar";
import { useDecks } from "./use-decks";
import { useMulliganCards } from "./use-mulligan-cards";

import type { PlayerDeck, Selection } from "./domain";
import type { Card, CardFaction } from "./services/cards";

export function App() {
  const { player1Deck, player2Deck, addCardsToDecks, setFactions } = useDecks();
  const { currentCards, mulligan } = useMulliganCards();
  const [ showCollectionDialog, setShowCollectionDialog ] = useState(false);

  const appState = () => {
    return player1Deck.faction && player2Deck.faction
      ? "deck-building"
      : "player-selection";
  };

  const handleCollection = () => {
    setShowCollectionDialog(true);
  };

  const handleFactionsSelected = (selection: Selection<CardFaction>) => {
    setFactions(selection);
    mulligan(selection.player1, selection.player2);
  };

  const handleCardsSelected = (selection: Selection<Card>) => {
    if (!player1Deck.faction || !player2Deck.faction) {
      console.error(
        "STATE ERROR: can't select cards if factions aren't selected"
      );
      return;
    }
    addCardsToDecks(selection);
    mulligan(player1Deck.faction, player2Deck.faction);
  };

  if (appState() === "player-selection") {
    return <PlayerSelection onReady={handleFactionsSelected} />;
  }

  return (
    <>
      <Toolbar onCollection={handleCollection} />
      <main className="flex justify-center">
        <section className="w-1/6 p-2">
          <Deck playerDeck={player1Deck as PlayerDeck} />
        </section>
        <section className="w-4/6 p-2 m-l8 mr-8 bg-gray-100">
          <Mulligan
            cards={currentCards}
            onCardsSelected={handleCardsSelected}
          />
        </section>
        <section className="w-1/6 p-2">
          <Deck playerDeck={player2Deck as PlayerDeck} />
        </section>
      </main>
      {showCollectionDialog && (
        <CollectionDialog onClose={() => setShowCollectionDialog(false)} />
      )}
    </>
  );
}
