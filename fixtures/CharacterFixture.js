import BaseFixture from "./BaseFixture";
import { add } from "../store/actions/characterActions";

class CharacterFixture extends BaseFixture {
  constructor(guildId, userID, characterData) {
    super(guildId, userID);
    this.characterData = characterData;
  }

  install = () => {
    console.log("Installing character Fixture ...");

    this.getStore().dispatch(
      add(this.guildId, this.userID, this.characterData)
    );
  };
}

export const getCharacterFixtures = (guildId, userID) => [
  new CharacterFixture(guildId, userID, {
    faction: "HORDE",
    name: "Akryptik",
    class: "WARLOCK",
    specialisation: "Destruction"
  }),
  new CharacterFixture(guildId, userID, {
    faction: "HORDE",
    name: "Queudbelette",
    class: "WARRIOR",
    specialisation: "Fury"
  }),
  new CharacterFixture(guildId, userID, {
    faction: "HORDE",
    name: "Akryptik",
    class: "WARLOCK",
    specialisation: "Demonology"
  }),
  new CharacterFixture(guildId, userID, {
    faction: "ALLIANCE",
    name: "Akryptik",
    class: "ROGUE",
    specialisation: "Assassination"
  })
];
