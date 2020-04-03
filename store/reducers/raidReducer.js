import { types } from "../actions/raidActions";
import produce from "immer";

const initialState = {};

export default function raidReducer(state = initialState, action) {
  const { type, guildId } = action;
  return produce(state, draftState => {
    switch (type) {
      case types.RAID_ADD: {
        console.log(type, guildId);
        break;
      }
    }

    return state;
  });
}
