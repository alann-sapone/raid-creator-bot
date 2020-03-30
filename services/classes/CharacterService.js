import {
  pushDiscussion,
  getDiscussionResult,
  endDiscussion
} from "../../discussion";

export default class PlayerService {
  onSpecialisationFetch = async (message, msgEvent, botClient) => {
    const result = getDiscussionResult(msgEvent.author.id, {
      specialisation: message
    });
    console.log("result", result);

    await msgEvent.author.send("Character created, thank you.");
    endDiscussion(msgEvent.author.id);
  };

  onClassFetch = async (message, msgEvent, botClient) => {
    await msgEvent.author.send(
      "Please, enter your specialisation. ie. 21/0/30:"
    );
    pushDiscussion("add", msgEvent.author.id, this.onSpecialisationFetch, {
      class: message
    });
  };

  onNameFetch = async (message, msgEvent, botClient) => {
    await msgEvent.author.send("Please, select your character class :");
    pushDiscussion("add", msgEvent.author.id, this.onClassFetch, {
      nickname: message
    });
  };

  add = async (params, msgEvent, commands, config, botClient) => {
    const [subcommand, ...otherParams] = params;
    await msgEvent.author.send(
      "Please, enter your character name juste like your character in game :"
    );
    pushDiscussion("add", msgEvent.author.id, this.onNameFetch);
  };
}
