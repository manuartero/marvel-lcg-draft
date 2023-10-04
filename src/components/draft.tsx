import c from "classnames";
import { useState } from "react";
import { ReadyButton } from "elements/ready-button";

import type { DeckCard, Player, Selection } from "app-domain";
import type { Card } from "services/cards";

type Props = {
  cards: Card[];
  startingPlayer: Player;
  className?: string;
  onCardsSelected: (sel: Selection<DeckCard>) => void;
};

export function Draft({
  cards,
  startingPlayer,
  className,
  onCardsSelected,
}: Props) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(startingPlayer);
  const [player1Card, setPlayer1Card] = useState<Card>();
  const [player2Card, setPlayer2Card] = useState<Card>();

  const ready = player1Card && player2Card;

  const handleSelectCard = (card: Card) => {
    const tryingToSelectAlreadySelectedCard =
      (!ready &&
        currentPlayer === "Player 1" &&
        card.code === player2Card?.code) ||
      (!ready &&
        currentPlayer === "Player 2" &&
        card.code === player1Card?.code);

    if (tryingToSelectAlreadySelectedCard) {
      return;
    }

    if (currentPlayer === "Player 1" || ready) {
      if (card.code === player1Card?.code) {
        setPlayer1Card(undefined);
        setCurrentPlayer("Player 1");
        return;
      }
    }
    if (currentPlayer === "Player 2" || ready) {
      if (card.code === player2Card?.code) {
        setPlayer2Card(undefined);
        setCurrentPlayer("Player 2");
        return;
      }
    }

    if (!ready) {
      if (currentPlayer === "Player 1") {
        setPlayer1Card(card);
        setCurrentPlayer("Player 2");
      } else {
        setPlayer2Card(card);
        setCurrentPlayer("Player 1");
      }
    }
  };

  const handleReady = () => {
    if (!ready) {
      return;
    }
    setPlayer1Card(undefined);
    setPlayer2Card(undefined);
    onCardsSelected({
      player1: {
        card: player1Card,
        copies: 1,
      },
      player2: {
        card: player2Card,
        copies: 1,
      },
    });
  };

  const isDiscarded = (card: Card) => {
    return player1Card && player2Card && !isSelected(card);
  };

  const isSelected = (card: Card) => {
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
      <h2 className="text-xl mb-4 text-gray-100 self-start">
        {ready ? (
          <>Change Anything?</>
        ) : (
          <>
            <span className="font-semibold text-2xl mr-4">{currentPlayer}</span>
            <span>select a card...</span>
          </>
        )}
      </h2>
      <div className="flex space-x-4 mb-8">
        {cards.map((card) => (
          <Card
            key={card.code}
            card={card}
            isSelected={isSelected(card)}
            isDiscarded={isDiscarded(card)}
            onClick={handleSelectCard}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <ReadyButton disabled={!ready} onClick={handleReady} />
      </div>
    </section>
  );
}

type CardProps = {
  card: Card;
  isSelected: Player | undefined;
  isDiscarded: boolean | undefined;
  onClick: (card: Card) => void;
};

function Card({ card, isSelected, isDiscarded, onClick }: CardProps) {
  return (
    <article
      key={card.code}
      className={c(
        "relative",
        "p-2 rounded-lg border-4",
        "min-w-[300px]",
        "shadow-md hover:shadow-lg transition duration-300",
        isSelected ? "border-white border-transition" : "border-transparent",
        isDiscarded && "blur-sm blur-transition"
      )}
      onClick={() => onClick(card)}
    >
      <>
        <img
          src={`/${card.code}.png`}
          style={{ width: "300px", height: "419px" }}
          alt={card.name}
        />
        {isSelected && (
          <figcaption
            className={c(
              "absolute top-0 right-0",
              "bg-white px-2 py-1 text-gray-800 font-semibold",
              "rounded-tl-lg border-b-4 border-l-4 border-gray-800"
            )}
          >
            {isSelected}
          </figcaption>
        )}
      </>
    </article>
  );
}
