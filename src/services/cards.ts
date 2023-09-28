import cards from "./data/cards.json";

export type CardPackage =
  | "Core Set"
  | "Captain America"
  | "The Rise of Red Skull"
  | "Ms. Marvel"
  | "Thor"
  | "Black Widow"
  | "Doctor Strange"
  | "Hulk"
  | "The Rise of Red Skull"
  | "Ant-Man"
  | "Wasp"
  | "Quicksilver"
  | "Scarlet Witch"
  | "Galaxy's Most Wanted"
  | "Star-Lord"
  | "Gamora"
  | "Drax"
  | "Venom"
  | "The Mad Titan's Shadow"
  | "Nebula"
  | "War Machine"
  | "Valkyrie"
  | "Vision"
  | "Sinister Motives"
  | "Nova"
  | "Ironheart"
  | "Spider-Ham"
  | "SP//dr"
  | "Mutant Genesis"
  | "Cyclops"
  | "Phoenix"
  | "Wolverine"
  | "Storm"
  | "Gambit"
  | "Rogue"
  | "NeXt Evolution"
  | "Psylocke"
  | "Angel";

export type CardType =
  | "Ally"
  | "Event"
  | "Support"
  | "Upgrade"
  | "Resource"
  | "Player Side Scheme";

type _CardType = CardType & ("Hero" | "Alter-Ego");

export type CardFaction =
  | "Aggression"
  | "Justice"
  | "Leadership"
  | "Protection"
  | "Basic";

type _CardFaction = CardFaction & ("Hero" | "Campaign");

export type Card = {
  code: string; // id
  name: string;
  type: CardType;
  faction: CardFaction;
  package: CardPackage;
  deckLimit: 1 | 2 | 3;
};

export function getCards(): Card[] {
  return cards as Card[];
}
