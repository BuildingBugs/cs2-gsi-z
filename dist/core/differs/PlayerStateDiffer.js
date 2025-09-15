"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerStateDiffer = void 0;
var _events = require("../../constants/events.js");
var _DifferBase = require("./DifferBase.js");
class PlayerStateDiffer extends _DifferBase.DifferBase {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('PlayerStateDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the player's internal state (health, armor, money, etc.) and emits corresponding events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    if (!(prev !== null && prev !== void 0 && prev.player) && !(curr !== null && curr !== void 0 && curr.player)) return;
    const fields = [{
      path: 'player.state.health',
      event: _events.EVENTS.player.hpChanged
    }, {
      path: 'player.state.armor',
      event: _events.EVENTS.player.armorChanged
    }, {
      path: 'player.state.helmet',
      event: _events.EVENTS.player.helmetChanged
    }, {
      path: 'player.state.money',
      event: _events.EVENTS.player.moneyChanged
    }, {
      path: 'player.state.flashed',
      event: _events.EVENTS.player.flashedChanged
    }, {
      path: 'player.state.smoked',
      event: _events.EVENTS.player.smokedChanged
    }, {
      path: 'player.state.burning',
      event: _events.EVENTS.player.burningChanged
    }, {
      path: 'player.state.equipValue',
      event: _events.EVENTS.player.equipValueChanged
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
          previousus: prevVal,
          current: currVal
        }, 'player');
      }
    }
    const prevMoney = this.getFieldSafe('player.state.money', prev, this.previously);
    const currMoney = this.getFieldSafe('player.state.money', curr, this.added);
    if (currMoney !== null && prevMoney !== null && currMoney > prevMoney) {
      const earned = currMoney - prevMoney;
      this.logger.log(`💵 Money earned: +${earned}`);
      this.emitWithContext(emitter, _events.EVENTS.player.moneyEarned, {
        earned
      }, 'player');
    }
  }
}
exports.PlayerStateDiffer = PlayerStateDiffer;