"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponDiffer = void 0;
var _events = require("../../constants/events.js");
var _DifferBase = require("./DifferBase.js");
class WeaponDiffer extends _DifferBase.DifferBase {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('WeaponDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }
  /**
  * Compara cambios en el arma activa y emite eventos de Change of ammoClip y ammoReserve.
  * 
  * @param {GameState} prev State anterior del juego
  * @param {GameState} curr State actual del juego
  * @param {Object} emitter Contexto de emisión de eventos
  * @param {Object} [options] Opcional. Objeto con { previously, added } */

  diff(prev, curr, emitter, options = {}) {
    this.logger.verbose('🔍 diff() called');
    if (!(prev !== null && prev !== void 0 && prev.player) && !(curr !== null && curr !== void 0 && curr.player)) return;
    const prevWeapon = prev.player.activeWeapon;
    const currWeapon = curr.player.activeWeapon;
    this.logger.verbose('🔍 prevWeapon:', prevWeapon);
    this.logger.verbose('🔍 currWeapon:', currWeapon);
    if (!currWeapon || currWeapon.ammoClip === undefined) {
      this.logger.warn('⚠️ Current active weapon incomplete or missing ammo_clip.');
      return;
    }
    if (!prevWeapon || prevWeapon.ammoClip === undefined) {
      this.logger.verbose('ℹ️ No prevWeapon or ammoClip in prev. Waiting for next diff.');
      return;
    }
    if (prevWeapon.ammoClip !== currWeapon.ammoClip) {
      this.logger.log(`🚀 ammoClip change: ${prevWeapon.ammoClip} → ${currWeapon.ammoClip}`);
      emitter.emit(_events.EVENTS.player.ammoClipChanged, {
        previously: prevWeapon.ammoClip,
        current: currWeapon.ammoClip
      });
    }
    if (prevWeapon.ammoReserve !== currWeapon.ammoReserve) {
      this.logger.log(`🚀 ammoReserve change: ${prevWeapon.ammoReserve} → ${currWeapon.ammoReserve}`);
      emitter.emit(_events.EVENTS.player.ammoReserveChanged, {
        previously: prevWeapon.ammoReserve,
        current: currWeapon.ammoReserve
      });
    }
    if (prevWeapon.name !== currWeapon.name) {
      this.logger.log(`🚀 Weapon changed: ${prevWeapon.name} → ${currWeapon.name}`);
      emitter.emit(_events.EVENTS.player.weaponChanged, {
        previously: prevWeapon,
        current: currWeapon
      });
    }
  }
}
exports.WeaponDiffer = WeaponDiffer;