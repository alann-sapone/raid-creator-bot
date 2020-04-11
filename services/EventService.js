import BaseService from "./BaseService";

// Helpers
import { askMany, ask, askYesNo } from "../helpers/discussion";
import { basicValidators, rosterValidators } from "../helpers/validation";
import { eventFormater } from "../helpers/formaters/eventFormater";

// Constants
import { classes, roles } from "../constants/constants";

// Store
import store from "../store/store";
import { add, remove } from "../store/actions/rosterActions";

export default class RosterServer extends BaseService {

  add = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    console.log("TODO : event add");
  };

  list = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    const events = store.getState().event[guild.id];

    if (events.length === 0) {
      dmChannel.send("There is no event registered on this server");
    } else {
      dmChannel.send(
        "**Registered events on this server :**\n\n" +
        eventFormater.formatEvents(events)
      );
    }
  };

  remove = async (params, msgEvent, commands, config, botClient) => {
    const { author, guild } = msgEvent;
    const dmChannel = await author.createDM();

    console.log("TODO : event remove");
  };

  getEventInterface = () => ({
    message: {
      add: {
        callback: this.add,
        description: "Add an event for this server",
        params: [],
      },
      list: {
        callback: this.list,
        description: "List your configured events for this server",
        params: [],
      },
      remove: {
        callback: this.remove,
        description: "Remove an event from this server",
        params: [],
      },
    },
  });
}
