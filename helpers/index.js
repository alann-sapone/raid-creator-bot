export function formatCommands(
  commands,
  prefix,
  subCommandOnly = false,
  isSubcommand = false,
  curCommand = ""
) {
  let description = !isSubcommand ? "\nHow to use :" : "";
  curCommand = curCommand.length === 0 ? prefix : curCommand + " ";

  description += Object.keys(commands)
    .map(origCommand => {
      const thisCommand = curCommand + origCommand;
      const command = !isSubcommand ? prefix + origCommand : origCommand;
      const { description, params, commands: subCommands } = commands[
        origCommand
      ];

      let line = "";
      
      if (isSubcommand) {
        line = "\n    - " + thisCommand + " " + params + " : " + description;
      } else {
        line = "\n" + command + " : " + description;
      }

      if (subCommandOnly) {
        line = "\n - " + thisCommand + " " + params + " : " + description;
      }

      return (
        line +
        (subCommands
          ? formatCommands(
              subCommands,
              prefix,
              subCommandOnly,
              true,
              thisCommand
            ) + "\n"
          : "")
      );
    })
    .join("");

  return description;
}
