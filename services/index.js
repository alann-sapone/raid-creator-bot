// Helpers
import { createTree } from "../helpers/prototypes/objects";

import CharacterService from "./CharacterService";
import ConfigService from "./ConfigService";
import HelpService from "./HelpService";
import RaidService from "./RaidService";

const services = {
  character: new CharacterService(),
  config: new ConfigService(),
  help: new HelpService(),
  raid: new RaidService(),
};

// Connect services to events
const connectedServices = {};
Object.keys(services).forEach((serviceName) => {
  const service = services[serviceName];
  const connection = service.getEventInterface();

  Object.keys(connection).forEach((connectionEvent) => {
    createTree(
      connectedServices,
      [connectionEvent, serviceName],
      connection[connectionEvent]
    );
  });
});

export default connectedServices;
