import BaseService from "./BaseService";

// Helpers
import { askMany, ask, askYesNo } from "../helpers/discussion";
import { basicValidators } from "../helpers/validation";
import { rosterFormater } from "../helpers/formaters/rosterFormater";

// Constants
import { classes, roles } from "../constants/constants";

// Store
import store from "../store/store";
import { add, remove } from "../store/actions/rosterActions";

export default class RosterServer extends BaseService {

  cleanLimits = (limits) => {
    Object.keys(limits).forEach(key => {
      const limit = limits[key];
      if (limit === -1) {
        delete limits[key];
      }
    })
  }

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const rosterData = {};

    // Ask for roster name
    const nameQuestion = {
      question: "Please, enter a name for this roster configuration:\n",
      validator: (str => basicValidators.validateString(str, 2))
    };
    rosterData.name = await ask(dmChannel, nameQuestion)

    // Ask for role limiting
    const limitByRole = await askYesNo(dmChannel, `Do you want to add an inscription limit by role ?\n> (i.e. ${Object.keys(roles).map(role => roles[role]).join(", ")})`);
    if (limitByRole) {
      const roleQuestions = Object.keys(roles).map(key => {
        const role = roles[key];
        return {
          answerId: key,
          question: `At most, how many ${role.toLowerCase()}(s) do you want ? (Enter -1 for unlimited)`,
          validator: (value => basicValidators.validateRange(value, -1, 40))
        }
      })
      rosterData.roleLimit = await askMany(dmChannel, roleQuestions, "Add limits to roles");
      this.cleanLimits(rosterData.roleLimit);
    }

    // Ask for class limiting
    const limitByClass = await askYesNo(dmChannel, `Do you want to add an inscription limit by class ?\n> (i.e. ${Object.keys(classes).map(cClass => classes[cClass]).join(", ")})`);
    if (limitByClass) {
      const classQuestions = Object.keys(classes).map(key => {
        const cClass = classes[key];
        return {
          answerId: key,
          question: `At most, how many ${cClass.toLowerCase()}(s) do you want ? (Enter -1 for unlimited)`,
          validator: (value => basicValidators.validateRange(value, -1, 40))
        }
      })
      rosterData.classLimit = await askMany(dmChannel, classQuestions, "Add limits to classes");
      this.cleanLimits(rosterData.classLimit);
    }
    store.dispatch(add(guild.id, rosterData));
    dmChannel.send("Roster successfuly added !");
  };

  list = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const rosters = store.getState().roster[guild.id];

    if (rosters.length === 0) {
      dmChannel.send("There is no roster registered on this server");
    } else {
      dmChannel.send(
        "**Registered rosters on this server :**\n\n" +
        rosterFormater.formatRosters(rosters)
      );
    }
  };

  remove = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const rosters = store.getState().roster[guild.id];

    if (rosters.length === 0) {
      dmChannel.send("There is no roster registered on this server");
    } else {
      try {
        const rosterIndex = await ask(dmChannel, {
          question: "Please, select the roster you want to remove :\n" + rosterFormater.formatRosters(rosters, false, true),
          validator: (indexPlusOne) => basicValidators.validateArrayPick(rosters, indexPlusOne),
        });
        store.dispatch(remove(guild.id, rosterIndex))
        dmChannel.send("Roster successfuly removed !");
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
