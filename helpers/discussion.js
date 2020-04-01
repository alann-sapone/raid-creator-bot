import { basicValidators } from "./validation";

export const ask = async (user, questionData) => {
  const { question, options, validator } = questionData;

  const dmChannel = await user.createDM();
  await dmChannel.send(question);

  const message = await dmChannel.awaitMessages(() => true, { max: 1 });
  const result = message.first().content;
  let validatedResult = null;

  if (message === "cancel") {
    throw new Error("Canceled");
  }

  try {
    if (validator) validatedResult = validator(result);
  } catch (error) {
    await dmChannel.send("Error : " + error.message);
    if (options.retryOnFail) return ask(user, questionData);
  }

  return validatedResult ? validatedResult : result;
};

export const askMany = async (user, questions) => {
  const results = {};
  for (const questionData of questions) {
    const { answerId, ...otherQuestionData } = questionData;
    results[answerId] = await ask(user, otherQuestionData);
  }
  return results;
};

const yesNo = {
  YES: "Yes",
  NO: "No"
};
export const askYesNo = async (user, question) => {
  const result = await ask(user, {
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
