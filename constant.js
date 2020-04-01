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

export const talentTrees = {};

function addTalentTree(Class, talentTree, role, userData) {
  if (!talentTrees[Class]) talentTrees[Class] = {};

  if (!talentTrees[Class][talentTree])
    talentTrees[Class][talentTree] = {
      role,
      userData: userData || {}
    };
}

// Warrior
addTalentTree(classes.WARRIOR, "Arms", roles.DPS_MELEE_PHYSICAL);
addTalentTree(classes.WARRIOR, "Fury", roles.DPS_MELEE_PHYSICAL);
addTalentTree(classes.WARRIOR, "Protection", roles.TANK);

// Warlock
addTalentTree(classes.WARLOCK, "Affliction", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.WARLOCK, "Demonology", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.WARLOCK, "Destruction", roles.DPS_RANGED_MAGICAL);

// Shaman
addTalentTree(classes.SHAMAN, "Elemental", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.SHAMAN, "Enhancement", roles.DPS_MELEE_PHYSICAL);
addTalentTree(classes.SHAMAN, "Restoration", roles.HEALER);

// Rogue
addTalentTree(classes.ROGUE, "Assassination", roles.DPS_MELEE_PHYSICAL);
addTalentTree(classes.ROGUE, "Combat", roles.DPS_MELEE_PHYSICAL);
addTalentTree(classes.ROGUE, "Subtlety", roles.DPS_MELEE_PHYSICAL);

// Priest
addTalentTree(classes.PRIEST, "Discipline", roles.HEALER);
addTalentTree(classes.PRIEST, "Holy", roles.HEALER);
addTalentTree(classes.PRIEST, "Shadow", roles.DPS_RANGED_MAGICAL);

// Paladin
addTalentTree(classes.PALADIN, "Holy", roles.HEALER);
addTalentTree(classes.PALADIN, "Protection", roles.TANK);
addTalentTree(classes.PALADIN, "Retribution", roles.DPS_MELEE_PHYSICAL);

// Mage
addTalentTree(classes.MAGE, "Arcane", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.MAGE, "Fire", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.MAGE, "Frost", roles.DPS_RANGED_MAGICAL);

// Hunter
addTalentTree(classes.HUNTER, "Beast mastery", roles.DPS_RANGED_PHYSICAL);
addTalentTree(classes.HUNTER, "Marksmanship", roles.DPS_RANGED_PHYSICAL);
addTalentTree(classes.HUNTER, "Survival", roles.DPS_RANGED_PHYSICAL);

// Druid
addTalentTree(classes.DRUID, "Balance", roles.DPS_RANGED_MAGICAL);
addTalentTree(classes.DRUID, "Feral combat", roles.DPS_MELEE_PHYSICAL, {
  isTank: null
});
addTalentTree(classes.DRUID, "Restoration", roles.HEALER);
