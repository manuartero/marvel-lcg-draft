import c from "classnames";

import type { Player, PlayerDeck } from "../domain";
import type { Card, CardFaction, CardType } from "../services/cards";

import "./deck.css";

type Props = {
  className?: string;
  playerDeck: PlayerDeck;
  player: Player;
};

export function Deck({ className, playerDeck, player }: Props) {
  const cardsSortedByType = sortCardsByType(playerDeck.cards);

  const backgroundGradient = (faction: CardFaction) => {
    switch (faction) {
      case "Aggression":
        return `from-red-900 to-trasparent`;
      case "Leadership":
        return "from-blue-900 to-transparent";
      case "Justice":
        return "from-yellow-900 to-transparent";
      case "Protection":
        return "from-green-900 to-transparent";
    }
  };

  return (
    <section
      className={c(
        className,
        "flex flex-col justify-around p-4 pb-32",
        player === "Player 1" ? "bg-gradient-to-r" : "bg-gradient-to-l",
        backgroundGradient(playerDeck.faction)
      )}
    >
      <div
        className={c(
          "flex justify-between",
          `faction-claim-${playerDeck.faction}`
        )}
      >
        <h1 className="text-xl">{player}</h1>
        <h3>
          <span>{playerDeck.cards.length}</span> / 25
        </h3>
      </div>

      <div className={`faction-claim-decorator-${playerDeck.faction}`}></div>
      {Object.keys(cardsSortedByType).map((type) => (
        <div key={type}>
          <h2 className="text-xl font-bold cursor-pointer text-slate-300 hover:text-slate-50">
            {type}
          </h2>
          <ul className="mt-2">
            {cardsSortedByType[type as CardType].map((card) => (
              <li key={card.name} className="mb-2 text-slate-400">
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
