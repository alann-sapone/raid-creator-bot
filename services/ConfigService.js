// Base service
import BaseService from "./BaseService";

import { getConfig, setConfig } from "../config";

export default class ConfigService extends BaseService {
  set(params, msgEvent, commands, config, botClient) {
    const guildId = msgEvent.guild.id;
    const [key, value] = params;
    try {
      setConfig(guildId, key, value, botClient);
      msgEvent.reply('Setting "' + key + '" set to value "' + value + '".');
    } catch (error) {
      msgEvent.reply(error.message);
    }
  }

  get(params, msgEvent, commands, config, botClient) {
    const [key] = params;
    const guildId = msgEvent.guild.id;
    const value = getConfig(guildId)[key];

    if (value) {
      msgEvent.reply('Setting "' + key + '" has value "' + value + '".');
    } else {
      msgEvent.reply('No setting with name "' + key + '"');
    }
  }

  getEventInterface = () => ({
    message: {
      set: {
        callback: this.set,
        description: "Set a configuration item",
        params: [{
          name: "key",
          optional: false,
        }, {
          name: "value",
          optional: false,
        }],
      },
      get: {
        callback: this.get,
        description: "Get a configuration item",
        params: [{
          name: "key",
          optional: false,
        }],
      },
    },
  });
}
