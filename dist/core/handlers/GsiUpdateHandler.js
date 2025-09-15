"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GsiUpdateHandler = void 0;
var _GsiParser = require("../parser/GsiParser.js");
var _applyDelta = require("../../utils/applyDelta.js");
class GsiUpdateHandler {
  constructor({
    logger,
    stateManager,
    differManager,
    emitter
  }) {
    this.logger = (logger !== null && logger !== void 0 ? logger : {
      child: () => console
    }).child('GsiupdateHandler');
    this.stateManager = stateManager;
    this.differManager = differManager;
    this.emitter = emitter;
    this.logger.log('⚙️ instantiated correctly.');
  }
  handle(rawJson) {
    if (!rawJson) {
      this.logger.warn('⚠️ Empty GSI payload received.');
      return;
    }
    this.logger.log('🔔 GSI update received.');
    try {
      const parsedState = new _GsiParser.GsiParser(rawJson).parse();
      this.logger.log('🧩 State parsed.');
      const previousState = this.stateManager.getFullState();
      if (previousState !== null && previousState !== void 0 && previousState.player) {
        this.logger.verbose('🔄 Previous complete state:');
        this.logger.verbose(JSON.stringify(previousState, null, 2));
        (0, _applyDelta.applyDelta)(parsedState, rawJson.previously);
        this.logger.verbose('🔁 State after applying delta:');
        this.logger.verbose(JSON.stringify(parsedState, null, 2));
        this.logger.log('🔀 Delta applied.');
        this.differManager.diff(previousState, parsedState, {
          emit: (event, payload) => {
            this.logger.log(`🛎️ Event detected: ${event}`, payload);
            this.emitter.emit(event, payload);
          }
        });
      }
      this.stateManager.setFullState(parsedState);
      this.logger.log('📦 Snapshot updated in GameStateManager.');
    } catch (error) {
      this.logger.error('❌ Error processing GSI update:', error);
    }
  }
}
exports.GsiUpdateHandler = GsiUpdateHandler;