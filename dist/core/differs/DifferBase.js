"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DifferBase = void 0;
class DifferBase {
  constructor(previously = {}, added = {}) {
    this.previously = previously;
    this.added = added;
  }
  emitWithContext(emitter, eventName, data, entity = null) {
    var _this$previously$enti, _this$previously, _this$added$entity, _this$added;
    emitter.emit(eventName, {
      ...data,
      previouslyBlock: entity ? (_this$previously$enti = (_this$previously = this.previously) === null || _this$previously === void 0 ? void 0 : _this$previously[entity]) !== null && _this$previously$enti !== void 0 ? _this$previously$enti : {} : this.previously,
      addedBlock: entity ? (_this$added$entity = (_this$added = this.added) === null || _this$added === void 0 ? void 0 : _this$added[entity]) !== null && _this$added$entity !== void 0 ? _this$added$entity : {} : this.added
    });
  }

  /**
   * 🔥 Safely obtains a field from `curr`, or if it doesn't exist, from `fallback`.
   * @param {string} path E.g.: 'player.state.hp'
   * @param {Object} curr Current snapshot
   * @param {Object} fallback Fallback snapshot (added or previously)
   * @returns {any} Value found or null */
  getFieldSafe(path, curr, fallback) {
    const parts = path.split('.');
    let value = curr;
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null) return value;
    value = fallback;
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        return null;
      }
    }
    return value;
  }
}
exports.DifferBase = DifferBase;