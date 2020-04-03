// store
import store from "../../store/store";

export const flattenPlayerCharacters = characters => {
  const normalized = [];

  const factionsIDs = Object.keys(characters);
  factionsIDs.forEach(factionID => {
    const factionCharacters = characters[factionID];
    const charactersNames = Object.keys(factionCharacters);
    charactersNames.forEach(characterName => {
      normalized.push({
        faction: factionID,
        name: characterName,
        data: factionCharacters[characterName]
      });
    });
  });

  return normalized;
};

export const getCharacters = (guild, author) => {
  let characters = [];
  try {
    characters = store.getState().characters[guild.id][author.id];
  } catch (error) {}

  return characters;
};

export const getBaseCharacter = (guildId, userId, name, faction) => {
  try {
    return store.getState().characters[guildId][userId][faction][name];
  } catch (error) {
    return false;
  }
};
