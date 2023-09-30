import c from "classnames";
import { useState } from "react";
import { ReadyButton } from "../elements/ready-button";

import type { Player, Selection } from "../domain";
import type { Card } from "../services/cards";

type Props = {
  cards: Card[];
  className?: string;
  onCardsSelected: (sel: Selection<Card>) => void;
};

export function Draft({ cards, className, onCardsSelected }: Props) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Player 1");
  const [player1Card, setPlayer1Card] = useState<Card>();
  const [player2Card, setPlayer2Card] = useState<Card>();

  const ready = player1Card && player2Card;

  const handleSelectCard = (card: Card) => {
    if (currentPlayer === "Player 1") {
      setPlayer1Card(card);
    } else {
      setPlayer2Card(card);
    }
    nextPlayer();
  };

  const handleReady = () => {
    if (!ready) {
      return;
    }
    setPlayer1Card(undefined);
    setPlayer2Card(undefined);
    nextPlayer();
    onCardsSelected({ player1: player1Card, player2: player2Card });
  };

  const nextPlayer = () => {
    if (currentPlayer === "Player 1") {
      setCurrentPlayer("Player 2");
    } else {
      setCurrentPlayer("Player 1");
    }
  };

  const isSelected = (card: Card) => {
    return card.code === player1Card?.code || card.code === player2Card?.code;
  };

  const isDiscarded = (card: Card) => {
    return player1Card && player2Card && !isSelected(card);
  };

  const whoSelected = (card: Card) => {
    if (card.code === player1Card?.code) {
      return "Player 1";
    }
    if (card.code === player2Card?.code) {
      return "Player 2";
    }
    return undefined;
  };

  return (
    <section
      className={c(className, "flex flex-col items-center justify-center p-4")}
    >
      {!ready && (
        <h2 className="text-xl mb-4 text-gray-100 self-start">
          <span className="font-semibold text-2xl mr-4"> {currentPlayer}</span>{" "}
          select a card...
        </h2>
      )}
      <div className="flex space-x-4">
        {cards.map((card) => (
          <article
            key={card.code}
            className={c(
              "relative",
              "p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300",
              isSelected(card) && "border-4 border-white",
              isDiscarded(card) && "blur-md blur-transition duration-300"
            )}
            onClick={() => handleSelectCard(card)}
          >
            <>
              <img
                src={`/${card.code}.png`}
                style={{ width: "300px", height: "419px" }}
                alt={card.name}
              />
              {isSelected(card) && (
                <figcaption
                  className={c(
                    "absolute top-0 right-0",
                    "bg-white px-2 py-1 text-gray-800 font-semibold",
                    "rounded-tl-lg border-b-4 border-l-4 border-gray-800"
                  )}
                >
                  {whoSelected(card)}
                </figcaption>
              )}
            </>
          </article>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ReadyButton disabled={!ready} onClick={handleReady} />
      </div>
    </section>
  );
}
