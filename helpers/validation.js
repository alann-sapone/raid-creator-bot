import { classes, factions } from "../constants/constants";
import { capitalize } from "./prototypes/string";
import { CommandError } from "../classes/errors"

/*
 * Basic validation
 */
const validateArrayPick = (array, indexPlusOne) => {
  const nbValues = Object.keys(array).length;
  const valueI = parseInt(indexPlusOne);
  if (isNaN(valueI) || valueI <= 0 || valueI > nbValues) {
    throw new CommandError(
      "Invalid value. Please, enter a value between 1 and " + nbValues
    );
  }

  return Object.keys(array)[valueI - 1];
};

const validateString = (string, minSize = 0) => {
  if (string.trim().length < minSize) {
    throw new CommandError(
      "Invalid value. Its length must be at least " + minSize + " size long."
    );
  }

  return string.trim();
}

const validateRange = (value, min, max) => {
  const valueI = parseInt(value);
  if (isNaN(valueI) || valueI < min || valueI > max) {
    throw new CommandError(
      `Invalid value. Please, enter a value between ${min} and ${max}`
      );
    }
    
  return valueI;
}

/*
 * Character validation
 */
const validateName = name => {
  const nameReg = /^[A-Za-záàâäåªÁÀÂÄÅæÆçÇœŒéèêëÉÈÊËƒíìîïÍÌÎÏñÑóòôöºÓÒÔÖúùûÜÚÙÛýÝÿ]{2,12}$/;
  if (!name.match(nameReg)) throw new CommandError("Invalid character name");
  return capitalize(name);
};

const validateClass = indexPlusOne => {
  return validateArrayPick(classes, indexPlusOne);
};

const validateArchetype = (archetypes, indexPlusOne) => {
  const realIndex = validateArrayPick(archetypes, indexPlusOne);
  return archetypes[realIndex].getSpecialisation();
};

const validateFaction = indexPlusOne => {
  return validateArrayPick(factions, indexPlusOne);
};

export const characterValidators = {
  validateName,
  validateClass,
  validateArchetype,
  validateFaction
};

export const basicValidators = {
  validateArrayPick,
  validateString,
  validateRange
};
