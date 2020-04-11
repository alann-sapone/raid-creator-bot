// Base service
import BaseService from "./BaseService";

// Helpers
import { askMany, askYesNo } from "../helpers/discussion";
import {
  getCharacters,
  flattenPlayerCharacters,
  getBaseCharacter,
} from "../helpers/entities/character";
import { characterValidators, basicValidators } from "../helpers/validation";
import { characterFormater } from "../helpers/formaters/characterFormater";

// Constants
import { classes, factions } from "../constant";
import { archetypeFilter } from "../constants/archetypes";

// Store
import store from "../store/store";
import { add, remove } from "../store/actions/characterActions";

export default class CharacterService extends BaseService {

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const questions = [
      {
        answerId: "faction",
        question:
          "Please, select your faction :\n" +
          Object.keys(factions).map((faction, index) => `${store.getState().emojis[guild.id][factions[faction]]}  **__${index + 1}__**  - ${factions[faction]}`).join("\n"),
        validator: characterValidators.validateFaction,
      },
      {
        answerId: "name",
        question: "Please, enter your character name exactly like your character in game :",
        validator: characterValidators.validateName,
      },
      {
        answerId: "class",
        question:
          "Please, select your class :\n" +
          Object.keys(classes)
            .map((cClass, index) => `${store.getState().emojis[guild.id][classes[cClass]]}  **__${index + 1}__**  - ${classes[cClass]}`)
            .join("\n"),
        validator: characterValidators.validateClass,
        interpolate: (results) => {
          const { name, faction } = results;
          return getBaseCharacter(guild.id, author.id, name, faction);
        },
      },
      {
        answerId: "specialisation",
        question: (answers) => {
          const archetypes = archetypeFilter.getFromClass(classes[answers.class]);
          return "Please, what select your specialisation :\n" + 
          archetypes.map((archetype, index) => `${store.getState().emojis[guild.id][archetype.getIconName()]}  **__${index + 1}__**  - ${archetype.getSpecialisation()}`)
          .join("\n")
        },
        validator: (indexPlusOne, answers) => {
          const archetypes = archetypeFilter.getFromClass(classes[answers.class]);
          return characterValidators.validateArchetype(archetypes, indexPlusOne)
        }
      },
    ];

    try {
      const characterData = await askMany(dmChannel, questions, "Add a character to your profile");
      store.dispatch(add(guild.id, author.id, characterData));
      dmChannel.send("Character successfuly added !");
    } catch (error) {
      await dmChannel.send(error.message);
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
      dmChannel.send(
        "**Registered characters on this server :**\n\n" +
          characterFormater.formatCharacters(guild, flattenCharacters)
      );
    }
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
          question:
            "Please, select the character you want to remove :\n" +
            characterFormater.formatCharacters(
              guild,
              flattenCharacters,
              false,
              true
            ),
          options: { retryOnFail: true },
          validator: (indexPlusOne) =>
            basicValidators.validateArrayPick(flattenCharacters, indexPlusOne),
        },
      ];

      let results;
      try {
        do {
          results = await askMany(
            dmChannel,
            questions,
            "Remove a character from your profile"
          );
        } while (
          !(await askYesNo(
            dmChannel,
            "Are you sure you want to remove this character ?"
          ))
        );
      } catch (error) {
        await dmChannel.send(error.message);
        return;
      }

      try {
        store.dispatch(
          remove(guild.id, author.id, flattenCharacters[results.selection])
        );
        dmChannel.send("Character successfuly removed !");
      } catch (error) {
        await dmChannel.send(error.message);
        return;
      }
    }
  };


  getEventInterface = () => ({
    message: {
      add: {
        callback: this.add,
        description: "Add a character to this server",
        params: []
      },
      list: {
        callback: this.list,
        description: "List your characters from this server",
        params: []
      },
      remove: {
        callback: this.remove,
        description: "Remove a character from this server",
        params: []
      },
    },
  });
}
