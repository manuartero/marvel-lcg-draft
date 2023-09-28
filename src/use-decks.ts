import { useState } from "react";

import type { Card, CardFaction } from "./services/cards";
import type { Selection } from "./domain";

export function useDecks() {
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

  const addCardsToDecks = (sel: Selection<Card>) => {
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
