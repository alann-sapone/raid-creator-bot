import { types } from "../actions/emojisActions";
import produce from "immer";

const initialState = {};

export default function emojiReducer(state = initialState, action) {
  const { type, guildId, id, name } = action;
  switch (type) {
    case types.EMOJI_ADD:
      const nextState = produce(state, draftState => {
        if (!state[guildId]) draftState[guildId] = {};
        draftState[guildId][name] = id;
      });

      return nextState;

    default:
      return state;
  }
}
