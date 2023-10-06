import type { CardPackage } from "services/cards";

const LOCAL_STORAGE_KEY = "collection";

export function readCollectionFromLocalStorage() {
  const savedPackages = localStorage.getItem(LOCAL_STORAGE_KEY);
  let collection: Record<CardPackage, boolean> | null = null;
  if (savedPackages) {
    try {
      collection = JSON.parse(savedPackages);
    } catch (e) {
      console.error(e);
    }
  }
  return collection;
}

export function writeCollectionToLocalStorage(
  collection: Record<CardPackage, boolean>
) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(collection));
}
