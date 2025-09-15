"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GSIConfigWriter = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GSIConfigWriter {
  static generate({
    name = 'cs2-gsi',
    uri = 'http://localhost:3000',
    outputPath = null
  } = {}) {
    const filename = `gamestate_integration_${name}.cfg`;
    const data = `"${name}"
{
  "uri"          "${uri}"
  "timeout"      "3.0"
  "buffer"       "0.0"
  "throttle"     "0.0"
  "heartbeat"    "30.0"
  "data"
  {
    "provider"                  "1"
    "map"                       "1"
    "round"                     "1"
    "player_id"                 "1"
    "player_state"              "1"
    "player_weapons"            "1"
    "player_match_stats"        "1"
  }
}`;
    if (!outputPath) {
      const desktop = _path.default.join(process.env.HOME || process.env.USERPROFILE || '.', 'Desktop');
      outputPath = _path.default.join(desktop, filename);
    } else {
      outputPath = _path.default.join(outputPath, filename);
    }
    _fs.default.writeFileSync(outputPath, data);
    return outputPath;
  }
}
exports.GSIConfigWriter = GSIConfigWriter;