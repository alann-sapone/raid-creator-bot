
/*
import { roles, classes, talentTrees } from "./constant";
import { capitalize } from "./helpers/prototypes/string";

let roster2Composition = {};
Object.keys(classes).forEach(klass => {
  const name = classes[klass];
  const klassSpecialisations = talentTrees[name];

  Object.keys(klassSpecialisations).forEach(specialisationName => {
    const mergedName = capitalize(name) + capitalize(specialisationName);
    roster2Composition[mergedName] = {};
  });
});

const rosters = {
  1: {
    name: "Roster Zul Gurub, La Table Ronde",
    limit: 20,
    composition: {}
  },
  2: {
    name: "Roster 40, La Table Ronde",
    limit: 40,
    composition: roster2Composition
  }
};

export const eventsSources = {
  1: {
    name: "Zul Gurub",
    description: "Raid 20, 1er raid avec les copains",
    date: "29/03/2020",
    hour: "20h30",
    roster: rosters[1],
    author: "Fernandel",
    color: "#0fd01c",
    thumbnail:
      "https://www.heroesfire.com/images/wikibase/icon/heroes/ragnaros.png"
  },
  2: {
    title: "Molten Core",
    description: "Groupage 20h20 / Pull à 20h45",
    date: "30/03/2020",
    hour: "20h45",
    roster: rosters[2],
    author: "Akryptik",
    thumbnail:
      "https://www.heroesfire.com/images/wikibase/icon/heroes/ragnaros.png",
    color: "#d01c0f"
  }
};

export const characters = {};

export const realData = {};
*/