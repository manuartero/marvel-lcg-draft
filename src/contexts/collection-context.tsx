import { createContext, useContext, useState } from "react";
import { cardPackages } from "services/cards";
import type { CardPackage } from "services/cards";

type CollectionContextType = {
  packages: Record<CardPackage, boolean>;
  togglePackage: (pkg: CardPackage) => void;
};

const defaultPackages = cardPackages.reduce((acc, pkg) => {
  if (pkg === "Core Set") {
    return { ...acc, [pkg]: true };
  }
  return { ...acc, [pkg]: false };
}, {} as Record<CardPackage, boolean>);

const CollectionContext = createContext<CollectionContextType>({
  packages: defaultPackages,
  togglePackage: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function CollectionContextProvider({ children }: Props): JSX.Element {
  const [packages, setPackages] =
    useState<Record<CardPackage, boolean>>(defaultPackages);

  const togglePackage = (pkg: CardPackage) => {
    setPackages((prev) => ({ ...prev, [pkg]: !prev[pkg] }));
  };

  return (
    <CollectionContext.Provider
      value={{
        packages,
        togglePackage,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  return useContext(CollectionContext);
}
