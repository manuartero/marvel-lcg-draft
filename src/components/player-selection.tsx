import c from "classnames";
import { useState } from "react";
import { ReadyButton } from "elements/ready-button";

import type { Selection } from "app-domain";
import type { CardFaction } from "services/cards";

import "./player-selection.css";

type Props = {
  onReady: (selection: Selection<CardFaction>) => void;
};

export function PlayerSelection({ onReady }: Props) {
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

  const isReady = player1Faction && player2Faction;

  const handleReady = () => {
    if (isReady) {
      onReady({ player1: player1Faction, player2: player2Faction });
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <Player
        faction={player1Faction}
        title="Player 1"
        setter={setPlayer1Faction}
      />
      <Player
        faction={player2Faction}
        title="Player 2"
        setter={setPlayer2Faction}
      />
      <div className="flex justify-center mt-4">
        <ReadyButton disabled={!isReady} onClick={handleReady} />
      </div>
    </section>
  );
}

type PlayerProps = {
  title: string;
  setter: React.Dispatch<React.SetStateAction<CardFaction | undefined>>;
  faction: CardFaction | undefined;
};

function Player({ title, setter, faction }: PlayerProps) {
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
          {faction && (
            <h3 className={c(`faction-claim-${faction}`, "mr-8")}>{faction}</h3>
          )}
        </div>
      </div>

      <section className="flex justify-around mt-4 mb-4">
        <div
          className={`color-box bg-red-500 cursor-pointer ${
            faction === "Aggression" && "selected"
          }`}
          onClick={() => {
            setter("Aggression");
          }}
        ></div>
        <div
          className={`color-box bg-blue-500 cursor-pointer ${
            faction === "Leadership" && "selected"
          }`}
          onClick={() => {
            setter("Leadership");
          }}
        ></div>
        <div
          className={`color-box bg-yellow-500 cursor-pointer ${
            faction === "Justice" && "selected"
          }`}
          onClick={() => {
            setter("Justice");
          }}
        ></div>
        <div
          className={`color-box bg-green-500 cursor-pointer ${
            faction === "Protection" && "selected"
          }`}
          onClick={() => {
            setter("Protection");
          }}
        ></div>
      </section>
    </article>
  );
}
