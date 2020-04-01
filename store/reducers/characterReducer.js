import { types } from "../actions/characterActions";
import produce from "immer";

const initialState = {};

export default function characterReducer(state = initialState, action) {
  const { type, authorId, characterData } = action;
  switch (type) {
    case types.CHARACTER_ADD:
      const nextState = produce(state, draftState => {
        if (!state[authorId]) draftState[authorId] = [];
        draftState[authorId].push(characterData);
      });

      console.log(state, nextState);
      return nextState;

    case types.CHARACTER_EDIT:
      return state;

    case types.CHARACTER_REMOVE:
      return state;

    default:
      return state;
  }
}
