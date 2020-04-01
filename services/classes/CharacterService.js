import { askMany, askYesNo } from "../../helpers/discussion";
import { classes } from "../../constant";

// Validation
import { characterValidators, basicValidators } from "../../helpers/validation";

export default class PlayerService {
  add = async (params, msgEvent, commands, config, botClient) => {
    const { author } = msgEvent;
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
            .map((klass, index) => `${index + 1}. ${classes[klass]}`)
            .join("\n"),
        options: { retryOnFail: true },
        validator: characterValidators.validateClass
      },
      {
        answerId: "talentTree",
        question: "Please, what is your talent tree (i.e: 30/0/21) :",
        options: { retryOnFail: true },
        validator: characterValidators.validateTalentTree
      }
    ];

    let valid = true;
    try {
      do {
        const characterData = await askMany(author, questions);
        valid = await askYesNo(author, "Are you sure ?");
        console.log(characterData, valid);
      } while (!valid);
    } catch (error) {
      console.error(error.message);
    }
  };
}
