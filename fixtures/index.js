import { getCharacterFixtures } from "./CharacterFixture";
import { getRosterFixtures } from "./RosterFixture";
import { getEventFixtures } from "./eventFixture";

export const installFixtures = (guildId, userID) => {
  // Characters
  getCharacterFixtures(guildId, userID).forEach(fixture => {
    fixture.install();
  });

  // Roster
  getRosterFixtures(guildId).forEach(fixture => {
    fixture.install();
  });

  // Event
  getEventFixtures(guildId).forEach(fixture => {
    fixture.install();
  });
};
