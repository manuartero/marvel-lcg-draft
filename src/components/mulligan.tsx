import { useRef, useState } from "react";
import { get3RandomCards } from "../services/cards";
import c from "classnames";

import type { Card, CardFaction } from "../services/cards";
import type { Selection } from "../domain";
import { ReadyButton } from "./ready-button";

type Props = {
  selectedFactions: Set<CardFaction>;
  onCardsSelected: (selection: Selection<Card>) => void;
};

export function Mulligan({ selectedFactions, onCardsSelected }: Props) {
  const [player1Card, setPlayer1Card] = useState<Card>();
  const [player2Card, setPlayer2Card] = useState<Card>();
  const cards = useRef(get3RandomCards(selectedFactions));

  const handleCardSelect = (card: Card) => {
    if (!player1Card) {
      setPlayer1Card(card);
    } else if (!player2Card) {
      setPlayer2Card(card);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex space-x-4">
        {cards.current.map((card) => (
          <article
            key={card.code}
            className={c(
              "p-4 rounded-lg border",
              card.code === player1Card?.code || card.code === player2Card?.code
                ? "border-blue-500"
                : "blur-md"
            )}
            onClick={() => handleCardSelect(card)}
          >
            <img
              src={`public/${card.code}.png`}
              style={{ width: "300px", height: "419px" }}
              alt={card.name}
            />
          </article>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {player1Card && player2Card && (
          <ReadyButton
            onClick={() => {
              onCardsSelected({ player1: player1Card, player2: player2Card });
            }}
          />
        )}
      </div>
    </section>
  );
}
