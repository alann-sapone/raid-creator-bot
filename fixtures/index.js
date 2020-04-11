import { getCharacterFixtures } from "./CharacterFixture";
import { getRosterFixtures } from "./RosterFixture";

export const installFixtures = (guildId, userID) => {
  // Characters
  getCharacterFixtures(guildId, userID).forEach(fixture => {
    fixture.install();
  });

  // Roster
  getRosterFixtures(guildId).forEach(fixture => {
    fixture.install();
  });
};
