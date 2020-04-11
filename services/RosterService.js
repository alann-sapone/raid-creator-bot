import BaseService from "./BaseService";

// Helpers
import { askMany, ask, askYesNo } from "../helpers/discussion";
import { characterValidators, basicValidators } from "../helpers/validation";

// Constants
import { classes, factions, roles } from "../constants/constants";

// Store
import store from "../store/store";

export default class RosterServer extends BaseService {
  getFormatYesNo = (characterData, guild) => {
     return (
      `\nAre the provided informations valid ?`
    );
  };

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const rosterData = {};

    const nameQuestion = {
      answerId: "name",
      question: "Please, enter a name for this roster configuration:\n",
      options: { retryOnFail: true },
      validator: (str => basicValidators.validateString(str, 2))
    };

    rosterData.rosterName = await ask(dmChannel, nameQuestion)
    rosterData.limitByRole = await askYesNo(dmChannel, "Do you want to add an inscription limit by role ?");
    
    if (rosterData.limitByRole) {
      const roleQuestions = Object.keys(roles).map(key => {
        const role = roles[key];
        return {
          answerId: key,
          question: `At most, how many ${role.toLowerCase()}(s) do you want ? (Enter -1 for unlimited)`,
          options: { retryOnFail: true },
          validator: (value => basicValidators.validateRange(value, -1, 40))
        }
      })
      console.log(roleQuestions);
      rosterData.roleLimits = await askMany(dmChannel, roleQuestions, "Add limits to roles");
    }
    
    console.log("Roster data", rosterData);
    /*

    const questions = [, {
      answerId: "roleLimit",
      subQuestions: )
    }, {
      answerId: "classLimit",
      subQuestions: Object.keys(classes).map(key => {
        const cClass = classes[key];
        return {
          answerId: key,
          question: `At most, how many ${cClass.toLowerCase()}(s) do you want ? (Enter -1 for unlimited)`,
          options: { retryOnFail: true },
          validator: (value => basicValidators.validateRange(value, -1, 40))
        }
      })
    }];
    
    let 
    try {
      rosterData = await askMany( dmChannel, questions, "Add a roster to your profile");
    } catch (error) {
      await dmChannel.send(error.message);
      return;
    }
    
    console.log("roster add", rosterData);
   */
  };

  list = async (params, msgEvent, commands, config, botClient) => {
    console.log("roster list");
  };

  remove = async (params, msgEvent, commands, config, botClient) => {
    console.log("roster remove");
  };

  getEventInterface = () => ({
    message: {
      add: {
        callback: this.add,
        description: "Add a roster for this server",
        params: [],
      },
      list: {
        callback: this.list,
        description: "List your configured roster for this server",
        params: [],
      },
      remove: {
        callback: this.remove,
        description: "Remove a roster from this server",
        params: [],
      },
    },
  });
}
