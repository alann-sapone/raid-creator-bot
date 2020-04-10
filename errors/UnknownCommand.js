// Helpers
import { formatServices } from "../helpers/formaters/commandFormater";
import { getCommands } from "../helpers/command";

export default class UnknownCommand extends Error {
  format(prefix, service) {
    return formatServices(
      prefix,
      getCommands(),
      `:warning: **Unknown Command : "__${prefix + service}__"**\n\n`
    );
  }
}
