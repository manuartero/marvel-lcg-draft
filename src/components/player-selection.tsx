import { useState } from "react";
import { ReadyButton } from "../elements/ready-button";

import type { CardFaction } from "../services/cards";
import type { Selection } from "../domain";

import "./../assets/player-selection.css";

type Props = {
  onReady: (selection: Selection<CardFaction>) => void;
};

export function PlayerSelection({ onReady }: Props) {
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

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
        {player1Faction && player2Faction && (
          <ReadyButton
            onClick={() => {
              onReady({ player1: player1Faction, player2: player2Faction });
            }}
          />
        )}
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
      <div className="flex items-center  mb-4">
        <h2 className="text-2xl font-semibold me-1">{title}</h2>
        {faction && (
          <h2 className={`faction-claim-${faction}`}> - faction {faction}</h2>
        )}
      </div>

      <section className="flex justify-around">
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
