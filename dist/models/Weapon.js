"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weapon = void 0;
var _WeaponData = require("./WeaponData.js");
var _ModelBase = require("./ModelBase.js");
/**
 * Represents a player's weapon. */
class Weapon extends _ModelBase.ModelBase {
  constructor(data = {}) {
    var _WeaponData$this$name, _ref, _data$type, _metadata$displayName;
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Weapon received invalid data, defaulting to empty object.');
      data = {};
    }
    this.name = this._validateString(data.name);
    this.state = this._validateString(data.state, 'holstered');
    this.ammoClip = this._validateNumberOrNull(data.ammo_clip);
    this.ammoClipMax = this._validateNumberOrNull(data.ammo_clip_max);
    this.ammoReserve = this._validateNumberOrNull(data.ammo_reserve);
    const metadata = (_WeaponData$this$name = _WeaponData.WeaponData[this.name]) !== null && _WeaponData$this$name !== void 0 ? _WeaponData$this$name : {};
    this.type = (_ref = (_data$type = data.type) !== null && _data$type !== void 0 ? _data$type : metadata.type) !== null && _ref !== void 0 ? _ref : 'Unknown';
    this.displayName = (_metadata$displayName = metadata.displayName) !== null && _metadata$displayName !== void 0 ? _metadata$displayName : this.name;
  }
  isPrimary() {
    return ['Rifle', 'Sniper', 'Shotgun', 'Submachine Gun', 'MachineGun'].includes(this.type);
  }
  isSecondary() {
    return this.type === 'Pistol';
  }
  isGrenade() {
    return this.type === 'Grenade';
  }
  isMelee() {
    return this.type === 'Knife';
  }
  isC4() {
    return this.name === 'weapon_c4';
  }
  isActive() {
    return this.state === 'active';
  }
  _validateString(value, defaultValue = '') {
    return typeof value === 'string' && value.trim() !== '' ? value : defaultValue;
  }
  _validateNumberOrNull(value) {
    return typeof value === 'number' && !isNaN(value) ? value : null;
  }
}
exports.Weapon = Weapon;