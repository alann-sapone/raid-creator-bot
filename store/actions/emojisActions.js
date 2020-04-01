/*
 * Actions Types
 */
export const types = {
  EMOJI_ADD: "EMOJI_ADD"
};

/*
 * Actions Creator
 */
export const add = (guildId, id, name) => {
  return {
    type: types.EMOJI_ADD,
    guildId,
    id,
    name
  };
};
