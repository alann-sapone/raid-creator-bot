import { types } from "../actions/raidActions";
import produce from "immer";

// Helpers
import { createTree } from "../../helpers/prototypes/objects";

const initialState = {};

export default function raidReducer(state = initialState, action) {
  const { type, guildId, messageId } = action;
  return produce(state, draftState => {
    switch (type) {
      case types.RAID_ADD: {
        const { event, profile } = action;
        createTree(draftState, [guildId, messageId], {
          event,
          profile,
          subscribers: {}
        });
        break;
      }

      case types.RAID_JOIN: {
        const { characterId } = action;
        console.log("RAID_JOIN", guildId, messageId, characterId);
      }
    }

    return draftState;
  });
}
