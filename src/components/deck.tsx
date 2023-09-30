import c from "classnames";

import type { PlayerDeck } from "../domain";
import type { Card, CardFaction, CardType } from "../services/cards";

import "./../assets/deck.css";

type Props = {
  className?: string;
  playerDeck: PlayerDeck;
  player: "Player 1" | "Player 2";
};

export function Deck({ className, playerDeck, player }: Props) {
  const cardsSortedByType = sortCardsByType(playerDeck.cards);

  const getFactionClass = (faction: CardFaction) => {
    switch (faction) {
      case "Aggression":
        return "blur-red gradient-red";
      case "Leadership":
        return "blur-blue gradient-blue";
      case "Justice":
        return "blur-yellow gradient-yellow";
      case "Protection":
        return "blur-green gradient-green";
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
      <h1 className={c(`faction-claim-${playerDeck.faction}`, 'text-xl')}>
        {player}
      </h1>
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
