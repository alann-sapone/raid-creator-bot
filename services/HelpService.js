// Base service
import BaseService from "./BaseService";

// Helpers
import { getCommands } from "../helpers/command";
import { formatServices } from "../helpers/formaters/commandFormater";

export default class Help extends BaseService {
  default(params, msgEvent, commands, config, botClient) {
    msgEvent.reply(
      formatServices(
        config.prefix,
        getCommands(), 
        `\n\n:arrow_right: Current prefix set to: **${config.prefix}**\n\n`
      )
    );
  }

  getEventInterface = () => ({
    message: {
      default: {
        callback: this.default,
        description: "Display Help",
        params: [],
      }
    },
  });
}
