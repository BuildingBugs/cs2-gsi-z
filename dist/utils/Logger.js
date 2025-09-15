"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/utils/Logger.js

class Logger {
  static LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3
  };
  constructor({
    level = 'info',
    showTimestamps = true,
    tag = ''
  } = {}) {
    var _Logger$LEVELS$level;
    this.level = (_Logger$LEVELS$level = Logger.LEVELS[level]) !== null && _Logger$LEVELS$level !== void 0 ? _Logger$LEVELS$level : Logger.LEVELS.info;
    this.showTimestamps = showTimestamps;
    this.tag = tag ? `[${tag}]` : '';
  }
  _timestamp() {
    if (!this.showTimestamps) return '';
    const now = new Date();
    const localTime = now.toLocaleTimeString('en-US', {
      hour12: false
    }); // HH:MM:SS local
    return _chalk.default.gray(`[${localTime}]`);
  }
  _prefix(levelLabel, emoji) {
    return `${_chalk.default.blue('[CS2GSIz]')} ${_chalk.default.magenta(this.tag)} ${_chalk.default.bold(levelLabel)} ${emoji}`;
  }
  log(message, ...args) {
    if (this.level < Logger.LEVELS.info) return;
    console.log(this._timestamp(), this._prefix(_chalk.default.green('[INFO]'), '🎯'), message, ...args);
  }
  verbose(message, ...args) {
    if (this.level < Logger.LEVELS.verbose) return;
    console.log(this._timestamp(), this._prefix(_chalk.default.cyan('[VERBOSE]'), '🔍'), message, ...args);
  }
  warn(message, ...args) {
    if (this.level < Logger.LEVELS.warn) return;
    console.warn(this._timestamp(), this._prefix(_chalk.default.yellow('[WARN]'), '⚠️'), message, ...args);
  }
  error(message, ...args) {
    if (this.level < Logger.LEVELS.error) return;
    console.error(this._timestamp(), this._prefix(_chalk.default.red('[ERROR]'), '❌'), message, ...args);
  }
  event(eventName, {
    previously,
    current
  } = {}) {
    if (this.level < Logger.LEVELS.verbose) return;
    let eventInfo = _chalk.default.yellow(eventName);
    if (previously !== undefined || current !== undefined) {
      eventInfo += ` ${_chalk.default.cyan('(')}${_chalk.default.red(previously)}${_chalk.default.cyan(' → ')}${_chalk.default.green(current)}${_chalk.default.cyan(')')}`;
    }
    console.log(this._timestamp(), _chalk.default.magenta('[EVENT]'), _chalk.default.yellow('🎮'), eventInfo);
  }
  raw(json) {
    if (this.level < Logger.LEVELS.verbose) return;
    console.log(this._timestamp(), _chalk.default.gray('[RAW]'), _chalk.default.gray('📥 JSON received:'), JSON.stringify(json, null, 2));
  }
  setLevel(newLevel) {
    var _Logger$LEVELS$newLev;
    this.level = (_Logger$LEVELS$newLev = Logger.LEVELS[newLevel]) !== null && _Logger$LEVELS$newLev !== void 0 ? _Logger$LEVELS$newLev : this.level;
  }
  toggleTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }
  child(tag) {
    return new Logger({
      level: this.getLevelName(),
      showTimestamps: this.showTimestamps,
      tag
    });
  }
  getLevelName() {
    return Object.keys(Logger.LEVELS).find(key => Logger.LEVELS[key] === this.level) || 'info';
  }
}
exports.Logger = Logger;