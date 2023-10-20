import { useState } from "react";

import type { DeckCard, Selection } from "app-domain";
import type { Card, CardFaction, HeroCard } from "services/cards";

export function useDecks() {
  const [player1Hero, setPlayer1Hero] = useState<HeroCard>();
  const [player2Hero, setPlayer2Hero] = useState<HeroCard>();
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();
  const [player1Cards, setPlayer1Cards] = useState<DeckCard[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<DeckCard[]>([]);

  const setHeroes = (sel: Selection<HeroCard>) => {
    setPlayer1Hero(sel.player1);
    setPlayer2Hero(sel.player2);
  };

  const setFactions = (sel: Selection<CardFaction>) => {
    setPlayer1Faction(sel.player1);
    setPlayer2Faction(sel.player2);
  };

  const addCardsToDecks = (sel: Selection<DeckCard>) => {
    const { player1, player2 } = sel;

    const player1Index = cardIndexInDeck(player1.card, player1Cards);
    if (player1Index !== -1) {
      player1Cards[player1Index].copies += player1.copies;
      setPlayer1Cards([...player1Cards]);
    } else {
      setPlayer1Cards((cards) => [...cards, player1]);
    }

    const player2Index = cardIndexInDeck(player2.card, player2Cards);
    if (player2Index !== -1) {
      player2Cards[player2Index].copies += player2.copies;
      setPlayer2Cards([...player2Cards]);
    } else {
      setPlayer2Cards((cards) => [...cards, player2]);
    }
  };

  return {
    player1Deck: {
      hero: player1Hero,
      faction: player1Faction,
      cards: player1Cards,
    },
    player2Deck: {
      hero: player2Hero,
      cards: player2Cards,
      faction: player2Faction,
    },
    setHeroes,
    setFactions,
    addCardsToDecks,
  };
}

function cardIndexInDeck(card: Card, deck: DeckCard[]) {
  return deck.findIndex((c) => c.card.code === card.code);
}
