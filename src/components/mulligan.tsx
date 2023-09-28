import c from "classnames";
import { useState } from "react";
import { ReadyButton } from "./ready-button";

import type { Selection } from "../domain";
import type { Card } from "../services/cards";

type Props = {
  cards: Card[];
  onCardsSelected: (selection: Selection<Card>) => void;
};

export function Mulligan({ cards, onCardsSelected }: Props) {
  const [player1Card, setPlayer1Card] = useState<Card>();
  const [player2Card, setPlayer2Card] = useState<Card>();

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
        {cards.map((card) => (
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
              setPlayer1Card(undefined);
              setPlayer2Card(undefined);
              onCardsSelected({ player1: player1Card, player2: player2Card });
            }}
          />
        )}
      </div>
    </section>
  );
}
