/*
 * Actions Types
 */
export const types = {
    EVENT_ADD: "EVENT_ADD",
    EVENT_REMOVE: "EVENT_REMOVE",
  };
  
  /*
   * Actions Creator
   */
  export const add = (guildId, eventData) => {
    return {
      type: types.EVENT_ADD,
      guildId,
      eventData
    };
  };
  
  export const remove = (guildId, eventIndex) => {
    return {
      type: types.EVENT_REMOVE,
      guildId,
      eventIndex
    };
  };