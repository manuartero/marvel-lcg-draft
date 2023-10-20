import c from "classnames";
import { useDeckSettingsContext } from "contexts/deck-settings-context";
import { Tooltip } from "elements/tooltip";
import { useBool } from "hooks/use-bool";

import type { DeckCard, Player, PlayerDeck } from "app-domain";
import type { Card, CardFaction, CardType } from "services/cards";

import "./deck.css";

type Props = {
  className?: string;
  playerDeck: PlayerDeck;
  player: Player | string;
};

export function Deck({ className, playerDeck, player }: Props) {
  const { deckSize } = useDeckSettingsContext();
  const deckSortedByType = sortDeckByType(playerDeck);

  return (
    <section
      className={c(
        className,
        "flex flex-col justify-around p-4 pb-32 h-full",
        "border-gray-700",
        player === "Player 1" && "bg-gradient-to-r border-r-4",
        player === "Player 2" && "bg-gradient-to-l border-l-4",
        player !== "Player 1" &&
          player !== "Player 2" &&
          "bg-gradient-to-b border-4",
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
          <span>{countCardsOnDeck(playerDeck.cards)}</span> / {deckSize - 15}
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

function sortDeckByType(deck: PlayerDeck) {
  const cardIsUselessForThisDeck = ({ card }: DeckCard) =>
    card.faction !== "Basic" && card.faction !== deck.faction;

  return deck.cards.reduce(
    (acc, deckCard) => {
      if (cardIsUselessForThisDeck(deckCard)) {
        acc["Resource"].push(deckCard);
      } else {
        acc[deckCard.card.type].push(deckCard);
      }
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
      <div
        className={c(
          "w-4 h-5 rounded-sm",
          factionColor(card.faction),
          "border-2 border-gray-300"
        )}
      ></div>
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

function factionColor(faction: CardFaction) {
  switch (faction) {
    case "Aggression":
      return "bg-red-700";
    case "Justice":
      return "bg-yellow-700";
    case "Leadership":
      return "bg-blue-700";
    case "Protection":
      return "bg-green-700";
    case "Basic":
      return "bg-gray-700";
  }
}

function countCardsOnDeck(cards: DeckCard[]) {
  return cards.reduce((acc, { copies }) => acc + copies, 0);
}
