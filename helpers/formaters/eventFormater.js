// Constants
import { classes, roles } from "../../constants/constants";

const formatEvent = (event, index, showDetails = true, showIndex = false) => {
  const { name, players } = event;
  return `> **${name}** (${players} players)`;
};

const formatEvents = (events, showDetails = true, showIndex = false) => {
  return events
    .map((event, index) => formatEvent(event, index, showDetails, showIndex))
    .join("\n" + (showDetails ? "\n" : ""));
};

export const eventFormater = {
  formatEvent,
  formatEvents,
};
