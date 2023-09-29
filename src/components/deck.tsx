import c from "classnames";

import type { PlayerDeck } from "../domain";
import type { Card, CardFaction, CardType } from "../services/cards";

type Props = {
  className?: string;
  playerDeck: PlayerDeck;
};

export function Deck({ className, playerDeck }: Props) {
  const cardsSortedByType = sortCardsByType(playerDeck.cards);

  const getFactionClass = (faction: CardFaction) => {
    switch (faction) {
      case "Aggression":
        return "border border-red-200 blur-red";
      case "Leadership":
        return "borderborder-blue-200 blur-blue";
      case "Justice":
        return "border border-yellow-200 blur-yellow";
      case "Protection":
        return "border border-green-200 blur-green";
    }
  };

  return (
    <section
      className={c(
        className,
        "flex flex-col justify-around p-4 pb-32",
        getFactionClass(playerDeck.faction)
      )}
    >
      {Object.keys(cardsSortedByType).map((type) => (
        <div key={type}>
          <h2 className="text-xl font-bold">{type}</h2>
          <ul className="mt-2">
            {cardsSortedByType[type as CardType].map((card) => (
              <li key={card.name} className="mb-2">
                {card.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function sortCardsByType(cards: Card[]) {
  return cards.reduce(
    (acc, card) => {
      acc[card.type].push(card);
      return acc;
    },
    {
      Ally: [],
      Event: [],
      Support: [],
      Upgrade: [],
      Resource: [],
      "Player Side Scheme": [],
    } as Record<CardType, Card[]>
  );
}
