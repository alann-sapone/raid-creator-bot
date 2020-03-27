export default class RaidService {
  async create(params, msgEvent, commands, config, botClient) {
    const [name, date] = params;
    await msgEvent.reply("Creating event with name \"" + name + "\" on date \"" + date + "\"");
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000)
    })
    await msgEvent.reply("Creating event done !");
  }
}
