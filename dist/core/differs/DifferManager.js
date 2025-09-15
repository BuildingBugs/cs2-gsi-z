"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DifferManager = void 0;
class DifferManager {
  constructor() {
    this.differs = [];
  }

  /**
   * Registers a differ to be used later.
   * @param {DifferBase} differ */
  register(differ) {
    this.differs.push(differ);
  }

  /**
   * Executes all registered differs.
   * @param {GameState} previousState 
   * @param {GameState} currentState 
   * @param {Object} emitterContext 
   * @param {Object} [options] Optional: { previously, added } */
  diff(previousState, currentState, emitterContext, options = {}) {
    for (const differ of this.differs) {
      differ.diff(previousState, currentState, emitterContext, options);
    }
  }
}
exports.DifferManager = DifferManager;