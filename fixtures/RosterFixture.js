import BaseFixture from "./BaseFixture";
import { add } from "../store/actions/rosterActions";

class RosterFixture extends BaseFixture {
  constructor(guildId, rosterData) {
    super(guildId);
    this.rosterData = rosterData;
  }

  install = () => {
    console.log("Installing roster Fixture ...");
    this.getStore().dispatch(add(this.guildId, this.rosterData));
  };
}

export const getRosterFixtures = (guildId) => [
  new RosterFixture(guildId, {
    name: "Raid 40",
    roleLimit: {
      TANK: 7,
      HEALER: 12
    }
  }),
  new RosterFixture(guildId, {
    name: "Unlimited"
  }),
  new RosterFixture(guildId, {
    name: "Raid 20",
    roleLimit: {
      TANK: 4,
      HEALER: 8
    }
  }),
];
