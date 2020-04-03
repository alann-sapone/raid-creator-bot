import { getCharacterFixtures } from "./CharacterFixture";

export const installFixtures = (guildId, userID) => {
  // Characters
  getCharacterFixtures(guildId, userID).forEach(fixture => {
    fixture.install();
  });
};
