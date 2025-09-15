"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_differs = void 0;
var _PlayerDiffer = require("./PlayerDiffer.js");
var _PlayerStateDiffer = require("./PlayerStateDiffer.js");
var _WeaponDiffer = require("./WeaponDiffer.js");
var _MapDiffer = require("./MapDiffer.js");
var _RoundDiffer = require("./RoundDiffer.js");
const default_differs = exports.default_differs = [_PlayerDiffer.PlayerDiffer, _PlayerStateDiffer.PlayerStateDiffer, _WeaponDiffer.WeaponDiffer, _MapDiffer.MapDiffer, _RoundDiffer.RoundDiffer];