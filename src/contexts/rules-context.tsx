import { createContext, useContext, useState } from "react";

type DraftMode = "pure-draft" | "sealed-deck";

type RulesContextType = {
  mode: "pure-draft" | "sealed-deck";
};

const RulesConext = createContext<RulesContextType>({
  mode: "pure-draft",
});

type Props = {
  children: React.ReactNode;
};

export function RulesContextProvider({ children }: Props) {
  const [mode, setMode] = useState<DraftMode>("pure-draft");

  return (
    <RulesConext.Provider value={{ mode }}>{children}</RulesConext.Provider>
  );
}

export function useRulesContext() {
  return useContext(RulesConext);
}
