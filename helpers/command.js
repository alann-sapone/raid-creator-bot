// Errors
import ParameterError from "../errors/ParameterError";

import services from "../services";

export const parseCommand = (commandStr, prefix) => {
  const serviceCommand = commandStr.substr(prefix.length, commandStr.length);
  const serviceCommandSplit = serviceCommand
    .split("[")[0]
    .split(" ")
    .filter((string) => string.length > 0);

  const [service, ...commands] = serviceCommandSplit;
  const args = commandStr.match(/(?<=\[).+?(?=\])/g);

  return {
    service,
    commands,
    args: args || [],
  };
};

export const getCommands = () => {
  return services['message'];
}

export const getParams = (params, givenCommands) => {
 
  const validated = {};
  params.forEach((command, index) => {
    const givenValue = givenCommands[index];
    if ((givenValue === undefined || givenValue === null) && !command.optional) {
      throw new ParameterError(`The parameter **${command.name}** is not optional`);
    }
    validated[command.name] = givenValue;
  });

  return validated;
}