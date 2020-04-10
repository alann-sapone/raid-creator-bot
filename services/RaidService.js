// Base service
import BaseService from "./BaseService";

import { embedFormater } from "../helpers/formaters/embedFormater";

// Store
import store from "../store/store";
import { add } from "../store/actions/raidActions";

const Discord = require("discord.js");

export default class RaidService extends BaseService{

  designEvent = async (sentMessage, author, event, profile) => {
    const authorAvatar = author.avatar
      ? `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png`
      : null;
    const embed = new Discord.MessageEmbed();
    embed.setColor(profile.color);
    profile.thumbnail && embed.setThumbnail(profile.thumbnail);
    embed.setTitle(
      event.name +
        (event.description
          ? "\n" + embedFormater.iconInfo("mega", event.description)
          : "") +
        embedFormater.verticalSpacer(1)
    );
    embed.setAuthor(`Created by : ${event.author}`, authorAvatar);

    // Date - Hour - Nb Inscription
    embed.addField(
      embedFormater.iconInfo("calendar", event.date),
      "\u200B",
      true
    );
    embed.addField(embedFormater.iconInfo("watch", event.hour), "\u200B", true);
    embed.addField(embedFormater.iconInfo("joystick", "0"), "\u200B", true);
    embed.setTimestamp();
    embed.setFooter(
      `Event ID : ${sentMessage.id}`,
      event.thumbnail ? event.thumbnail : null
    );

    sentMessage.edit(embed);
  };

  addReactions = async (sentMessage) => {
    await sentMessage.react("👍");
  };

  create = async (params, msgEvent, commands, config, botClient) => {
    const [name, description, date, hour, profilId] = params;

    const { id: guildId } = msgEvent.guild;
    const { author } = msgEvent;

    // Send the first message
    const sentMessage = await msgEvent.channel.send("\u200B");
    const { id: messageId } = sentMessage;

    const event = {
      author: author.username,
      name,
      description,
      date,
      hour
    };

    const profile = {
      id: profilId,
      color: "#d01c0f",
      thumbnail:
        "https://www.heroesfire.com/images/wikibase/icon/heroes/ragnaros.png"
    };

    await this.designEvent(sentMessage, author, event, profile);
    store.dispatch(add(guildId, messageId, event, profile));

    // Add reactions to subscribe
    this.addReactions(sentMessage);
  };

  onReactionAdded = async (bot, msgEvent, user) => {
    if (!user.bot) {
      console.log("Raid service, new user inscription : ", user.id);
    }
  }
  
  onReactionRemoved = async (bot, msgEvent, user) => {
    if (!user.bot) {
      console.log("Raid service, remove user inscription : ", user.id);
    }
  }

  getEventInterface = () => ({
    message: {
      create: {
        callback: this.create,
        description: "Create a new event",
        params: [{
          name: "eventName",
          optional: false,
        }, {
          name: "description",
          optional: false,
        }, {
          name: "date",
          optional: false,
        }, {
          name: "hour",
          optional: false,
        }, {
          name: "profile",
          optional: false,
        }],
      },
    },
    messageReactionAdd: {
      callback: this.onReactionAdded
    },
    messageReactionRemove: {
      callback: this.onReactionRemoved
    }
  });
}
