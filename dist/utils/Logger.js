"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Logger {
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
    });
    return `[${localTime}]`;
  }
  _prefix(levelLabel, emoji) {
    return `[CS2GSIz] ${this.tag} ${levelLabel} ${emoji}`;
  }
  log(message, ...args) {
    if (this.level < Logger.LEVELS.info) return;
    console.log(this._timestamp(), this._prefix('[INFO]', '🎯'), message, ...args);
  }
  verbose(message, ...args) {
    if (this.level < Logger.LEVELS.verbose) return;
    console.log(this._timestamp(), this._prefix('[VERBOSE]', '🔍'), message, ...args);
  }
  warn(message, ...args) {
    if (this.level < Logger.LEVELS.warn) return;
    console.warn(this._timestamp(), this._prefix('[WARN]', '⚠️'), message, ...args);
  }
  error(message, ...args) {
    if (this.level < Logger.LEVELS.error) return;
    console.error(this._timestamp(), this._prefix('[ERROR]', '❌'), message, ...args);
  }
  event(eventName, {
    previously,
    current
  } = {}) {
    if (this.level < Logger.LEVELS.verbose) return;
    let eventInfo = eventName;
    if (previously !== undefined || current !== undefined) {
      eventInfo += ` (${previously} → ${current})`;
    }
    console.log(this._timestamp(), '[EVENT]', '🎮', eventInfo);
  }
  raw(json) {
    if (this.level < Logger.LEVELS.verbose) return;
    console.log(this._timestamp(), '[RAW]', '📥 JSON received:', JSON.stringify(json, null, 2));
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
_defineProperty(Logger, "LEVELS", {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3
});