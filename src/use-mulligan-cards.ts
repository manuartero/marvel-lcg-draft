import { useState } from "react";
import { get3RandomCards } from "./services/cards";

import type { Card, CardFaction } from "./services/cards";

export function useMulliganCards() {
  const [currentCards, setCurrentCards] = useState<Card[]>([]);

  const mulligan = (f1: CardFaction, f2: CardFaction) => {
    const selectedFactions = new Set([f1, f2, "Basic" as const]);
    const newCards = get3RandomCards(selectedFactions);
    setCurrentCards(newCards);
  };

  return {
    currentCards,
    mulligan,
  };
}
