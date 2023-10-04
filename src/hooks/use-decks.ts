import { useState } from "react";

import type { DeckCard, Selection } from "../domain";
import type { CardFaction } from "../services/cards";

export function useDecks() {
  const [player1Cards, setPlayer1Cards] = useState<DeckCard[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<DeckCard[]>([]);
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

  const addCardsToDecks = (sel: Selection<DeckCard>) => {
    setPlayer1Cards((cards) => [...cards, sel.player1]);
    setPlayer2Cards((cards) => [...cards, sel.player2]);
  };

  const setFactions = (sel: Selection<CardFaction>) => {
    setPlayer1Faction(sel.player1);
    setPlayer2Faction(sel.player2);
  };

  return {
    player1Deck: {
      cards: player1Cards,
      faction: player1Faction,
    },
    player2Deck: {
      cards: player2Cards,
      faction: player2Faction,
    },
    addCardsToDecks,
    setFactions,
  };
}
