import { useState } from "react";

import type { CardFaction } from "../services/cards";

type Props = {
  onReady: (selection: {
    player1Faction: CardFaction;
    player2Faction: CardFaction;
  }) => void;
};

export function PlayerSelection({ onReady }: Props) {
  const [player1Faction, setPlayer1Faction] = useState<CardFaction>();
  const [player2Faction, setPlayer2Faction] = useState<CardFaction>();

  return (
    <section className="h-screen flex justify-center items-center bg-gray-200">
      <article className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Player 1</h2>
        <section className="grid grid-cols-4 gap-4">
          <div
            className="w-12 h-12 bg-red-500 cursor-pointer"
            onClick={() => {
              setPlayer1Faction("Aggression");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-blue-500 cursor-pointer"
            onClick={() => {
              setPlayer1Faction("Leadership");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-yellow-500 cursor-pointer"
            onClick={() => {
              setPlayer1Faction("Justice");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-green-500 cursor-pointer"
            onClick={() => {
              setPlayer1Faction("Protection");
            }}
          ></div>
        </section>
      </article>
      <article className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Player 2</h2>
        <section className="grid grid-cols-4 gap-4">
          <div
            className="w-12 h-12 bg-red-500 cursor-pointer"
            onClick={() => {
              setPlayer2Faction("Aggression");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-blue-500 cursor-pointer"
            onClick={() => {
              setPlayer2Faction("Leadership");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-yellow-500 cursor-pointer"
            onClick={() => {
              setPlayer2Faction("Justice");
            }}
          ></div>
          <div
            className="w-12 h-12 bg-green-500 cursor-pointer"
            onClick={() => {
              setPlayer2Faction("Protection");
            }}
          ></div>
        </section>
      </article>
      {player1Faction && player2Faction && (
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
            onClick={() =>
              onReady({
                player1Faction,
                player2Faction,
              })
            }
          >
            READY!
          </button>
        </div>
      )}
    </section>
  );
}
