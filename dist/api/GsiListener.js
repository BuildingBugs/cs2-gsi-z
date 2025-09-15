"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GsiListener = void 0;
var _http = _interopRequireDefault(require("http"));
var _events = require("events");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GsiListener extends _events.EventEmitter {
  constructor({
    logger = null
  } = {}) {
    super();
    this.logger = logger !== null && logger !== void 0 && logger.child ? logger.child('GsiListener') : console;
    this.port = null;
    this.server = null;
    this.logger.log('GsiListener instantiated correctly.');
  }
  start(port = 3000) {
    this.port = port;
    this.logger.log(`Starting GsiListener en puerto ${port}...`);
    this.server = _http.default.createServer(this.handleHttp.bind(this));
    this.server.listen(port, () => {
      this.emit('ready', port);
      this.logger.log(`GsiListener listening on port ${port}`);
    });
    this.server.on('error', err => {
      this.logger.error('Error in GsiListener:', err);
      this.emit('error', err);
    });
  }
  handleHttp(req, res) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const json = JSON.parse(body);

          // Validate Basic Structure
          if (!json || typeof json !== 'object') {
            throw new Error('Invalid GSI payload structure');
          }
          this.logger.verbose('📥 Valid GSI payload received');
          this.logger.verbose(JSON.stringify(json, null, 2));
          this.emit('gsiUpdate', json);
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({
            status: 'OK'
          }));
        } catch (err) {
          this.logger.error('Error parsing GSI payload:', err);
          this.emit('error', err);
          res.writeHead(400, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({
            error: 'Invalid JSON payload',
            message: err.message
          }));
        }
      });
      req.on('error', err => {
        this.logger.error('HTTP request error:', err);
        res.writeHead(500);
        res.end();
      });
    } else {
      this.logger.warn(`Request not allowed: ${req.method} ${req.url}`);
      res.writeHead(405, {
        'Allow': 'POST'
      });
      res.end(JSON.stringify({
        error: 'Only POST method allowed'
      }));
    }
  }
  stop() {
    if (this.server) {
      this.server.close(() => {
        this.logger.log('GsiListener stopped.');
      });
    } else {
      this.logger.warn('Attempt to stop GsiListener but was not started.');
    }
  }
}
exports.GsiListener = GsiListener;