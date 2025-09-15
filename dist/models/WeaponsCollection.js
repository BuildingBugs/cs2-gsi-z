"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponsCollection = void 0;
var _Weapon = require("./Weapon.js");
var _ModelBase = require("./ModelBase.js");
/**
 * Player weapons collection. */
class WeaponsCollection extends _ModelBase.ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ WeaponsCollection received invalid data, defaulting to empty object.');
      data = {};
    }
    this.list = Object.values(data).map(w => new _Weapon.Weapon(w));
  }
  getActive() {
    var _this$list$find;
    return (_this$list$find = this.list.find(w => w.isActive())) !== null && _this$list$find !== void 0 ? _this$list$find : null;
  }
  getGrenades() {
    return this.list.filter(w => w.isGrenade());
  }
  hasC4() {
    return this.list.some(w => w.isC4());
  }
  getByType(type) {
    return this.list.filter(w => w.type === type);
  }
  getAll() {
    return this.list;
  }
  find(predicate) {
    return this.list.find(predicate);
  }
  some(predicate) {
    return this.list.some(predicate);
  }
}
exports.WeaponsCollection = WeaponsCollection;