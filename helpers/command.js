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