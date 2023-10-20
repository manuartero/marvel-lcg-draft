import c from "classnames";
import { ReadyButton } from "elements/ready-button";
import { useEffect, useState } from "react";
import { DraftCard } from "elements/draft-card";

import type { DeckCard, Player, Selection } from "app-domain";
import type { Card } from "services/cards";
import { useKeyboard } from "hooks/use-keyboard";

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
  const [player1, setPlayer1] = useState<DeckCard>();
  const [player2, setPlayer2] = useState<DeckCard>();

  useKeyboard({
    1: () => {
      handleSelectCard(cards[0]);
    },
    2: () => {
      handleSelectCard(cards[1]);
    },
    3: () => {
      handleSelectCard(cards[2]);
    },
  });

  useEffect(() => {
    setCurrentPlayer(startingPlayer);
  }, [startingPlayer]);

  const ready = player1?.card && player2?.card;

  const handleSelectCard = (card: Card) => {
    const tryingToSelectAlreadySelectedCard =
      (!ready &&
        currentPlayer === "Player 1" &&
        card.code === player2?.card.code) ||
      (!ready &&
        currentPlayer === "Player 2" &&
        card.code === player1?.card.code);

    if (tryingToSelectAlreadySelectedCard) {
      return;
    }

    if (currentPlayer === "Player 1" || ready) {
      if (card.code === player1?.card.code) {
        setPlayer1(undefined);
        setCurrentPlayer("Player 1");
        return;
      }
    }
    if (currentPlayer === "Player 2" || ready) {
      if (card.code === player2?.card.code) {
        setPlayer2(undefined);
        setCurrentPlayer("Player 2");
        return;
      }
    }

    if (!ready) {
      if (currentPlayer === "Player 1") {
        setPlayer1({ card, copies: 1 });
        setCurrentPlayer("Player 2");
      } else {
        setPlayer2({ card, copies: 1 });
        setCurrentPlayer("Player 1");
      }
    }
  };

  const handleChangeCopies = (card: Card, copies: number) => {
    if (card.code === player1?.card.code) {
      setPlayer1({ card, copies });
      return;
    }
    if (card.code === player2?.card.code) {
      setPlayer2({ card, copies });
      return;
    }
    console.error(
      "STATE ERROR: Trying to change copies of a card that is not selected: %o",
      card
    );
  };

  const handleReady = () => {
    if (!ready) {
      return;
    }
    setPlayer1(undefined);
    setPlayer2(undefined);
    onCardsSelected({
      player1,
      player2,
    });
  };

  const isDiscarded = (card: Card) => {
    return player1 && player2 && !isSelected(card);
  };

  const isSelected = (card: Card) => {
    if (card.code === player1?.card.code) {
      return "Player 1";
    }
    if (card.code === player2?.card.code) {
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
            <span className="font-semibold mr-4">{currentPlayer}</span>
            <span>select a card...</span>
          </>
        )}
      </h2>
      <div className="flex space-x-4 mb-8">
        {cards.map((card) => (
          <DraftCard
            key={card.code}
            card={card}
            isSelected={isSelected(card)}
            isDiscarded={isDiscarded(card)}
            onClick={handleSelectCard}
            onChangeCopies={handleChangeCopies}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <ReadyButton disabled={!ready} onClick={handleReady} />
      </div>
    </section>
  );
}
