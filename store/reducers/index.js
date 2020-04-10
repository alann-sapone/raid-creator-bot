import { combineReducers } from "redux";

import characters from "./characterReducer";
import raids from "./raidReducer";
import emojis from "./emojiReducer";
import configuration from "./configReducer";

export default combineReducers({
  characters,
  raids,
  emojis,
  configuration
});
