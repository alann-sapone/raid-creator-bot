import { classes } from "../constant";
import { capitalize } from "./string";
import CommandError from "../errors/CommandError";

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

const validateTalentTree = talentTree => {
  const tree = talentTree.split("/");
  if (tree.length !== 3) {
    throw new CommandError("Invalid talent tree. Please verify your input");
  }

  let total = 0;
  const mappedString = tree.map(treeValueString => parseInt(treeValueString));
  mappedString.forEach(treeValue => {
    if (isNaN(treeValue)) {
      throw new CommandError("Invalid talent value. Please verify your input");
    } else {
      if (treeValue < 0)
        throw new CommandError(
          "Invalid talent value. Value can't be smaller than 0."
        );
      total += treeValue;
    }

    if (total > 51) {
      throw new CommandError(
        "Invalid talent value. The total cannot exceed 51."
      );
    }
  });

  return mappedString;
};

export const characterValidators = {
  validateName,
  validateClass,
  validateTalentTree
};

export const basicValidators = {
  validateArrayPick
};
