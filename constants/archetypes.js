// Constants
import {
  classes,
  roles,
  position,
  damageType
} from "../constant";

// Character archetypes definitions
import Archetype from "../classes/characters/Archetype";


/*
 * Archetypes
 */

const archetypesDefinitions = [
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

export default archetypesDefinitions;
export const archetypeFilter = {
  getFromClass: (cClass) => archetypesDefinitions.filter(archetype => archetype.getClass() === cClass),
  getFromRole: (role) => archetypesDefinitions.filter(archetype => archetype.getRoles() === role),
  getFromPosition: (position) => archetypesDefinitions.filter(archetype => archetype.getPosition() === position),
  getFromDamageType: (damageType) => archetypesDefinitions.filter(archetype => archetype.getDamageType() === damageType),
  getFromSpecialisation: (specialisation) => archetypesDefinitions.filter(archetype => archetype.getSpecialisation() === specialisation),
}