import { runService } from "./services";
import { getConfig } from "./config";
import { formatCommands } from "./helpers";
import { getCommands } from "./services/commands";

// Env from .env file
const dotenv = require("dotenv");
const dotenvParseVariables = require("dotenv-parse-variables");
let env = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = env.TOKEN;

bot.login(TOKEN);

bot.on("ready", async () => {
  bot.user.setPresence({ game: { name: "!help" } });
  console.log(`${bot.user.username} is up and running!`);

  // While dev mode is on, auto clean + restart command to itself
  if (env.DEV_MODE) {
    const channelGeneral = await bot.channels.fetch(env.DEV_CHANNEL_ID, true);
    channelGeneral.messages.fetch().then(messages => {
      messages.forEach(async message => {
        await message.delete();
      });
    });
    await channelGeneral.send(env.DEV_AUTOMATIC_COMMAND);
  }
});

bot.on("message", async msgEvent => {
  const [origCommand, ...params] = msgEvent.content.split(" ");

  // Universal help catch
  if (origCommand.startsWith("!help")) {
    runService("help", params, msgEvent, bot);
  }

  // Prefix specified entries
  const guildId = msgEvent.guild.id;
  const { prefix, enabled } = getConfig(guildId);
  if (origCommand.startsWith(prefix)) {
    const command = origCommand.substr(prefix.length, origCommand.length);
    if (command) {
      try {
        runService(command, params, msgEvent, bot);
        msgEvent.delete();
      } catch (error) {
        msgEvent.reply(error.message);
      }
    } else {
      msgEvent.reply(formatCommands(getCommands(), prefix));
    }
  }
});
