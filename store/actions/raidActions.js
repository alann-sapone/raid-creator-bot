/*
 * Actions Types
 */
export const types = {
  RAID_ADD: "RAID_ADD",
  RAID_JOIN: "RAID_JOIN",
  RAID_LEAVE: "RAID_LEAVE"
};
  
/*
  * Actions Creator
  */
export const add = (guildId, messageId, event, profile) => {
  return {
    type: types.RAID_ADD,
    guildId, messageId, event, profile
  };
};

export const join = (guildId, messageId, characterId) => {
  return {
    type: types.RAID_ADD,
    guildId, messageId, characterId
  };
};
