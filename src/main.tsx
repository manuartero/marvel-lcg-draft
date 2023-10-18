import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { CollectionContextProvider } from "./contexts/collection-context.tsx";
import { DeckSettingsContextProvider } from "contexts/deck-settings-context.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DeckSettingsContextProvider>
      <CollectionContextProvider>
        <App />
      </CollectionContextProvider>
    </DeckSettingsContextProvider>
  </React.StrictMode>
);
