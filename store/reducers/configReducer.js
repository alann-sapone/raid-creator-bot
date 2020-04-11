import { types } from "../actions/configActions";
import produce from "immer";

// Helpers
import { createTree } from "../../helpers/prototypes/objects";

const initialState = {
  default: {
    prefix: "rc!"
  }
};

export default function configReducer(state = initialState, action) {
  const { type, guildId } = action;
  return produce(state, (draftState) => {
    switch (type) {
      case types.CONFIG_SET: {
        const { key, value } = action;
        if (draftState.default.hasOwnProperty(key)) {
          draftState[guildId][key] = value;
        } else {
          throw new Error(`There is no key named **"${key}"** to edit.`)
        }
        break;
      }

      case types.CONFIG_INIT: {
        createTree(draftState, [guildId], {...initialState.default});
        break;
      }
    }

    return draftState;
  });
}
