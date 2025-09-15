"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerState = void 0;
var _ModelBase = require("./ModelBase.js");
/**
 * Current state of the player (health, armor, money, etc.) */
class PlayerState extends _ModelBase.ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ PlayerState received invalid data, defaulting to empty object.');
      data = {};
    }
    this.health = this._validateNumberOrNull(data.health);
    this.armor = this._validateNumberOrNull(data.armor);
    this.helmet = Boolean(data.helmet);
    this.flashed = this._validateNumberOrZero(data.flashed);
    this.smoked = this._validateNumberOrZero(data.smoked);
    this.burning = this._validateNumberOrZero(data.burning);
    this.money = this._validateNumberOrZero(data.money);
    this.roundKills = this._validateNumberOrZero(data.round_kills);
    this.roundHeadshots = this._validateNumberOrZero(data.round_killhs);
    this.equipValue = this._validateNumberOrZero(data.equip_value);
  }
  isAlive() {
    var _this$health;
    return ((_this$health = this.health) !== null && _this$health !== void 0 ? _this$health : 0) > 0;
  }
  hasArmor() {
    var _this$armor;
    return ((_this$armor = this.armor) !== null && _this$armor !== void 0 ? _this$armor : 0) > 0 || this.helmet;
  }
  _validateNumberOrNull(value) {
    return typeof value === 'number' && !isNaN(value) ? value : null;
  }
  _validateNumberOrZero(value) {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  }
}
exports.PlayerState = PlayerState;