// Helpers
import { askMany, askYesNo } from "../../helpers/discussion";
import {
  getCharacters,
  flattenPlayerCharacters,
  getBaseCharacter
} from "../../helpers/entities/character";
import { characterValidators, basicValidators } from "../../helpers/validation";
import { getSpecialisations } from "../../helpers/entities/specialisation";
import { characterFormater } from "../../helpers/formaters/characterFormater";

// Constants
import { classes, factions } from "../../constant";

// Store
import store from "../../store/store";
import { add, remove } from "../../store/actions/characterActions";

export default class PlayerService {
  getFormatYesNo = (characterData, guild) => {
    let { name, class: cClass, faction, talentTree } = characterData;
    const className = classes[cClass];
    const factionName = factions[faction];
    const emojiId = store.getState().emojis[guild.id][className];
    const classIcon = guild.emojis.cache.get(emojiId);
    const specialisations = getSpecialisations(className, talentTree, false);

    return (
      `\u200B\n${classIcon} ** ${name} ** (${className} - ${factionName})` +
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

  remove = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const characters = getCharacters(guild, author);
    const flattenCharacters = flattenPlayerCharacters(characters);

    if (flattenCharacters.length === 0) {
      dmChannel.send("You have no character to remove.");
    } else {
      const questions = [
        {
          answerId: "selection",
          question: "Please, select the character you want to remove :\n" + characterFormater.formatCharacters(guild, flattenCharacters, false, true),
          options: { retryOnFail: true },
          validator: indexPlusOne => basicValidators.validateArrayPick(flattenCharacters, indexPlusOne)
        }
      ];

      let results;
      try {
        do {
          results = await askMany(dmChannel, questions, "Remove a character from your profile");
        } while (
          !(await askYesNo(dmChannel, "Are you sure you want to remove this character ?"))
        );
      } catch (error) {
        await dmChannel.send(error.message);
        return;
      }

      try {
        store.dispatch(remove(guild.id, author.id, flattenCharacters[results.selection]));
        dmChannel.send("Character successfuly removed !");
      } catch (error) {
        await dmChannel.send(error.message);
        return;
      }
    }
  };

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const questions = [
      {
        answerId: "faction",
        question: "Please, select your faction :\n" + Object.keys(factions).map((faction, index) => `**__${index + 1}__** - ${factions[faction]}`).join("\n"),
        options: { retryOnFail: true },
        validator: characterValidators.validateFaction
      },
      {
        answerId: "name",
        question: "Please, enter your character name juste like your character in game :",
        options: { retryOnFail: true },
        validator: characterValidators.validateName
      },
      {
        answerId: "class",
        question: "Please, select your class :\n" + Object.keys(classes).map((klass, index) => `**__${index + 1}__** - ${classes[klass]}`).join("\n"),
        options: { retryOnFail: true },
        validator: characterValidators.validateClass,
        interpolate: results => {
          const { name, faction } = results;
          return getBaseCharacter(guild.id, author.id, name, faction);
        }
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
        characterData = await askMany(dmChannel, questions, "Add a character to your profile");
      } while (
        !(await askYesNo(dmChannel, this.getFormatYesNo(characterData, guild)))
      );
    } catch (error) {
      await dmChannel.send(error.message);
      return;
    }

    try {
      store.dispatch(add(guild.id, author.id, characterData));
      dmChannel.send("Character successfuly added !");
    } catch (error) {
      await dmChannel.send(error.message);
      return;
    }
  };

  list = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const characters = getCharacters(guild, author);
    const flattenCharacters = flattenPlayerCharacters(characters);

    if (flattenCharacters.length === 0) {
      dmChannel.send("You have no character registered on this server");
    } else {
      dmChannel.send("**Registered characters on this server :**\n\n" + characterFormater.formatCharacters(guild, flattenCharacters));
    }
  };
}
