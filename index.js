import { runService } from "./services";
import { getConfig } from "./config";
import { formatCommands } from "./helpers/formaters/commandFormater";
import { getEnv } from "./helpers/env";
import { getCommands } from "./services/commands";

import store from "./store/store";
import { add } from "./store/actions/emojisActions";
import { add as charAdd } from "./store/actions/characterActions";

const Discord = require("discord.js");
const bot = new Discord.Client({
  presence: {
    activity: {
      name: "!help",
      type: "LISTENING"
    }
  }
});
const TOKEN = getEnv().TOKEN;

bot.login(TOKEN);

bot.on("ready", async () => {
  console.log(`${bot.user.username} is up and running!`);

  // Store guild emojis by names
  bot.guilds.cache.forEach(guild => {
    const emojis = guild.emojis.cache;
    emojis.forEach(emoji => {
      store.dispatch(add(guild.id, emoji.id, emoji.name));
    });
  });

  // While dev mode is on, auto clean + restart command to itself
  if (getEnv().DEV_MODE) {
    const channelGeneral = await bot.channels.fetch(
      getEnv().DEV_CHANNEL_ID,
      true
    );
    channelGeneral.messages.fetch().then(messages => {
      messages.forEach(async message => {
        await message.delete();
      });
    });
    
    await channelGeneral.send(getEnv().DEV_AUTOMATIC_COMMAND);

    const characterDataA = {
      faction: 'HORDE',
      name: 'Akryptik',
      class: 'WARLOCK',
      talentTree: [ 0, 0, 0 ]
    }
    const characterDataB = {
      faction: 'HORDE',
      name: 'Queudbelette',
      class: 'WARRIOR',
      talentTree: [ 21, 30, 0 ]
    }
    const characterDataC = {
      faction: 'HORDE',
      name: 'Akryptik',
      class: 'WARLOCK',
      talentTree: [ 0, 30, 21 ]
    }
    const characterDataD = {
      faction: 'ALLIANCE',
      name: 'Akryptik',
      class: 'ROGUE',
      talentTree: [ 30, 0, 21 ]
    }
    store.dispatch(charAdd("692550662642335894", "322289625504940032", characterDataA));
    store.dispatch(charAdd("692550662642335894", "322289625504940032", characterDataB));
    store.dispatch(charAdd("692550662642335894", "322289625504940032", characterDataC));
    store.dispatch(charAdd("692550662642335894", "322289625504940032", characterDataD));
  }
});

bot.on("message", async msgEvent => {
  if (!msgEvent.author.bot) {
    const [origCommand, ...params] = msgEvent.content.split(" ");

    // In guild
    if (msgEvent.guild) {
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
    }
  }
});
