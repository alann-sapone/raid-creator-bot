import { types } from "../actions/rosterActions";
import produce from "immer";

// Helpers
import { createTree } from "../../helpers/prototypes/objects";

const initialState = {};

export default function rosterReducer(state = initialState, action) {
  const { type, guildId } = action;
  return produce(state, (draftState) => {
    switch (type) {
      case types.ROSTER_ADD: {
        const { rosterData } = action;

        createTree(draftState, [guildId], []);
        draftState[guildId].push(rosterData);
        
        break;
      }
      case types.ROSTER_REMOVE: {
        const { rosterIndex } = action;
        draftState[guildId].splice(rosterIndex, 1);
        break;
      }
    }

    return draftState;
  });
}
