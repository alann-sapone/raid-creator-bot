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
  const emojiId = store.getState().emojis[guild.id][className];
  const classIcon = guild.emojis.cache.get(emojiId);

  return "> " +
    (showIndex ? `**__${index + 1}__** - ` : ``) +
    `\u200B${classIcon} **${name}** (${classes[cclass]} - ${factions[faction]})` +
    (showTalents
    ? talentTrees
        .map(talentTree => {
          const specialisations = getSpecialisations(className, talentTree);
          const mainSpeName =
            specialisations[0].value > 0 ? specialisations[0].name : "";
          const speEmojiId = store.getState().emojis[guild.id][
            className + mainSpeName
          ];
          return `\n >  \u200B  \u200B  \u200B • ${guild.emojis.cache.get(
            speEmojiId
          )} ${mainSpeName || "Unknown"} (${talentTree.join("/")})`;
        })
        .join("")
    : "");
};

const formatCharacters = (guild, flattenCharacters, showTalents = true, showIndex = false) => {

  return flattenCharacters.map((character, index) => {
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
  }).join('\n')
};

export const characterFormater = {
  formatCharacter,
  formatCharacters
};
