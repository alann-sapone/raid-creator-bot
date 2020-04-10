/*
 * Actions Types
 */
export const types = {
  CONFIG_SET: "CONFIG_SET",
  CONFIG_INIT: "CONFIG_INIT"
};

/*
 * Actions Creator
 */
export const add = (guildId, key, value) => {
  return {
    type: types.CONFIG_SET,
    guildId,
    key,
    value,
  };
};

export const init = (guildId) => {
  return {
    type: types.CONFIG_INIT,
    guildId
  };
};
