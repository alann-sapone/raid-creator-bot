import { combineReducers } from "redux";

import characters from "./characterReducer";
import raids from "./raidReducer";
import emojis from "./emojiReducer";

export default combineReducers({
  characters,
  raids,
  emojis
});
