/*
 * Actions Types
 */
export const types = {
  ROSTER_ADD: "ROSTER_ADD",
  ROSTER_REMOVE: "ROSTER_REMOVE",
};

/*
 * Actions Creator
 */
export const add = (guildId, rosterData) => {
  return {
    type: types.ROSTER_ADD,
    guildId,
    rosterData
  };
};

export const remove = (guildId, rosterIndex) => {
  return {
    type: types.ROSTER_REMOVE,
    guildId,
    rosterIndex
  };
};