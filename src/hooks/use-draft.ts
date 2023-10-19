import { useCollectionContext } from "contexts/collection-context";
import { useState } from "react";
import {
  BASIC_RESOURCES,
  SPECIAL_HEROES,
  getCardPool,
  getHeroPool,
} from "services/cards";
import { pickN } from "services/random";

import type { Card, CardFaction, CardPackage, HeroCard } from "services/cards";

const pool = getCardPool();
const heroPool = getHeroPool();
const alreadyUsedCards: Card[] = [];

function hasCopiesLeft(card: Card) {
  if (!alreadyUsedCards.includes(card)) {
    return true;
  }
  const timesUsed = alreadyUsedCards.filter((c) => c.code === card.code).length;
  return card.deckLimit > timesUsed;
}

function get3RandomCards(
  selectedFactions: Set<CardFaction>,
  packages: Record<CardPackage, boolean>,
  skipBasicResources = false
): Card[] {
  const remainingEligibleCards = pool.filter((card) => {
    return (
      hasCopiesLeft(card) &&
      selectedFactions.has(card.faction) &&
      packages[card.package] &&
      (!skipBasicResources || !BASIC_RESOURCES.includes(card.code))
    );
  });

  const cards = pickN(remainingEligibleCards, 3);
  alreadyUsedCards.push(...cards);
  return cards;
}

function get4RandomHeroes(
  packages: Record<CardPackage, boolean>,
  skipSpecialHeroes = true
): HeroCard[] {
  const remainingEligibleHeroes = heroPool.filter((hero) => {
    return (
      packages[hero.package] &&
      (!skipSpecialHeroes || !SPECIAL_HEROES.includes(hero.code))
    );
  });

  const heroes = pickN(remainingEligibleHeroes, 4);
  return heroes;
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

export function useHeroDraft() {
  const { packages } = useCollectionContext();
  const getHeroes = () => get4RandomHeroes(packages);
  return { getHeroes };
}
