import c from "classnames";
import { useRulesContext } from "contexts/rules-context";
import { Counter } from "elements/counter";

import type { Player } from "app-domain";
import type { Card } from "services/cards";

type Props = {
  card: Card;
  isSelected: Player | undefined;
  isDiscarded: boolean | undefined;
  onClick: (card: Card) => void;
  onChangeCopies: (card: Card, copies: number) => void;
};

export function DraftCard({
  card,
  isSelected,
  isDiscarded,
  onClick,
  onChangeCopies,
}: Props) {
  const { mode } = useRulesContext();

  return (
    <article
      key={card.code}
      className={c(
        "relative",
        "p-2 rounded-lg border-4",
        "min-w-[280px]",
        "cursor-pointer",
        "shadow-md hover:shadow-lg transition duration-300",
        isSelected ? "border-white border-transition" : "border-gray-900",
        !isSelected &&
          !isDiscarded &&
          "opacity-80 hover:opacity-100 transition duration-300",
        !isSelected &&
          !isDiscarded &&
          "hover:border-gray-800 transition duration-300",
        isDiscarded && "blur-sm opacity-40"
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
        {mode !== "pure-draft" && isSelected && (
          <div
            className="absolute bottom-0 left-0 right-0 px-1 py-4 bg-opacity-75 bg-white"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <Counter
              onChange={(copies) => onChangeCopies(card, copies)}
              maxValue={card.deckLimit}
            />
          </div>
        )}
      </>
    </article>
  );
}
