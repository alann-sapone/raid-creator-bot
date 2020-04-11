// Constants
import { classes, roles } from "../../constants/constants";

const formatLimits = (name, limit, refs, allowLineBreak = true) => {
  if (!limit) {
    return `\n > • No ${name.toLowerCase()} limitation`;
  } else {
    return `\n > • ${name} limitation :` + Object.keys(limit).map((key, index) => {
      const maxAmount = limit[key];
      if (maxAmount > -1) {
        let line = maxAmount === 0 ? `No ${refs[key]}` : `${maxAmount} ${refs[key]}`
        line += maxAmount > 0 ? "s" : "";
        line += allowLineBreak && index === Object.keys(limit).length-1 ? "\n > " : ""
        return `\n >    - ${line}`;
      }
    })
    .join("");
  }
};

const formatRoster = (roster, index, showLimits = true, showIndex = false) => {
  const { name, roleLimit, classLimit } = roster;

  return (
    "> " + (showIndex ? `**__${index + 1}__** - ` : ``) +
    `\u200B**:gear:  ${name}**` +
    (showLimits ? formatLimits("Role", roleLimit, roles) + formatLimits("Class", classLimit, classes, false) : "")
  );
};

const formatRosters = (rosters, showLimits = true, showIndex = false) => {
  return rosters
    .map((roster, index) => formatRoster(roster, index, showLimits, showIndex))
    .join("\n" + (showLimits ? "\n" : ""));
};

export const rosterFormater = {
  formatRoster,
  formatRosters,
};
