import { getConfig } from "../config";
import { getCommands } from "./commands";
import { formatCommands } from "../helpers/formaters/commandFormater";

export function runService(command, origParams, msgEvent, botClient) {
  const guildId = msgEvent.guild.id;
  const config = getConfig(guildId);
  const prefix = config.prefix;

  const commands = getCommands();

  const service = commands[command];
  const ServiceClass = service ? commands[command].service : null;
  let params = origParams;

  if (ServiceClass) {
    const service = new ServiceClass(msgEvent, commands, config, botClient);
    const hasSubcommands = commands[command].hasOwnProperty("commands");

    let serviceEntry;
    if (hasSubcommands) {
      const [subCommand, ...otherParams] = origParams;
      params = otherParams;
      serviceEntry = service[subCommand];

      if (serviceEntry && typeof serviceEntry == "function") {
        serviceEntry(params, msgEvent, commands, config, botClient);
      } else {
        const subCommands = commands[command].commands;
        const error =
          "Invalid command for " +
          command +
          ".\n" +
          formatCommands(subCommands, prefix, true, false, prefix + command);
        throw new Error(error);
      }
    }
  } else {
    const error = "Invalid command.\n" + formatCommands(commands, prefix);
    throw new Error(error);
  }
}
