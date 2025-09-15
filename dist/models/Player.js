"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;
var _PlayerState = require("./PlayerState.js");
var _PlayerMatchStats = require("./PlayerMatchStats.js");
var _WeaponsCollection = require("./WeaponsCollection.js");
var _ModelBase = require("./ModelBase.js");
/**
 * Represents the current player. */
class Player extends _ModelBase.ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Player constructor received invalid data, defaulting to empty object.');
      data = {};
    }
    this.steamid = this._validateString(data.steamid);
    this.name = this._validateString(data.name);
    this.team = this._validateString(data.team);
    this.observerSlot = this._validateNumberOrNull(data.observer_slot);
    this.activity = this._validateString(data.activity, 'unknown');
    this.state = new _PlayerState.PlayerState(data.state || {});
    this.matchStats = new _PlayerMatchStats.PlayerMatchStats(data.match_stats || {});
    this.weapons = new _WeaponsCollection.WeaponsCollection(data.weapons || {});
    this.activeWeapon = this.weapons.getActive();
  }

  /**
   * Returns a specific weapon by name. */
  getWeaponByName(name) {
    var _this$weapons$find;
    return (_this$weapons$find = this.weapons.find(w => w.name === name)) !== null && _this$weapons$find !== void 0 ? _this$weapons$find : null;
  }

  /**
   * Does the player have grenades? */
  hasGrenades() {
    return this.weapons.some(w => w.isGrenade());
  }

  /**
   * Does the player have C4? */
  hasC4() {
    return this.weapons.some(w => w.isC4());
  }

  /* ------------------------ */
  /* Private internal methods */
  /* ------------------------ */

  _validateString(value, defaultValue = '') {
    return typeof value === 'string' && value.trim() !== '' ? value : defaultValue;
  }
  _validateNumberOrNull(value) {
    return typeof value === 'number' && !isNaN(value) ? value : null;
  }
}
exports.Player = Player;