import c from "classnames";
import { useState } from "react";
import { ReadyButton } from "elements/ready-button";

import type { Selection } from "app-domain";
import type { CardFaction, HeroCard } from "services/cards";

import "./player-selection.css";
import { useHeroDraft } from "hooks/use-draft";

type PlayerOptions<T> = {
  key: string;
  value: T;
  backgroundColor?: string;
  backgroundImage?: string;
}[];

type HeroSelectionProps = {
  onReady: (sel: Selection<HeroCard>) => void;
};

const heroAsOption = (hero: HeroCard) => ({
  key: hero.name,
  value: { ...hero, toString: () => hero.name },
  backgroundImage: `/${hero.code}.png`,
});

export function HeroSelection({ onReady }: HeroSelectionProps) {
  const { getHeroes } = useHeroDraft();

  return (
    <PlayerSelection
      onReady={onReady}
      player1Options={getHeroes().map(heroAsOption)}
      player2Options={getHeroes().map(heroAsOption)}
    />
  );
}

type FactionSelectionProps = {
  onReady: (sel: Selection<CardFaction>) => void;
};

const factions: PlayerOptions<CardFaction> = [
  {
    key: "Aggression Faction",
    value: "Aggression",
    backgroundColor: "bg-red-500",
  },
  {
    key: "Leadership Faction",
    value: "Leadership",
    backgroundColor: "bg-blue-500",
  },
  {
    key: "Justice Faction",
    value: "Justice",
    backgroundColor: "bg-yellow-500",
  },
  {
    key: "Protection Faction",
    value: "Protection",
    backgroundColor: "bg-green-500",
  },
];

export function FactionSelection({ onReady }: FactionSelectionProps) {
  return (
    <PlayerSelection
      onReady={onReady}
      player1Options={factions}
      player2Options={factions}
    />
  );
}

type PlayerSelectionProps<T> = {
  onReady: (sel: Selection<T>) => void;
  player1Options: PlayerOptions<T>;
  player2Options: PlayerOptions<T>;
};

function PlayerSelection<T>({
  onReady,
  player1Options,
  player2Options,
}: PlayerSelectionProps<T>) {
  const [player1Selection, setPlayer1Selection] = useState<T>();
  const [player2Selection, setPlayer2Selection] = useState<T>();

  const isReady = player1Selection && player2Selection;

  const handleReady = () => {
    if (isReady) {
      onReady({ player1: player1Selection, player2: player2Selection });
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <PlayerRow
        title="Player 1"
        value={player1Selection}
        options={player1Options}
        onSelect={setPlayer1Selection}
      />
      <PlayerRow
        title="Player 2"
        value={player2Selection}
        options={player2Options}
        onSelect={setPlayer2Selection}
      />
      <div className="flex justify-center mt-4">
        <ReadyButton disabled={!isReady} onClick={handleReady} />
      </div>
    </section>
  );
}

type PlayerFactionProps<T> = {
  title: string;
  value: T | undefined;
  options: PlayerOptions<T>;
  onSelect: React.Dispatch<React.SetStateAction<T | undefined>>;
};

function PlayerRow<T>({
  title,
  value,
  options,
  onSelect,
}: PlayerFactionProps<T>) {
  return (
    <article
      id="color-picker-container"
      className="w-1/2 bg-white p-4 rounded-lg shadow-lg mt-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold me-2">{title}</h2>
        </div>
        <div>
          {value && (
            <h3 className={c(`faction-claim-${value}`, "mr-8")}>
              {value.toString()}
            </h3>
          )}
        </div>
      </div>

      <section className="flex justify-around mt-4 mb-4" role="group">
        {options.map((option) => (
          <div
            key={option.key}
            className={c(
              "hero-min",
              "color-box cursor-pointer",
              option.backgroundColor,
              value === option.value && "selected",
              option.backgroundImage && "bg-cover bg-no-repeat"
            )}
            aria-label={option.key}
            onClick={() => {
              onSelect(option.value);
            }}
            style={
              option.backgroundImage
                ? { backgroundImage: `url(${option.backgroundImage})` }
                : {}
            }
          ></div>
        ))}
      </section>
    </article>
  );
}
