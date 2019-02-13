"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OsmRunError extends Error {
    constructor(message, runError) {
        super(message);
        this.runError = runError;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, OsmRunError.prototype);
    }
}
exports.OsmRunError = OsmRunError;
//# sourceMappingURL=OsmRunError.js.map