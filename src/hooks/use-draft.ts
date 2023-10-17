import { useCollectionContext } from "contexts/collection-context";
import { useState } from "react";
import {
  BASIC_RESOURCES,
  SPECIAL_HEROES,
  getCardPool,
  getHeroPool,
} from "services/cards";

import type { Card, CardFaction, CardPackage, HeroCard } from "services/cards";

const pool = getCardPool();
const heroPool = getHeroPool();
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

function get4RandomHeroes(
  packages: Record<CardPackage, boolean>,
  skipSpecialHeroes = true
): HeroCard[] {
  const heroes: HeroCard[] = [];

  const remainingEligibleHeroes = heroPool.filter((card) => {
    return (
      !heroes.includes(card) &&
      packages[card.package] &&
      (!skipSpecialHeroes || !SPECIAL_HEROES.includes(card.code))
    );
  });

  while (heroes.length < 4 && remainingEligibleHeroes.length >= 4) {
    const randomIndex = Math.floor(
      Math.random() * remainingEligibleHeroes.length
    );
    const randomHero = remainingEligibleHeroes[randomIndex];
    heroes.push(randomHero);
    remainingEligibleHeroes.splice(randomIndex, 1);
  }

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
