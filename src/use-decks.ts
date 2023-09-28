import { useState } from "react";

import type { Card } from "./services/cards";

export function useDecks() {
  const [player1Deck, setPlayer1Deck] = useState<Card[]>([]);
  const [player2Deck, setPlayer2Deck] = useState<Card[]>([]);

  const addCardToPlayer1Deck = (card: Card) => {
    setPlayer1Deck((deck) => [...deck, card]);
  };

  const addCardToPlayer2Deck = (card: Card) => {
    setPlayer2Deck((deck) => [...deck, card]);
  };

  return {
    player1Deck,
    player2Deck,
    addCardToPlayer1Deck,
    addCardToPlayer2Deck,
  };
}
