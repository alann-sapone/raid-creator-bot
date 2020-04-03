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
        const { faction, name, class: cclass, talentTree } = characterData;
        createTree(draftState, [guildId, authorId, faction, name], {
          class: cclass,
          talentTrees: []
        });

        const talents =
          draftState[guildId][authorId][faction][name].talentTrees;
        talents.forEach(savedTalentTree => {
          if (equal(savedTalentTree, talentTree)) {
            throw new Error(
              "Character Addition Canceled : This character definition already exists."
            );
          }
        });

        talents.push(talentTree);
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
