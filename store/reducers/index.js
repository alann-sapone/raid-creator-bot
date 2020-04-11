import { combineReducers } from "redux";

import characters from "./characterReducer";
import raids from "./raidReducer";
import emojis from "./emojiReducer";
import configuration from "./configReducer";
import roster from "./rosterReducer";
import event from "./eventReducer";

export default combineReducers({
  characters,
  raids,
  emojis,
  configuration,
  roster,
  event
});
