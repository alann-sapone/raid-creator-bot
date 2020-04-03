// Constants
import { classes, factions } from "../../constant";

// Helpers
import { getSpecialisations } from "../entities/specialisation";

// Store
import store from "../../store/store";

const formatCharacter = (
  guild,
  faction,
  cclass,
  name,
  talentTrees,
  index,
  showTalents = true,
  showIndex = false
) => {
  const className = classes[cclass];
  const classEmoji = store.getState().emojis[guild.id][className];

  return (
    "> " +
    (showIndex ? `**__${index + 1}__** - ` : ``) +
    `\u200B${classEmoji} **${name}** (${classes[cclass]} - ${factions[faction]})` +
    (showTalents
      ? talentTrees
          .map(talentTree => {
            const specialisations = getSpecialisations(className, talentTree);
            const mainSpeName =
              specialisations[0].value > 0 ? specialisations[0].name : "";
            const speEmoji = store.getState().emojis[guild.id][
              className + mainSpeName
            ];
            return `\n >  \u200B  \u200B  \u200B • ${speEmoji} ${mainSpeName ||
              "Unknown"} (${talentTree.join("/")})`;
          })
          .join("")
      : "")
  );
};

const formatCharacters = (
  guild,
  flattenCharacters,
  showTalents = true,
  showIndex = false
) => {
  return flattenCharacters
    .map((character, index) => {
      return (
        formatCharacter(
          guild,
          character.faction,
          character.data.class,
          character.name,
          character.data.talentTrees,
          index,
          showTalents,
          showIndex
        ) + (showTalents ? "\n" : "")
      );
    })
    .join("\n");
};

export const characterFormater = {
  formatCharacter,
  formatCharacters
};
