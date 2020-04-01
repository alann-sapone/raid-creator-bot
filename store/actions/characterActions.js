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
export const add = (authorId, characterData) => {
  return {
    type: types.CHARACTER_ADD,
    authorId,
    characterData
  };
};

export const remove = (authorId, characterData) => {
  return {
    type: types.CHARACTER_REMOVE,
    authorId,
    characterData
  };
};

export const edit = (authorId, characterData) => {
  return {
    type: types.CHARACTER_EDIT,
    authorId,
    characterData
  };
};
