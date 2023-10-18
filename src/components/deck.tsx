import c from "classnames";

import type { DeckCard, Player, PlayerDeck } from "app-domain";
import type { Card, CardFaction, CardType } from "services/cards";

import { Tooltip } from "elements/tooltip";
import { useBool } from "hooks/use-bool";
import "./deck.css";

type Props = {
  className?: string;
  playerDeck: PlayerDeck;
  player: Player;
};

export function Deck({ className, playerDeck, player }: Props) {
  const deckSortedByType = sortDeckByType(playerDeck.cards);

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
        <h1 className="text-xl">{playerDeck.hero.name}</h1>
        <h3>
          <span>{countCardsOnDeck(playerDeck.cards)}</span> / 25
        </h3>
      </div>

      <div className={`faction-claim-decorator-${playerDeck.faction}`}></div>
      {Object.keys(deckSortedByType).map((type) => (
        <div key={type}>
          <h2 className="text-xl font-bold text-slate-300 hover:text-slate-50">
            {type}
          </h2>
          <ul className="mt-2 flex flex-wrap">
            {deckSortedByType[type as CardType].map(({ card, copies }) =>
              Array.from({ length: copies }, (_, index) => (
                <li key={index} className="mr-2 ml-2">
                  <DeckCard card={card} />
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}

function sortDeckByType(deckCards: DeckCard[]) {
  return deckCards.reduce(
    (acc, deckCard) => {
      acc[deckCard.card.type].push(deckCard);
      return acc;
    },
    {
      Ally: [],
      Event: [],
      Support: [],
      Upgrade: [],
      Resource: [],
      "Player Side Scheme": [],
    } as Record<CardType, DeckCard[]>
  );
}

function DeckCard({ card }: { card: Card }) {
  const [showImage, toggleImage] = useBool();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={toggleImage}
      onMouseLeave={toggleImage}
    >
      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
      <Tooltip show={showImage}>
        <div className="flex flex-col justify-center p-2 w-[120px]">
          <img src={`/${card.code}.png`} className="mx-auto" alt={card.name} />
        </div>
      </Tooltip>
    </div>
  );
}

function backgroundGradient(faction: CardFaction) {
  switch (faction) {
    case "Aggression":
      return "from-red-900 to-transparent";
    case "Justice":
      return "from-yellow-900 to-transparent";
    case "Leadership":
      return "from-blue-900 to-transparent";
    case "Protection":
      return "from-green-900 to-transparent";
    case "Basic":
      return "from-gray-900 to-transparent";
  }
}

function countCardsOnDeck(cards: DeckCard[]) {
  return cards.reduce((acc, { copies }) => acc + copies, 0);
}
