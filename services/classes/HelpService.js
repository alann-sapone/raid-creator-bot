import { getCommands } from "../commands";
import { formatCommands } from "../../helpers";

export default class Help {
    constructor(msgEvent, commands, config, botClient) {
        msgEvent.reply("\nCurrent prefix set to: **"+ config.prefix + "**\n" + formatCommands(getCommands(), config.prefix));
    }
}