import { cardPackages } from "../services/cards";
import type { CardPackage } from "../services/cards";

const BIG_BOXES: CardPackage[] = [
  "Core Set",
  "The Rise of Red Skull",
  "Galaxy's Most Wanted",
  "The Mad Titan's Shadow",
  "Sinister Motives",
  "Mutant Genesis",
  "NeXt Evolution",
];

/**
 * return
 * {
 *    "Core Set": [ "Captain America", ....],
 *    "The Rise of Red Skull": [ "Ant-Man", ....],
 *    "Galaxy's Most Wanted": [ "Star-Lord", ....],
 *    ....
 * }
 */
export function groupPackagesByWaves(): Record<CardPackage, CardPackage[]> {
  const waves = {} as Record<CardPackage, CardPackage[]>;

  let currentBigBox: CardPackage | undefined;

  for (const pkg of cardPackages) {
    if (BIG_BOXES.includes(pkg)) {
      currentBigBox = pkg;
      waves[currentBigBox] = [];
    } else if (currentBigBox) {
      waves[currentBigBox].push(pkg);
    }
  }

  return waves;
}
