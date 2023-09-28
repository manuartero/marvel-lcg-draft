import type { PlayerDeck } from "../domain";
import type { Card, CardFaction, CardType } from "../services/cards";
import c from "classnames";

type Props = {
  playerDeck: PlayerDeck;
};

export function Deck({ playerDeck }: Props) {
  const cardsSortedByType = sortCardsByType(playerDeck.cards);

  return (
    <div className="flex">
      <div
        className={c("w-1/4 p-4", getFactionClass(playerDeck.faction))}
        style={{ borderWidth: "4px" }}
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
      </div>
    </div>
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

function getFactionClass(faction: CardFaction) {
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
}
