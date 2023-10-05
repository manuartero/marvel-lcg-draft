import { act, renderHook } from "@testing-library/react";
import { useDecks } from "./use-decks";

import type { Card } from "services/cards";

describe("useDeck()", () => {
  test("returns player1Deck and player2Deck objs", () => {
    const { result } = renderHook(() => useDecks());
    expect(result.current.player1Deck).toBeDefined();
    expect(result.current.player2Deck).toBeDefined();

    expect(result.current.player1Deck.cards).toEqual([]);
    expect(result.current.player2Deck.cards).toEqual([]);

    expect(result.current.player1Deck.faction).toBeUndefined();
    expect(result.current.player2Deck.faction).toBeUndefined();
  });

  test("returns addCardsToDecks()", () => {
    const { result } = renderHook(() => useDecks());

    expect(result.current.addCardsToDecks).toBeDefined();

    act(() => {
      result.current.addCardsToDecks({
        player1: {
          card: interrogationRoom,
          copies: 1 as const,
        },
        player2: {
          card: tenacity,
          copies: 1 as const,
        },
      });
    });

    expect(result.current.player1Deck.cards).toEqual([
      { card: interrogationRoom, copies: 1 },
    ]);

    expect(result.current.player2Deck.cards).toEqual([
      { card: tenacity, copies: 1 },
    ]);
  });

  test("returns setFactions()", () => {
    const { result } = renderHook(() => useDecks());

    expect(result.current.setFactions).toBeDefined();

    act(() => {
      result.current.setFactions({
        player1: "Justice",
        player2: "Basic",
      });
    });

    expect(result.current.player1Deck.faction).toEqual("Justice");
    expect(result.current.player2Deck.faction).toEqual("Basic");
  });
});

const interrogationRoom: Card = {
  code: "01063",
  name: "Interrogation Room",
  type: "Support",
  package: "Core Set",
  faction: "Justice",
  deckLimit: 3,
};

const tenacity: Card = {
  code: "01093",
  name: "Tenacity",
  type: "Upgrade",
  package: "Core Set",
  faction: "Basic",
  deckLimit: 3,
};
