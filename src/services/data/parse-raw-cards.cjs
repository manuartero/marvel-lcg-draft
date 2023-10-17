#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");
const https = require("https");
const rawCards = require("./raw-cards.json");

// CUSTOMIZE THE SCRIPT
const WRITE_TO_FILE = false;
const FETCH_IMAGES = false;
const FETCH_HEROES = true;
const FETCH_HERO_IMAGES = true;

/**
 * filter any card that type_name is different from
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
 *
 * ;
 *
 * for each hero:
 *   code: string; // id
 *   name: string;
 *   package: CardPackage;
 *   image: string;
 *
 * write the output to ./heroes.json
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

if (WRITE_TO_FILE) {
  const cards = parseCards();
  writeJSON(cards, "cards.json");
  if (FETCH_IMAGES) {
    fetchImages(cards);
  }
}

if (FETCH_HEROES) {
  const heroes = fetchHeroes();
  writeJSON(heroes, "heroes.json");
  if (FETCH_HERO_IMAGES) {
    fetchImages(heroes);
  }
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

function fetchHeroes() {
  console.log("fetching heroes...\n");
  return rawCards
    .filter((card) => card.type_name === "Hero")
    .map((card) => ({
      code: card.code,
      name: card.name,
      package: card.pack_name,
      image: `https://marvelcdb.com/${card.imagesrc}`,
    }));
}

function writeJSON(obj, fileName) {
  console.log("writing to file...\n");
  fs.writeFileSync(
    path.join(__dirname, fileName),
    JSON.stringify(obj, null, 2)
  );
}

async function fetchImages(cards) {
  console.log("fetching images...\n");
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    if (!card.code) {
      console.warn("no card code: ", card);
      continue;
    }

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

    try {
      await fetchImage(url, dest);
      console.log(`saved to ${dest}`);

      if (index < cards.length - 1) {
        await delay(300); // 300 ms
      }
    } catch (err) {
      fs.writeFileSync(dest, ""); // Create an empty file
    }
  }
}

async function fetchImage(url, dest) {
  const file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}`));
      }

      response.pipe(file);
      resolve();
    });

    request.on("error", (err) => {
      fs.writeFileSync(dest, ""); // Create an empty file
      reject(err);
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
