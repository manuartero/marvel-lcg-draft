import { useCallback, useEffect, useState } from "react";
import {
  CollectionDialog,
  Deck,
  Draft,
  PlayerSelection,
  Toolbar,
} from "./components";
import { useDecks } from "./hooks/use-decks";
import { useDraft } from "./hooks/use-draft";

import type { DeckCard, Player, PlayerDeck, Selection } from "./domain";
import type { CardFaction } from "./services/cards";

export function App() {
  const { player1Deck, player2Deck, addCardsToDecks, setFactions } = useDecks();
  const { currentCards, draft } = useDraft();
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState<Player>("Player 1");

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Esc") {
      handleCloseCollection();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const appState = () => {
    return player1Deck.faction && player2Deck.faction
      ? "deck-building"
      : "player-selection";
  };

  const handleShowCollection = () => {
    setShowCollectionDialog(true);
  };

  const handleCloseCollection = () => {
    setShowCollectionDialog(false);
  };

  const handleFactionsSelected = (selection: Selection<CardFaction>) => {
    setFactions(selection);
    draft(selection.player1, selection.player2);
  };

  const handleCardsSelected = (sel: Selection<DeckCard>) => {
    if (!player1Deck.faction || !player2Deck.faction) {
      console.error(
        "STATE ERROR: can't select cards if factions aren't selected"
      );
      return;
    }
    addCardsToDecks(sel);
    setStartingPlayer((current) =>
      current === "Player 1" ? "Player 2" : "Player 1"
    );
    draft(player1Deck.faction, player2Deck.faction);
  };

  return (
    <div id="main-app" className="flex flex-col h-screen">
      <Toolbar onCollection={handleShowCollection} />
      <main className="flex flex-grow">
        {appState() === "player-selection" && (
          <PlayerSelection onReady={handleFactionsSelected} />
        )}
        {appState() === "deck-building" && (
          <>
            <Deck
              className="w-1/6"
              playerDeck={player1Deck as PlayerDeck}
              player="Player 1"
            />
            <Draft
              className="w-4/6"
              startingPlayer={startingPlayer}
              cards={currentCards}
              onCardsSelected={handleCardsSelected}
            />
            <Deck
              className="w-1/6"
              playerDeck={player2Deck as PlayerDeck}
              player="Player 2"
            />
          </>
        )}
      </main>
      {showCollectionDialog && (
        <CollectionDialog onClose={handleCloseCollection} />
      )}
    </div>
  );
}
