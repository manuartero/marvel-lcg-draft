import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { CollectionContextProvider } from "./contexts/collection-context.tsx";
import { DeckSettingsContextProvider } from "contexts/deck-settings-context.tsx";
import { RulesContextProvider } from "contexts/rules-context.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RulesContextProvider>
      <DeckSettingsContextProvider>
        <CollectionContextProvider>
          <App />
        </CollectionContextProvider>
      </DeckSettingsContextProvider>
    </RulesContextProvider>
  </React.StrictMode>
);
