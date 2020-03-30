import { formatCommands } from "./helpers/commandFormater";
import { getCommands } from "./services/commands";

const baseConfig = {
  prefix: "rc!"
};

const configs = {
  events: {}
};

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
}

export function getConfig(guildId) {
  if (!configs[guildId]) configs[guildId] = { ...baseConfig };
  return configs[guildId];
}

// rh!quickCreate event [title][description][channel][dd-MM-yyyy][HH:mm][template#][optional: advanced settings copy pasta]
// rh!quickCreate event quickCreate event [Titre de l'évènement][Message de description][0][17-02-2020][20:45][1]
