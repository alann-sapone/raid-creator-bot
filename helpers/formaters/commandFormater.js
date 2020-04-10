import { capitalize } from "../prototypes/string";

export function formatCommand(prefix, serviceName, name, params, intro = "") {
  let content = `${intro}`;
  content += `>    ↳ ${prefix}${serviceName} ${name} ${params.map(param => {
    const paramContent = param.optional ? `optional:${param.name}`: param.name;
    return `[${paramContent}]`
  }).join(" ")}`

  return content;
}

export function formatCommandWithTitle(prefix, serviceName, name, serviceCommand, intro = "") {
  const { description, params } = serviceCommand;
  name = name !== "default" ? name : "";
  
  let content = `${intro}`;
  content += `> **${description}**\n`;
  content += `${formatCommand(prefix, serviceName, name, params)}`;

  return content;
}

export function formatService(prefix, serviceName, serviceCommands, intro = "") {
  let content = `${intro}`;
  content += `**${capitalize(serviceName)} :**\n`;
  content += Object.keys(serviceCommands)
    .map((commandName) => {
      const serviceCommand = serviceCommands[commandName];
      return `${formatCommandWithTitle(
        prefix,
        serviceName,
        commandName,
        serviceCommand
      )}`;
    })
    .join("\n");

  return content;
}

export function formatServices(prefix, services, intro = "") {
  let content = `${intro}`;
  content += Object.keys(services)
    .map((serviceName) => {
      return `${formatService(
        prefix,
        serviceName,
        services[serviceName]
      )}`;
    })
    .join("\n\n");

  return content;
}
