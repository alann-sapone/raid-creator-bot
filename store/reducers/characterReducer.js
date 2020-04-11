import { types } from "../actions/characterActions";

// Helpers
import { createTree } from "../../helpers/prototypes/objects";

import produce from "immer";
const equal = require("deep-equal");

const initialState = {};

export default function characterReducer(state = initialState, action) {
  const { type, guildId, authorId } = action;
  return produce(state, draftState => {
    switch (type) {
      case types.CHARACTER_ADD: {
        const { characterData } = action;
        const { faction, name, class: cClass, specialisation } = characterData;

        createTree(draftState, [guildId, authorId, faction, name], {
          class: cClass,
          specialisations: []
        });

        const { specialisations } = draftState[guildId][authorId][faction][name];
        specialisations.forEach(_specialisation => {
          if (specialisation === _specialisation) {
            throw new Error(
              "Character Addition Canceled : This character definition already exists."
            );
          }
        });
        
        specialisations.push(specialisation);

        break;
      }

      case types.CHARACTER_REMOVE: {
        const { flattenedCharacter } = action;
        const { faction, name } = flattenedCharacter;

        const characters = draftState[guildId][authorId];
        delete characters[faction][name];

        if (Object.values(characters[faction]).length === 0)
          delete characters[faction];

        break;
      }
    }
  });
}
