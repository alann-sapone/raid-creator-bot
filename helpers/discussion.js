import { basicValidators } from "./validation";

export const ask = async (dmChannel, questionData) => {
  const { question, options, validator } = questionData;
  await dmChannel.send(question);

  const message = await dmChannel.awaitMessages(() => true, { max: 1 });
  const result = message.first().content;
  let validatedResult = null;

  if (result === "!cancel") {
    throw new Error("Canceled");
  }

  try {
    if (validator) validatedResult = validator(result);
  } catch (error) {
    await dmChannel.send("Error : " + error.message);
    if (options.retryOnFail) return ask(dmChannel, questionData);
  }

  return validatedResult ? validatedResult : result;
};

export const askMany = async (dmChannel, questions, title) => {
  const results = {};

  let content = "";
  const intro = '\n*You can type "!cancel" at any time to stop this process.*';

  title && (content += `**${title}**`);
  content += intro;
  (intro || title) && (content += "\n\u200B");

  if (questions[0] && content.length > 0)
    questions[0].question = content + "\n" + questions[0].question;

  for (const questionData of questions) {
    const { answerId, ...otherQuestionData } = questionData;
    const { interpolate } = otherQuestionData;

    // Check if question is needed or if we can get answer from current results
    let interpolatedResult = null;
    if (interpolate) {
      interpolatedResult = interpolate(results);
    }

    if (interpolatedResult) {
      results[answerId] = interpolatedResult[answerId];
    } else {
      results[answerId] = await ask(dmChannel, otherQuestionData);
    }
  }

  return results;
};

export const askYesNo = async (dmChannel, question) => {
  const yesNo = {
    YES: "Yes",
    NO: "No"
  };

  const result = await ask(dmChannel, {
    question:
      question +
      "\n" +
      Object.keys(yesNo)
        .map((answer, index) => `**__${index + 1}__** - ${yesNo[answer]}`)
        .join("\n"),
    options: { retryOnFail: true },
    validator: value => basicValidators.validateArrayPick(yesNo, value)
  });

  return yesNo[result] === yesNo.YES;
};
