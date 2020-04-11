/*
 * Actions Types
 */
export const types = {
  ROSTER_ADD: "ROSTER_ADD",
  ROSTER_EDIT: "ROSTER_EDIT",
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
export const edit = (guildId, rosterIndex, rosterData) => {
  return {
    type: types.ROSTER_EDIT,
    guildId,
    rosterIndex,
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