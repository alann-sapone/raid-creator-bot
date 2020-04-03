/*
 * Actions Types
 */
export const types = {
  CHARACTER_ADD: "CHARACTER_ADD",
  CHARACTER_REMOVE: "CHARACTER_REMOVE",
};

/*
 * Actions Creator
 */
export const add = (guildId, authorId, characterData) => {
  return {
    type: types.CHARACTER_ADD,
    guildId,
    authorId,
    characterData
  };
};

export const remove = (guildId, authorId, flattenedCharacter) => {
  return {
    type: types.CHARACTER_REMOVE,
    guildId,
    authorId,
    flattenedCharacter
  };
};