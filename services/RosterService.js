import BaseService from "./BaseService";

export default class RosterServer extends BaseService {
  add = async (params, msgEvent, commands, config, botClient) => {
    console.log("roster add");
  };

  list = async (params, msgEvent, commands, config, botClient) => {
    console.log("roster list");
  };

  remove = async (params, msgEvent, commands, config, botClient) => {
    console.log("roster remove");
  };

  getEventInterface = () => ({
    message: {
      add: {
        callback: this.add,
        description: "Add a roster for this server",
        params: [],
      },
      list: {
        callback: this.list,
        description: "List your configured roster for this server",
        params: [],
      },
      remove: {
        callback: this.remove,
        description: "Remove a roster from this server",
        params: [],
      },
    },
  });
}
