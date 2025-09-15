"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = void 0;
var _ModelBase = require("../../models/ModelBase.js");
/**
 * Represents the complete game state at a given moment. */
class GameState extends _ModelBase.ModelBase {
  constructor({
    player,
    round,
    map,
    provider,
    previously
  } = {}) {
    super();
    if (typeof player !== 'object' || player === null) {
      console.warn('⚠️ GameState: invalid player, assigning empty object.');
      player = {};
    }
    if (typeof round !== 'object' || round === null) {
      console.warn('⚠️ GameState: invalid round, assigning empty object.');
      round = {};
    }
    if (typeof map !== 'object' || map === null) {
      console.warn('⚠️ GameState: invalid map, assigning empty object.');
      map = {};
    }
    this.player = player; // It is assumed these are already instances of Player, Round, and Map.
    this.round = round;
    this.map = map;
    this.provider = typeof provider === 'object' && provider !== null ? provider : {};
    this.previously = typeof previously === 'object' && previously !== null ? previously : {};
  }

  /**
   * Exports a clean snapshot of the current state. */
  toJSON() {
    return {
      player: this.player,
      round: this.round,
      map: this.map,
      provider: this.provider,
      previously: this.previously
    };
  }
}
exports.GameState = GameState;