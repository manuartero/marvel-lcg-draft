import { useState } from "react";
import { PlayerSelection } from "./components/player-selection";

import type { CardFaction } from "./services/cards";

import "./App.css";

export function App() {
  const [appState, setAppState] = useState<
    "player-selection" | "deck-building"
  >("player-selection");

  const playersReady = (selection: {
    player1Faction: CardFaction;
    player2Faction: CardFaction;
  }) => {
    console.log(selection);
    setAppState("deck-building");
  };

  if (appState === "player-selection") {
    return <PlayerSelection onReady={playersReady} />;
  }

  return <>TODO</>;
}
