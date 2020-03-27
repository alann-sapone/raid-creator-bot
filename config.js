import { formatCommands } from "./helpers";
import { getCommands } from "./services/commands";

const baseConfig = {
  prefix: "rc!"
};

const configs = {};

export function setConfig(guildId, key, value, botClient) {
  if (key && value) {
    if (configs[guildId].hasOwnProperty(key)) {
        configs[guildId][key] = value;
    } else {
      throw new Error("Invalid item supplied: " + key);
    }
  } else {
    throw new Error(
      formatCommands(
        getCommands()["config"]["commands"],
        config.prefix,
        true,
        false,
        config.prefix + "config"
      )
    );
  }
  console.log(configs);
}

export function getConfig(guildId) {
  if (!configs[guildId]) configs[guildId] = { ...baseConfig };
  console.log(configs);
  return configs[guildId];
}
