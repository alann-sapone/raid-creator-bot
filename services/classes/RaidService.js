import { eventsSources, realData } from "../../Mock";
import { embedFormater } from "../../helpers/embedFormater";
import { specialisations } from "../../constant";
import { getEnv } from "../../helpers/env";
const Discord = require("discord.js");

export default class RaidService {
  created = { ...realData };

  designEvent = async (sentMessage, author, event) => {
    const authorAvatar = author.avatar
      ? `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png`
      : null;
    const embed = new Discord.MessageEmbed();
    embed.setColor(event.color);
    event.thumbnail && embed.setThumbnail(event.thumbnail);
    embed.setTitle(
      event.title +
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

  addReactions = async (botClient, sentMessage, event) => {
    await sentMessage.react("👍");
  };

  // rc!raid create [name] [description] [date] [hour] [profile]
  create = async (params, msgEvent, commands, config, botClient) => {
    const [name, description, date, hour, profile] = params;
    const { id: serverId } = msgEvent.guild;
    const { id: channelId } = msgEvent.channel;
    const { author } = msgEvent;

    // Send the first message
    const sentMessage = await msgEvent.channel.send("\u200B");
    const { id: messageId } = sentMessage;

    if (!this.created[serverId]) this.created[serverId] = {};
    if (!this.created[serverId][channelId])
      this.created[serverId][channelId] = {};

    // And edit it with markdown presentation now that we have an ID.
    this.created[serverId][channelId][messageId] = eventsSources[2];
    const event = this.created[serverId][channelId][messageId];
    this.designEvent(sentMessage, author, event);

    // Add reactions to subscribe
    this.addReactions(botClient, sentMessage, event);
  };
}
