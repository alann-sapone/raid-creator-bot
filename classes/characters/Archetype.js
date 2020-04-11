export default class Archetype {
  constructor(cClass, specialisation, roles, position, damageType) {
    this.cClass = cClass;
    this.specialisation = specialisation;
    this.roles = roles;
    this.position = position;
    this.damageType = damageType;
  }

  getClass = () => {
    return this.cClass;
  };

  isClass = (cClass) => {
    return this.cClass === cClass;
  };

  getSpecialisation = () => {
    return this.specialisation;
  };

  isSpecialisation = (specialisation) => {
    return this.specialisation === specialisation;
  };

  getRoles = () => {
    return this.roles;
  };

  getPosition = () => {
    return this.position;
  };

  getDamageType = () => {
    return this.damageType;
  };

  getIconName = () => {
    return `${this.getClass()}${this.getSpecialisation()}`.replace(/[^a-zA-Z]/g, "");
  }
}
