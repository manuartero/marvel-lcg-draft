import { useState } from "react";
import { ReadyButton } from "./ready-button";

import type { CardFaction } from "../services/cards";
import type { Selection } from "../domain";

type Props = {
  onReady: (selection: Selection<CardFaction>) => void;
};

export function PlayerSelection({ onReady }: Props) {
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-gray-200">
      <Player title="Player 1" setter={setPlayer1Faction} />
      <Player title="Player 2" setter={setPlayer2Faction} />
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
};

function Player({ title, setter }: PlayerProps) {
  return (
    <article className="w-1/2 bg-white p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <section className="grid grid-cols-2 gap-4">
        <div
          className="w-12 h-12 bg-red-500 cursor-pointer"
          onClick={() => {
            setter("Aggression");
          }}
        ></div>
        <div
          className="w-12 h-12 bg-blue-500 cursor-pointer"
          onClick={() => {
            setter("Leadership");
          }}
        ></div>
        <div
          className="w-12 h-12 bg-yellow-500 cursor-pointer"
          onClick={() => {
            setter("Justice");
          }}
        ></div>
        <div
          className="w-12 h-12 bg-green-500 cursor-pointer"
          onClick={() => {
            setter("Protection");
          }}
        ></div>
      </section>
    </article>
  );
}
