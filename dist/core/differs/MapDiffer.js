"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapDiffer = void 0;
var _events = require("../../constants/events.js");
var _DifferBase = require("./DifferBase.js");
class MapDiffer extends _DifferBase.DifferBase {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('MapDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the map (name, phase, current round, team scores) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    if (!(prev !== null && prev !== void 0 && prev.map) && !(curr !== null && curr !== void 0 && curr.map)) return;
    const fields = [{
      path: 'map.name',
      event: _events.EVENTS.map.nameChanged
    }, {
      path: 'map.phase',
      event: _events.EVENTS.map.phaseChanged
    }, {
      path: 'map.round',
      event: _events.EVENTS.map.roundChanged
    }, {
      path: 'map.team_ct.score',
      event: _events.EVENTS.map.teamCTScoreChanged
    }, {
      path: 'map.team_t.score',
      event: _events.EVENTS.map.teamTScoreChanged
    }];
    for (const {
      path,
      event
    } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);
      if (prevVal !== currVal) {
        this.logger.log(`🗺️ Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, {
          previously: prevVal,
          current: currVal
        }, 'map');
      }
    }
  }
}
exports.MapDiffer = MapDiffer;