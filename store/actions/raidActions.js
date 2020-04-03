/*
 * Actions Types
 */
export const types = {
    RAID_ADD: "RAID_ADD"
  };
  
  /*
   * Actions Creator
   */
  export const add = (guildId) => {
    return {
      type: types.RAID_ADD,
      guildId
    };
  };
  