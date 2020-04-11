// Env
import { getEnv } from "./helpers/env";

// Services
import services from "./services";

// Store
import store from "./store/store";
import { add as emojiAdd } from "./store/actions/emojisActions";
import { init as configInit } from "./store/actions/configActions";

// Helpers
import { parseCommand } from "./helpers/command";
import { getParams } from "./helpers/command";
var clear = require('clear');

// Errors
import { UnknownCommandError, UnknownArgumentError, ParameterError, CanceledError } from "./classes/errors";

// Fixtures
import { installFixtures } from "./fixtures";

const Discord = require("discord.js");
const bot = new Discord.Client({
  presence: {
    activity: {
      name: "!help",
      type: "LISTENING",
    },
  },
});
const TOKEN = getEnv().TOKEN;
bot.login(TOKEN);

/*
 * Ready
 */
bot.on("ready", async () => {
  clear();
  console.log(`${bot.user.username} is up and running!`);

  bot.guilds.cache.forEach((guild) => {
    const guildId = guild.id;

    // Store guild emojis by names
    const emojisCache = guild.emojis.cache;
    emojisCache.forEach((emojiData) => {
      const emoji = emojisCache.get(emojiData.id);
      store.dispatch(emojiAdd(guildId, emojiData.name, emoji));
    });

    // Initiate guild data
    store.dispatch(configInit(guildId));
    
    // Install fixtures
    installFixtures("692550662642335894", "322289625504940032");
  });

  // While dev mode is on, auto clean + restart command to itself
  if (getEnv().DEV_MODE) {
    const channelGeneral = await bot.channels.fetch(
      getEnv().DEV_CHANNEL_ID,
      true
    );
    const messages = await channelGeneral.messages.fetch()
    messages.forEach(async (message) => {
      await message.delete();
    });

    await channelGeneral.send(getEnv().DEV_AUTOMATIC_COMMAND);
  }
});

/*
 * Message with potential params
 */
bot.on("message", async (msgEvent) => {
  if (!msgEvent.author.bot || getEnv().DEV_MODE) {
    // From channel
    if (msgEvent.guild) {
      const { content, guild } = msgEvent;
      const { id: guildId } = guild;
      
      const config = store.getState().configuration[guildId];
      const { prefix } = config;

      // Help command without prefix
      if (content.startsWith("!help")) {
        services.message.help.default.callback([], msgEvent, [], config, bot);
      } else {
        // Any other prefixed command
        if (content.startsWith(prefix)) {
          const { service, commands, args } = parseCommand(content, prefix);
          const [ command ] = commands

          let serviceCommand;
          try {
            // Get Service
            const serviceInstance = services["message"][service];
            if (!serviceInstance) throw new UnknownCommandError();

            // Get Service command
            serviceCommand = serviceInstance[command] || serviceInstance["default"];
            if (!serviceCommand) throw new UnknownArgumentError();
            
            // Validate arguments
            const validatedArgs = getParams(serviceCommand.params, args);

            // All good
            if (await serviceCommand.callback(validatedArgs, msgEvent, commands, config, bot)) {
              msgEvent.delete();
            }
          } catch (e) {
            if (e instanceof UnknownCommandError) {
              msgEvent.reply(e.format(prefix, service));
            } else if (e instanceof UnknownArgumentError) {
              msgEvent.reply(e.format(prefix, service, command));
            } else if (e instanceof ParameterError) {
              msgEvent.reply(e.format(prefix, service, command, serviceCommand));
            } else if (e instanceof CanceledError) {
              e.channel.send(e.message);
            } else {
              msgEvent.reply(e.message);
            }
          }
        }
      }
    }
  }
});

/*
 * Other events
 */
const events = [
  "messageReactionAdd",
  "messageReactionRemove",
]
events.forEach(eventName => {
  bot.on(eventName, async (...args) => {
    Object.keys(services[eventName]).forEach(serviceName => {
      const service = services[eventName][serviceName];
        service.callback(bot, ...args)
    })
  })
})