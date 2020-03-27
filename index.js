import { runService } from "./services";
import { getConfig } from "./config";
import { formatCommands } from "./helpers";
import { getCommands } from "./services/commands";

require("dotenv").config();

const Discord = require("discord.js");

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  bot.user.setPresence({ game: { name: "!help" } });
  console.log(`${bot.user.username} is up and running!`);
});

bot.on("message", async msgEvent => {
  const [origCommand, ...params] = msgEvent.content.split(" ");

  // Universal help catch
  if (origCommand.startsWith("!help")) {
    runService("help", params, msgEvent, bot);
  }

  // Prefix specified entries
  const guildId = msgEvent.guild.id;
  const prefix = getConfig(guildId).prefix;
  if (origCommand.startsWith(prefix)) {
    const command = origCommand.substr(prefix.length, origCommand.length);
    if (command) {
      try {
        runService(command, params, msgEvent, bot);
      } catch (error) {
        msgEvent.reply(error.message);
      }
    } else {
      msgEvent.reply(formatCommands(getCommands(), prefix));
    }
  }
});
