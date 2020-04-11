import { types } from "../actions/eventActions";
import produce from "immer";

// Helpers
import { createTree } from "../../helpers/prototypes/objects";

const initialState = {};

export default function eventReducer(state = initialState, action) {
  const { type, guildId } = action;
  return produce(state, (draftState) => {
    switch (type) {
      case types.EVENT_ADD: {
        const { eventData } = action;

        createTree(draftState, [guildId], []);
        draftState[guildId].push(eventData);
        
        break;
      }
      case types.EVENT_REMOVE: {
        const { eventIndex } = action;
        draftState[guildId].splice(eventIndex, 1);
        break;
      }
    }

    return draftState;
  });
}
