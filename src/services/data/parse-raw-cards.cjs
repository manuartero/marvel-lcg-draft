#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");
const https = require("https");
const rawCards = require("./raw-cards.json");

// CUSTOMIZE THE SCRIPT
const WRITE_TO_FILE = true;
const FETCH_IMAGES = true;

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
 *    image: string;
 *
 * write the output to ./cards.json
 *
 * for each card we are going additionally to fetch the image:
 *  https://marvelcdb.com/bundles/cards/${card.code}.png
 *
 * and save it to /public/${card.code}.png
 */

// --------------------------------------------------

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

const cards = parseCards();

if (WRITE_TO_FILE) {
  writeCardsJson();
}

if (FETCH_IMAGES) {
  fetchImages();
}

console.log("--done--");

function parseCards() {
  console.log("parsing cards...\n");
  return rawCards
    .filter(
      (card) =>
        allowedCardTypes.includes(card.type_name) &&
        allowedFactionNames.includes(card.faction_name)
    )
    .filter((card) => card.imagesrc) // XXX ONLY CARDS WITH IMAGES
    .map((card) => ({
      code: card.code,
      name: card.name,
      type: card.type_name,
      package: card.pack_name,
      faction: card.faction_name,
      deckLimit: card.deck_limit,
      image: `https://marvelcdb.com/${card.imagesrc}`,
    }));
}

function writeCardsJson() {
  console.log("writing to file...\n");
  fs.writeFileSync(
    path.join(__dirname, "cards.json"),
    JSON.stringify(cards, null, 2)
  );
}

async function fetchImages() {
  console.log("fetching images...\n");
  cards.forEach(async (card, index) => {
    console.log(`fetching ${card.code}`);
    const url = card.image;
    const dest = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      `${card.code}.png`
    );
    const file = fs.createWriteStream(dest);

    try {
      const request = https.get(url, async (response) => {
        if (response.statusCode !== 200) {
          throw new Error(`Failed to fetch ${url}`);
        }

        response.pipe(file);

        if (index < cards.length - 1) {
          await delay(300); // 300 ms
        }

        console.log(`saved to ${dest}`);
      });

      request.on("error", () => {
        fs.writeFileSync(dest, ""); // Create an empty file
      });
    } catch (err) {
      fs.writeFileSync(dest, ""); // Create an empty file
    }
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
