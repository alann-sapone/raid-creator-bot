/*
 * Actions Types
 */
export const types = {
  EMOJI_ADD: "EMOJI_ADD"
};

/*
 * Actions Creator
 */
export const add = (guildId, name, emoji) => {
  return {
    type: types.EMOJI_ADD,
    guildId,
    name,
    emoji
  };
};
