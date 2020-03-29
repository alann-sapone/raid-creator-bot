import { getCommands } from "../commands";
import { formatCommands } from "../../helpers";

export default class Help {
  constructor(msgEvent, commands, config, botClient) {
    msgEvent.reply(
      "\n:arrow_right: Current prefix set to: **" +
        config.prefix +
        "**\n" +
        formatCommands(getCommands(), config.prefix)
    );
  }
}
