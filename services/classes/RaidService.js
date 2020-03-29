import { eventsSources, realData } from "../../Mock";
const Discord = require("discord.js");

export default class RaidService {
  created = { ...realData };

  designEvent = async (sentMessage, event) => {
    const embed = new Discord.MessageEmbed();
    embed.setColor(event.color);
    embed.setTitle(event.title);
    embed.setAuthor(`Created by : ${event.author}`);
    event.description && embed.setDescription(event.description);
    event.thumbnail && embed.setThumbnail(event.thumbnail);
    embed.addFields(
      { name: "Regular field title", value: "Some value here" },
      { name: "\u200B", value: "\u200B" },
      {
        name: "Inline field title",
        value: "Some value here",
        inline: true
      },
      { name: "Inline field title", value: "Some value here", inline: true }
    );
    embed.addField("Inline field title", "Some value heredfg", true);
    event.thumbnail && embed.setImage(event.thumbnail);
    embed.setTimestamp();
    embed.setFooter(
      `Event ID : ${sentMessage.id}`,
      event.thumbnail ? event.thumbnail : null
    );

    sentMessage.edit(embed);
  };

  // rc!raid create [name] [description] [date] [hour] [profile]
  create = async (params, msgEvent, commands, config, botClient) => {
    const [name, description, date, hour, profile] = params;
    const { id: serverId } = msgEvent.guild;
    const { id: channelId } = msgEvent.channel;
    const { username } = msgEvent.author;

    // Send the first message
    const sentMessage = await msgEvent.channel.send("\u200B");
    const { id: messageId } = sentMessage;

    if (!this.created[serverId]) this.created[serverId] = {};
    if (!this.created[serverId][channelId])
      this.created[serverId][channelId] = {};

    // And edit it with markdown presentation now that we have an ID.
    this.created[serverId][channelId][messageId] = eventsSources[2];
    this.designEvent(sentMessage, this.created[serverId][channelId][messageId]);
  };
}
