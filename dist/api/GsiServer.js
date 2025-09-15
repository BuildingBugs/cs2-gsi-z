"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GsiServer = void 0;
var _ws = require("ws");
var _events = require("events");
/**
 * WebSocket server for broadcasting CS2 game state updates to connected clients.
 * Manages client connections and provides real-time game data streaming.
 */
class GsiServer extends _events.EventEmitter {
  /**
   * Creates a new GsiServer instance.
   * @param {Object} options - Configuration options
   * @param {number} [options.port=4000] - WebSocket server port
   * @param {Logger} [options.logger] - Logger instance
   */
  constructor({
    port = 4000,
    logger = null
  } = {}) {
    super();
    this.port = port;
    this.clients = new Set();
    this.logger = logger !== null && logger !== void 0 ? logger : console;
  }

  /**
   * Starts the WebSocket server and begins accepting connections.
   */
  start() {
    var _this$logger$log3, _this$logger4;
    this.wss = new _ws.WebSocketServer({
      port: this.port
    });
    this.wss.on('connection', socket => {
      var _this$logger$log, _this$logger;
      this.clients.add(socket);
      (_this$logger$log = (_this$logger = this.logger).log) === null || _this$logger$log === void 0 ? void 0 : _this$logger$log.call(_this$logger, `🔌 New client connected. Total: ${this.clients.size}`);
      this.emit('clientConnected', socket);
      socket.on('close', () => {
        var _this$logger$log2, _this$logger2;
        this.clients.delete(socket);
        (_this$logger$log2 = (_this$logger2 = this.logger).log) === null || _this$logger$log2 === void 0 ? void 0 : _this$logger$log2.call(_this$logger2, `❌ Client disconnected. Remaining: ${this.clients.size}`);
        this.emit('clientDisconnected', socket);
      });
      socket.on('error', error => {
        var _this$logger$error, _this$logger3;
        this.clients.delete(socket);
        (_this$logger$error = (_this$logger3 = this.logger).error) === null || _this$logger$error === void 0 ? void 0 : _this$logger$error.call(_this$logger3, `⚠️ Client error:`, error);
        this.emit('clientError', error);
      });
    });
    (_this$logger$log3 = (_this$logger4 = this.logger).log) === null || _this$logger$log3 === void 0 ? void 0 : _this$logger$log3.call(_this$logger4, `🌐 WebSocket Server listening on ws://localhost:${this.port}`);
    this.emit('started', this.port);
  }

  /**
   * Broadcasts a message to all connected clients.
   * @param {string} type - Message type identifier
   * @param {Object} payload - Message payload data
   */
  broadcast(type, payload) {
    var _this$logger$verbose, _this$logger5;
    const message = JSON.stringify({
      type,
      payload
    });
    (_this$logger$verbose = (_this$logger5 = this.logger).verbose) === null || _this$logger$verbose === void 0 ? void 0 : _this$logger$verbose.call(_this$logger5, `📡 Broadcasting message type: ${type}`);
    for (const client of this.clients) {
      if (client.readyState === 1) {
        // WebSocket.OPEN
        try {
          client.send(message);
        } catch (error) {
          var _this$logger$error2, _this$logger6;
          (_this$logger$error2 = (_this$logger6 = this.logger).error) === null || _this$logger$error2 === void 0 ? void 0 : _this$logger$error2.call(_this$logger6, 'Error sending message to client:', error);
          this.clients.delete(client);
        }
      }
    }
  }

  /**
   * Stops the WebSocket server and closes all connections.
   */
  stop() {
    if (this.wss) {
      this.wss.close(() => {
        var _this$logger$log4, _this$logger7;
        (_this$logger$log4 = (_this$logger7 = this.logger).log) === null || _this$logger$log4 === void 0 ? void 0 : _this$logger$log4.call(_this$logger7, '🛑 WebSocket Server stopped.');
        this.emit('stopped');
      });
    }
  }

  /**
   * Returns the number of currently connected clients.
   * @returns {number} Number of connected clients
   */
  getClientCount() {
    return this.clients.size;
  }

  /**
   * Checks if the server is currently running.
   * @returns {boolean} True if server is running
   */
  isRunning() {
    return this.wss && this.wss.listening;
  }
}
exports.GsiServer = GsiServer;