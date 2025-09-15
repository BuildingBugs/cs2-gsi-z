"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GsiParser = void 0;
var _GameState = require("../gamestate/GameState.js");
var _Player = require("../../models/Player.js");
var _Round = require("../../models/Round.js");
var _Map = require("../../models/Map.js");
// src/core/parser/GsiParser.js

class GsiParser {
  constructor(raw = {}) {
    this.raw = raw;
  }
  parse() {
    var _this$raw$player, _this$raw$round, _this$raw$map, _this$raw$provider, _this$raw$previously;
    const player = new _Player.Player((_this$raw$player = this.raw.player) !== null && _this$raw$player !== void 0 ? _this$raw$player : {});
    const round = new _Round.Round((_this$raw$round = this.raw.round) !== null && _this$raw$round !== void 0 ? _this$raw$round : {});
    const map = new _Map.Map((_this$raw$map = this.raw.map) !== null && _this$raw$map !== void 0 ? _this$raw$map : {});
    const provider = (_this$raw$provider = this.raw.provider) !== null && _this$raw$provider !== void 0 ? _this$raw$provider : {};
    const previously = (_this$raw$previously = this.raw.previously) !== null && _this$raw$previously !== void 0 ? _this$raw$previously : {};
    return new _GameState.GameState({
      player,
      round,
      map,
      provider,
      previously
    });
  }
}
exports.GsiParser = GsiParser;