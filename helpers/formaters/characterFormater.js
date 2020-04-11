// Constants
import { classes, factions } from "../../constant";

// Store
import store from "../../store/store";

const formatCharacter = (
  guild,
  faction,
  cclass,
  name,
  specialisations,
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
      ? specialisations
          .map(specialisation => {
            const speEmoji = store.getState().emojis[guild.id][className + specialisation];
            return `\n >  \u200B  \u200B  \u200B • ${speEmoji} ${specialisation}`;
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
          character.data.specialisations,
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
