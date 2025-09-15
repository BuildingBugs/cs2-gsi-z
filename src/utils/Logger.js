export class Logger {
  static LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
  };

  constructor({ level = 'info', showTimestamps = true, tag = '' } = {}) {
    this.level = Logger.LEVELS[level] ?? Logger.LEVELS.info;
    this.showTimestamps = showTimestamps;
    this.tag = tag ? `[${tag}]` : '';
  }

  _timestamp() {
    if (!this.showTimestamps) return '';
    const now = new Date();
    const localTime = now.toLocaleTimeString('en-US', { hour12: false });
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

  event(eventName, { previously, current } = {}) {
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
    this.level = Logger.LEVELS[newLevel] ?? this.level;
  }

  toggleTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }

  child(tag) {
    return new Logger({
      level: this.getLevelName(),
      showTimestamps: this.showTimestamps,
      tag,
    });
  }

  getLevelName() {
    return Object.keys(Logger.LEVELS).find(key => Logger.LEVELS[key] === this.level) || 'info';
  }
}
