// Base service
import BaseService from "./BaseService";

// Store
import store from "../store/store";
import { add } from "../store/actions/configActions";

// Helpers
import { getParams } from "../helpers/command";


export default class ConfigService extends BaseService {
  set = (params, msgEvent, commands, config, botClient) => {
    const guildId = msgEvent.guild.id;
    const { key, value } = params;

    store.dispatch(add(guildId, key, value));
    msgEvent.reply(`Setting **"${key}"** has now value **"${value}"**`);
  }

  get = (params, msgEvent, commands, config, botClient) => {
    const [key] = params;
    const guildId = msgEvent.guild.id;

    const configuration = store.getState().configuration[guildId];

    if (configuration.hasOwnProperty(key)) {
      msgEvent.reply(`Setting **"${key}"** has value **"${configuration[key]}"**`);
    } else {
      throw new Error(`No configuration item named **"${key}"**`)
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
