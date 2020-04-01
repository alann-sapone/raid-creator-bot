import { combineReducers } from "redux";

import characters from "./characterReducer";
import emojis from "./emojiReducer";

export default combineReducers({
  characters,
  emojis
});
