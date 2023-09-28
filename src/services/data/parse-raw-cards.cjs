#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");

const rawCards = require("./raw-cards.json");

const allowedCardTypes = [
  "Ally",
  "Event",
  "Support",
  "Upgrade",
  "Resource",
  "Player Side Scheme",
];

const allowedFactionNames = [
  "Aggression",
  "Justice",
  "Leadership",
  "Protection",
  "Basic",
];

/** filter any card that type_name is different from
 *    "Ally" | "Event" | "Support" | "Upgrade" | "Resource" | "Player Side Scheme";
 * or faction_name is different from
 *    "Aggression" | "Justice" | "Leadership" | "Protection" | "Basic";
 *
 * for each card we only consider:
 *    code: string; // id
 *    name: string;
 *    type: CardType;
 *    faction: CardFaction;
 *    package: CardPackage;
 *    deckLimit: 1 | 2 | 3;
 *
 * write the output to ./cards.json
 */
const cards = rawCards
  .filter(
    (card) =>
      allowedCardTypes.includes(card.type_name) &&
      allowedFactionNames.includes(card.faction_name)
  )
  .map((card) => ({
    code: card.code,
    name: card.name,
    type: card.type_name,
    package: card.pack_name,
    faction: card.faction_name,
    deckLimit: card.deck_limit,
  }));

fs.writeFileSync(
  path.join(__dirname, "cards.json"),
  JSON.stringify(cards, null, 2)
);

console.log("--done--");
