import { useState } from "react";
import { useCollectionContext } from "../contexts/collection-context";
import { getCardPool, BASIC_RESOURCES } from "../services/cards";

import type { Card, CardFaction, CardPackage } from "../services/cards";

const pool = getCardPool();
const alreadyUsedCards: Card[] = [];

function get3RandomCards(
  selectedFactions: Set<CardFaction>,
  packages: Record<CardPackage, boolean>,
  skipBasicResources = false
): Card[] {
  const cards: Card[] = [];

  const remainingEligibleCards = pool.filter((card) => {
    return (
      !cards.includes(card) &&
      !alreadyUsedCards.includes(card) &&
      selectedFactions.has(card.faction) &&
      packages[card.package] &&
      (!skipBasicResources || !BASIC_RESOURCES.includes(card.code))
    );
  });

  while (cards.length < 3 && remainingEligibleCards.length >= 3) {
    const randomIndex = Math.floor(
      Math.random() * remainingEligibleCards.length
    );
    const randomCard = remainingEligibleCards[randomIndex];
    alreadyUsedCards.push(randomCard);
    cards.push(randomCard);
    remainingEligibleCards.splice(randomIndex, 1);
  }
  
  return cards;
}

export function useDraft() {
  const { packages } = useCollectionContext();
  const [currentCards, setCurrentCards] = useState<Card[]>([]);

  const draft = (f1: CardFaction, f2: CardFaction) => {
    const selectedFactions = new Set([f1, f2, "Basic" as const]);
    const newCards = get3RandomCards(selectedFactions, packages, true);
    setCurrentCards(newCards);
  };

  return { currentCards, draft };
}
