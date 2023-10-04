import { useState } from "react";
import { useCollectionContext } from "../contexts/collection-context";
import { getCardPool } from "../services/cards";

import type { Card, CardFaction, CardPackage } from "../services/cards";

const pool = getCardPool();
const alreadyUsedCards: Card[] = [];

function get3RandomCards(
  selectedFactions: Set<CardFaction>,
  packages: Record<CardPackage, boolean>
): Card[] {
  const cards: Card[] = [];

  while (cards.length < 3) {
    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    if (
      !cards.includes(randomCard) &&
      !alreadyUsedCards.includes(randomCard) &&
      selectedFactions.has(randomCard.faction) &&
      packages[randomCard.package]
    ) {
      alreadyUsedCards.push(randomCard);
      cards.push(randomCard);
    }
  }
  return cards;
}

export function useDraft() {
  const { packages } = useCollectionContext();
  const [currentCards, setCurrentCards] = useState<Card[]>([]);

  const draft = (f1: CardFaction, f2: CardFaction) => {
    const selectedFactions = new Set([f1, f2, "Basic" as const]);
    const newCards = get3RandomCards(selectedFactions, packages);
    setCurrentCards(newCards);
  };

  return { currentCards, draft };
}
