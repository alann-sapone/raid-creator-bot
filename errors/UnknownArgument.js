// Helpers
import { formatService } from "../helpers/formaters/commandFormater";
import { getCommands } from "../helpers/command";

export default class UnknownArgument extends Error {
  format(prefix, service, command) {
    return formatService(
      prefix,
      service,
      getCommands()[service],
      "\n" +
        (command === "help"
          ? `**Commands for "__${prefix + service}__": **`
          : `:warning: **Invalid Command : "__${
              prefix + service
            } ${command}__"**`) +
        "\n\n"
    );
  }
}
