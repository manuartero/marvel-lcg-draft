import { createContext, useContext, useEffect, useState } from "react";
import { cardPackages } from "services/cards";
import {
  readCollectionFromLocalStorage,
  writeCollectionToLocalStorage,
} from "./local-storage";

import type { CardPackage } from "services/cards";

type Collection = Record<CardPackage, boolean>;

type CollectionContextType = {
  packages: Collection;
  togglePackage: (pkg: CardPackage) => void;
};

const defaultPackages = cardPackages.reduce((acc, pkg) => {
  if (pkg === "Core Set") {
    return { ...acc, [pkg]: true };
  }
  return { ...acc, [pkg]: false };
}, {} as Collection);

const CollectionContext = createContext<CollectionContextType>({
  packages: defaultPackages,
  togglePackage: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function CollectionContextProvider({ children }: Props): JSX.Element {
  const [packages, setPackages] = useState<Collection>(defaultPackages);

  useEffect(() => {
    const savedPackages = readCollectionFromLocalStorage();
    if (savedPackages) {
      setPackages(savedPackages);
    }
  }, []);

  const togglePackage = (pkg: CardPackage) => {
    const collection = { ...packages, [pkg]: !packages[pkg] };
    setPackages(collection);
    writeCollectionToLocalStorage(collection);
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
