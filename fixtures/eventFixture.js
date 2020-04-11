import BaseFixture from "./BaseFixture";
import { add } from "../store/actions/eventActions";

class EventFixture extends BaseFixture {
  constructor(guildId, eventData) {
    super(guildId);
    this.eventData = eventData;
  }

  install = () => {
    console.log("Installing event Fixture ...");
    this.getStore().dispatch(add(this.guildId, this.eventData));
  };
}

export const getEventFixtures = (guildId) => [
  new EventFixture(guildId, {
    name: "Molten Core",
    color: "#d01c0f",
    thumbnail: "https://www.heroesfire.com/images/wikibase/icon/heroes/ragnaros.png",
    players: 40
  }),
  new EventFixture(guildId, {
    name: "Blackwing Lair",
    color: "#d01c0f",
    thumbnail: "https://www.hearthstone-decks.com/css/images/champs-de-bataille/medaillons/nefarian.jpg",
    players: 40
  }),
  new EventFixture(guildId, {
    name: "Zul'Gurub",
    color: "#35662e",
    thumbnail: "https://pm1.narvii.com/6310/7f3fd09f09f45398612d7ecd00d15334ce244ff0_128.jpg",
    players: 20
    }),
  new EventFixture(guildId, {
    name: "Ruins of Ahn'Qiraj",
    color: "#a0800b",
    thumbnail: "https://vignette.wikia.nocookie.net/wow/images/c/c6/Ossirian_Art.jpg/revision/latest?cb=20190108175230&path-prefix=fr",
    players: 20
  }),
  new EventFixture(guildId, {
    name: "Temple of Ahn'Qiraj",
    color: "#aa6159",
    thumbnail: "https://pbs.twimg.com/profile_images/708711304047894528/QknwDXYy.jpg",
    players: 40
  }),
  new EventFixture(guildId, {
    name: "Naxxramas",
    color: "#d5ec83",
    thumbnail: "https://static.icy-veins.com/images/heroes/hero-portraits/kel-thuzad.jpg",
    players: 40
  }),
];
