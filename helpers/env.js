// Env from .env file
const dotenv = require("dotenv");
const dotenvParseVariables = require("dotenv-parse-variables");
let env = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

export function getEnv() {
  return env;
}
