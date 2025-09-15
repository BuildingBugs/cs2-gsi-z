"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStateManager = void 0;
var _Player = require("../../models/Player.js");
var _Map = require("../../models/Map.js");
var _Round = require("../../models/Round.js");
/**
 * GameStateManager
 * Keeps the Player, Map, and Round state alive and updated.
 * No longer depends directly on GsiListener. */
class GameStateManager {
  constructor() {
    this.player = new _Player.Player();
    this.map = new _Map.Map();
    this.round = new _Round.Round();
  }

  /**
   * Updates the entire state using a new complete GameState.
   * @param {GameState} gameState */
  setFullState(gameState) {
    var _gameState$player, _gameState$map, _gameState$round;
    if (!gameState) return;
    this.player = (_gameState$player = gameState.player) !== null && _gameState$player !== void 0 ? _gameState$player : new _Player.Player();
    this.map = (_gameState$map = gameState.map) !== null && _gameState$map !== void 0 ? _gameState$map : new _Map.Map();
    this.round = (_gameState$round = gameState.round) !== null && _gameState$round !== void 0 ? _gameState$round : new _Round.Round();
  }

  /**
   * Returns the current snapshot as an object. */
  getFullState() {
    return {
      player: this.player,
      map: this.map,
      round: this.round
    };
  }

  /**
   * Clears the current state (optional, to fully reset). */
  reset() {
    this.player = new _Player.Player();
    this.map = new _Map.Map();
    this.round = new _Round.Round();
  }
}
exports.GameStateManager = GameStateManager;