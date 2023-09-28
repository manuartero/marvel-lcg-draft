import type { Card, CardFaction } from "./services/cards";

export type Selection<T> = {
  player1: T;
  player2: T;
};

export type PlayerDeck = {
  cards: Card[];
  faction: CardFaction;
};
