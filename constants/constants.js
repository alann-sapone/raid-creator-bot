// Classes
import Archetype from "../classes/characters/Archetype";

/*
 * Misc
 */

export const factions = {
  HORDE: "Horde",
  ALLIANCE: "Alliance"
};

export const roles = {
  TANK: "Tank",
  HEALER: "Healer",
  DAMAGE_DEALER: "Damage Dealer"
};

export const position = {
  MELEE: "Melee",
  RANGED: "Ranged"
}

export const damageType = {
  PHYSICAL: "Physical",
  MAGICAL: "Magical",
  HYBRID: "Hybrid"
}

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

/*
 * Archetypes
 */

export const archetypes = [
  // Warrior
  new Archetype(classes.WARRIOR, "Arms", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.WARRIOR, "Fury", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.WARRIOR, "Protection", roles.TANK, position.MELEE, damageType.PHYSICAL),

  // Warlock
  new Archetype(classes.WARLOCK, "Affliction", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.WARLOCK, "Demonology", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.WARLOCK, "Destruction", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  
  // Shaman
  new Archetype(classes.SHAMAN, "Elemental", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.SHAMAN, "Enhancement", roles.DAMAGE_DEALER, position.MELEE, damageType.HYBRID),
  new Archetype(classes.SHAMAN, "Restoration", roles.HEALER, position.RANGED, damageType.MAGICAL),
  
  // Rogue
  new Archetype(classes.ROGUE, "Assassination", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.ROGUE, "Combat", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.ROGUE, "Subtlety", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),

  // Priest
  new Archetype(classes.PRIEST, "Discipline", roles.HEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.PRIEST, "Holy", roles.HEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.PRIEST, "Shadow", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  
  // Paladin
  new Archetype(classes.PALADIN, "Holy", roles.HEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.PALADIN, "Protection", roles.TANK, position.MELEE, damageType.MAGICAL),
  new Archetype(classes.PALADIN, "Retribution", roles.DAMAGE_DEALER, position.MELEE, damageType.HYBRID),
  
  // Mage
  new Archetype(classes.MAGE, "Arcane", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.MAGE, "Fire", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.MAGE, "Frost", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  
  // Hunter
  new Archetype(classes.HUNTER, "Beast mastery", roles.DAMAGE_DEALER, position.RANGED, damageType.PHYSICAL),
  new Archetype(classes.HUNTER, "Marksmanship", roles.DAMAGE_DEALER, position.RANGED, damageType.PHYSICAL),
  new Archetype(classes.HUNTER, "Survival", roles.DAMAGE_DEALER, position.RANGED, damageType.PHYSICAL),
  
  // Druid
  new Archetype(classes.DRUID, "Balance", roles.DAMAGE_DEALER, position.RANGED, damageType.MAGICAL),
  new Archetype(classes.DRUID, "Feral combat (DPS)", roles.DAMAGE_DEALER, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.DRUID, "Feral combat (Tank)", roles.TANK, position.MELEE, damageType.PHYSICAL),
  new Archetype(classes.DRUID, "Restoration", roles.HEALER, position.MELEE, damageType.MAGICAL),
];

export const archetypeFilter = {
  getFromClass: (cClass) => archetypes.filter(archetype => archetype.getClass() === cClass),
  getFromRole: (role) => archetypes.filter(archetype => archetype.getRoles() === role),
  getFromPosition: (position) => archetypes.filter(archetype => archetype.getPosition() === position),
  getFromDamageType: (damageType) => archetypes.filter(archetype => archetype.getDamageType() === damageType),
  getFromSpecialisation: (specialisation) => archetypes.filter(archetype => archetype.getSpecialisation() === specialisation),
}