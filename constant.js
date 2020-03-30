export const roles = {
  TANK: "TANK",
  HEALER: "HEALER",
  DPS_MELEE_PHYSICAL: "DPS_MELEE_PHYSICAL",
  DPS_MELEE_MAGICAL: "DPS_MELEE_MAGICAL",
  DPS_RANGED_PHYSICAL: "DPS_RANGED_PHYSICAL",
  DPS_RANGED_MAGICAL: "DPS_RANGED_MAGICAL"
};

export const classes = {
  WARRIOR: "Warrior",
  ROGUE: "Rogue",
  HUNTER: "Hunter",
  MAGE: "Mage",
  WARLOCK: "Warlock",
  PRIEST: "Priest",
  SHAMAN: "Shaman",
  PALADIN: "Paladin",
  DRUID: "Druid"
};

export const specialisations = {};

function addSpecialisation(Class, specialisation, role, userData) {
  if (!specialisations[Class]) specialisations[Class] = {};

  if (!specialisations[Class][specialisation])
    specialisations[Class][specialisation] = {
      role,
      userData: userData || {}
    };
}

// Warrior
addSpecialisation(classes.WARRIOR, "Arms", roles.DPS_MELEE_PHYSICAL);
addSpecialisation(classes.WARRIOR, "Fury", roles.DPS_MELEE_PHYSICAL);
addSpecialisation(classes.WARRIOR, "Protection", roles.TANK);

// Warlock
addSpecialisation(classes.WARLOCK, "Affliction", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.WARLOCK, "Demonology", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.WARLOCK, "Destruction", roles.DPS_RANGED_MAGICAL);

// Shaman
addSpecialisation(classes.SHAMAN, "Elemental", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.SHAMAN, "Enhancement", roles.DPS_MELEE_PHYSICAL);
addSpecialisation(classes.SHAMAN, "Restoration", roles.HEALER);

// Rogue
addSpecialisation(classes.ROGUE, "Assassination", roles.DPS_MELEE_PHYSICAL);
addSpecialisation(classes.ROGUE, "Combat", roles.DPS_MELEE_PHYSICAL);
addSpecialisation(classes.ROGUE, "Subtlety", roles.DPS_MELEE_PHYSICAL);

// Priest
addSpecialisation(classes.PRIEST, "Discipline", roles.HEALER);
addSpecialisation(classes.PRIEST, "Holy", roles.HEALER);
addSpecialisation(classes.PRIEST, "Shadow", roles.DPS_RANGED_MAGICAL);

// Paladin
addSpecialisation(classes.PALADIN, "Holy", roles.HEALER);
addSpecialisation(classes.PALADIN, "Protection", roles.TANK);
addSpecialisation(classes.PALADIN, "Retribution", roles.DPS_MELEE_PHYSICAL);

// Mage
addSpecialisation(classes.MAGE, "Arcane", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.MAGE, "Fire", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.MAGE, "Frost", roles.DPS_RANGED_MAGICAL);

// Hunter
addSpecialisation(classes.HUNTER, "Beast mastery", roles.DPS_RANGED_PHYSICAL);
addSpecialisation(classes.HUNTER, "Marksmanship", roles.DPS_RANGED_PHYSICAL);
addSpecialisation(classes.HUNTER, "Survival", roles.DPS_RANGED_PHYSICAL);

// Druid
addSpecialisation(classes.DRUID, "Balance", roles.DPS_RANGED_MAGICAL);
addSpecialisation(classes.DRUID, "Feral combat", roles.DPS_MELEE_PHYSICAL, {
  isTank: null
});
addSpecialisation(classes.DRUID, "Restoration", roles.HEALER);
