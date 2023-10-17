import cards from "./data/cards.json";

export const cardPackages = [
  "Core Set",
  "Captain America",
  "Ms. Marvel",
  "Thor",
  "Black Widow",
  "Doctor Strange",
  "Hulk",
  "The Rise of Red Skull",
  "Ant-Man",
  "Wasp",
  "Quicksilver",
  "Scarlet Witch",
  "Galaxy's Most Wanted",
  "Star-Lord",
  "Gamora",
  "Drax",
  "Venom",
  "The Mad Titan's Shadow",
  "Nebula",
  "War Machine",
  "Valkyrie",
  "Vision",
  "Sinister Motives",
  "Nova",
  "Ironheart",
  "Spider-Ham",
  "SP//dr",
  "Mutant Genesis",
  "Cyclops",
  "Phoenix",
  "Wolverine",
  "Storm",
  "Gambit",
  "Rogue",
  "NeXt Evolution",
  "Psylocke",
  "Angel",
] as const;

export type CardPackage = (typeof cardPackages)[number];

export type CardType =
  | "Ally"
  | "Event"
  | "Support"
  | "Upgrade"
  | "Resource"
  | "Player Side Scheme";

export type CardFaction =
  | "Aggression"
  | "Justice"
  | "Leadership"
  | "Protection"
  | "Basic";

export type Card = {
  code: string; // id
  name: string;
  type: CardType;
  faction: CardFaction;
  package: CardPackage;
  deckLimit: 1 | 2 | 3;
};

export type HeroCard = {
  code: string; // id
  name: string;
  package: CardPackage;
};


export function getCardPool(): Card[] {
  return cards as Card[];
}

export const BASIC_RESOURCES = [
  '01088', // Energy
  '01089', // Genius
  '01090', // Strength
]
