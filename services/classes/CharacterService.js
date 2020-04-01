// Helpers
import { askMany, askYesNo } from "../../helpers/discussion";
import { capitalize } from "../../helpers/string";
import { characterValidators } from "../../helpers/validation";
import { getSpecialisations } from "../../helpers/specialisation";

// Constants
import { classes } from "../../constant";

import store from "../../store/store";

export default class PlayerService {
  getFormatYesNo = (characterData, guild) => {
    let { name, class: cClass, talentTree } = characterData;
    const className = classes[cClass];
    const emojiId = store.getState().emojis[guild.id][className];
    const classIcon = guild.emojis.cache.get(emojiId);
    const specialisations = getSpecialisations(className, talentTree, false);

    name = capitalize(name);
    return (
      `\u200B\n${classIcon} ** ${name} ** (${className})` +
      `\n${specialisations
        .map(spec => {
          const emojiId = store.getState().emojis[guild.id][
            className + spec.name
          ];
          return `\n> ${guild.emojis.cache.get(emojiId)} ${spec.name} (${
            spec.value
          })`;
        })
        .join("")}
    \nDo you want to confirm ?`
    );
  };

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;

    const questions = [
      {
        answerId: "name",
        question:
          "Please, enter your character name juste like your character in game :",
        options: { retryOnFail: true },
        validator: characterValidators.validateName
      },
      {
        answerId: "class",
        question:
          "Please, select your class :\n" +
          Object.keys(classes)
            .map((klass, index) => `**__${index + 1}__** - ${classes[klass]}`)
            .join("\n"),
        options: { retryOnFail: true },
        validator: characterValidators.validateClass
      },
      {
        answerId: "talentTree",
        question: "Please, what is your talent tree (i.e: **__30/0/21__**) :",
        options: { retryOnFail: true },
        validator: characterValidators.validateTalentTree
      }
    ];

    let characterData;
    do {
      characterData = await askMany(author, questions);
    } while (
      !(await askYesNo(author, this.getFormatYesNo(characterData, guild)))
    );

    console.log("Done", characterData);
  };
}
