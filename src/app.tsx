import { useKeyboard } from "hooks/use-keyboard";
import { useState } from "react";
import {
  CollectionDialog,
  Deck,
  DeckSizeDialog,
  Draft,
  FactionSelection,
  HeroSelection,
  Toolbar,
} from "./components";
import { useDecks } from "./hooks/use-decks";
import { useDraft } from "./hooks/use-draft";

import type { DeckCard, Player, PlayerDeck, Selection } from "./app-domain";
import type { CardFaction, HeroCard } from "./services/cards";

export function App() {
  const { player1Deck, player2Deck, setHeroes, setFactions, addCardsToDecks } =
    useDecks();
  const { currentCards, draft } = useDraft();
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [showDeckSizeDialog, setShowDeckSizeDialog] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState<Player>("Player 1");

  useKeyboard({
    Enter: () => {
      closeDeckSettings();
      closeCollection();
    },
    Escape: () => {
      closeDeckSettings();
      closeCollection();
    },
    c: () => {
      showCollection();
    },
    d: () => {
      showDeckSettings();
    },
  });

  const appState = () => {
    if (!player1Deck.hero || !player2Deck.hero) {
      return "hero-selection";
    }
    if (!player1Deck.faction || !player2Deck.faction) {
      return "faction-selection";
    }
    return "deck-building";
  };

  const showDeckSettings = () => {
    setShowDeckSizeDialog(true);
    setShowCollectionDialog(false);
  };

  const closeDeckSettings = () => {
    setShowDeckSizeDialog(false);
  };

  const showCollection = () => {
    setShowDeckSizeDialog(false);
    setShowCollectionDialog(true);
  };

  const closeCollection = () => {
    setShowCollectionDialog(false);
  };

  const handleHeroesSelected = (selection: Selection<HeroCard>) => {
    setHeroes(selection);
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
    <div id="main-app" className="flex flex-col h-screen overflow-hidden">
      <Toolbar
        onDeckSettings={showDeckSettings}
        onCollection={showCollection}
      />
      <main className="flex flex-grow">
        {appState() === "hero-selection" && (
          <HeroSelection onReady={handleHeroesSelected} />
        )}
        {appState() === "faction-selection" && (
          <FactionSelection
            player1Hero={player1Deck.hero as HeroCard}
            player2Hero={player2Deck.hero as HeroCard}
            onReady={handleFactionsSelected}
          />
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
      {showCollectionDialog && <CollectionDialog onClose={closeCollection} />}
      {showDeckSizeDialog && <DeckSizeDialog onClose={closeDeckSettings} />}
    </div>
  );
}
