// Helpers
import {
  formatCommand,
  formatService,
  formatServices,
} from "../../helpers/formaters/commandFormater";
import { getCommands } from "../../helpers/command";

// CommandError
export class CommandError extends Error {}

// ParameterError
export class ParameterError extends Error {
  format(prefix, service, command, serviceCommand) {
    return formatCommand(
      prefix,
      service,
      command,
      serviceCommand.params,
      `\n:warning: ${this.message}\n\n`
    );
  }
}

// UnknownArgument
export class UnknownArgumentError extends Error {
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

// UnknownCommand
export class UnknownCommandError extends Error {
  format(prefix, service) {
    return formatServices(
      prefix,
      getCommands(),
      `:warning: **Unknown Command : "__${prefix + service}__"**\n\n`
    );
  }
}
