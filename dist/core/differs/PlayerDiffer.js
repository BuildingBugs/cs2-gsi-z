"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerDiffer = void 0;
var _events = require("../../constants/events.js");
var _DifferBase = require("./DifferBase.js");
class PlayerDiffer extends _DifferBase.DifferBase {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('PlayerDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares main changes in the player (team, activity, observer slot) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    if (!(prev !== null && prev !== void 0 && prev.player) && !(curr !== null && curr !== void 0 && curr.player)) return;
    const fields = [{
      path: 'player.team',
      event: _events.EVENTS.player.teamChanged
    }, {
      path: 'player.activity',
      event: _events.EVENTS.player.activityChanged
    }, {
      path: 'player.observerSlot',
      event: _events.EVENTS.player.observerSlotChanged
    }];
    for (const {
      path,
      event
    } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);
      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, {
          previously: prevVal,
          current: currVal
        }, 'player');
      }
    }
  }
}
exports.PlayerDiffer = PlayerDiffer;