// Helpers
import { askMany, askYesNo } from "../../helpers/discussion";
import { characterValidators } from "../../helpers/validation";
import { getSpecialisations } from "../../helpers/specialisation";

// Constants
import { classes, factions } from "../../constant";

import store from "../../store/store";

export default class PlayerService {
  getFormatYesNo = (characterData, guild) => {
    let { name, class: cClass, talentTree } = characterData;
    const className = classes[cClass];
    const emojiId = store.getState().emojis[guild.id][className];
    const classIcon = guild.emojis.cache.get(emojiId);
    const specialisations = getSpecialisations(className, talentTree, false);

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
    \nAre the provided informations valid ?`
    );
  };

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const questions = [
      {
        answerId: "faction",
        question:
          "Please, select your faction :\n" +
          Object.keys(factions)
            .map(
              (faction, index) => `**__${index + 1}__** - ${factions[faction]}`
            )
            .join("\n"),
        options: { retryOnFail: true },
        validator: characterValidators.validateFaction
      },
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
    try {
      do {
        characterData = await askMany(
          dmChannel,
          questions,
          "Add a character to your profile"
        );
      } while (
        !(await askYesNo(dmChannel, this.getFormatYesNo(characterData, guild)))
      );
    } catch (error) {
      await dmChannel.send(error.message);
      return;
    }

    console.log("Done", characterData);
  };
}
