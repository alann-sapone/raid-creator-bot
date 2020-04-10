// Helpers
import { formatCommand } from "../helpers/formaters/commandFormater";

export default class ParameterError extends Error {
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
