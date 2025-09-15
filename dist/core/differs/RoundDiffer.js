"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoundDiffer = void 0;
var _events = require("../../constants/events.js");
var _DifferBase = require("./DifferBase.js");
class RoundDiffer extends _DifferBase.DifferBase {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('RoundDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the round state (phase, win_team, bomb) and emits corresponding events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    var _options$added, _options$added$round;
    if (!(prev !== null && prev !== void 0 && prev.round) && !(curr !== null && curr !== void 0 && curr.round)) return;
    const prevPhase = this.getFieldSafe('round.phase', prev, this.previously);
    const currPhase = this.getFieldSafe('round.phase', curr, this.added);
    if (prevPhase !== currPhase) {
      this.logger.log(`🔁 Change of phase: ${prevPhase} → ${currPhase}`);
      this.emitWithContext(emitter, _events.EVENTS.round.phaseChanged, {
        previously: prevPhase,
        current: currPhase
      }, 'round');
      if (currPhase === 'freezetime') {
        this.logger.log('🚀 Round starts (freezetime).');
        this.emitWithContext(emitter, _events.EVENTS.round.started, {}, 'round');
      }
    }
    const prevWinTeam = this.getFieldSafe('round.win_team', prev, this.previously);
    const currWinTeam = this.getFieldSafe('round.win_team', curr, this.added);
    if (prevWinTeam !== currWinTeam) {
      this.logger.log(`🏆 Change of win_team: ${prevWinTeam} → ${currWinTeam}`);
      this.emitWithContext(emitter, _events.EVENTS.round.won, {
        previously: prevWinTeam,
        current: currWinTeam
      }, 'round');
      this.emitWithContext(emitter, _events.EVENTS.round.ended, {
        winner: currWinTeam
      }, 'round');
    }
    const prevRoundNumber = this.getFieldSafe('round.round', prev, this.previously);
    const currRoundNumber = this.getFieldSafe('round.round', curr, this.added);
    if (prevRoundNumber !== currRoundNumber) {
      this.logger.log(`🔢 Change of round number: ${prevRoundNumber} → ${currRoundNumber}`);
      this.emitWithContext(emitter, _events.EVENTS.map.roundChanged, {
        previously: prevRoundNumber,
        current: currRoundNumber
      }, 'map');
    }
    if (((_options$added = options.added) === null || _options$added === void 0 ? void 0 : (_options$added$round = _options$added.round) === null || _options$added$round === void 0 ? void 0 : _options$added$round.bomb) === true) {
      this.logger.log('💣 Bomb planting started.');
      this.emitWithContext(emitter, _events.EVENTS.round.bombPlantingStarted, {}, 'round');
    }
    const prevBomb = this.getFieldSafe('round.bomb', prev, this.previously);
    const currBomb = this.getFieldSafe('round.bomb', curr, this.added);
    if (prevBomb !== currBomb) {
      if (currBomb === 'planted') {
        this.logger.log('💥 Bomb planted.');
        this.emitWithContext(emitter, _events.EVENTS.round.bombPlanted, {}, 'round');
      } else if (!currBomb) {
        this.logger.log('❌ Bomb plant attempt failed.');
        this.emitWithContext(emitter, _events.EVENTS.round.bombPlantFake, {}, 'round');
      }
    }
  }
}
exports.RoundDiffer = RoundDiffer;