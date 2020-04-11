// Helpers
import { createTree } from "../helpers/prototypes/objects";

import CharacterService from "./CharacterService";
import ConfigService from "./ConfigService";
import HelpService from "./HelpService";
import CalendarService from "./CalendarService";
import RosterService from "./RosterService";
import EventService from "./EventService";

const services = {
  help: new HelpService(),
  config: new ConfigService(),
  character: new CharacterService(),
  roster: new RosterService(),
  event: new EventService(),
  calendar: new CalendarService(),
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
