import RaidService from "./classes/RaidService";
import HelpService from "./classes/HelpService";
import ConfigService from "./classes/ConfigService";
import CharacterService from "./classes/CharacterService";

export function getCommands() {
  return {
    raid: {
      service: RaidService,
      commands: {
        create: {
          description: "Create a new event",
          params: "event_name event_date"
        },
        edit: {
          description: "Edit an existing event",
          params: "event_id"
        }
      },
      description: "Allow you to manage your events."
    },
    config: {
      service: ConfigService,
      commands: {
        set: {
          description: "Set a configuration item",
          params: "key value"
        },
        get: {
          description: "Get a configuration item",
          params: "key"
        }
      },
      description: "Allow you to configure me"
    },
    help: {
      service: HelpService,
      description: "Help center to use Raid Creator Bot."
    },
    character: {
      service: CharacterService,
      commands: {
        add: {
          description: "Add a character to this server",
          params: ""
        },
        remove: {
          description: "Remove a character from this server",
          params: ""
        },
        list: {
          description: "List your characters from this server",
          params: ""
        }
      },
      description: "Player management."
    }
  };
}
