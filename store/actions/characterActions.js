/*
 * Actions Types
 */
export const types = {
  CHARACTER_ADD: "CHARACTER_ADD",
  CHARACTER_REMOVE: "CHARACTER_REMOVE",
  CHARACTER_EDIT: "CHARACTER_EDIT"
};

/*
 * Actions Creator
 */
export const add = (serverId, characterData) => {
  return {
    type: types.CHARACTER_ADD,
    serverId,
    characterData
  };
};

export const remove = (serverId, characterData) => {
  return {
    type: types.CHARACTER_REMOVE,
    serverId,
    characterData
  };
};

export const edit = (serverId, characterData) => {
  return {
    type: types.CHARACTER_EDIT,
    serverId,
    characterData
  };
};
